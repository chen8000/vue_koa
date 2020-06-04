const Sequelize = require('sequelize')
const DB = require('../db/connect')

let area = DB.define('domain', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true, // 自动递增
    primaryKey: true, // 主要的key
    unique: true // 独一无二的
  },
  name: Sequelize.STRING, // 域名称
  area: Sequelize.STRING, // 域
})

// 允许新增字段
area.sync({ alter: true })

module.exports = area