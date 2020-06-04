
const router = require('koa-router')()

const { Domain } = require('../../model/index')

// 增
router.get('/create', async ctx => {
  let { name, area } = ctx.query

  // 验证不能为空
  if (!name) {
    ctx.body = 'name 不能为空！'
  }
  if(!area) {
    ctx.body = 'area 不能为空！'
  }

  // 创建
  let result = await Domain.create({
    name,
    area,
  })
  
  // 返回创建成功的结果
  ctx.body = result
})

// 删
router.get('/delete', async ctx => {
  let result = await Domain.destroy({
    where: {}
  })
})

// 改
router.get('/update', async ctx => {
  let result = await Domain.update(
    {name: 'lilei'}, 
    {where: {id: 7}}
  )
})

// 查
router.post('/login', async ctx => {
  // console.log('进来了')
  // 登陆域
  let { area } = ctx.request.body
  let result = await Domain.findAll({
    where: {
      area
    }
  })
  ctx.body = result
})



module.exports = router.routes()