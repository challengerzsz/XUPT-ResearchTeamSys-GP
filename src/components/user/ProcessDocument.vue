<template>
  <div>
    <div class="openInfo">
      <el-progress type="circle"
                   :percentage="100"
                   status="success"></el-progress>
      <div><br /></div>
      <h2>开题报告状态</h2>
      <div><br /></div>
      <el-button type="primary"
                 @click="postDialogVisible = true">上传开题报告<i class="el-icon-upload el-icon--right"></i></el-button>

    </div>
    <div class="midInfo">
      <el-progress type="circle"
                   :percentage="0"
                   status="exception"></el-progress>
      <div><br /></div>
      <h2>中期报告状态</h2>
      <div><br /></div>
      <el-button type="primary">上传中期报告<i class="el-icon-upload el-icon--right"></i></el-button>

    </div>
    <div>
      <el-dialog title="上传开题报告"
                 :visible.sync="postDialogVisible"
                 width="40%"
                 :before-close="handleClose">
        <div class="postDocument">
          <el-form ref="form"
                   :model="form"
                   label-width="80px">
            <el-form-item label="论文题目">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
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
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="postDialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="postDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submit() {}
  }
}
</script>
<style scoped>
.openInfo {
  float: left;
}
.dialog {
  height: auto;
}
.postDocument {
  width: 500px;
}
</style>