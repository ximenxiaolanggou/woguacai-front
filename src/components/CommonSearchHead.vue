<template>
  <el-row :gutter="20" type="flex" styp align="middle" style="height: 80px" >
    <el-col :span="6">
      <el-input :clearable="true" style="width: 250px;" placeholder="请输入关键字" v-model="searchKey" @change="searchKeyChangeHandle"></el-input>
      <el-button type="primary" style="margin-left: 50px" @click="searchHandle">查询</el-button>
    </el-col>
    <el-col :span="1" :offset="16"><el-button type="primary" @click="addHandle">添加</el-button></el-col>
  </el-row>
</template>

<script>
export default {
  name: "CommonSearchHead",
  props: {
    searchKey: {
      type: String,
      default: undefined
    },
  },
  methods: {
    searchKeyChangeHandle() {
      this.$emit('searchKeyChangeHandle',this.searchKey)
    },
    searchHandle() {
      this.$emit('searchHandle')
    },
    addHandle() {
      this.$emit('addHandle')
    }
  }
}
</script>

<style scoped>

</style>
