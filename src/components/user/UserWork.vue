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
                     @click="uploadOpeningReport()">上传开题报告<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <div style="margin-top:20px;margin-left:20px;display: inline-block;">
          <el-button type="primary"
                     @click="postDialogVisible = true">修改开题报告<i class="el-icon-edit el-icon--right"></i></el-button>
        </div>
        <div style="margin-top:20px;margin-left:20px;display: inline-block;">
          <el-button type="primary"
                     @click="postDialogVisible = true">下载报告附件<i class="el-icon-download el-icon--right"></i></el-button>
        </div>
      </div>

    </div>

    <div class="midReportDiv">
      <el-divider>中期报告情况</el-divider>
      <div>
        <el-progress type="circle"
                     :width="progressWidth"
                     :percentage="openingReportStatus"
                     :status="openingReportIcon"></el-progress>
        <div><br /></div>
        <h3>中期报告状态</h3>
        <div><br /></div>
      </div>
      <div style="margin-top:20px;display: inline-block;">
        <el-button type="primary"
                   @click="postDialogVisible = true">上传中期报告<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>
      <div style="margin-top:20px;margin-left:20px;display: inline-block;">
        <el-button type="primary"
                   @click="postDialogVisible = true">修改中期报告<i class="el-icon-edit el-icon--right"></i></el-button>
      </div>
      <div style="margin-top:20px;margin-left:20px;display: inline-block;">
        <el-button type="primary"
                   @click="postDialogVisible = true">下载报告附件<i class="el-icon-download el-icon--right"></i></el-button>
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

      <div v-show="showForm">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="论文题目">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div v-show="showUploader">

        <el-upload class="upload-demo"
                   drag
                   action="https://jsonplaceholder.typicode.com/posts/"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip"
               slot="tip">只能上传.pdf文件</div>
        </el-upload>

      </div>

      <el-button style="margin-top: 12px;"
                 @click="next">下一步</el-button>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="postDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="postDialogVisible = false">完 成</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      progressWidth: 100,
      openingReportStatus: 0,
      openingReportIcon: 'exception',
      postDialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      activeName: 'openingReport',
      active: 0,
      showForm: true,
      showUploader: false,
      name: '',
      data: {
        author: ''
      }
    }
  },
  methods: {
    uploadOpeningReport() {
      this.postDialogVisible = true
      this.name = '上传开题报告'
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submit() {},
    next() {
      this.active++
      if (this.active == 1) {
        this.showForm = false
        this.showUploader = true
      }
    }
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