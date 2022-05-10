<template>
  <div>
    <div class="header">
      <el-row type="flex" class="row-bg" justify="space-around" align="middle">
        <el-col :span="4">
          <el-input  placeholder="查询关键字" v-model="params.searchKey" style="width: 250px;" />
        </el-col>
        <el-col :span="5">
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
        <el-col :span="5">
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
          <el-button type="primary" @click="search">查询</el-button>
        </el-col>
        <el-col :span="1" >
          <el-button type="primary" @click="add">添加</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <div class="main" style="background-color: white; padding:20px">
        <el-table
            :data="articles">
          <el-table-column
              fixed
              prop="seq"
              label="序号"
              width="200">
          </el-table-column>
          <el-table-column
              prop="title"
              label="标题"
              width="200">
          </el-table-column>
          <el-table-column
              prop="subTitle"
              label="副标题"
              width="200">
          </el-table-column>
          <el-table-column
              prop="categoryNames"
              label="分类"
              width="300">
            <template slot-scope="scope">
              <el-tag style="margin-right: 5px" v-for="(item, index) in (scope.row.categoryNames && scope.row.categoryNames.split(','))" :key="index"
                  :type="tagColor[index % tagColor.length]"
                  >{{item}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
              prop="tagNames"
              label="标签"
              width="300">
            <template slot-scope="scope">
              <el-tag style="margin-right: 5px" v-for="(item, index) in (scope.row.tagNames && scope.row.tagNames.split(','))" :key="index"
                      :type="tagColor[index % tagColor.length]"
              >{{item}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
              prop="createtime"
              label="创建时间"
              width="250">
          </el-table-column>
          <el-table-column
              label="操作"
          >
            <template slot-scope="scope">
              <el-button
                  @click.native.prevent="updateArticle(scope.row)"
                  type="text"
                  size="small">
                修改
              </el-button>
              <el-popconfirm
                  style="margin-left: 5px"
                  title="确定删除吗？"
                  @confirm="deleteArticle(scope.row)"
              >
                <el-button
                    type="text"
                    slot="reference"
                    size="small">
                  移除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
          style="margin-top: 10px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {list as categoryList} from "@/api/blog/blogCategory";
import {list as tagList} from "@/api/blog/blogTag";
import {page, del} from "@/api/blog/blogArticle";
import moment from 'moment';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Article',
  data() {
    return {
      tagColor: ['success','info','warning','danger'],
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
    this.categoryList();
    this.tagList();
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
        this.articles = res.data.data.map((item,index) => {
          item.seq = (index + 1);
          return item;
        });
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
    add() {
      this.$router.push({path: '/blog/admin/editor'});
    },
    // 修改
    updateArticle(row) {
      this.$router.push({path: '/blog/admin/editor', query: {id: row.id}});
    },
    // 删除
    deleteArticle({id}) {
      del(id)
      .then(() => {
        this.$message.success('操作成功');
        this.page();
      })
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
  .main {
    margin-top: 20px;
    background-color: white;
    padding: 20px;
  }
  .card:hover {
    background-color: pink;
  }
</style>
