<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="roleId" label="角色id"></el-table-column>
      <el-table-column prop="domainId" label="域Id"></el-table-column>
    </el-table>
    <button @click="verToken">解析token</button>
    <p>{{token_datas}}</p>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { apiPath } from '@/config'
  export default {
    data () {
      return {
        token_datas: ''
      }
    },
    computed: {
      ...mapState({
        tableData: state => state.user.tableData
      })
    },
    mounted(){
      this.handleGetUserData(this)
    },
    methods: {
      ...mapActions('user/', [
        'handleGetUserData'
      ]),
      async verToken () {
        const result = await this.$axios(`${apiPath}/login/verify`)
        this.token_datas = result.data
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>