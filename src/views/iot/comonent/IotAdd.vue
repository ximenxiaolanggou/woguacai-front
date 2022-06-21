<template>
  <el-dialog :show-close="false" :close-on-click-modal="false" title="类别角色" :visible.sync="dialogFormVisible" width="40%">
    <el-form :model="form" :rules="rules" ref="form" >
      <el-form-item label="SN" prop="sn" :label-width="formLabelWidth" >
        <el-input v-model="form.sn" placeholder="请输入SN"></el-input>
      </el-form-item>
      <el-form-item label="协议类型" prop="protocolType" :label-width="formLabelWidth" >
        <el-select v-model="form.protocolType" placeholder="请选择协议类型">
          <el-option v-for="(protocol, index) in protocolTypes" :key="index" :label="protocol.label" :value="protocol.value"></el-option>
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
import {add} from "@/api/iot/iot";

export default {
  name: "IotAdd",
  data() {
    return {
      form: {
        sn: '',
        protocolType: '',
      },
      rules: {
        sn: [{ required: true, message: '请输入sn', trigger: 'blur' }],
        protocolType: [{ required: true, message: '请选择协议类型'}],
      },
      formLabelWidth: '120px'
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    protocolTypes: {
      type: Array,
      default: []
    }
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