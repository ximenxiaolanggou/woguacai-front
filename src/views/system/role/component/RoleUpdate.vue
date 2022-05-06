<template>
  <el-dialog :show-close="false" :close-on-click-modal="false" title="添加角色" :visible.sync="dialogFormVisible" width="40%">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="名称" prop="name" :label-width="formLabelWidth" >
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description" :label-width="formLabelWidth" >
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle">取 消</el-button>
      <el-button type="primary" @click="submitHandle">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {update} from "@/api/system/role";

export default {
  name: "UserUpdate",
  data() {
    return {
      form: {
        name: '',
        description: '',
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      },
      formLabelWidth: '120px'
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    role: {
      type: Object,
      default: {}
    }
  },
   mounted() {
      this.form.name = this.role.name;
      this.form.description = this.role.description;
  },
  methods: {
    roleSelectChangeHandle(e) {
      console.log(e)
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
        update(this.role.id,this.form)
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
