import Vue from 'vue'
import crypto from 'crypto'
import axios from 'axios'
import echarts from 'echarts'
// 允许携带cookie
axios.defaults.withCredentials = true


// 路由拦截器，每次都设置token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.common['Authorization'] = 'Bearer ' + token;
  return config;
})

export const VuePrototype = () => {
  // axios
  Vue.prototype.$axios = axios
  
  // echarts
  Vue.prototype.$echarts = echarts

  // md5
  Vue.prototype.$mkMd5 =  (str, desc) => {
    const md5 = crypto.createHash('md5')
    return md5.update(str).digest(desc)
  }
}