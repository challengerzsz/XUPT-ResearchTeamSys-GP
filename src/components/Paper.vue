<template>

  <div class="paperDiv">
    <span class="dividerSpan">
      <el-divider>功能选项</el-divider>
    </span>
    <span>
      <el-row class="buttonRow">
        <el-button type="primary"
                   @click="uploadPaper()">上传小论文</el-button>
      </el-row>
    </span>
    <span class="dividerSpan">
      <el-divider>已上传小论文</el-divider>
    </span>

    <div>
      <el-table :data="tableData"
                height="500px"
                border
                style="width: 100%">
        <el-table-column prop="date"
                         label="论文题目"
                         width="180">
        </el-table-column>
        <el-table-column prop="name"
                         label="作者"
                         width="180">
        </el-table-column>
        <el-table-column prop="address"
                         label="附件">
        </el-table-column>
        <el-table-column prop="options"
                         label="录用时间">
        </el-table-column>
        <el-table-column prop="options"
                         label="操作">
        </el-table-column>
      </el-table>
    </div>

    <!-- ----------------------------------------上传小论文对话框------------------------------------------- -->
    <el-dialog title="提示"
               :visible.sync="uploadPaperDialogVisible"
               width="650px"
               :before-close="handleUploadDialogClose">
      <el-steps :active="uploadPaperActive"
                align-center
                finish-status="success">
        <el-step title="完善文献信息"></el-step>
        <el-step title="上传文献附件"></el-step>
      </el-steps>
      <div class="postDocument"
           v-show="uploadPaperShowForm">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="论文题目">
            <el-input v-model="form.topic"></el-input>
          </el-form-item>
          <el-form-item label="中文摘要">
            <el-input type="textarea"
                      v-model="form.abstractZh"></el-input>
          </el-form-item>
          <el-form-item label="英文摘要">
            <el-input type="textarea"
                      v-model="form.abstractEn"></el-input>
          </el-form-item>
          <el-form-item label="论文接受时间">
            <el-date-picker v-model="form.acceptTime"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="uploadPaperShowFile">
        <el-upload class="upload-demo"
                   drag
                   :headers="token"
                   :action="uploadPaperFileApi"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip"
               slot="tip">只能上传.pdf文件</div>
        </el-upload>
      </div>

      <span slot="footer"
            class="dialog-footer">

        <el-button style="margin-top: 12px;"
                   @click="uploadPaperNext">{{uploadPaperMention}}</el-button>
      </span>
    </el-dialog>

  </div>

</template>
<script>
import QS from 'qs'
export default {
  inject: ['reload'],
  data() {
    return {
      token: {
        Authorization: ''
      },
      uploadPaperFileApi: '',
      uploadPaperMention: '下一步',
      uploadPaperActive: 0,
      uploadPaperDialogVisible: false,
      uploadPaperShowForm: true,
      uploadPaperShowFile: false,
      uploadPaperId: null,
      form: {
        topic: '',
        abstractZh: '',
        abstractEn: '',
        acceptTime: '',
        type: 0
      },
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  methods: {
    uploadPaper() {
      this.uploadPaperDialogVisible = true
    },
    getToken() {
      this.token.Authorization = localStorage.getItem('TOKEN')
    },
    uploadPaperNext() {
      this.uploadPaperActive++
      if (this.uploadPaperActive == 1) {
        this.$axios
          .post('/api/paper/upload', QS.stringify(this.form))
          .then(response => {
            console.log(response.data.data)
            if (response.data.status == 1) {
              this.uploadPaperId = response.data.data
              this.uploadPaperFileApi =
                '/api/paper/uploadFile/' + this.uploadPaperId
            }
          })
          .catch(error => {
            console.error(error)
          })
        this.uploadPaperShowForm = false
        this.uploadPaperShowFile = true
      }
      if (this.uploadPaperActive == 2) {
        this.uploadPaperMention = '完成'
      }
      if (this.uploadPaperActive == 3) {
        this.uploadPaperDialogVisible = false
        this.reload()
      }
    },
    handleUploadDialogClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.reset()
        })
        .catch(_ => {})
    },
    reset() {
      this.uploadPaperDialogVisible = false
      this.uploadPaperActive = 0
      this.uploadPaperMention = '下一步'
      this.uploadPaperShowForm = true
      this.uploadPaperShowFile = false
    }
  },
  mounted() {
    this.getToken()
  }
}
</script>
<style scoped>
.buttonRow {
  float: left;
}
.dividerSpan {
  float: left;
  width: 100%;
}
</style>