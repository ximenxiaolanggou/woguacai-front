<template>
  <div class="blog-layout">
    <el-row class="main">
      <el-col :span="5" class="left">
        <blog-layout-left/>
      </el-col>
      <el-col :span="14" class="middle">
        <router-view/>
      </el-col>
      <el-col :span="5" class="right"></el-col>
    </el-row>
  </div>
</template>

<script>
import BlogLayoutLeft from "@/layout/blogLayout/component/BlogLayoutLeft";
export default {
  name: "blog-layout",
  data() {
    return {
      searchKey: ''
    }
  },
  methods: {
    search() {
      this.$emit("searchHandle",this.searchKey)
    }
  },
  components:{
    BlogLayoutLeft
  }
}
</script>

<style scoped>
  .blog-layout {
    height: 100%;
    width: 100%;
    background: url("../../assets/blog-bg.png") no-repeat;
    background-size: cover;
  }
  .main {
    height: 100%;
    background: rgba(0,0,0,0.6);
  }
  .left {
  }
  .middle {
  }
  .right {
    background-color: darkseagreen;
  }
</style>
