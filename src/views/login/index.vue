<template>
  <div class="dk">
    <div class="main">
      <h3 style="text-align: center;margin-top: 50px;font-size: 26px">白衣后台</h3>
      <el-form style="margin-top: 50px" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="display: flex; justify-content: space-between">
            <div style="flex: 4">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </div>
            <div style="flex: 3">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  第三方登录<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="wxLogin" icon="iconfont icon-weixin">微信</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>

        </el-form-item>
      </el-form>
    </div>

    <!-- 绑定账号弹出层 -->
    <bind-tpl
      :visible="bindTplVisible"
      @cancelHandle="bindTplCancelHandle"
      :open-id="openId"
    />
  </div>
</template>

<script>
import BindTpl from "@/views/login/component/BindTpl";
import {login} from "@/api/auth";
import store from "@/store";
import Cookies from "js-cookie";
import {TOKEN_NAME, TOKEN_VALUE} from "@/utils/const";

export default {
  name: "Login",
  components: {BindTpl},
  data() {
    let validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      } else{
        callback()
      }
    };
    let validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用密码'));
      } else {
        callback();
      }
    };

    return {
      tplWx: {
        name: 'WX',
        img: require('@/assets/wx.svg')
      },
      bindTplVisible: false,
      bind: this.$route.query.bind,
      tokenName: this.$route.query.tokenName,
      tokenValue: this.$route.query.tokenValue,
      openId: this.$route.query.openId,
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePwd, trigger: 'blur' }
        ]
      }
    }
  },

  mounted() {
    let newQuery = JSON.parse(JSON.stringify(this.$route.query)) // 深拷贝
    delete newQuery.bind
    delete newQuery.tokenName
    delete newQuery.tokenValue
    delete newQuery.openId
    this.$router.replace({ query: newQuery })
    if(this.bind != undefined) { // 第三方登录回调
      this.bind = this.bind == 'true'; // 字符串true 转 boolean true
      this.tplCallBack();
    }
  },
  methods: {
    // 微信登录
    wxLogin() {
      window.location.href = process.env.VUE_APP_BASE_API + '/wx/auth/render'
    },
    bindTplCancelHandle() {
      this.bindTplVisible = false;
    },
    // 第三方登录回调
    tplCallBack() {
      if(this.bind) { // 已绑定
        Cookies.set(TOKEN_NAME, this.tokenName)
        Cookies.set(TOKEN_VALUE, this.tokenValue)
        store.dispatch('user/setTokenName', this.tokenName);
        store.dispatch('user/setTokenValue', this.tokenValue);
        this.$router.push({path: '/home'})
      }else { // 未绑定
        this.open();
      }
    },
    open() {
      this.$confirm('未绑定账号', '提示', {
        confirmButtonText: '绑定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.bindTplVisible = true;
      })
  },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm)
          .then(res => {
            let {tokenName, tokenValue} = res.data;
            Cookies.set(TOKEN_NAME, tokenName)
            Cookies.set(TOKEN_VALUE, tokenValue)
            store.dispatch('user/setTokenName', tokenName);
            store.dispatch('user/setTokenValue', tokenValue);
            this.$router.push({path: '/home'})
          })
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
  .dk {
    height: 100%;
    width: 100%;
    background: url("../../assets/bg.jpg") no-repeat;
    background-size: cover;
  }
  .main {
    background: rgba(47,75,122,.5);
    border-radius: 20px;
    width: 450px;
    height: 350px;
    position: absolute;
    left: 100px;
    bottom: 100px;
  }
  .main div {
  }

</style>
