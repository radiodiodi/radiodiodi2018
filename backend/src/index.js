require('dotenv').config()

const _ = require('lodash');

const Koa = require('koa');
const Router = require('koa-router');
const monk = require('monk');

const app = new Koa();
const router = new Router();

const utils = require('./utils');

const mongo_stats = `${process.env.MONGODB_HOST}/${process.env.MONGODB_STATS_DB}`;
utils.info(`Mongo stats DB: ${mongo_stats}`);
const statsDB = monk(mongo_stats);
const listeners = statsDB.get('listeners');

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

utils.info(`Listening on ${process.env.HOST} on port ${process.env.PORT}.`);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT, process.env.HOST);