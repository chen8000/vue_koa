
const router = require('koa-router')()

// const { User, Role } = require('../../model/index')

router.get('/set', async ctx => {
  ctx.session.name="123"
  ctx.body = ctx.session
})

router.get('/get', async ctx => {
  // console.log(ctx.session.opts)
  ctx.body = ctx.session.name
})


module.exports = router.routes()