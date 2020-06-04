
const router = require('koa-router')()
const jwt = require('jsonwebtoken')

const { User } = require('../../model/index')
const { tokenSeccret } = require('../../config')

// 查
router.get('/', async ctx => {
  let { username, password } = ctx.query
  const result = await User.findOne({
    where: {
      username,
      password
    }
  })

  if (!result) {
    ctx.body = {msg: '登录失败', code: 0, result}
    return
  }

  // 成功后，生产token 返回给前端
  const token = jwt.sign({
    name: result.username,
    pwd: result.password,
    _id: result.id
  }, tokenSeccret) 


  ctx.body = {msg: '登录成功', code: 1, result, token}
})

// 解析token
router.get('/verify', async ctx => {
  jwt.verify(ctx.header.authorization.split(' ')[1], tokenSeccret, (err,res)=>{
    if(err){
      ctx.body = err
      return
    }

    ctx.body = res
  })
})


module.exports = router.routes()