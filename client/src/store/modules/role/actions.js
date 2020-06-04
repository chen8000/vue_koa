
import { apiPath } from '@/config'
export default {

  // 获取域数据
  handleGetRoleData: async ({commit}, _this) => {
    let result = await _this.$axios.get(apiPath + '/role/find')

    // 提交数据
    commit('handleGetRoleData', result.data)
  }
}