
const router = require('koa-router')()

const { Menu } = require('../../model/index')

// 增

router.get('/create', async ctx => {
  let { name } = ctx.query
  let result = await Menu.create({
    name
  })
  ctx.body = result
})



// 删
// router.get('/delete', async ctx => {
//   // let result = await Role.destroy({
//   //   where: {}
//   // })
//   ctx.body = '删除'
// })

// 改
// router.get('/update', async ctx => {
//   // let result = await Role.update(
//   //   {name: 'lilei'}, 
//   //   {where: {id: 7}}
//   // )
//   ctx.body = '修改'
// })

// 查
router.get('/find', async ctx => {
  // 登陆域
  // let { role_name } = ctx.query
  let result = await Menu.findAll({
    // where: {
    //   role_name
    // }
  })

  ctx.body = result
})



module.exports = router.routes()