
import { apiPath } from '@/config'
export default {

  // 获取域数据
  handleGetUserData: async ({commit}, _this) => {
    let result = await _this.$axios.get(apiPath + '/user/find')

    // 提交数据
    commit('handleGetUserData', result.data)
  }
}