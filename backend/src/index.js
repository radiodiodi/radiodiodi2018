require('dotenv').config()

const _ = require('lodash');

const Koa = require('koa');
const cors = require('@koa/cors');

const WebSocket = require('ws');

const app = new Koa();

const utils = require('./utils');
const router = require('./router');
const models = require('./models');

const FRONTEND_URL = process.env.FRONTEND_URL;

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
  if (ctx.status < 400) {
    utils.info(`${ctx.status} ${ctx.method} ${ctx.url} - ${ms}ms`);
  } else {
    utils.error(`${ctx.status} ${ctx.method} ${ctx.url} - ${ms}ms`);
  }
});

utils.info(`Listening for HTTP on ${process.env.HOST} on port ${process.env.PORT}.`);

app
  .use(cors({
    origin: FRONTEND_URL,
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT, process.env.HOST);

utils.info(`Listening for Websockets on ${process.env.HOST} on port ${process.env.WS_PORT}.`);

const wss = new WebSocket.Server({ port: process.env.WS_PORT });
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
      ip: req.connection.remoteAddress,
    };

    models.messages.insert(message);

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          message: {
            name: message.name,
            text: message.text,
            timestamp: message.timestamp,
          },
        }));
      }
    });
  });

  const initial = await models.messages.find({}, {
    limit: 100, sort: { timestamp: 1 },
  });

  ws.send(JSON.stringify({
    initial: initial.map(message => ({
      name: message.name,
      text: message.text,
      timestamp: message.timestamp,
    })),
  }));

  ws.on('error', error => utils.error(`Websocket error. ${error}`));
  ws.on('limited', data => utils.warning(`User from ip "${req.connection.remoteAddress}" has been throttled.`));
});