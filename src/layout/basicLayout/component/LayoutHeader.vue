<template>
  <el-row type="flex" :gutter="24" style="height: 100%" align="middle" justify="space-around">
    <el-col :span="1">
      <div class="grid-content bg-purple">
        <el-button icon="el-icon-menu" size="medium" @click="openOrCloseHandle"></el-button>
      </div>
    </el-col>
    <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="20"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="2">
      <div class="grid-content bg-purple block" style="display: flex;align-items: center;justify-content: space-around">
        <div class="avatar">
          <el-avatar shape="square" :size="50" :src="circleUrl"/>
          <div class="opr" v-show="oprVis"></div>
        </div>
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">{{ user.username }}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown" @click="logout">
              <el-dropdown-item>GitHub</el-dropdown-item>
              <el-dropdown-item>我的信息</el-dropdown-item>
              <span @click="logout"><el-dropdown-item divided click="logout">登出</el-dropdown-item></span>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {mapGetters} from "vuex";
import {logout} from "@/api/auth";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      circleUrl: require('@/assets/avatar.gif'),
      oprVis: false
    }
  },
  methods: {
    // 登出
    logout() {
      logout()
      .then(() => {
        this.$store.dispatch('user/resetToken')
        this.$router.push({path: '/login'})
      })
    },
    openOrCloseHandle() {
      this.$store.dispatch('common/updateCollapse',!this.isCollapse)
    },
    avatarMouseOverHandle() {
      this.oprVis = true
    },
    avatarMouseOutHandle() {
      this.oprVis = false
    }
  },
  computed: {
    ...mapGetters(['isCollapse','user'])
  }
}
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple {
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.avatar:hover {

}

.avatar {
  position: relative;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.opr {
  width: 100px;
  height: 100px;
  background-color: pink;
  position: absolute;
  left: -20px;
  border-radius: 10px;
}
</style>
