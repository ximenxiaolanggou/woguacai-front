<template>
  <div>
    <div class="main">
      <el-timeline>
        <el-timeline-item v-for="(article, index) in articles" :key="index" :color="!!article.active ? 'pink': ''" :timestamp="moment(article.createtime).format('YYYY/MM/DD')" placement="top" size="large">
          <div @mouseover="cardMouseoverHandle(article.id)">
            <el-card class="card" >
              <h4>{{article.title}}</h4>
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
    background-color: pink;
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
</style>
