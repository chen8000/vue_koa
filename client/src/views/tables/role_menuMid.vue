<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="roleId" label="角色Id"></el-table-column>
      <el-table-column prop="menuId" label="菜单Id"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        tableData: state => state.role_menuMid.tableData
      })
    },
    mounted(){
      this.handleGetMenuMidData(this)
    },
    methods: {
      ...mapActions('role_menuMid/', [
        'handleGetMenuMidData'
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>