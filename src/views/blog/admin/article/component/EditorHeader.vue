<template>
  <div class="header">
    <el-row type="flex" class="row-bg" justify="space-around" align="middle">
      <el-col :span="6">
        标题： <el-input placeholder="文章标题" v-model="params.title" style="width: 300px;" />
      </el-col>
      <el-col :span="6">
        副标题： <el-input placeholder="文章副标题" v-model="params.subTitle" style="width: 300px;" />
      </el-col>
      <el-col :span="4">
        分类：<el-select
          v-model="params.categories"
          style="width: 200px;"
          multiple
          filterable
          default-first-option
          placeholder="请选择文章标签">
        <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="4">
        标签： <el-select
          v-model="params.tags"
          style="width: 200px;"
          multiple
          filterable
          default-first-option
          placeholder="请选择文章标签">
        <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      </el-col>
      <el-col :span="2" >
         <el-button type="primary" @click="save(true)">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {list as categoryList} from "@/api/blog/blogCategory";
import {list as tagList} from "@/api/blog/blogTag";

export default {
  name: "Editor-Header",
  data() {
    return {
      tags:[],
      categories: [],
      params: {
        title: '',
        subTitle: '',
        categories: [],
        tags: []
      }
    }
  },
  props: {
    saveTriger: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    categoryIds: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: undefined
    },
    tagIds: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: undefined
    },
  },
  watch: {
    saveTriger(newVal) {
      // eslint-disable-next-line vue/no-mutating-props
      this.saveTriger = newVal;
      this.save(false);
    },
    title(newVal) {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.title = newVal;
    },
    subTitle(newVal) {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.subTitle = newVal;
    },
    categoryIds(newVal) {
      if(newVal) {
        this.params.categories = newVal.map(category => parseInt(category))
      }else {
        this.params.categories = []
      }
    },
    tagIds(newVal) {
      if(newVal) {
        this.params.tags = newVal.map(tag => parseInt(tag))
      }else {
        this.params.tags = []
      }
    },

  },
  mounted() {
    this.params.title = this.title
    this.params.subTitle = this.subTitle
    this.categoryList();
    this.tagList()
  },
  methods: {
    categoryList() {
      categoryList()
      .then(res => this.categories = res.data)
    },
    tagList() {
      tagList()
          .then(res => this.tags = res.data)
    },
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
