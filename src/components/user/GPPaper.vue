<template>
  <div class="gpPaper">
    <div class="gpPaperDiv">
      <el-divider>毕业论文情况</el-divider>
      <div class="openingReportInfo">
        <div style="margin-top:20px;">
          <el-progress type="circle"
                       :width="progressWidth"
                       :percentage="gpPaperStatus"
                       :status="gpPaperIcon"></el-progress>
          <div><br /></div>
          <h3>毕业论文状态</h3>
          <div><br /></div>
        </div>
        <!-- <div style="margin-top:20px;display: inline-block;">
          <el-button type="primary"
                     :disabled="uploadGpPaperButtonDisable"
                     @click="uploadGpPaper()">上传毕业论文<i class="el-icon-upload el-icon--right"></i></el-button>
        </div> -->
        <div style="margin-top:20px;margin-left:20px;display: inline-block;">
          <el-button type="primary"
                     :disabled="modifyGpPaperButtonDisable"
                     @click="modifyGpPaper()">修改毕业论文<i class="el-icon-edit el-icon--right"></i></el-button>
        </div>
        <div style="margin-top:20px;margin-left:20px;display: inline-block;">
          <el-button type="primary"
                     :disabled="downloadGpPaperButtonDisable"
                     @click="postDialogVisible = true">
            <template>
              <a :href="downloadPdfUrl"
                 style="color:#FFFFFF"
                 target="_blank">下载毕业论文附件</a>
              <i class="el-icon-download el-icon--right"></i>
            </template>
          </el-button>
        </div>
        <div style="margin-top:20px;margin-left:20px;display: inline-block;">
          <el-button type="danger"
                     v-show="showDeleteButton"
                     @click="deleteGpPaper()">删除毕业论文<i class="el-icon-edit el-icon--right"></i></el-button>
        </div>
      </div>

    </div>

    <div>
      <el-tabs v-model="panActiveName"
               @tab-click="handleClick">
        <el-tab-pane label="上传毕业论文"
                     :disabled="uploadGpPaperDisable"
                     name="uploadGpPaper">

          <div class="uploadGpPaperForm">
            <el-steps :active="uploadGpPaperStepActive"
                      style="margin-left:70px"
                      align-center
                      finish-status="success">
              <el-step title="上传毕业论文信息"></el-step>
              <el-step title="上传毕业论文附件"></el-step>
            </el-steps>
            <el-form ref="uploadGpPaperForm"
                     v-show="uploadGpPaperFormShow"
                     style="margin-top:20px"
                     :model="uploadGpPaperForm"
                     label-width="100px">
              <el-form-item label="论文题目"
                            prop="topic">
                <el-input v-model="uploadGpPaperForm.topic"></el-input>
              </el-form-item>

              <el-form-item label="中文摘要"
                            prop="abstractZh">
                <el-input type="textarea"
                          :autosize="{ minRows: 4, maxRows: 10}"
                          v-model="uploadGpPaperForm.abstractZh"></el-input>
              </el-form-item>
              <el-form-item label="英文摘要"
                            prop="abstractEn">
                <el-input type="textarea"
                          :autosize="{ minRows: 4, maxRows: 10}"
                          v-model="uploadGpPaperForm.abstractEn"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="uploadGpPaperInfo">提交</el-button>
                <el-button @click="resetUploadGpPaperForm('uploadGpPaperForm')">重置</el-button>
              </el-form-item>
            </el-form>
            <div v-show="uploadGpPaperFileShow">
              <el-upload class="upload-demo"
                         style="margin-left:100px;margin-top:20px"
                         drag
                         :headers="token"
                         :on-success="handleUploadGpPaperSuccess"
                         :action="uploadGpPaperFileApi"
                         multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip"
                     slot="tip">只能上传.pdf文件</div>
              </el-upload>
              <el-button type="primary"
                         :disabled="uploadGpPaperCompleteDisable"
                         style="margin-left:100px;margin-top:20px"
                         @click="uploadGpPaperComplete">完成</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="毕业论文信息"
                     :disabled="gpPaperInfoPaneDisable"
                     name="gpPaperInfo">

          <el-collapse v-model="collapseActiveNames"
                       @change="handleChange">
            <el-collapse-item title="论文题目"
                              name="1">
              <div>
                <h2 v-if="gpPaper">{{gpPaper.topic}}</h2>
              </div>
            </el-collapse-item>
            <el-collapse-item title="中文摘要"
                              name="2">
              <div>
                <h3 v-if="gpPaper">{{gpPaper.abstractZh}}</h3>
              </div>
            </el-collapse-item>
            <el-collapse-item title="英文摘要"
                              name="3">
              <div>
                <h3 v-if="gpPaper">{{gpPaper.abstractEn}}</h3>
              </div>
            </el-collapse-item>
          </el-collapse>

        </el-tab-pane>
        <el-tab-pane label="修改毕业论文信息"
                     :disabled="modifyGppaperInfoPaneDisable"
                     name="modifyGppaperInfo">

          <!-- -------------------------------------修改--------------------------------------- -->
          <div class="modifyGpPaperForm">
            <el-steps :active="modifyGpPaperStepActive"
                      style="margin-left:70px"
                      align-center
                      finish-status="success">
              <el-step title="修改毕业论文信息"></el-step>
              <el-step title="修改毕业论文附件"></el-step>
            </el-steps>
            <el-form ref="modifyGpPaperForm"
                     v-show="modifyGpPaperFormShow"
                     style="margin-top:20px"
                     :model="modifyGpPaperForm"
                     label-width="100px">
              <el-form-item label="论文题目"
                            prop="topic">
                <el-input v-model="modifyGpPaperForm.topic"></el-input>
              </el-form-item>

              <el-form-item label="中文摘要"
                            prop="abstractZh">
                <el-input type="textarea"
                          :autosize="{ minRows: 4, maxRows: 10}"
                          v-model="modifyGpPaperForm.abstractZh"></el-input>
              </el-form-item>
              <el-form-item label="英文摘要"
                            prop="abstractEn">
                <el-input type="textarea"
                          :autosize="{ minRows: 4, maxRows: 10}"
                          v-model="modifyGpPaperForm.abstractEn"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="modifyGpPaperInfo">修改</el-button>
                <el-button @click="resetUploadGpPaperForm('uploadGpPaperForm')">重置</el-button>
              </el-form-item>
            </el-form>
            <div v-show="modifyGpPaperFileShow">
              <el-upload class="upload-demo"
                         style="margin-left:100px;margin-top:20px"
                         drag
                         :headers="token"
                         :on-success="handlemodifyGpPaperSuccess"
                         :action="modifyGpPaperFileApi"
                         multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip"
                     slot="tip">只能上传.pdf文件</div>
              </el-upload>
              <el-button type="primary"
                         :disabled="modifyGpPaperCompleteDisable"
                         style="margin-left:100px;margin-top:20px"
                         @click="modifyGpPaperComplete">完成</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
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
      showDeleteButton: false,
      downloadPdfUrl: '',
      progressWidth: 100,
      gpPaperStatus: 0,
      gpPaperIcon: 'exception',
      uploadGpPaperDisable: null,
      gpPaperInfoPaneDisable: null,
      modifyGppaperInfoPaneDisable: null,
      uploadGpPaperButtonDisable: null,
      modifyGpPaperButtonDisable: null,
      downloadGpPaperButtonDisable: null,
      panActiveName: 'uploadGpPaper',
      gpPaper: null,
      collapseActiveNames: ['1', '2', '3'],
      uploadGpPaperForm: {
        id: null,
        pdfUrl: '',
        topic: '',
        abstractZh: '',
        abstractEn: '',
        type: 1
      },
      uploadGpPaperStepActive: 0,
      uploadGpPaperFormShow: true,
      uploadGpPaperFileShow: false,
      uploadGpPaperFileApi: '',
      uploadGpPaperCompleteDisable: true,
      modifyGppaperInfoPaneDisable: null,
      modifyGpPaperFormShow: true,
      modifyGpPaperForm: {
        id: null,
        pdfUrl: '',
        topic: '',
        abstractZh: '',
        abstractEn: '',
        type: 1
      },
      modifyGpPaperFileShow: false,
      modifyGpPaperFileApi: '',
      modifyGpPaperCompleteDisable: true,
      modifyGpPaperStepActive: 0
    }
  },
  methods: {
    getToken() {
      this.token.Authorization = localStorage.getItem('TOKEN')
    },
    handleClick(tab, event) {
      if (tab.name === 'modifyGppaperInfo') {
        this.modifyGpPaper()
      }
    },
    deleteGpPaper() {
      // delete uploaded paper
      this.$axios
        .post('/api/paper/deletePaper/' + this.gpPaper.id + '/' + 1)
        .then(response => {
          if (response.data.status == 1) {
            this.reload()
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    getMyGpPaper() {
      this.$axios
        .get('/api/paper/getMyPaper/1')
        .then(response => {
          if (response.data.status == 1) {
            this.gpPaper = response.data.data[0]
            this.showDeleteButton = true
            this.uploadGpPaperDisable = true
            this.uploadGpPaperButtonDisable = true
            this.modifyGppaperInfoPaneDisable = false
            this.modifyGpPaperButtonDisable = false
            this.gpPaperInfoPaneDisable = false
            this.downloadGpPaperButtonDisable = false
            this.panActiveName = 'gpPaperInfo'
            this.gpPaperStatus = 100
            this.gpPaperIcon = 'success'
            this.downloadPdfUrl = this.gpPaper.pdfUrl
          } else if (response.data.status == 0) {
            this.modifyGppaperInfoPaneDisable = true
            this.gpPaperInfoPaneDisable = true
            this.modifyGpPaperButtonDisable = true
            this.downloadGpPaperButtonDisable = true
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleChange(val) {
      console.log(val)
    },
    uploadGpPaper() {
      this.panActiveName = 'uploadGpPaper'
    },
    modifyGpPaper() {
      this.panActiveName = 'modifyGppaperInfo'
      this.modifyGpPaperForm.id = this.gpPaper.id
      this.modifyGpPaperForm.topic = this.gpPaper.topic
      this.modifyGpPaperForm.abstractZh = this.gpPaper.abstractZh
      this.modifyGpPaperForm.abstractEn = this.gpPaper.abstractEn
    },
    uploadGpPaperInfo() {
      this.$axios
        .post('/api/paper/upload', QS.stringify(this.uploadGpPaperForm))
        .then(response => {
          if (response.data.status == 1) {
            this.uploadGpPaperForm.id = response.data.data
            this.uploadGpPaperFileApi =
              '/api/paper/uploadFile/' + this.uploadGpPaperForm.id
          }
        })
      this.uploadGpPaperStepActive = 1
      this.uploadGpPaperFormShow = false
      this.uploadGpPaperFileShow = true
    },
    resetUploadGpPaperForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleUploadGpPaperSuccess() {
      this.uploadGpPaperCompleteDisable = false
    },
    uploadGpPaperComplete() {
      this.uploadGpPaperDisable = true
      this.uploadGpPaperButtonDisable = true
      this.panActiveName = 'gpPaperInfo'
      this.gpPaperStatus = 100
      this.gpPaperIcon = 'success'
      this.getMyGpPaper()
    },
    handlemodifyGpPaperSuccess() {
      this.modifyGpPaperCompleteDisable = false
    },
    modifyGpPaperComplete() {
      this.panActiveName = 'gpPaperInfo'
      this.modifyGpPaperStepActive = 0
      this.modifyGpPaperFormShow = true
      this.modifyGpPaperFileShow = false
      this.getMyGpPaper()
    },
    modifyGpPaperInfo() {
      this.modifyGpPaperStepActive = 1
      this.$axios
        .post('/api/paper/modifyPaper', QS.stringify(this.modifyGpPaperForm))
        .then(response => {
          if (response.data.status == 1) {
            this.modifyGpPaperFileApi =
              '/api/paper/uploadFile/' + this.modifyGpPaperForm.id
            this.modifyGpPaperFormShow = false
            this.modifyGpPaperFileShow = true
          }
        })
    }
  },
  mounted() {
    this.getToken()
    this.getMyGpPaper()
  }
}
</script>
<style scoped>
.uploadGpPaperForm {
  width: 500px;
  margin-top: 20px;
}
.modifyGpPaperForm {
  width: 500px;
  margin-top: 20px;
}
</style>