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
    width: 100%;
    height: 100%;
    background-image: url("../../assets/blog-bg.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;

  }
  .main {
    height: 100%;
    height: 100%;
    overflow-y: scroll;
    background-color: rgba(0,0,0,0.6);
    background-size: cover;
    background-attachment: fixed;
  }
  .left {
  }
  .middle {
  }
  .right {
    height: 100%;
  }
</style>
