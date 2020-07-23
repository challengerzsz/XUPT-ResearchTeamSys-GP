<template>
  <div>
    <div class="openingReportDiv">
      <el-divider>开题报告情况</el-divider>
      <div class="openingReportInfo">
        <div style="margin-top:20px;">
          <el-progress type="circle"
                       :width="progressWidth"
                       :percentage="openingReportStatus"
                       :status="openingReportIcon"></el-progress>
          <div><br /></div>
          <h3>开题报告状态</h3>
          <div><br /></div>
        </div>
        <div style="margin-top:20px;display: inline-block;">
          <el-button type="primary"
                     :disabled="openingReportUploadButton"
                     @click="uploadOpeningReport()">上传开题报告<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <div style="margin-top:20px;margin-left:20px;display: inline-block;">
          <el-button type="primary"
                     :disabled="openingReportModifyButton"
                     @click="modifyOpeningReport()">修改开题报告<i class="el-icon-edit el-icon--right"></i></el-button>
        </div>
        <div style="margin-top:20px;margin-left:20px;display: inline-block;">
          <el-button type="primary"
                     v-show="showDownloadOpeningButton"><a :href="openingReport.reportUrl"
               style="color:#FFFFFF"
               target="_blank">下载报告附件</a><i class="el-icon-download el-icon--right"></i></el-button>
        </div>
      </div>

    </div>

    <div class="midReportDiv">
      <el-divider>中期报告情况</el-divider>
      <div>
        <el-progress type="circle"
                     :width="progressWidth"
                     :percentage="midReportStatus"
                     :status="midReportIcon"></el-progress>
        <div><br /></div>
        <h3>中期报告状态</h3>
        <div><br /></div>
      </div>
      <div style="margin-top:20px;display: inline-block;">
        <el-button type="primary"
                   :disabled="midReportUploadButton"
                   @click="uploadMidReport()">上传中期报告<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>
      <div style="margin-top:20px;margin-left:20px;display: inline-block;">
        <el-button type="primary"
                   :disabled="midReportModifyButton"
                   @click="modifyMidReport()">修改中期报告<i class="el-icon-edit el-icon--right"></i></el-button>
      </div>
      <div style="margin-top:20px;margin-left:20px;display: inline-block;">
        <el-button type="primary"
                   v-show="showDownloadMidButton"><a :href="midReport.reportUrl"
             style="color:#FFFFFF"
             target="_blank">下载报告附件</a><i class="el-icon-download el-icon--right"></i></el-button>
      </div>
    </div>

    <el-dialog :title="name"
               :visible.sync="postDialogVisible"
               width="500px"
               :before-close="handleClose">

      <el-steps :active="active"
                align-center
                finish-status="success">
        <el-step title="完善报告信息">
        </el-step>
        <el-step title="上传报告附件"></el-step>
      </el-steps>

      <div v-show="showForm"
           class="formDiv">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="论文题目">
            <el-input v-model="form.paperName"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div v-show="showUploader">

        <el-upload class="upload-demo"
                   drag
                   :headers="token"
                   :action="uploadReportAction"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <!-- <div class="el-upload__tip"
               slot="tip">只能上传.pdf文件</div> -->
        </el-upload>

      </div>

      <el-button style="margin-top: 12px;"
                 @click="next1">{{mention}}</el-button>

    </el-dialog>

    <!-- -----------------------------------------修改报告内容弹出框 -->

    <el-dialog :title="modifyName"
               :visible.sync="postDialogVisibleModify"
               width="500px"
               :before-close="handleModifyClose">

      <el-steps :active="active"
                align-center
                finish-status="success">
        <el-step title="修改报告信息">
        </el-step>
        <el-step title="修改报告附件"></el-step>
      </el-steps>

      <div v-show="showForm"
           class="formDiv">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="论文题目">
            <el-input v-model="form.paperName"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div v-show="showUploader">

        <el-upload class="upload-demo"
                   drag
                   :headers="token"
                   :action="modifyReportAction"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <!-- <div class="el-upload__tip"
               slot="tip">只能上传.pdf文件</div> -->
        </el-upload>

      </div>

      <el-button style="margin-top: 12px;"
                 @click="next2">{{mention}}</el-button>

    </el-dialog>

  </div>
