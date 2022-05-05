<template>
   <el-container style="height: 100%">
     <el-aside width="auto">
       <layout-aside></layout-aside>
     </el-aside>
     <el-container>
       <el-header class="el-header">
         <layout-header/>
       </el-header>
       <el-main>
         <router-view></router-view>
       </el-main>
       <el-footer>
         <LayoutFooter/>
       </el-footer>
     </el-container>
   </el-container>
</template>

<script>
import LayoutHeader from "@/layout/basicLayout/component/LayoutHeader";
import LayoutAside from "@/layout/basicLayout/component/LayoutAside";
import LayoutFooter from "@/layout/basicLayout/component/LayoutFooter";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    LayoutHeader,
    // eslint-disable-next-line vue/no-unused-components
    LayoutAside,
    LayoutFooter
  },
}
</script>

<style scoped>

.el-header {
  background-color: #fff
}

</style>
