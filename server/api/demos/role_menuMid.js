
const router = require('koa-router')()

const { Role_menuMid, Menu } = require('../../model/index')

// 增

router.get('/create', async ctx => {
  let { roleId, menuId } = ctx.query
  let result = await Role_menuMid.create({
    roleId, menuId
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

// // 查
router.get('/find', async ctx => {

  // 登陆域
  // let { roleId } = ctx.query
  let result = await Role_menuMid.findAll({
    // where: {
    //   roleId,
    // },
    // include:[Menu]
  })

  ctx.body = result
})



module.exports = router.routes()