</template>
<script>
import QS from 'qs'
export default {
  inject: ['reload'],
  data() {
    return {
      showDownloadOpeningButton: false,
      showDownloadMidButton: false,
      postDialogVisibleModify: false,
      uploadReportAction: '',
      progressWidth: 100,
      openingReportStatus: 0,
      midReportStatus: 0,
      openingReportIcon: 'exception',
      midReportIcon: 'exception',
      postDialogVisible: false,
      openingReportUploadButton: false,
      midReportUploadButton: false,
      openingReportModifyButton: false,
      midReportModifyButton: false,
      modifyReportAction: '',
      modifyName: '',
      mention: '下一步',
      openingReport: {},
      midReport: {},
      form: {
        id: null,
        paperName: ''
      },
      active: 0,
      showForm: true,
      showUploader: false,
      name: '',
      type: null,
      token: {
        Authorization: ''
      }
    }
  },
  methods: {
    uploadOpeningReport() {
      this.postDialogVisible = true
      this.name = '上传开题报告'
      this.type = 0
      this.uploadReportAction = '/api/work/report/uploadFile/' + this.type
    },
    uploadMidReport() {
      this.postDialogVisible = true
      this.name = '上传中期报告'
      this.type = 1
      this.uploadReportAction = '/api/work/report/uploadFile/' + this.type
    },
    modifyOpeningReport() {
      this.postDialogVisibleModify = true
      this.modifyName = '修改开题报告'
      this.form.paperName = this.openingReport.paperName
      this.type = 0
      this.modifyReportAction = '/api/work/report/uploadFile/' + this.type
    },
    modifyMidReport() {
      this.postDialogVisibleModify = true
      this.modifyName = '修改中期报告'
      this.form.paperName = this.openingReport.paperName
      this.type = 1
      this.modifyReportAction = '/api/work/report/uploadFile/' + this.type
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.reset()
        })
        .catch(_ => {})
    },
    handleModifyClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.reset()
        })
        .catch(_ => {})
    },
    next1() {
      this.active++
      if (this.active == 1) {
        this.$axios
          .post('/api/work/report/upload/' + this.type, QS.stringify(this.form))
          .then(response => {})
          .catch(error => {
            console.error(error)
          })
        this.showForm = false
        this.showUploader = true
      }
      if (this.active == 2) {
        this.mention = '完成'
      }
      if (this.active >= 3) {
        this.postDialogVisible = false
        this.reload()
      }
    },
    next2() {
      this.active++
      var str = QS.stringify(this.form)
      if (this.active == 1) {
        this.$axios
          .post('/api/work/report/modify/' + this.type, QS.stringify(this.form))
          .then(response => {})
          .catch(error => {
            console.error(error)
          })
        this.showForm = false
        this.showUploader = true
      }
      if (this.active == 2) {
        this.mention = '完成'
      }
      if (this.active >= 3) {
        this.postDialogVisibleModify = false
        this.reload()
      }
    },
    reset() {
      this.postDialogVisibleModify = false
      this.postDialogVisible = false
      this.showUploader = false
      this.showForm = true
      this.active = 0
      this.mention = '下一步'
    },
    getOpeningReport() {
      this.$axios
        .get('/api/work/report/' + 0)
        .then(response => {
          if (response.data.status == 1) {
            this.openingReport = response.data.data
            this.form.id = this.openingReport.id
            this.openingReportUploadButton = true
            this.openingReportIcon = 'success'
            this.openingReportStatus = 100
            this.showDownloadOpeningButton = true
          } else {
            this.showDownloadOpeningButton = false
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    getMidReport() {
      this.$axios
        .get('/api/work/report/' + 1)
        .then(response => {
          if (response.data.status == 1) {
            this.midReport = response.data.data
            this.midReportUploadButton = true
            this.midReportIcon = 'success'
            this.midReportStatus = 100
            this.showDownloadMidButton = true
          } else {
            this.showDownloadMidButton = false
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    getToken() {
      this.token.Authorization = localStorage.getItem('TOKEN')
    }
  },
  mounted() {
    this.getToken()
    this.getOpeningReport()
    this.getMidReport()
  }
}
</script>
<style scoped>
.openingReportTable {
  width: 100px;
}
.dialog {
  height: auto;
}
.postDocument {
  width: 500px;
}
.openingReportDiv {
  width: 100%;
  height: 300px;
}
</style>