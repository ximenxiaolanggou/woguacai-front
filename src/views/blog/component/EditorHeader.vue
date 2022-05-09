<template>
  <div class="header">
    <el-row type="flex" class="row-bg" justify="space-around" align="middle">
      <el-col :span="7">
        标题： <el-input v-model="params.title" style="width: 250px;" />
      </el-col>
      <el-col :span="6">
        分类：<el-input style="width: 200px;" />
      </el-col>
      <el-col :span="6">
        标签： <el-input style="width: 200px;" />
      </el-col>
      <el-col :span="2" >
         <el-button type="primary" @click="save(true)">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Editor-Header",
  data() {
    return {
      params: {
        title: '',
        categories: [],
        tags: []
      }
    }
  },
  props: {
    saveTriger: {
      type: Number,
      default: 0
    }
  },
  watch: {
    saveTriger(newVal) {
      this.save(false);
    }
  },
  methods: {
    save(btn) {
      if(!this.params.title || this.params.title.trim() == '') {
        this.$message.warning('请输入标题');
        return;
      }
      this.params.btn = btn;
      this.$emit('submitHandler', this.params);
    }
  }
}
</script>

<style scoped>
  .header {
    height: 80px;
    background-color: white;
  }
  .row-bg {
    height: 80px;
  }

</style>
