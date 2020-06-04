<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="role_name" label="角色名称"></el-table-column>
      <!-- <el-table-column prop="name" label="域名称"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        tableData: state => state.role.tableData
      })
    },
    mounted(){
      this.handleGetRoleData(this)
    },
    methods: {
      ...mapActions('role/', [
        'handleGetRoleData'
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>