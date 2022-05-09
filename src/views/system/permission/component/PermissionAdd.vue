<template>
  <el-dialog :show-close="false" :close-on-click-modal="false" title="添加权限" :visible.sync="dialogFormVisible" width="40%">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="名称" prop="name" :label-width="formLabelWidth" >
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="标识" prop="code" :label-width="formLabelWidth" >
        <el-input v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description" :label-width="formLabelWidth" >
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权重" prop="zindex" :label-width="formLabelWidth" >
        <el-input-number :step="1" step-strictly v-model="form.zindex" autocomplete="off"></el-input-number>
      </el-form-item>
      <el-form-item label="权限类型" prop="menu" :label-width="formLabelWidth">
        <el-radio-group v-model="form.menu">
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">按钮</el-radio>
          <el-radio :label="3">API</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parent" :label-width="formLabelWidth" >
        <el-cascader
            v-model="form.parent"
            :options="permissions"
            :props="{ checkStrictly: true, label: 'name', value: 'id' }"
            clearable></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle">取 消</el-button>
      <el-button type="primary" @click="submitHandle">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {add} from "@/api/system/permission";

export default {
  name: "PermissionAdd",
  data() {
    return {
      permissions: [],
      form: {
        name: '',
        code: '',
        description: '',
        zindex: 0,
        menu: 1,
        parent: []
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入标识', trigger: 'blur' }],
      },
      formLabelWidth: '120px'
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    permissions: {
      type: Array,
      default: []
    }
  },
  mounted() {
  },
  methods: {
    cancelHandle() {
      this.$emit('cancelHandle')
    },
    submitHandle() {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false;
        }
        // 多级筛选存储的是数组
        let pid = this.form.parent.length == 0 ? 0 : this.form.parent[this.form.parent.length - 1]
        this.form.pid = pid
        add(this.form)
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
