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
                style="width: 100%">
        <el-table-column prop="topic"
                         label="论文题目"
                         width="auto">
        </el-table-column>
        <el-table-column prop="acceptTime"
                         label="录用时间">
        </el-table-column>
        <el-table-column prop="options"
                         label="操作">
          <template slot-scope="scope">

            <div slot="reference"
                 class="name-wrapper">
              <el-button size="mini"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-tag size="medium">
                <i class="el-icon-share"></i>
                <a :href="scope.row.pdfUrl"
                   target="_blank">下载附件</a>
              </el-tag>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ----------------------------------------上传小论文对话框------------------------------------------- -->
    <el-dialog title="上传小论文"
               :visible.sync="uploadPaperDialogVisible"
               width="650px"
               :before-close="handleModifyDialogClose">
      <el-steps :active="uploadPaperActive"
                align-center
                finish-status="success">
        <el-step title="完善小论文信息"></el-step>
        <el-step title="上传小论文附件"></el-step>
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

    <!-- ----------------------------------------修改小论文对话框------------------------------------------- -->
    <el-dialog title="修改小论文"
               :visible.sync="modifyPaperDialogVisible"
               width="650px"
               :before-close="handleModifyDialogClose">
      <el-steps :active="modifyPaperActive"
                align-center
                finish-status="success">
        <el-step title="修改小论文信息"></el-step>
        <el-step title="重新上传小论文附件"></el-step>
      </el-steps>
      <div class="postDocument"
           v-show="modifyPaperShowForm">
        <el-form ref="modifyForm"
                 :model="modifyForm"
                 label-width="100px">
          <el-form-item label="论文题目">
            <el-input v-model="modifyForm.topic"></el-input>
          </el-form-item>
          <el-form-item label="中文摘要">
            <el-input type="textarea"
                      v-model="modifyForm.abstractZh"></el-input>
          </el-form-item>
          <el-form-item label="英文摘要">
            <el-input type="textarea"
                      v-model="modifyForm.abstractEn"></el-input>
          </el-form-item>
          <el-form-item label="论文接受时间">
            <el-date-picker v-model="modifyForm.acceptTime"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="modifyPaperShowFile">
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
                   @click="modifyPaperNext">{{modifyPaperMention}}</el-button>
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
      tableData: null,
      modifyPaperDialogVisible: false,
      modifyForm: {
        id: null,
        topic: '',
        abstractZh: '',
        abstractEn: '',
        acceptTime: '',
        type: 0
      },
      modifyPaperActive: 0,
      modifyPaperMention: '下一步',
      modifyPaperShowForm: true,
      modifyPaperShowFile: false
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
          .post('/api/paper/upload', QS.stringify(this.modifyForm))
          .then(response => {
            if (response.data.status == 1) {
              this.uploadPaperId = response.data.data
              this.uploadPaperFileApi =
                '/api/paper/uploadFile/' + this.modifyForm.id
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
          this.resetUploadDialog()
        })
        .catch(_ => {})
    },
    resetUploadDialog() {
      this.uploadPaperDialogVisible = false
      this.uploadPaperActive = 0
      this.uploadPaperMention = '下一步'
      this.uploadPaperShowForm = true
      this.uploadPaperShowFile = false
    },
    handleEdit(index, row) {
      this.modifyPaperDialogVisible = true
      this.modifyForm.topic = row.topic
      this.modifyForm.abstractZh = row.abstractZh
      this.modifyForm.abstractEn = row.abstractEn
      this.modifyForm.acceptTime = row.acceptTime
      this.modifyForm.id = row.id
    },
    handleModifyDialogClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.resetModifyDialog()
        })
        .catch(_ => {})
    },
    resetModifyDialog() {
      this.modifyPaperDialogVisible = false
      this.modifyPaperActive = 0
      this.modifyPaperMention = '下一步'
      this.modifyPaperShowForm = true
      this.modifyPaperShowFile = false
    },
    modifyPaperNext() {
      this.modifyPaperActive++
      if (this.modifyPaperActive == 1) {
        this.$axios
          .post('/api/paper/modifyPaper', QS.stringify(this.modifyForm))
          .then(response => {
            if (response.data.status == 1) {
              this.uploadPaperFileApi =
                '/api/paper/uploadFile/' + this.modifyForm.id
            }
          })
          .catch(error => {
            console.error(error)
          })
        this.modifyPaperShowForm = false
        this.modifyPaperShowFile = true
      }
      if (this.modifyPaperActive == 2) {
        this.modifyPaperMention = '完成'
      }
      if (this.modifyPaperActive == 3) {
        this.modifyPaperDialogVisible = false
        this.reload()
      }
    },
    getAllMyPaper() {
      this.$axios
        .get('/api/paper/getMyPaper/0')
        .then(response => {
          if (response.data.status == 1) {
            this.tableData = response.data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.getToken()
    this.getAllMyPaper()
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