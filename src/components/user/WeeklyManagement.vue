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
                         width="180">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.title }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleSelect(scope.$index, scope.row)">查看周报内容</el-button>
            <el-button size="mini"
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
      var date = new Date()
      var w = date.getDay()
      var d = date.getDate()
      if (w == 0) {
        w = 7
      }
      var week = ['第一周', '第二周', '第三周', '第四周']
      var config = {
        getMonth: date.getMonth() + 1,
        getYear: date.getFullYear(),
        getWeek: week[Math.ceil((d + 6 - w) / 7) - 1]
      }
      this.weeklyReportName =
        config.getYear +
        '年 ' +
        config.getMonth +
        '月 ' +
        config.getWeek +
        '周报'
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