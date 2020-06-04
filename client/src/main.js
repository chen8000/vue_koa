import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import 'default-passive-events'
import { VuePrototype } from './vue.prototype'
import { VueUse } from './vue.use'

// vue use
VueUse()
// 绑定到Vue原型上
VuePrototype()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
