
const router = require('koa-router')()

const { User, Role } = require('../../model/index')

// 增

router.get('/create', async ctx => {
  let { username, password, roleId, domainId } = ctx.query
  let result = await User.create({
    username, password, roleId, domainId
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
  // let { username } = ctx.query
  let result = await User.findAll({
    // where: {
    //   username
    // },
    include: [Role]
  })
  ctx.body = result
})



module.exports = router.routes()