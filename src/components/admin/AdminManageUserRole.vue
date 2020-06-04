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
          <el-table-column prop="option"
                           label="操作">
            <el-row>
              <el-button type="primary"
                         icon="el-icon-edit"
                         circle></el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
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
      totalCount: 0
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
    }
  }
}
</script>
<style scoped>
.role {
  width: 100%;
}
</style>