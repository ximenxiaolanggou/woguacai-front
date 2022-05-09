<template>
  <div>
    <div class="head common-search">
      <common-search-head
          @searchKeyChangeHandle="searchKeyChangeHandle"
          @searchHandle="searchHandle"
          @addHandle="addHandle"
      />
    </div>
    <div class="main" style="background-color: white; padding:20px">
      <el-table
          :data="categories">
        <el-table-column
            fixed
            prop="seq"
            label="序号"
            width="360">
        </el-table-column>
        <el-table-column
            prop="name"
            label="名称"
            width="360">
        </el-table-column>
        <el-table-column
            prop="description"
            label="描述"
            width="360">
        </el-table-column>
        <el-table-column
            prop="createtime"
            label="创建时间"
            width="360">
        </el-table-column>
        <el-table-column
            label="操作"
        >
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="updateCategory(scope.row)"
                type="text"
                size="small">
              修改
            </el-button>
            <el-popconfirm
                style="margin-left: 5px"
                title="确定删除吗？"
                @confirm="deleteCategory(scope.row)"
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
    <category-add
        v-if="addVisible"
        :dialogFormVisible="addVisible"
        @submitSuccessHandle="addSubmitSuccessHandle"
        @cancelHandle="addCancelHandle"
    />
    <category-update
        v-if="updateVisible"
        :dialogFormVisible="updateVisible"
        :category="selectedCategory"
        @submitSuccessHandle="updateSubmitSuccessHandle"
        @cancelHandle="updateCancelHandle"
    />
  </div>
</template>

<script>
import CommonSearchHead from "@/components/CommonSearchHead";
import CategoryAdd from "@/views/blog/category/component/CategoryAdd";
import CategoryUpdate from "@/views/blog/category/component/CategoryUpdate";
import {add,list,del} from '@/api/blog/blogCategory'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Category",
  data() {
    return {
      searchKey: undefined,
      selectedCategory: {},
      addVisible: false,
      updateVisible: false,
      categories: []
    }
  },
  components: {
    CommonSearchHead,
    CategoryAdd,
    CategoryUpdate,
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      list(this.searchKey)
          .then(res => {
            this.categories = res.data.map((item, index) => {
              item.seq = (index + 1);
              return item;
            })
          })
    },
    searchKeyChangeHandle(searchKey) {
      this.searchKey = searchKey;
    },
    searchHandle() {
      this.list();
    },
    handleSizeChange(val) {
      this.list();
    },
    handleCurrentChange(val) {
      this.list();
    },
    addHandle() {
      this.addVisible = true;
    },
    addCancelHandle() {
      this.addVisible = false;
    },
    addSubmitSuccessHandle() {
      this.addVisible = false;
      this.list();
    },
    updateCancelHandle() {
      this.updateVisible = false;
    },
    updateSubmitSuccessHandle() {
      this.updateVisible = false;
      this.list();
    },
    updateCategory(role) {
      this.selectedCategory = role;
      this.updateVisible = true;
    },
    deleteCategory({id}) {
      del(id)
          .then(res => {
            this.$message.success('操作成功')
            this.list();
          })
    }
  },
}
</script>

<style scoped>
.head {
}
</style>
