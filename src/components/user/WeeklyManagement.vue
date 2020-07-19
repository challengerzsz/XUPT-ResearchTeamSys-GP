<template>
  <div>
    <div class="options">
      <el-row class="elRow">
        <el-button type="primary"
                   style="float:left;margin-left:10px"
                   @click="writeDialogVisible = true">开始写本周周报</el-button>
      </el-row>

      <el-divider style="width:100%">历史周报</el-divider>
      <el-table :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column prop="title"
                         label="周报标题"
                         width="300px">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.title }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="medium"
                       type="success"
                       @click="handleSelect(scope.$index, scope.row)">查看周报内容</el-button>
            <el-button size="mediu"
                       type="primary"
                       @click="getComment(scope.$index, scope.row)">查看周报批注</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ----------------------------------------写周报弹窗--------------------------- -->
    <el-dialog :visible.sync="writeDialogVisible"
               width="70%"
               :before-close="handleClose">
      <div>
        <h2> {{weeklyReportName}}</h2>
      </div>
      <div class="editor">
        <mavon-editor v-model="content"
                      ref="md"
                      @change="change"
                      style="min-height: 600px" />
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="writeDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submit()">提 交</el-button>
      </span>
    </el-dialog>

    <!-- ------------------------------------------------获取某一周周报内容弹窗------------------------------------ -->
    <el-dialog :title="weeklyReportInfoTitle"
               :visible.sync="weeklyReportInfoDialogVisible"
               width="70%"
               :before-close="handleClose">
      <div class="editor">
        <mavon-editor v-model="content"
                      ref="md"
                      @change="change"
                      style="min-height: 600px" />
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="weeklyReportInfoDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- ----------------------------------------------获取某周周报批注弹窗--------------------------- -->
    <el-dialog :title="weeklyReportCommentTitle"
               :visible.sync="weeklyReportCommentDialogVisible"
               width="1000px"
               :before-close="handleClose">

      <el-table :data="commentTable"
                style="width: 100%">
        <el-table-column prop="weeklyReportId"
                         label="周报ID"
                         width="180">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.weeklyReportId }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="teacherAccount"
                         label="教师工号"
                         width="180">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.teacherAccount }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="teacherName"
                         label="教师姓名"
                         width="180">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.teacherName }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="content"
                         label="批注内容"
                         width="180">
        </el-table-column>
      </el-table>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="weeklyReportCommentDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import QS from 'qs'
export default {
  inject: ['reload'],
  name: 'weeklyManagement',
  components: {
    mavonEditor
  },
  data() {
    return {
      weeklyReportName: '',
      content: '', // 输入的markdown
      html: '', // 及时转的html
      writeDialogVisible: false,
      weeklyByIdContent: '',
      weeklyReportInfoDialogVisible: false,
      weeklyReportCommentDialogVisible: false,
      tableData: null,
      weeklyReportInfoTitle: '',
      weeklyReportCommentTitle: '',
      commentTable: null
    }
  },
  methods: {
    handleSelect(index, row) {
      this.weeklyReportInfoTitle = row.title
      this.content = row.reportContentMd
      this.weeklyReportInfoDialogVisible = true
    },
    getComment(index, row) {
      this.weeklyReportCommentTitle = row.title + '的批注'
      this.$axios
        .get('/api/weeklyReport/getComments/' + row.id)
        .then(response => {
          if (response.data.status == 1) {
            this.commentTable = response.data.data
            this.weeklyReportCommentDialogVisible = true
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    getAllMyWeeklyReport() {
      this.$axios
        .get('/api/weeklyReport/getAllWeeklyReport')
        .then(response => {
          if (response.data.status == 1) {
            this.tableData = response.data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    getWeeklyReportName() {
      var config = this.getNowDateAndNowWeek(new Date().getTime())
      this.weeklyReportName = config.Monday + ' - ' + config.Sunday + ' 周报'
    },
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
    },
    // 提交
    submit() {
      var data = {
        title: this.weeklyReportName,
        reportContentMd: this.content,
        reportContentH5: this.html
      }

      this.$axios
        .post('/api/weeklyReport/uploadWeeklyReport', QS.stringify(data))
        .then(response => {
          if (response.data.status == 1) {
            this.reload()
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    /**
     * 获取选择当前的第几周，当前的周一、周日
     * time 选择日期的时间戳
     */
    getNowDateAndNowWeek(time) {
      //选中的时间戳
      var timestamp = time
      var serverDate = new Date(time)

      //本周周日的的时间
      var sundayTiem =
        timestamp + (7 - serverDate.getDay()) * 24 * 60 * 60 * 1000
      var SundayData = new Date(sundayTiem)
      //年
      var tomorrowY = SundayData.getFullYear()
      //月
      var tomorrowM =
        SundayData.getMonth() + 1 < 10
          ? '0' + (SundayData.getMonth() + 1)
          : SundayData.getMonth() + 1
      //日
      var tomorrowD =
        SundayData.getDate() < 10
          ? '0' + SundayData.getDate()
          : SundayData.getDate()

      // 本周周一的时间
      var mondayTime =
        timestamp - (serverDate.getDay() - 1) * 24 * 60 * 60 * 1000
      var mondayData = new Date(mondayTime)
      //年
      var mondayY = mondayData.getFullYear()
      //月
      var mondayM =
        mondayData.getMonth() + 1 < 10
          ? '0' + (mondayData.getMonth() + 1)
          : mondayData.getMonth() + 1
      //日
      var mondayD =
        mondayData.getDate() < 10
          ? '0' + mondayData.getDate()
          : mondayData.getDate()
      //输出值
      var config = {
        Sunday: tomorrowY + '/' + tomorrowM + '/' + tomorrowD,
        Monday: mondayY + '/' + mondayM + '/' + mondayD
      }
      return config
    }
  },
  mounted() {
    this.getWeeklyReportName()
    this.getAllMyWeeklyReport()
  }
}
</script>
<style scoped>
.editor {
  margin-top: 100px;
}
.options {
  float: left;
  width: 100%;
}
.oldWeeklyContent {
  float: left;
  margin-top: 100px;
  width: 100%;
}
</style>