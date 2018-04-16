const fetch = require('node-fetch');
const Router = require('koa-router');
const models = require('./models');
const utils = require('./utils');
const websockets = require('./websockets');
const { RateLimit } = require('koa2-ratelimit');

const router = new Router();
const email = require('./email');
const getCalendar = require('./calendar');

const admin = new Router();

const allowAllCors = async (ctx, next) => {
  await next();
  ctx.set('Access-Control-Allow-Origin', '*');
};

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
};

admin.get('/messages', async ctx => {
  try {
    const messages = (await models.messages.find({}, {
      limit: 300, sort: { timestamp: -1 },
    })).reverse();

    ctx.body = JSON.stringify({
      messages,
    });
    ctx.type = 'application/json';
  } catch (error) {
    console.log(error);
    ctx.throw(500, 'Internal Server Error');
  }
});

admin.delete('/messages/remove/:id', async ctx => {
  try {
    const { id } = ctx.params;
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
    const { id } = ctx.params;
    const message = await models.messages.findOne({ _id: id });

    const { ip } = message;
    const existingBan = await models.bans.findOne({ ip });
    if (existingBan) {
      ctx.throw(400, JSON.stringify({
        error: 'User already banned.',
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
    const { ip } = ctx.params;
    const existingBan = await models.bans.findOne({ ip });

    if (!existingBan) {
      ctx.throw(400, JSON.stringify({
        error: 'User not banned.',
      }));
      return;
    }

    models.bans.remove({ ip });
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

admin.get('/users/reserved', async ctx => {
  const reserved = await models.reserved.find({});

  ctx.body = JSON.stringify({
    reserved,
  });
  ctx.type = 'application/json';
});

router.use('/admin', checkAuthorization, admin.routes(), admin.allowedMethods());

router.get('/', ctx => {
  ctx.body = 'Radiodiodi JSON API';
});

router.get('/auth', checkAuthorization, async ctx => {
  ctx.body = '';
  ctx.status = 200;
});

router.get('/stats', async ctx => {
  /*
  const options = {
    sort: [['time', 'desc']],
  };

  try {
    const results = listeners.find();

    const arr = [];
    const mountpoints = _.groupBy(results, (r) => r.name);

    Object.keys(mountpoints).forEach((m) => {
      const obj = {
        x: mountpoints[m].map((r) => r.time),
        y: mountpoints[m].map((r) => r.listeners),
        type: 'scatter',
        line: { shape: 'spline' },
        name: m,
      };
      arr.push(obj);
    });

    ctx.body = JSON.stringify({
      listeners: arr,
    });
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
  */
  ctx.body = 'Not implemented';
});

router.get('/inspirational-quote', allowAllCors, ctx => {
  ctx.body = JSON.stringify({
    quote: 'Kukkakaalia - kakkakuulia: hauska munansaannos',
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

  const past = data.filter(d => Date.parse(d.start) < new Date());

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
  let auth, title, artist, duration;
  try {
    const data = ctx.request.body;
    const key = Object.keys(data)[0];
    const splitted = key.split('||penis||');
    [auth, title, artist, duration] = splitted;

    if (auth !== process.env.RADIODJ2_AUTH_SECRET) {
      utils.error(`Bad current song request: ${String(data)}`);
      ctx.throw(401, 'Unauthorized');
      return;
    }
    if (!title || !artist) {
      throw new Error('Invalid title or artist');
    }
  } catch (error) {
    console.log(error);
    ctx.throw(400, 'Bad request');
    return;
  }

  if (artist.toLowerCase().startsWith('radiodiodi')) {
    ctx.body = JSON.stringify({
      status: 'skipped',
    });
    return;
  }

  try {
    await models.nowPlaying.insert({
      timestamp: new Date(),
      title: String(title),
      artist: String(artist),
      duration,
    });
    utils.info(`Updated current song: ${artist} - ${title}`);
  } catch (error) {
    console.log(error);
    ctx.throw(500, 'Internal server error.');
    return;
  }

  ctx.body = JSON.stringify({
    status: 'ok',
  });
  ctx.type = 'application/json';
});

router.get('/api/current_song', async ctx => {
  const results = await models.nowPlaying.find({}, {
    limit: 1,
    sort: {
      timestamp: -1,
    },
  });

  if (results.length === 0) {
    ctx.body = JSON.stringify({});
    return;
  }

  const current = results[0];

  if (new Date() - new Date(Date.parse(current.timestamp)) <= current.duration * 1000) {
    ctx.body = JSON.stringify({
      title: current.title,
      artist: current.artist,
      timestamp: current.timestamp,
      duration: current.duration,
    });
  } else {
    ctx.body = JSON.stringify({});
  }

  ctx.type = 'application/json';
});

module.exports = router;
