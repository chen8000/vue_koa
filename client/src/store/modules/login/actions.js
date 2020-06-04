
import { apiPath } from '@/config'
export default {
  loginDomain: async ({commit}, _this) => {
    // 发请求
    // 返回结果
    let result = await _this.$axios.post(`${apiPath}/domain/login`, { area: _this.formLabelAlign.ename })
    
    commit('loginDomain', result.data)
  }
}