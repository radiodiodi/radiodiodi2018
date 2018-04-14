const fetch = require('node-fetch');
const Router = require('koa-router');
const models = require('./models');
const utils = require('./utils');
const websockets = require('./websockets');
const RateLimit = require('koa2-ratelimit').RateLimit;
const util = require('util')

const router = new Router();
const email = require('./email')
const getCalendar = require('./calendar')

const admin = new Router();

const allowAllCors = async (ctx, next) => {
  await next();
  ctx.set('Access-Control-Allow-Origin', '*');
}

const verifyUrl = token => `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;
const checkAuthorization = async (ctx, next) => {
  const auth = ctx.headers.authorization;

  if (!auth) {
    ctx.throw(400, 'No authorization header present.');
    return;
  }

  const url = verifyUrl(auth);
  const resp = await fetch(url);
  const json = await resp.json();

  if (json.error_description) {
    ctx.throw(401, JSON.stringify({
      error: json.error_description,
    }));
    return;
  }

  if (json.hd !== 'radiodiodi.fi') {
    ctx.throw(401, JSON.stringify({
      error: 'Not a radiodiodi.fi email.',
    }));
    return;
  }

  await next();
}

admin.get('/messages', async ctx => {
  const messages = await models.messages.find({}, {
    limit: 300, sort: { timestamp: 1 },
  });

  ctx.body = JSON.stringify({
    messages,
  });
  ctx.type = 'application/json';
});

admin.delete('/messages/remove/:id', async ctx => {
  try {
    const id = ctx.params.id;
    models.messages.remove({ _id: id });
    websockets.eraseMessage(id);
    ctx.status = 200;
  } catch (err) {
    utils.error(err);
    ctx.throw(500, err);
  }
});

admin.delete('/users/ban/:id', async ctx => {
  try {
    const id = ctx.params.id;
    const message = await models.messages.findOne({ _id: id });

    const ip = message.ip;
    const existingBan = await models.bans.findOne({ ip, });
    if (existingBan) {
      ctx.throw(400, JSON.stringify({
        error: 'User already banned.'
      }));
      return;
    }

    models.bans.insert({
      ip: message.ip,
      name: message.name,
      timeOfBan: new Date(Date.now()),
      timeOfMessage: message.timestamp,
      text: message.text,
    });
    ctx.status = 200;
  } catch (err) {
    utils.error(err);
    ctx.throw(500, err);
  }
});

admin.delete('/users/unban/:ip', async ctx => {
  try {
    const ip = ctx.params.ip;
    const existingBan = await models.bans.findOne({ ip, });

    if (!existingBan) {
      ctx.throw(400, JSON.stringify({
        error: 'User not banned.'
      }));
      return;
    }

    models.bans.remove({ ip, });
    ctx.status = 200;
  } catch (err) {
    utils.error(err);
    ctx.throw(500, err);
  }
});

admin.get('/users/banned', async ctx => {
  const bans = await models.bans.find({}, {
    sort: { timestamp: 1 },
  });

  ctx.body = JSON.stringify({
    bans,
  });
  ctx.type = 'application/json';
});

router.use('/admin', checkAuthorization, admin.routes(), admin.allowedMethods());

router.get('/', (ctx, next) => {
  ctx.body = 'Radiodiodi JSON API';
});

router.get('/auth', checkAuthorization, async ctx => {
  ctx.body = '';
  ctx.status = 200;
  return;
});

router.get('/stats', async ctx => {
  const options = {
    'sort': [['time', 'desc']]
  };

  try {
    const results = listeners.find();

    const arr = [];
    const mountpoints = _.groupBy(results, (r) => r.name);

    Object.keys(mountpoints).forEach((m) => {
      const obj = {
        'x': mountpoints[m].map((r) => r.time),
        'y': mountpoints[m].map((r) => r.listeners),
        'type': 'scatter',
        'line': { 'shape': 'spline' },
        'name': m
      };
      arr.push(obj);
    });

    ctx.body = JSON.stringify({
      listeners: arr,
    });
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
    return;
  }
});

router.get('/inspirational-quote', allowAllCors, ctx => {
  ctx.body = JSON.stringify({
    quote: `Kukkakaalia - kakkakuulia: hauska munansaannos`,
  });
  ctx.type = 'application/json';
});

router.get('/programmes', allowAllCors, ctx => {
  const data = getCalendar();
  ctx.body = JSON.stringify(data);
  ctx.type = 'application/json';
});

router.get('/now_playing', allowAllCors, ctx => {
  const data = getCalendar();
  if (!data) {
    ctx.throw(500, 'Internal server error.');
    utils.error('Faield to get calendar data. Data: ');
    console.log(data);
    return;
  }

  const past = data.filter(d => {
    return Date.parse(d['start']) < new Date
  });

  const show = past[past.length - 1] || {};
  ctx.body = JSON.stringify(show);
  ctx.type = 'application/json';
});

const submitThrottle = RateLimit.middleware({
  interval: {
    sec: 1,
  },
  max: 1,
});

router.post('/api/register', submitThrottle, async ctx => {
  const data = JSON.parse(ctx.request.body);
  console.log(data);
  try {
    await email.sendEmail(data || {});
    ctx.body = data;
    await models.registrations.insert(data);
    utils.info(`Sent registration email (user: ${data.email})`);
  } catch (err) {
    ctx.throw(500, 'Failed to send email.');
  }
});

router.post('/api/update_current_song', async ctx => {
  let data;
  try {
    data = ctx.request.body;
    const { auth } = data;
    if (auth !== process.env.RADIODJ2_AUTH_SECRET) {
      ctx.throw(401, 'Unauthorized');
      return;
    }
    if (!data.title || !data.artist) {
      throw new Error('Invalid title or artist');
    }
  } catch (error) {
    console.log(error);
    ctx.throw(400, 'Bad request');
    return;
  }

  try {
    const { title, artist } = data;
    await models.now_playing.insert({
      timestamp: new Date(),
      title: String(title),
      artist: String(artist),
    });
  } catch (error) {
    console.log(error);
    ctx.throw(500, 'Internal server error.');
    return;
  }

  ctx.body = JSON.stringify({
    status: 'ok',
  });
});

router.get('/api/current_song', async ctx => {
  const results = await models.now_playing.find({}, {
    limit: 1,
    sort: {
      timestamp: 1,
    }
  });

  if (results.length === 0) {
    ctx.body = JSON.stringify({});
    return;
  }

  const current = results[0];

  ctx.body = JSON.stringify({
    title: current.title,
    artist: current.artist,
    timestamp: current.timestamp,
  });
});

module.exports = router;