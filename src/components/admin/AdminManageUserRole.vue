<template>
  <div class="userRole">
    <div class="userRole2" >
      <el-dialog title="修改用户权限"
                 :visible.sync="dialogFormVisible"
                 width="500px">
        <el-form :model="form">
          <el-form-item label="用户账户"
                        :label-width="formLabelWidth">
            <el-input disabled
                      v-model="form.userAccount"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名"
                        :label-width="formLabelWidth">
            <el-input v-model="form.userName"
                      disabled
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户角色"
                        :label-width="formLabelWidth">
            <el-select v-model="form.roleId"
                       placeholder="请选择更新的角色">
              <el-option label="TEACHER"
                         value=2></el-option>
              <el-option label="STUDENT"
                         value=3></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="modifyUserRole()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
            <template slot-scope="scope">
              <el-row>

                <el-button type="primary"
                           @click.native.prevent="modify(scope.row)"
                           icon="el-icon-edit"
                           circle></el-button>
                <el-button type="danger"
                           icon="el-icon-setting"
                           @click.native.prevent="ban(scope.row)"
                           circle></el-button>

              </el-row>
            </template>
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
import QS from 'qs'
export default {
  inject: ['reload'],
  mounted() {
    this.getAllUserRole()
  },
  name: 'adminManageUserRole',
  data() {
    return {
      tableData: null,
      currentPage: 1,
      totalCount: 0,
      dialogFormVisible: false,
      form: {
        userName: '',
        userAccount: '',
        roleId: ''
      },
      formLabelWidth: '120px'
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
    modify(row) {
      this.dialogFormVisible = true
      this.form.userAccount = row.userAccount
      this.form.userName = row.userName
      this.form.roleId = row.role
    },
    ban(row) {
      var str =
        row.ban == 1
          ? '是否恢复该用户使用权限?'
          : '此操作将禁用该用户, 是否继续?'
      var ban = row.ban == 1 ? 0 : 1
      this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/api/admin/ban/' + row.userAccount + '/' + ban)
            .then(response => {
              this.reload()
            })
            .catch(error => {
              console.error(error)
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
      return row.ban == 0 ? '已启用' : '已禁用'
    },
    modifyUserRole() {
      this.$axios
        .post('/api/admin/modifyUserRole', QS.stringify(this.form))
        .then(response => {
          this.reload()
        })
        .catch(error => {
          console.error(error)
        })
      dialogFormVisible = false
    }
  }
}
</script>
<style scoped>
.role {
  width: 100%;
}
.userRole, .userRole2 {
  width: 100%;
}

</style>