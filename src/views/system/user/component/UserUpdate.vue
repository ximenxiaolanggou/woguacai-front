<template>
  <el-dialog :show-close="false" :close-on-click-modal="false" title="修改用户" :visible.sync="dialogFormVisible" width="40%">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth" >
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile" :label-width="formLabelWidth">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail" :label-width="formLabelWidth">
        <el-input v-model="form.mail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender" :label-width="formLabelWidth">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色" prop="roles" :label-width="formLabelWidth">
        <el-select multiple v-model="form.roles" placeholder="请选择角色">
          <el-option v-for="(item, index) in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle">取 消</el-button>
      <el-button type="primary" @click="submitHandle">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {update} from "@/api/system/user";
import {list as roleList} from "@/api/system/role";

export default {
  name: "UserUpdate",
  data() {
    return {
      gridData: [],
      roles: [],
      form: {
        username: '',
        mail: '',
        mobile: '',
        gender: 1,
        roles: [],
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
        mail: [{ required: true, message: '请输入邮箱', trigger: 'blur' },],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },],
        roles: [{ required: true, message: '请输选择角色' ,trigger: 'change' },]
      },
      formLabelWidth: '120px'
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: {}
    }
  },
   mounted() {
      this.roleList();
      this.form.username = this.user.username;
      this.form.mail = this.user.mail;
      this.form.mobile = this.user.mobile;
      this.form.gender = this.user.gender;
      if(!!this.user.roleIds) this.form.roles = this.user.roleIds.split(',').map(item => parseInt(item));
  },
  methods: {
    roleSelectChangeHandle(e) {
      console.log(e)
    },
    roleList() {
      roleList()
      .then(res => this.roles = res.data)
    },
    cancelHandle() {
      this.$emit('cancelHandle')
    },
    submitHandle() {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false;
        }
        let roles = this.form.roles;
        if(roles && roles.length > 0) {
          this.form.roleIds = roles.join(',')
        }
        update(this.user.id,this.form)
        .then(() => {
          this.$message.success('操作成功')
          this.$emit('submitSuccessHandle')
        }).catch(err => {
          console.log(err)
        })
      });
    }
  }
}
</script>

<style scoped>

</style>
