require('dotenv').config()

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

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

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8080);