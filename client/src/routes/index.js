import Vue from 'vue'
import Router from 'vue-router'
import routes from './config' // 路由配置文件
Vue.use(Router)

const router = new Router({
  routes
})

export default router