const Sequelize = require('sequelize')
const DB = require('../db/connect')

let user = DB.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true, // 自动递增
    primaryKey: true, // 主要的key
    unique: true // 独一无二的
  },
  // Username  password 域id  角色id  
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  roleId: Sequelize.INTEGER,
  domainId: Sequelize.INTEGER
})

// 允许新增字段
user.sync({ alter: true })

module.exports = user