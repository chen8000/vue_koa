<template>
  <div class="login">
    <img class="bg" :src="require('@/assets/img/loginbg.png')" alt="">

    <!-- 域 -->
    <transition 
      enter-active-class="animated bounceInDown"
    >
      <div v-if="!enameLogin" class="area-container opacity-bg">
        <el-form label-position="top">
          <el-form-item>
            <el-input placeholder="请输入域名" @keyup.native.enter="loginArea" v-model="formLabelAlign.ename"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </transition>
    
    <!-- 账号密码 -->
    <transition 
      enter-active-class="animated bounceIn"
      leave-active-class="animated fadeOut"
    >
      <div v-if="enameLogin" class="login-container shadow">
        <el-form label-position="top" :model="formLabelAlign">
          <el-form-item v-if="enameLogin" label="账号">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item v-if="enameLogin" label="密码">
            <el-input type="password" v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-button @click="handleLogin" style="width: 100%; margin-top: 20px;" type="primary">登录</el-button>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { apiPath } from '@/config'
  export default {
    data() {
      return {
        formLabelAlign: {
          ename: '', // 域
          username: '', // 用户名
          password: '',  // 密码
        }
      };
    },
    computed: {
      ...mapState({
        enameLogin: state => state.login.enameLogin
      })
    },
    mounted () {
      // 自动登录域
      this.autoLoginArea()
    },
    methods: {
      ...mapActions('login/', ['loginDomain']),
      // 自动登录域
      autoLoginArea () {
        this.formLabelAlign.ename = localStorage.getItem("areaName")
        this.formLabelAlign.ename && this.loginArea()
      },
      // 登录域
      loginArea () {
        this.loginDomain(this)
      },

      // 用户登录
      async handleLogin () {

        const login = await this.$axios(`${apiPath}/login`, {params: {
          username: this.formLabelAlign.username,
          password: this.formLabelAlign.password
        }})

        let data = login.data

        if(!data.code) {
          console.log('失败！')
          return
        }

        // 成功
        // 成功后存储token
        localStorage.setItem('token', data.token);

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/style';
  .login {
    @include wh(100%, 100%);
    background: #1c1f22;
    overflow: hidden;
    position: relative;
    .area-container {
      position: absolute;
      left : 0;
      right: 0;
      margin: 200px auto;
      width: 50%;
      .el-input__inner {
        background: none;
      }
    }
    .bg {
      // @include bgObject;
      // filter: blur(3px);
      // // opacity: .8;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    .login-container {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      background: rgba(255, 255, 255, .97);
      @include wh(500px, 350px);
      @include radius(10px);
      padding: 20px;
      box-sizing: border-box;
    }
  }
</style>