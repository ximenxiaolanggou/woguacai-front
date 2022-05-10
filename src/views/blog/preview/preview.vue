<template>
  <mavon-editor
      class="md"
      :value="article.content"
      :subfield = "false"
      :defaultOpen = "'preview'"
      :toolbarsFlag = "false"
      :editable="false"
      :scrollStyle="true"
      :ishljs = "true"
  ></mavon-editor>
</template>

<script>
import {findById} from "@/api/blog/blogArticle";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "preview",
  data() {
    return {
      article: {}
    }
  },
  mounted() {
    findById(this.$route.query.id)
    .then(res => this.article = res.data)
  }
}
</script>

<style scoped>

</style>
