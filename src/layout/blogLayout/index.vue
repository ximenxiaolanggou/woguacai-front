<template>
  <div class="blog-layout">
    <el-row class="main">
      <el-col :span="5" class="left">
        <blog-layout-left/>
      </el-col>
      <el-col :span="14" class="middle">
        <div class="middle-header">
        </div>
        <router-view/>
      </el-col>
      <el-col :span="5" class="right"><div class="grid-content bg-purple">3</div></el-col>
    </el-row>
  </div>
</template>

<script>
import BlogLayoutLeft from "@/layout/blogLayout/component/BlogLayoutLeft";
export default {
  name: "blog-layout",
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
  .middle-header {
    height: 100px;
    background-color: white;
    margin-bottom: 20px;
  }
</style>