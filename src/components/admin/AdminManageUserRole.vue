<template>
  <div>
    <div class="role">
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="id"
                           label="用户ID"
                           width="200">
          </el-table-column>
          <el-table-column prop="userAccount"
                           label="用户账户"
                           width="200">
          </el-table-column>
          <el-table-column prop="userName"
                           label="用户姓名"
                           width="200">
          </el-table-column>
          <el-table-column prop="roleName"
                           label="角色">
          </el-table-column>
          <el-table-column prop="ban"
                           label="状态"
                           :formatter="setBan">
          </el-table-column>
          <el-table-column prop="option"
                           label="操作">
            <el-row>
              <el-button type="primary"
                         icon="el-icon-edit"
                         circle></el-button>
              <el-button type="danger"
                         v-bind:icon=iconData
                         @click="open"
                         circle></el-button>
            </el-row>
          </el-table-column>
        </el-table>
      </el-main>
    </div>
    <div>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5,10,20]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalCount">
      </el-pagination>
    </div>
  </div>

</template>
<script>
export default {
  mounted() {
    this.getAllUserRole()
  },
  name: 'adminManageUserRole',
  data() {
    return {
      tableData: null,
      currentPage: 1,
      totalCount: 0,
      iconData: null
    }
  },
  methods: {
    getAllUserRole() {
      this.$axios
        .get('/api/admin/getAllUserRole')
        .then(response => {
          this.totalCount = response.data.data.length
          this.tableData = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    open(row, col) {
      alert(row.ban)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: this.tableData.userAccount
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    setBan(row, column) {
      if (row.ban == 0) {
        this.iconData = 'el-icon-error'
      } else {
        this.iconData = 'el-icon-check'
      }
      return row.ban == 0 ? '已启用' : '已禁用'
    }
  }
}
</script>
<style scoped>
.role {
  width: 100%;
}
</style>