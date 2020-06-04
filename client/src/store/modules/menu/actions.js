
import { apiPath } from '@/config'
export default {

  // 获取域数据
  handleGetMenuData: async ({commit}, _this) => {
    let result = await _this.$axios.get(apiPath + '/menu/find')

    // 提交数据
    commit('handleGetMenuData', result.data)
  }
}