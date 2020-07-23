<template>
  <div>
    <div>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="学生"
                     name="3"></el-tab-pane>
        <el-tab-pane label="老师"
                     name="2"></el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <el-table :data="tableData">
        <el-table-column prop="id"
                         label="用户ID"
                         width="150">
        </el-table-column>
        <el-table-column prop="userAccount"
                         label="用户账户"
                         width="150">
        </el-table-column>
        <el-table-column prop="userName"
                         label="用户姓名"
                         width="150">
        </el-table-column>
        <el-table-column prop="researchDirection"
                         label="研究方向"
                         width="150"
                         :formatter="setResearchDireciton">
        </el-table-column>
        <el-table-column prop="sex"
                         label="性别"
                         width="150"
                         :formatter="setSex">
        </el-table-column>
        <el-table-column prop="guideTeacherAccount"
                         label="指导老师账号"
                         width="150"
                         :formatter="setGuideTeacherAccount">
        </el-table-column>
        <el-table-column prop="guideTeacherName"
                         label="指导老师姓名"
                         :formatter="setGuideTeacherName">
        </el-table-column>
      </el-table>
    </div>
    <!-- <div>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5,10,20]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalCount">
      </el-pagination>
    </div> -->

  </div>
</template>

<script>
export default {
  mounted() {
    this.getAllResearchDireciton()
    this.default()
  },
  name: 'adminMangeUser',
  data() {
    return {
      tableData: null,
      activeName: '3',
      currentPage: 1,
      totalCount: 0,
      researchDirections: null
    }
  },
  methods: {
    default() {
      this.$axios
        .get('/api/user/getAllUsers/' + 3)
        .then(response => {
          this.totalCount = response.data.data.length
          this.tableData = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleClick(tab, event) {
      this.$axios
        .get('/api/user/getAllUsers/' + tab.name)
        .then(response => {
          this.totalCount = response.data.data.length
          this.tableData = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    setSex(row, column) {
      if (row.sex == 1) {
        return '女'
      } else {
        return '男'
      }
    },
    getAllResearchDireciton() {
      this.$axios
        .get('/api/admin/getAllResearchDirections')
        .then(response => {
          this.researchDirections = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    setResearchDireciton(row, column) {
      if (row.researchDirection == '') {
        return '无'
      }

      return row.researchDirection
    },
    setGuideTeacherName(row, column) {
      if (row.guideTeacherName === '' || row.guideTeacherName == null) {
        return '无'
      }
      return row.guideTeacherName
    },
    setGuideTeacherAccount(row, column) {
      if (row.guideTeacherAccount === '' || row.guideTeacherAccount == null) {
        return '无'
      }
      return row.guideTeacherAccount
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