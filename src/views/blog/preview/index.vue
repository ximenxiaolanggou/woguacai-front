<template>
  <div>
    <div class="middle-header">
      <el-input clearable v-model="params.searchKey"  placeholder="请输入查询内容" style="width: 400px">
        <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="main">
      <el-timeline>
        <el-timeline-item v-for="(article, index) in articles" :key="index" :color="!!article.active ? '#ffe480': ''" :timestamp="moment(article.createtime).format('YYYY/MM/DD')" placement="top" size="large">
          <div @mouseover="cardMouseoverHandle(article.id)" @click="articleClickHandle(article.id)">
            <el-card class="card" >
              <h2>{{article.title}}</h2>
              <p>{{ article.subTitle }}</p>
            </el-card>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-pagination
        style="margin-top: 10px;text-align: center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout=" prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {list as categoryList} from "@/api/blog/blogCategory";
import {list as tagList} from "@/api/blog/blogTag";
import {page} from "@/api/blog/blogArticle";
import moment from 'moment';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Article',
  data() {
    return {
      articles: [],
      total: 0,
      tags:[],
      categories: [],
      params: {
        pageNunber: 1,
        pageSize: 10,
        searchKey: '',
        categories: [],
        tags: []
      }
    }
  },
  components: {
  },
  mounted() {
    this.page();
  },
  methods: {
    moment,
    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.page();
    },
    handleCurrentChange(val) {
      this.pageParams.pageNumber = val
      this.page();
    },
    cardMouseoverHandle(id) {
      this.articles = this.articles.map(item => {
        if(item.id == id) {
          item.active = true;
        }else{
          item.active = false
        }
        return item;
      })
    },
    page() {
      let pageNumber = this.params.pageNunber;
      let pageSize = this.params.pageSize;
      let params = {
        searchKey: this.params.searchKey,
        categories: this.params.categories,
        tags: this.params.tags,
      }
      page(pageNumber,pageSize,params)
      .then(res => {
        this.total = res.data.total;
        this.articles = res.data.data;
      })
    },

    categoryList() {
      categoryList()
          .then(res => this.categories = res.data)
    },
    tagList() {
      tagList()
          .then(res => this.tags = res.data)
    },
    articleClickHandle(id) {
      this.$router.push({path: '/blog/preview/detail', query: {id}})
    },
    search() {
      this.params.pageNunber = 1;
      this.page()
    },
  }
}
</script>

<style scoped>
  .main {
    margin-top: 20px;
    padding: 20px;
  }
  .card:hover {
    background-color: #ffe480;
    cursor: pointer;
  }
  /deep/.el-pagination .btn-prev  {
    background-color: rgba(0,0,0,0);
  }
  /deep/.el-pagination .btn-next  {
    background-color: rgba(0,0,0,0);
  }
  /deep/.el-pager li {
    background-color: rgba(0,0,0,0);
  }
  /deep/.el-timeline-item__timestamp {
    font-size: 17px;
    color: #dda354;
  }

  .middle-header {
    text-align: center;
    height: 50px;
    padding-top: 100px;
    margin-bottom: 20px;
  }
  /deep/.el-input__inner {
    background-color: rgb(0,0,0,0);
  }
  /deep/.el-input-group__append {
    background-color: rgb(0,0,0,0);
  }
  /deep/.el-input__inner {
    color: white;
  }
</style>
