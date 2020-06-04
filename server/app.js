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
const { tokenSeccret } = require('./config')
// const session = require('koa-generic-session')
// const PgStore = require('koa-pg-session')
// const dbConfig = require('./db/config')

// 获取数据库配置
// const {username, password, database, host, port} = dbConfig
// const { schema } = dbConfig.define

// pg实例
// const pgStore = new PgStore({ user: username, password, database, host, port },{ schema })

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
// app.keys = ['keys', 'keykeys']
// app.use(session({
//   // secret:'zhanghui666', // 加密session的随机字符串，随便写
//   // name:'userId', // 设置返回客户端的key 默认是connect.sid   
//   // resave:false, // 默认为true 表示不管session有没有变化都保存，false表示有变化才保存
//   // saveUninitialized:true, // 强制把未初始化的session存储 默认设置为true 建议设置成true

//   //cookie的所有参数都可以设置到这里 
//   cookie:{
//       // secure:false,
//       maxAge:50000000  //设置过期时间
//   }, //secure:true 表示只有在https协议下才可以访问这个cookie

//     rolling:true, // 每次用户刷新也就后重新设置cookie时间，只要用户在过期时间内刷新的页面，
//                 // cookie就不会过期，过期时间从用户最后一次刷新开始计算
//   store: pgStore,
//   // allowEmpty: true
// }, app))

// 创建session表  一次即可
// pgStore.setup()


// app.use(function *() {
//   this.body = this.session.counter++;
// });



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
  secret: tokenSeccret
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
