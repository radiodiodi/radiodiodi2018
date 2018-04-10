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

router.get('/inspirational-quote', async ctx => {
  ctx.body = JSON.stringify({
    quote: `Kukkakaalia - kakkakuulia: hauska munansaannos`,
  });
  ctx.type = 'application/json';
  ctx.set('Access-Control-Allow-Origin', '*');
});

router.get('/programmes', async ctx => {
  let data = await getCalendar()
  ctx.body = JSON.stringify(data);
  ctx.type = 'application/json';
  ctx.set('Access-Control-Allow-Origin', '*');
});

router.get('/now_playing', async ctx => {
  let data = await getCalendar()
  let past = data.filter(d => {
    return Date.parse(d['start']) < new Date
  })
  let show = past[past.length - 1] || {}
  ctx.body = JSON.stringify(show);
  ctx.type = 'application/json';
  ctx.set('Access-Control-Allow-Origin', '*');
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

module.exports = router;