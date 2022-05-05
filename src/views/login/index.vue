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
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from "@/api/auth";
import store from "@/store";
import Cookies from "js-cookie";
import {TOKEN_NAME, TOKEN_VALUE} from "@/utils/const";

export default {
  name: "Login",
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm)
          .then(res => {
            let {tokeName, tokenValue} = res.data;
            Cookies.set(TOKEN_NAME, tokeName)
            Cookies.set(TOKEN_VALUE, tokenValue)
            store.dispatch('user/setTokenName', tokeName);
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
    background-color: white;
    border-radius: 20px;
    width: 450px;
    height: 400px;
    position: absolute;
    left: 100px;
    bottom: 100px;
  }
  .main div {
  }

</style>
