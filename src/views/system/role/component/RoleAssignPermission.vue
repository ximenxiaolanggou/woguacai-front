<template>
  <el-dialog :show-close="false" :close-on-click-modal="false" title="权限分配" :visible.sync="dialogFormVisible" width="40%">
    <el-tree
        :data="permissions"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle">取 消</el-button>
      <el-button type="primary" @click="submitHandle">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {tree as permissionTree, findByRole} from "@/api/system/permission";
import {assignPermission} from "@/api/system/role";

export default {
  name: "RoleAssignPermission",
  data() {
    return {
      permissions: [],
      selectedPermissionIds: [],
      formLabelWidth: '120px',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    role: {
      type: Object,
      default: {}
    }
  },
  async mounted() {
    this.permissionList()
  },
  methods: {
    permissionList() {
      permissionTree()
      .then(res => {
        this.findByRole();
        this.permissions = res.data;
      })
    },
    findByRole() {
      findByRole(this.role.id)
      .then(res => {
        this.selectedPermissionIds = res.data.map(item => item.id);
        this.selectedPermissionIds.forEach(e => {
          this.$refs.tree.setChecked(e, true, false);
        })
        // this.$refs.tree.setCheckedKeys(this.selectedPermissionIds);
      })
    },
    cancelHandle() {
      this.$emit('cancelHandle')
    },
    submitHandle() {
      let checkedKeys = [...this.$refs.tree.getCheckedKeys(),...this.$refs.tree.getHalfCheckedKeys()];
      if(checkedKeys.length == 0) {
        this.$message.warning('请选择权限');
        return;
      }
      assignPermission(this.role.id,checkedKeys)
      .then(() => {
        this.$message.success('操作成功');
        this.$emit('submitSuccessHandle');
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
