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
          :data="tags">
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
                @click.native.prevent="updateTag(scope.row)"
                type="text"
                size="small">
              修改
            </el-button>
            <el-popconfirm
                style="margin-left: 5px"
                title="确定删除吗？"
                @confirm="deleteTag(scope.row)"
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
    <tag-add
        v-if="addVisible"
        :dialogFormVisible="addVisible"
        @submitSuccessHandle="addSubmitSuccessHandle"
        @cancelHandle="addCancelHandle"
    />
    <tag-update
        v-if="updateVisible"
        :dialogFormVisible="updateVisible"
        :tag="selectedTag"
        @submitSuccessHandle="updateSubmitSuccessHandle"
        @cancelHandle="updateCancelHandle"
    />
  </div>
</template>

<script>
import CommonSearchHead from "@/components/CommonSearchHead";
import TagAdd from "@/views/blog/admin/tag/component/TagAdd";
import TagUpdate from "@/views/blog/admin/tag/component/TagUpdate";
import {list,del} from '@/api/blog/blogTag'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tag",
  data() {
    return {
      searchKey: undefined,
      selectedTag: {},
      addVisible: false,
      updateVisible: false,
      tags: []
    }
  },
  components: {
    CommonSearchHead,
    TagAdd,
    TagUpdate,
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      list(this.searchKey)
          .then(res => {
            this.tags = res.data.map((item, index) => {
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
    updateTag(role) {
      this.selectedTag = role;
      this.updateVisible = true;
    },
    deleteTag({id}) {
      del(id)
          .then(() => {
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
