<template>
  <div id="main">
    <editor-header
        :saveTriger="saveTriger"
        :title="params.title"
        :subTitle="params.subTitle"
        :category-ids="params.categories"
        :tag-ids="params.tags"
        @submitHandler="submitHandler"
    />
    <div class="main">
      <mavon-editor ref="md" style="min-height: 675px" v-model="params.content" @imgAdd="imgAdd" @imgDel="imgDel" @save="save"/>
    </div>
  </div>
</template>

<script>
import {upload,delBlogUpload} from "@/api/blog/blogUpload";
import EditorHeader from "@/views/blog/admin/article/component/EditorHeader";
import {saveOrUpdate,findById} from "@/api/blog/blogArticle";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Article',
  data() {
    return {
      saveTriger: 0,
      params: {
        id: undefined,
        title: '',
        content: '',
        categories: [],
        tags: []
      },
      baseUrl: process.env.VUE_APP_BASE_API
    }
  },
  components: {
    EditorHeader
  },
  mounted() {
    this.params.id = this.$route.query.id;
    if(this.params.id) this.findArticleById();
  },
  methods: {
    findArticleById() {
      findById(this.params.id)
      .then(res => {
        this.params.title = res.data.title;
        this.params.subTitle = res.data.subTitle;
        this.params.content = res.data.content;
        if(res.data.categoryIds) this.params.categories = res.data.categoryIds.split(',');
        if(res.data.tagIds) this.params.tags = res.data.tagIds.split(',');
      })
    },
    imgAdd(pos, $file) {
      let formdata = new FormData();
      formdata.append('file', $file);
      upload(formdata)
          .then(res => {
            let url = res.data;
            // 防止widows携带盘符
            let urlArr = url.split(":");
            url = this.baseUrl + (urlArr.length == 1 ? urlArr[0] : urlArr[1]);
            this.$refs.md.$img2Url(pos, url);
          })
    },
    imgDel(filename) {
      let id = filename[0].substring(filename[0].lastIndexOf('/') + 1, filename[0].lastIndexOf('.'));
      delBlogUpload(id)
          .then(() => {
            this.$message.success('操作成功')
          })
    },
    submitHandler(val) {
      this.params.btn = val.btn; // ctrl + s 还是 保存按钮触发
      this.params.title = val.title;
      this.params.subTitle = val.subTitle;
      this.params.tags = val.tags;
      this.params.categories = val.categories;
      saveOrUpdate( this.params)
          .then(res => {
            this.$message.success('保存成功')
            this.params.id = res.data;
            if(this.params.btn) this.$router.go(-1)
          })
    },
    save(value,render) {
      if(!value || value.trim() == '') {
        this.$message.warning('请输入文章内容');
        return;
      }
      this.saveTriger = Date.parse(new Date());
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 20px;
}
</style>
