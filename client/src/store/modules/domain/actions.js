
import { apiPath } from '@/config'
export default {

  // 获取域数据
  handleGetAreaData: async ({commit}, _this) => {
    let result = await _this.$axios.get(apiPath + '/domain/find')

    // 提交数据
    commit('handleGetAreaData', result.data)
  }
}