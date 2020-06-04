
const DB = require('../db/connect')

// model
const Domain = require('./domain')
const Role = require('./role')
const User = require('./user')
const Menu = require('./menu')
const Role_menuMid = require('./role_menuMid')


// hasOne - 添加外键到目标模型，并以单数关系混入到源模型
// belongsTo - 为当前模型添加外键，并以单数关系混入到源模型


// hasMany - 添加外键到目标模型，并以复数关系混入到源模型
// belongsToMany - 为连接的表创建N:M关系并以复数关系混入到源模型。会通过sourceId和targetId创建交叉表。

// 用户  -->  角色   
User.belongsTo(Role)  // 为user添加外键 roleId

// 菜单中间表【权限】 --->  菜单    === 【权限】
Role_menuMid.belongsTo(Menu)


/*
===================  基本逻辑
1. 登陆域，拿到域 id   domaimId
2. 拿着域 domainId   username  password   去用户表里查用户
3. 拿到用户对应的角色id  roleId  
4. 拿着roleId  查询中间表， 得到中间表对应的菜单

需要记： 1. 域id   2. roleId  
总查表 域 1 + 用户登陆 1 + 中间表 1  = 3次
*/ 


// 连接数据库
DB.authenticate().then(() => {
  return DB.sync()
})
.then(() => {
  console.log('连接数据库成功!')
})
.catch(e => {
  console.log(e)
  throw new Error('连接数据库失败!')
})

module.exports = {
  Domain,
  Role,
  User,
  Menu,
  Role_menuMid
}