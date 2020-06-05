<template>
  <div>
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="小组信息预览"
                   name="teamPreview">
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column label="小组ID"
                           width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="指导老师账号"
                           width="180">
            <template slot-scope="scope">
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium"> {{ scope.row.guideTeacherAccount }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="指导老师姓名"
                           width="180">
            <template slot-scope="scope">
              <div slot="reference"
                   class="name-wrapper">

                <el-tag size="medium"><i class="el-icon-user"></i> {{ scope.row.guideTeacherName }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="小组名"
                           width="180">
            <template slot-scope="scope">
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium"><i class="el-icon-school"></i> {{ scope.row.teamName }}</el-tag>
              </div>

            </template>
          </el-table-column>
          <el-table-column label="学生数量"
                           width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.studentCount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="小组研究方向"
                           width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.teamDirection }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="创建小组"
                   name="createTeam">

      </el-tab-pane>
      <el-tab-pane label="分配小组成员"
                   name="arrangeTeamMembers"></el-tab-pane>
    </el-tabs>

    <el-dialog title="修改小组信息"
               :modal-append-to-body='false'
               :visible.sync="dialogFormVisible"
               width="500px">
      <el-form :model="form">
        <el-form-item label="指导老师账号"
                      :label-width="formLabelWidth">
          <el-input disabled
                    v-model="form.guideTeacherAccount"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="指导老师姓名"
                      :label-width="formLabelWidth">
          <el-input v-model="form.guideTeacherName"
                    disabled
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小组名"
                      :label-width="formLabelWidth">
          <el-input v-model="form.teamName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小组研究方向"
                      :label-width="formLabelWidth">
          <el-select v-model="form.teamDirection"
                     placeholder="请选择研究方向">
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
                   @click="modifyTeamInfo()">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import QS from 'qs'
export default {
  inject: ['reload'],
  data() {
    return {
      activeName: 'teamPreview',
      tableData: null,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        id: '',
        guideTeacherAccount: '',
        guideTeacherName: '',
        teamName: '',
        teamDirection: ''
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      //   console.log(tab, event)
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.form.id = row.id
      this.form.guideTeacherAccount = row.guideTeacherAccount
      this.form.guideTeacherName = row.guideTeacherName
      this.form.teamName = row.teamName
      this.form.teamDirection = row.teamDirection
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该小组？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/api/team/deleteTeam/' + row.id)
            .then(response => {})
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
    getAllTeamInfo() {
      this.$axios
        .get('/api/team/getAllTeam')
        .then(response => {
          this.tableData = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    modifyTeamInfo() {
      this.$axios
        .post('/api/team/modifyTeamInfo', QS.stringify(this.form), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => {
          this.reload()
        })
        .catch(error => {
          console.error(error)
        })
    }
  },

  mounted() {
    this.getAllTeamInfo()
  }
}
</script>