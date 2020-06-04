<template>
  <div id="app">
    <!-- <router-link to="/domain">
      <el-link type="primary">域表</el-link>
    </router-link>

    <router-link to="/user">
      <el-link type="success">用户表</el-link>
    </router-link>

    <router-link to="/role">
      <el-link type="warning">角色表</el-link>
    </router-link>

    <router-link to="/menu">
      <el-link type="danger">菜单列表</el-link>
    </router-link>

    <router-link to="/role_menuMid">
      <el-link type="info">中间表</el-link>
    </router-link> -->

    <router-view></router-view>
    
    <!-- <el-link type="success">成功链接</el-link>
    <el-link type="warning">警告链接</el-link>
    <el-link type="danger">危险链接</el-link>
    <el-link type="info">信息链接</el-link> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 主题1: theme-dark  
      // 主题2: theme-light
      theme: 'theme-dark'
    }
  },
  watch: {
    theme() {
      this.bindThemeClass()
    }
  },
  mounted () {
    this.$Progress.finish()
    this.bindThemeClass()
  },
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  },
  methods: {
    // 主题方法，把class绑定到body上
    bindThemeClass() {
      document.body.className = this.theme
    }
  }
}
</script>

<style lang="scss">
@import './assets/style';
html, body {
  @include wh(100%, 100%);
  // overflow: hidden;
}
html, body,
p, ul, h3, h1 {
  @include clearMarginPadding;
}
#app {
  // padding: 20px;
  box-sizing: border-box;
  @include wh(100%, 100%);
  .__cov-progress {
    @include theme($themes) {
      background: themed('themeColor')
    }
  }
}
</style>