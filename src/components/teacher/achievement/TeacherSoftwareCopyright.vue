<template>
  <div>
    <span style="float:left;width:100%">
      <el-divider>功能选项</el-divider>
    </span>
    <span>
      <el-row style="float:left">
        <el-button type="primary"
                   @click="uploadSoftwareCopyright()">上传专利信息</el-button>
      </el-row>
    </span>
    <span style="float:left;width:100%">
      <el-divider>已上传的软件著作权信息</el-divider>
    </span>
    <el-table :data="tableData"
              stripe
              style="width: 100%">
      <el-table-column prop="softwareCopyrightName"
                       label="软件著作权"
                       width="180">

        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium">{{ scope.row.softwareCopyrightName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="members"
                       label="参与人员"
                       width="180">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium">{{ scope.row.members }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="documentPath"
                       label="文档">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium"><a :href="scope.row.documentPath"
                 target="_blank">下载文档</a></el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="projectPath"
                       label="代码">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium"><a :href="scope.row.projectPath"
                 target="_blank">下载代码</a></el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="certificatePath"
                       label="证书">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium"><a :href="scope.row.certificatePath"
                 target="_blank">下载证书</a></el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="time"
                       label="时间">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium">{{ scope.row.time }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="options"
                       label="操作">
        <template slot-scope="scope">

          <div slot="reference"
               class="name-wrapper">
            <el-button size="small"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>

    <!-- -----------------------------------------------上传专利信息弹出框-------- -->
    <el-dialog title="上传专利信息"
               :visible.sync="uploadSCDialogVisible"
               width="500px"
               center>
      <el-steps :active="uploadSCActive"
                align-center
                finish-status="success">
        <el-step title="完善软著信息"></el-step>
        <el-step title="上传软著文档"></el-step>
        <el-step title="上传软著代码"></el-step>
        <el-step title="上传软著证书"></el-step>
      </el-steps>
      <el-form ref="uploadSCFrom"
               v-show="showUploadSCFrom"
               :model="uploadSCFrom"
               style="margin-top:40px"
               label-width="110px">
        <el-form-item label="软件著作权名称">
          <el-input v-model="uploadSCFrom.softwareCopyrightName"></el-input>
        </el-form-item>
        <el-form-item label="参与人员">
          <el-input v-model="uploadSCFrom.members"></el-input>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker v-model="uploadSCFrom.time"
                          type="date"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

      </el-form>

      <div v-show="showUploadSCFile">
        <el-upload class="upload-demo"
                   style="margin-top:40px;margin-left:50px"
                   drag
                   :limit="3"
                   :headers="token"
                   :action="uploadSCFileApi"
                   :on-success="handleUploadSuccess"
                   accept=".pdf,.PDF">
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
        <el-button type="primary"
                   v-show="showButton"
                   @click="uploadSCDialogButtonClick">{{uploadSCDialogButtonName}}</el-button>
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
      tableData: null,
      uploadSCDialogVisible: false,
      uploadSCFrom: {
        softwareCopyrightName: '',
        members: '',
        time: ''
      },
      uploadSCActive: 0,
      uploadSCDialogButtonName: '下一步',
      showUploadSCFrom: true,
      showUploadSCFile: false,
      uploadSCFileApi: '',
      uploadSCId: '',
      showButton: true
    }
  },
  methods: {
    getToken() {
      this.token.Authorization = localStorage.getItem('TOKEN')
    },
    getSoftWareCopyrightInfo() {
      this.$axios
        .get('/api/achievement/softWareCopyright/getAll')
        .then(response => {
          if (response.data.status == 1) {
            this.tableData = response.data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    uploadSoftwareCopyright() {
      this.uploadSCDialogVisible = true
    },
    handleEdit(index, row) {
      //   this.modifyPatentDialogVisible = true
      //   this.modifyPatenForm.id = row.id
      //   this.modifyPatenForm.patentName = row.patentName
      //   this.modifyPatenForm.members = row.members
      //   this.modifyPatenForm.status = row.status
      //   this.modifyPatenForm.patentTime = row.patentTime
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该软件著作权记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/api/achievement/softWareCopyright/delete/' + row.id)
            .then(response => {
              if (response.data.status == 1) {
                this.reload()
              }
            })
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
    uploadSCDialogButtonClick() {
      this.uploadSCActive++
      if (this.uploadSCActive == 1) {
        this.$axios
          .post(
            '/api/achievement/softWareCopyright/upload',
            QS.stringify(this.uploadSCFrom)
          )
          .then(response => {
            if (response.data.status == 1) {
              this.uploadSCId = response.data.data
              this.uploadSCFileApi =
                '/api/achievement/softWareCopyright/uploadFile/' +
                this.uploadSCId +
                '/0'
              this.showUploadSCFrom = false
              this.showUploadSCFile = true
              this.showButton = false
            }
          })
          .catch(error => {
            console.error(error)
          })
      }
      if (this.uploadSCActive >= 5) {
        this.uploadSCDialogVisible = false
        this.uploadSCDialogButtonName = '下一步'
        this.showUploadSCFrom = true
        this.showUploadSCFile = false
        this.uploadSCActive = 0
        this.reload()
      }
    },
    handleUploadSuccess() {
      this.uploadSCActive++
      if (this.uploadSCActive == 2) {
        this.uploadSCFileApi =
          '/api/achievement/softWareCopyright/uploadFile/' +
          this.uploadSCId +
          '/1'
      }
      if (this.uploadSCActive == 3) {
        this.uploadSCFileApi =
          '/api/achievement/softWareCopyright/uploadFile/' +
          this.uploadSCId +
          '/2'
      }
      if (this.uploadSCActive == 4) {
        this.showButton = true
        this.uploadSCDialogButtonName = '完成'
      }
    }
  },
  mounted() {
    this.getSoftWareCopyrightInfo()
    this.getToken()
  }
}
</script>