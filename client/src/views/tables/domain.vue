<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="area" label="域"></el-table-column>
      <el-table-column prop="name" label="域名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        tableData: state => state.domain.tableData
      })
    },
    mounted(){
      this.handleGetAreaData(this)
    },
    methods: {
      ...mapActions('domain/', [
        'handleGetAreaData'
      ])
    }
  }
</script>

<style lang="scss" scoped>

</style>