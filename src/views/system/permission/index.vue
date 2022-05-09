<template>
  <div>
    <div class="head common-search">
      <el-row :gutter="20" type="flex" styp align="middle" style="height: 80px" >
        <el-col :span="1" ><el-button type="primary" @click="addHandle">添加</el-button></el-col>
      </el-row>
    </div>
    <div class="main" style="background-color: white; padding:20px">
      <el-table
          :data="permissions"
          style="width: 100%"
          row-key="id"
          border
          lazy
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
            prop="name"
            label="名称"
            width="240">
        </el-table-column>
        <el-table-column
            prop="code"
            label="标识"
            width="240">
        </el-table-column>
        <el-table-column
            prop="description"
            label="描述"
            width="240">
        </el-table-column>
        <el-table-column
            prop="zindex"
            label="权重"
            width="240">
        </el-table-column>
        <el-table-column
            prop="menu"
            label="权限类型"
            width="240"
        >
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.menu == 1 ? 'primary' : (scope.row.menu == 2 ? 'success' : 'danger')"
                disable-transitions>{{scope.row.menu == 1 ? '菜单' : (scope.row.menu == 2 ? '按钮' : 'API')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="createtime"
            label="创建时间"
            width="240">
        </el-table-column>
        <el-table-column
            label="操作"
        >
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="updatePermission(scope.row)"
                type="text"
                size="small">
              修改
            </el-button>
            <el-popconfirm
                style="margin-left: 5px"
                title="确定删除吗？"
                @confirm="deletePermission(scope.row)"
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
    <permission-add
        v-if="addVisible"
        :dialogFormVisible="addVisible"
        :permissions="permissions"
        @submitSuccessHandle="addSubmitSuccessHandle"
        @cancelHandle="addCancelHandle"
    />
    <permission-update
        v-if="updateVisible"
        :dialogFormVisible="updateVisible"
        :permissions="permissions"
        :permission="selectedPermission"
        @submitSuccessHandle="updateSubmitSuccessHandle"
        @cancelHandle="updateCancelHandle"
    />
  </div>
</template>

<script>
import CommonSearchHead from "@/components/CommonSearchHead";
import PermissionAdd from "@/views/system/permission/component/PermissionAdd";
import permissionUpdate from "@/views/system/permission/component/PermissionUpdate";
import {tree,del} from "@/api/system/permission";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Permission",
  data() {
    return {
      selectedPermission: {},
      addVisible: false,
      updateVisible: false,
      permissions: []
    }
  },
  components: {
    CommonSearchHead,
    PermissionAdd,
    permissionUpdate
  },
  mounted() {
    this.tree()
  },
  methods: {
    tree() {
      tree()
      .then(res => this.permissions = res.data)
    },
    addHandle() {
      this.addVisible = true;
    },
    addCancelHandle() {
      this.addVisible = false;
    },
    addSubmitSuccessHandle() {
      this.addVisible = false;
      this.tree()
    },
    updatePermission(permission) {
      this.selectedPermission = permission;
      this.updateVisible = true;
    },
    updateCancelHandle() {
      this.updateVisible = false;
    },
    updateSubmitSuccessHandle() {
      this.updateVisible = false;
      this.tree()
    },
    deletePermission(permission) {
      del(permission.id)
      .then(() => {
        this.$message.success('操作成功');
        this.tree();
      })
    }
  },
}
</script>

<style scoped>
.head {
}
</style>
