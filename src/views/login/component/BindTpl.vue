<template>
  <el-dialog :destroy-on-close="true" :close-on-click-modal="false" title="账号绑定" :visible.sync="visible">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码"  prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle">取 消</el-button>
      <el-button type="primary" @click="submitHandle('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {bind as bindForWx} from "@/api/tpl/wx";
import Cookies from "js-cookie";
import {TOKEN_NAME, TOKEN_VALUE} from "@/utils/const";
import store from "@/store";

export default {
  name: "BindTpl",
  data() {
    let validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      } else {
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
      formLabelWidth: '120px',
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          {validator: validatePwd, trigger: 'blur'}
        ]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    openId: {
      type: String,
      require: true
    }
  },
  methods: {
    // 确定
    submitHandle(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          bindForWx(this.ruleForm, this.openId)
              .then(res => {
                let {tokenName, tokenValue} = res.data;
                Cookies.set(TOKEN_NAME, tokenName)
                Cookies.set(TOKEN_VALUE, tokenValue)
                store.dispatch('user/setTokenName', tokenName);
                store.dispatch('user/setTokenValue', tokenValue);
                this.$router.push({path: '/home'})
              })
        } else {
          alert()
          return false;
        }
        })
    },
    // 取消
    cancelHandle() {
      this.$emit("cancelHandle");
    }
  }
}
</script>

<style scoped>

</style>