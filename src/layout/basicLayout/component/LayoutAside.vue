<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545364" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" style="height: 100%" >
    <div class="title">
      <div class="text" v-if="!isCollapse">窝瓜后台</div>
      <div class="image" v-show="isCollapse"><img style=" height: 50px;" :src="logo" alt=""></div>
    </div>
    <div v-for="(route,index) in routes" :key="index  + ''">
      <!-- 单菜单 -->
      <el-menu-item v-if="!!route.children && route.children.length == 1 && (!route.children[0].meta || ! route.children[0].meta.hide)" :index="index + ''" @click="routeJumpHandle(route.children[0])">
        <i v-if="route.children[0].meta && route.children[0].meta.icon" :class="route.children[0].meta.icon"></i>
        <span slot="title">{{ route.children[0].meta && route.children[0].meta.title }}</span>
      </el-menu-item>
      <!-- 多菜单 -->
      <el-submenu v-if="!!route.children && route.children.length > 1" :index="index + ''">
        <template slot="title">
          <i v-if="route.meta && route.meta.icon" :class="route.meta.icon"></i>
          <span v-if="!isCollapse" slot="title">{{ route.meta && route.meta.title }}</span>
        </template>
        <div v-for="(childRoute,childIndex) in route.children" :key="childIndex" >
          <el-menu-item @click="routeJumpHandle(childRoute)" v-if="childRoute.meta && !childRoute.meta.hide" :index="childRoute.path" >{{ childRoute.meta && childRoute.meta.title }}</el-menu-item>
        </div>
      </el-submenu>
    </div>
  </el-menu>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Aside",
  data() {
    return {
      logo: require('@/assets/logo.png')
    };
  },
  methods: {
    // 路由跳转事件
    routeJumpHandle(route) {
      this.$router.push({name: route.name})
    }
  },
  computed: {
    ...mapGetters(['isCollapse','routes'])
  },
  mounted() {
  },
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.title {
  margin: 10px;
}
.title .text {
  height: 50px;
  font-size: 25px;
  font-weight: bold;
  line-height: 50px;
  text-align: center;
  color: white;
}

.title .image {
  height: 50px;
  font-size: 25px;
  font-weight: bold;
  line-height: 50px;
  text-align: center;
}
</style>
