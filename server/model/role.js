const Sequelize = require('sequelize')
const DB = require('../db/connect')

let role = DB.define('role', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true, // 自动递增
    primaryKey: true, // 主要的key
    unique: true // 独一无二的
  },
  role_name: Sequelize.STRING, // 角色名称
})

// 允许新增字段
role.sync({ alter: true })

module.exports = role