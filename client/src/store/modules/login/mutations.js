export default {
  loginDomain: (state, res) => {
    // 判断域是否登录成功
    if (res.length < 1) {
      return
    }
    // =======  登录域成功 =======
    let { area, id } = res[0]
    // 1. 记录域name
    localStorage.setItem('areaName', area)
    // 2. 记录域id  用户登录要用
    state.areaId = id
    // 修改页面状态
    state.enameLogin = true
  }
}