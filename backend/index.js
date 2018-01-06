require('dotenv').config()

const Koa = require('koa');
var Router = require('koa-router');

const app = new Koa();
var router = new Router();

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
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.get('/', (ctx, next) => {
  ctx.body = JSON.stringify({
    kakka: 'pissa',
  });

  ctx.type = 'application/json';
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8080);