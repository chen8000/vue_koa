import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import animate from 'animate.css'

// vue use
const barOptions = {
  color: '#6F8CF2',
  failedColor: '#6F8CF2',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 500
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
  autoFinish: false
}

export const VueUse = () => {
  Vue.use(VueProgressBar, barOptions)
  Vue.use(ElementUI)
  Vue.use(animate)
}