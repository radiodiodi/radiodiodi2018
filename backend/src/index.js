require('dotenv').config()

const _ = require('lodash');

const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

const utils = require('./utils');
const router = require('./router');
const models = require('./models');
const websockets = require('./websockets');

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

websockets.start();

utils.info(`Listening for HTTP on ${process.env.HOST} on port ${process.env.PORT}.`);

app
  .use(cors({
    origin: FRONTEND_URL,
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT, process.env.HOST);