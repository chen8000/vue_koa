const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')();
const static = require('koa-static')
const render = require('koa-art-template')
const path = require('path')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')
const { tokenSecret } = require('./config')

// sequelize
require('./model/index')

// 获取环境参数  
const ENV = process.env.NODE_ENV

// 模版渲染
const index = require('./routes/index')
// api
const api = require('./api/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({ enableTypes:['json', 'form', 'text'] }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors({ credentials: true }))


//配置静态模版
render(app, {
  root : path.join(__dirname, 'views'), // 视图引擎的位置
  extname : '.html',  // 后缀名
  debug : ENV !== 'production'  // 是否开启调试模式
})
// 配置静态资源
app.use(static(__dirname + '/views'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// token验证
// 错误处理
app.use((ctx, next) => {
  
  return next().catch((err) => {
      if(err.status === 401){
        ctx.status = 401;
        ctx.body = {code: 0, msg:'身份验证失败，您没有访问权限！'};
      }else{
        throw err
      }
  })
})
app.use(koajwt({
  secret: tokenSecret
}).unless({
  path: [/\/login/], // login页面可以不用验证token
}))


// routes
router.use('/', index)
router.use('/api', api)

//启动路由
app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()); //  根据上下文环境配置 response 响应头

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
