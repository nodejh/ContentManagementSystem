const zlib = require('zlib');
const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session');
const compress = require('koa-compress')

const config = require('./config/config');
const routers = require('./routers/routers');

const sessionConfig = {
  key: 'K:SESSION', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000 * 30, /** (number) maxAge in ms (default is 1 * 30 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
};


const app = new Koa();

// session
app.keys = ['secret'];
app.use(session(sessionConfig, app));

app.use(compress({
  filter: (contentType) => {
    console.log('content: ', contentType);
    // return /text/i.test(content_type);
    return true;
  },
  threshold: 1,
  flush: zlib.Z_SYNC_FLUSH,
}));

// 配置控制台日志中间件
app.use(logger());

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, './static')));


// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs',
}));


// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());
app.use(async (ctx) => {
  const title = '首页';
  await ctx.render('index', {
    title,
  });
});


// 监听启动端口
app.listen(config.port);
console.log(`the server is start at port ${config.port}`);
