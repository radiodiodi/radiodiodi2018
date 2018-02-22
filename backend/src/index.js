require('dotenv').config()

const _ = require('lodash');

const Koa = require('koa');
const Router = require('koa-router');
const monk = require('monk');

const WebSocket = require('ws');

const app = new Koa();
const router = new Router();

const utils = require('./utils');

const mongo_stats = `${process.env.MONGODB_HOST}/${process.env.MONGODB_STATS_DB}`;
utils.info(`Mongo stats DB: ${mongo_stats}`);
const statsDB = monk(mongo_stats);
const listeners = statsDB.get('listeners');

const mongo_shoutbox = `${process.env.MONGODB_HOST}/${process.env.MONGODB_SHOUTBOX_DB}`;
utils.info(`Mongo shoutbox DB: ${mongo_shoutbox}`);
const shoutboxDB = monk(mongo_shoutbox);
const messages = shoutboxDB.get('messages');

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  utils.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.get('/season', ctx => {
  ctx.body = JSON.stringify({
    start: process.env.START_DATE,
    end: process.env.END_DATE,
  });
  ctx.type = 'application/json';
})

router.get('/', (ctx, next) => {
  ctx.body = 'Radiodiodi JSON API';
});

router.get('/stats', async ctx => {
  const options = {
    'sort': [['time','desc']] 
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
          'line': {'shape': 'spline'},
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
  ctx.body = `Kukkakaalia - kakkakuulia: hauska munansaannos`;
});

utils.info(`Listening for HTTP on ${process.env.HOST} on port ${process.env.PORT}.`);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT, process.env.HOST);

utils.info(`Listening for Websockets on ${process.env.HOST} on port ${process.env.WS_PORT}.`);

const wss = new WebSocket.Server({ port: process.env.WS_PORT, host });
const rateLimit = require('ws-rate-limit')('3s', 1);
wss.on('connection', async (ws, req) => {
  rateLimit(ws);

  ws.on('message', data => {
    const { name, text } = JSON.parse(data);
    utils.info(`Websocket: Received: "${text}" from "${name}"`);

    const message = {
      timestamp: new Date(Date.now()),
      name,
      text,
    }
    messages.insert(message);

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          message,
        }));
      }
    });
  });

  const initial = await messages.find({}, {
    limit: 100, sort: { timestamp: 1 },
  });

  ws.send(JSON.stringify({
    initial,
  }));

  ws.on('error', error => utils.error(`Websocket error. ${error}`));
  ws.on('limited', data => utils.warning(`User from ip "${req.connection.remoteAddress}" has been throttled.`));
});