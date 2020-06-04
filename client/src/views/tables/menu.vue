<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="标题"></el-table-column>
      <!-- <el-table-column prop="name" label="域名称"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        tableData: state => state.menu.tableData
      })
    },
    mounted(){
      this.handleGetMenuData(this)
    },
    methods: {
      ...mapActions('menu/', [
        'handleGetMenuData'
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>