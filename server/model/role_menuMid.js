const Sequelize = require('sequelize')
const DB = require('../db/connect')

let role_menuMid = DB.define('role_menuMid', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true, // 自动递增
    primaryKey: true, // 主要的key
    unique: true // 独一无二的
  },
  roleId: Sequelize.INTEGER, // 域名称
  menuId: Sequelize.INTEGER, // 域名称
})

// 允许新增字段
// role_menuMid.sync({ alter: true })

module.exports = role_menuMid