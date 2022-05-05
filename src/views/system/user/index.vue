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
          :data="users">
        <el-table-column
            fixed
            prop="seq"
            label="序号"
            width="220">
        </el-table-column>
        <el-table-column
            prop="username"
            label="姓名"
            width="220">
        </el-table-column>
        <el-table-column
            prop="mail"
            label="邮箱"
            width="220">
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="手机"
            width="220">
        </el-table-column>
        <el-table-column
            prop="roleNames"
            label="角色"
            width="220">
        </el-table-column>
        <el-table-column
            prop="createtime"
            label="创建时间"
            width="220">
        </el-table-column>
        <el-table-column
            label="操作"
           >
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="updateUser(scope.row)"
                type="text"
                size="small">
              修改
            </el-button>
            <el-popconfirm
                style="margin-left: 5px"
                title="确定删除吗？"
                @confirm="deleteUser(scope.row)"
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
      <el-pagination
          style="margin-top: 10px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageParams.total">
      </el-pagination>
    </div>
    <user-add
        v-if="addVisible"
        :dialogFormVisible="addVisible"
        @submitSuccessHandle="addSubmitSuccessHandle"
        @cancelHandle="addCancelHandle"
    />
    <user-update
        v-if="updateVisible"
        :dialogFormVisible="updateVisible"
        :user="selectedUser"
        @submitSuccessHandle="updateSubmitSuccessHandle"
        @cancelHandle="updateCancelHandle"
    />
  </div>
</template>

<script>
import CommonSearchHead from "@/components/CommonSearchHead";
import UserAdd from "@/views/system/user/component/UserAdd";
import UserUpdate from "@/views/system/user/component/UserUpdate";
import {page as userPage, del} from '@/api/system/user.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  data() {
    return {
      selectedUser: {},
      addVisible: false,
      updateVisible: false,
      pageParams: {
        pageNumber: 1,
        pageSize: 10,
        total: 0,
        searchKey: undefined
      },
      users: []
    }
  },
  components: {
    CommonSearchHead,
    UserAdd,
    UserUpdate
  },
  mounted() {
    this.page()
  },
  methods: {
    page() {
      userPage(this.pageParams)
      .then(res => {
        this.pageParams.total = res.data.total;
        this.users = res.data.data.map((item, index) => {
          item.seq = (index + 1);
          return item;
        })
      })
    },
    searchKeyChangeHandle(searchKey) {
      this.pageParams.searchKey = searchKey;
    },
    searchHandle() {
      this.pageParams.pageNumber = 1;
      this.page();
    },
    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.page();
    },
    handleCurrentChange(val) {
      this.pageParams.pageNumber = val
      this.page();
    },
    addHandle() {
      this.addVisible = true;
    },
    addCancelHandle() {
      this.addVisible = false;
    },
    addSubmitSuccessHandle() {
      this.addVisible = false;
      this.page()
    },
    updateCancelHandle() {
      this.updateVisible = false;
    },
    updateSubmitSuccessHandle() {
      this.updateVisible = false;
      this.page()
    },
    updateUser(user) {
      this.selectedUser = user;
      this.updateVisible = true;
    },
    deleteUser({id}) {
      del(id)
      .then(res => {
        this.$message.success('操作成功')
      })
    }
  },
}
</script>

<style scoped>
 .head {
 }
</style>
