
const ENV = process.env.NODE_ENV
const prd = require('./prd') // 线上环境
const dev = require('./dev') // 开发环境

let conf = prd

ENV === 'development' && (conf = dev)

module.exports = conf


/*
  sql语句 对应关系
  select 
    indAll,findOne,findById,findOrCreate,findAndCountAll

  update
    update

  insert
    create

  delete
    destroy

*/

