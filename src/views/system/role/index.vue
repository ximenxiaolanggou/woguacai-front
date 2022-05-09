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
          :data="roles">
        <el-table-column
            fixed
            prop="seq"
            label="序号"
            width="220">
        </el-table-column>
        <el-table-column
            prop="name"
            label="名称"
            width="220">
        </el-table-column>
        <el-table-column
            prop="description"
            label="描述"
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
                @click.native.prevent="updateRole(scope.row)"
                type="text"
                size="small">
              修改
            </el-button>
            <el-button
                style="margin-left: 5px"
                @click.native.prevent="assignPermission(scope.row)"
                type="text"
                size="small">
              权限
            </el-button>
            <el-popconfirm
                style="margin-left: 5px"
                title="确定删除吗？"
                @confirm="deleteRole(scope.row)"
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
    <role-add
        v-if="addVisible"
        :dialogFormVisible="addVisible"
        @submitSuccessHandle="addSubmitSuccessHandle"
        @cancelHandle="addCancelHandle"
    />
    <role-update
        v-if="updateVisible"
        :dialogFormVisible="updateVisible"
        :role="selectedRole"
        @submitSuccessHandle="updateSubmitSuccessHandle"
        @cancelHandle="updateCancelHandle"
    />
    <role-assign-permission
        v-if="assignPermissionVisible"
        :dialogFormVisible="assignPermissionVisible"
        :role="selectedRole"
        @submitSuccessHandle="assignPermissionSubmitSuccessHandle"
        @cancelHandle="assignPermissionCancelHandle"
    />
  </div>
</template>

<script>
import CommonSearchHead from "@/components/CommonSearchHead";
import RoleAdd from "@/views/system/role/component/RoleAdd";
import RoleUpdate from "@/views/system/role/component/RoleUpdate";
import RoleAssignPermission from "@/views/system/role/component/RoleAssignPermission";
import {list as roleList, del} from "@/api/system/role";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Role",
  data() {
    return {
      searchKey: undefined,
      selectedRole: {},
      addVisible: false,
      updateVisible: false,
      assignPermissionVisible: false,
      roles: []
    }
  },
  components: {
    CommonSearchHead,
    RoleAdd,
    RoleUpdate,
    RoleAssignPermission
  },
  mounted() {
    this.page()
  },
  methods: {
    page() {
      roleList(this.searchKey)
          .then(res => {
            this.roles = res.data.map((item, index) => {
              item.seq = (index + 1);
              return item;
            })
          })
    },
    searchKeyChangeHandle(searchKey) {
      this.searchKey = searchKey;
    },
    searchHandle() {
      this.page();
    },
    handleSizeChange(val) {
      this.page();
    },
    handleCurrentChange(val) {
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
    updateRole(role) {
      this.selectedRole = role;
      this.updateVisible = true;
    },
    deleteRole({id}) {
      del(id)
          .then(res => {
            this.$message.success('操作成功')
            this.page();
          })
    },
    // 分配权限
    assignPermission(role) {
      this.selectedRole = role;
      this.assignPermissionVisible = true;
    },
    assignPermissionCancelHandle() {
      this.assignPermissionVisible = false;
    },
    assignPermissionSubmitSuccessHandle() {
      this.assignPermissionVisible = false;
    },
  },
}
</script>

<style scoped>
.head {
}
</style>
