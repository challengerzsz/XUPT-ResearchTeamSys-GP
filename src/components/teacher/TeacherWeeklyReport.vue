<template>
  <div>
    <el-divider>周报信息</el-divider>
    <el-select v-model="value"
               style="float:left;"
               placeholder="请选择">
      <el-option v-for="item in options"
                 :key="item.id"
                 :label="item.teamName"
                 :value="item.id"></el-option>
    </el-select>
    <el-table :data="weeklyReportData"
              style="width: 100%;margin-top:80px">
      <el-table-column label="周报标题"
                       style="width:25%">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周报作者"
                       style="width:25%">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium">{{ scope.row.userName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周报作者学号"
                       style="width:25%">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium">{{ scope.row.userAccount }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="options"
                       label="操作"
                       style="width:25%">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-button size="mini"
                       @click="handleSee(scope.$index, scope.row)">查看周报</el-button>
            <el-button size="mini"
                       @click="handleEditComments(scope.$index, scope.row)">批注</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="weeklyReportTitle"
               :visible.sync="weeklyReportSee"
               width="50%">
      <div v-html="weeklyReportH5">{{weeklyReportH5}}</div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="weeklyReportSee = false">取 消</el-button>
        <el-button type="primary"
                   @click="weeklyReportSee = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="批注"
               :visible.sync="weeklyReportComments"
               width="50%">
      <el-form ref="form"
               :model="form"
               label-width="90px">
        <el-form-item label="周报标题">
          <el-input disabled
                    v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="周报作者">
          <el-input disabled
                    v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="批注">
          <el-input type="textarea"
                    v-model="form.comments"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="weeklyReportComments = false">取 消</el-button>
        <el-button type="primary"
                   @click="weeklyReportCommentsSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script scope>
import QS from 'qs'
export default {
  data() {
    return {
      //批注表单数据
      form: {
        id: null,
        title: '',
        userName: '',
        comments: '',
      },
      //下拉框默认选择项
      value: '',
      options: [],
      // 科研小组table信息
      weeklyReportData: null,

      weeklyReportTitle: '',
      weeklyReportSee: false,
      weeklyReportH5: '',

      weeklyReportComments: false,
    }
  },
  methods: {
    getAllTeam() {
      this.$axios
        .get('/api/team/getMyTeams/')
        .then((response) => {
          if (response.data.status == 1) {
            this.options = response.data.data
            if (this.options.length > 0) {
              this.value = this.options[0].id
            }
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    //查看周报
    handleSee(index, row) {
      this.weeklyReportSee = true
      //this.modifyForm.topic = row.topic
      this.weeklyReportH5 = row.reportContentH5
      this.weeklyReportTitle = row.title
    },
    //批注
    handleEditComments(index, row) {
      this.weeklyReportComments = true
      this.form.id = row.id
      this.form.title = row.title
      this.form.userName = row.userName
    },
    weeklyReportCommentsSubmit() {
      this.weeklyReportComments = false
      var data = {
        comment: this.form.comments,
      }
      this.$axios
        .post('/api/weeklyReport/comment/' + this.form.id, QS.stringify(data))
        .then((response) => {})
        .catch((error) => {
          console.error(error)
        })
    },
  },
  mounted() {
    this.getAllTeam()
  },
  watch: {
    value(val, oldVal) {
      this.$axios
        .get('/api/weeklyReport/getTeamWeeklyReport/' + val)
        .then((response) => {
          if (response.data.status == 1) {
            this.weeklyReportData = response.data.data
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>