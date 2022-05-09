<template>
  <div id="main">
    <mavon-editor ref="md" v-model="content" @imgAdd="imgAdd" @imgDel="imgDel"/>
  </div>
</template>

<script>
import {upload,delBlogUpload} from "@/api/blog";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Blog',
  data() {
    return {
      content: '',
      baseUrl: process.env.VUE_APP_BASE_API
    }
  },
  mounted() {
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>