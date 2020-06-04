
import { apiPath } from '@/config'
export default {

  // 获取域数据
  handleGetMenuMidData: async ({commit}, _this) => {
    let result = await _this.$axios.get(apiPath + '/role_menuMid/find')

    // 提交数据
    commit('handleGetMenuMidData', result.data)
  }
}