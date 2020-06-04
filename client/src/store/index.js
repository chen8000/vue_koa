import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import domain from './modules/domain'
import user from './modules/user'
import role from './modules/role'
import menu from './modules/menu'
import role_menuMid from './modules/role_menuMid'

// login
import login from './modules/login'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    domain,
    user,
    role,
    menu,
    role_menuMid,
    login
  }
})