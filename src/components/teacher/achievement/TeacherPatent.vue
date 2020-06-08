<template>

  <div>
    <span style="float:left;width:100%">
      <el-divider>功能选项</el-divider>
    </span>

    <span>
      <el-row style="float:left">
        <el-button type="primary"
                   @click="uploadPatent()">上传专利信息</el-button>
      </el-row>
    </span>

    <div>

      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="patentName"
                         label="专利名称"
                         width="auto">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.patentName }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="members"
                         label="参与成员">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.members }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="filePath"
                         label="下载论文附件">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium"><a :href="scope.row.filePath"
                   target="_blank">下载专利附件</a></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status"
                         label="状态">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="patentTime"
                         label="专利申请时间">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.patentTime }}</el-tag>
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
                         @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- -------------------------------------上传专利信息弹窗---------------- -->
    <el-dialog title="上传专利信息"
               :visible.sync="uploadPatentDialogVisible"
               width="650px"
               center=""
               :before-close="handleUploadPatentDialogClose">

      <el-steps :active="uploadPatentActive"
                align-center
                finish-status="success">
        <el-step title="完善专利信息"></el-step>
        <el-step title="上传专利附件"></el-step>
      </el-steps>
      <div class="uploadPatent">
        <el-form ref="uploadPatentForm"
                 style="margin-left:70px;margin-top:40px"
                 v-show="showUploadPatentForm"
                 :model="uploadPatentForm"
                 label-width="100px">
          <el-form-item label="专利名称"
                        prop="patentName">
            <el-input v-model="uploadPatentForm.patentName"
                      style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="参与成员"
                        prop="members">
            <el-input v-model="uploadPatentForm.members"
                      style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="状态"
                        prop="status">
            <el-select v-model="uploadPatentForm.status"
                       placeholder="请选择"
                       style="width:300px">
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专利申请时间">
            <el-date-picker v-model="uploadPatentForm.patentTime"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div v-show="showUploadPatentFile">
          <el-upload class="upload-demo"
                     style="margin-left:130px;margin-top:40px"
                     drag
                     :headers="token"
                     :action="uploadPatentFileApi"
                     :on-success="handleUploadPatentFileSuccess"
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
      </div>

      <span slot="footer"
            class="dialog-footer">

        <el-button style="margin-top: 12px;"
                   v-show="showUploadButton"
                   @click="uploadPatentSubmit">提交</el-button>
        <el-button style="margin-top: 12px;"
                   v-show="showCompleteButton"
                   :disabled="completeButtonDisable"
                   @click="uploadPatentComplete">完成</el-button>
      </span>
    </el-dialog>

    <!-- -------------------------------------------------------修改专利信息--------------------- -->
    <!-- -------------------------------------上传专利信息弹窗---------------- -->
    <el-dialog title="修改专利信息"
               :visible.sync="modifyPatentDialogVisible"
               width="650px"
               center=""
               :before-close="handleModifyPatentDialogClose">

      <el-steps :active="modifyPatentActive"
                align-center
                finish-status="success">
        <el-step title="完善专利信息"></el-step>
        <el-step title="修改专利附件"></el-step>
      </el-steps>
      <div class="modifyPatent">
        <el-form ref="modifyPatentForm"
                 style="margin-left:70px;margin-top:40px"
                 v-show="showModifyPatenForm"
                 :model="modifyPatenForm"
                 label-width="100px">
          <el-form-item label="专利名称"
                        prop="patentName">
            <el-input v-model="modifyPatenForm.patentName"
                      style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="参与成员"
                        prop="members">
            <el-input v-model="modifyPatenForm.members"
                      style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="状态"
                        prop="status">
            <el-select v-model="modifyPatenForm.status"
                       placeholder="请选择"
                       style="width:300px">
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专利申请时间">
            <el-date-picker v-model="modifyPatenForm.patentTime"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div v-show="showModifyPatentFile">
          <el-upload class="upload-demo"
                     style="margin-left:130px;margin-top:40px"
                     drag
                     :headers="token"
                     :action="uploadPatentFileApi"
                     :on-success="handleModifyUploadPatentFileSuccess"
                     multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip"
                 slot="tip">只能上传.pdf文件 如果重新上传附件会直接覆盖旧文件</div>
          </el-upload>
        </div>
      </div>

      <span slot="footer"
            class="dialog-footer">

        <el-button style="margin-top: 12px;"
                   v-show="showModifyButton"
                   @click="modifyPatentSubmit">修改</el-button>
        <el-button style="margin-top: 12px;"
                   v-show="showModifyCompleteButton"
                   :disabled="modifyCompleteButtonDisable"
                   @click="modifyPatentComplete">完成</el-button>
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
      uploadPatentFileApi: '',
      uploadPatentDialogVisible: false,
      tableData: null,
      uploadPatentForm: {
        patentName: '',
        members: '',
        status: '',
        patentTime: ''
      },
      modifyPatentActive: 0,
      showModifyPatenForm: true,
      showUploadPatentFile: false,
      showModifyButton: true,
      showModifyCompleteButton: false,
      modifyCompleteButtonDisable: true,
      modifyPatenForm: {
        id: null,
        patentName: '',
        members: '',
        status: '',
        patentTime: ''
      },
      uploadPatentActive: 0,
      showUploadPatentForm: null,
      showUploadButton: null,
      showUploadPatentFile: null,
      showCompleteButton: null,
      completeButton: null,
      completeButtonDisable: true,
      uploadPatentId: '',
      showModifyPatentFile: false,
      statusOptions: [
        {
          value: '初步审查',
          label: '初步审查'
        },
        {
          value: '受理',
          label: '受理'
        },
        {
          value: '公布',
          label: '公布'
        },
        {
          value: '实质',
          label: '实质'
        },
        {
          value: '授权',
          label: '授权'
        }
      ],
      modifyPatentDialogVisible: false
    }
  },
  methods: {
    uploadPatent() {
      this.uploadPatentDialogVisible = true
      this.showUploadPatentForm = true
      this.showUploadPatentFile = false
      this.showUploadButton = true
      this.showCompleteButton = false
    },
    handleUploadPatentDialogClose() {
      this.uploadPatentDialogVisible = false
    },
    handleEdit(index, row) {
      this.modifyPatentDialogVisible = true
      this.modifyPatenForm.id = row.id
      this.modifyPatenForm.patentName = row.patentName
      this.modifyPatenForm.members = row.members
      this.modifyPatenForm.status = row.status
      this.modifyPatenForm.patentTime = row.patentTime
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该专项记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/api/achievement/patent/delete/' + row.id)
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
    getAllPatent() {
      this.$axios
        .get('/api/achievement/patent/getAll')
        .then(response => {
          if (response.data.status == 1) {
            this.tableData = response.data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    uploadPatentSubmit() {
      this.$axios
        .post(
          '/api/achievement/patent/upload',
          QS.stringify(this.uploadPatentForm)
        )
        .then(response => {
          if (response.data.status == 1) {
            this.uploadPatentId = response.data.data
            this.uploadPatentFileApi =
              '/api/achievement/patent/uploadFile/' + this.uploadPatentId
            this.showUploadPatentForm = false
            this.showUploadPatentFile = true
            this.showUploadButton = false
            this.showCompleteButton = true
            this.uploadPatentActive = 1
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    uploadPatentComplete() {
      this.uploadPatentDialogVisible = false
      this.reload()
    },
    handleUploadPatentFileSuccess() {
      this.completeButtonDisable = false
      this.uploadPatentActive = 2
    },
    getToken() {
      this.token.Authorization = localStorage.getItem('TOKEN')
    },
    handleModifyPatentDialogClose() {
      this.modifyPatentDialogVisible = false
      this.showModifyPatentFile = false
      this.showModifyPatenForm = true
      this.modifyPatentActive = 0
      this.showModifyButton = true
      this.showModifyCompleteButton = false
    },
    handleModifyUploadPatentFileSuccess() {
      this.modifyPatentActive = 2
      this.modifyCompleteButtonDisable = false
    },
    modifyPatentSubmit() {
      this.$axios
        .post(
          '/api/achievement/patent/modify',
          QS.stringify(this.modifyPatenForm)
        )
        .then(response => {
          if (response.data.status == 1) {
            this.uploadPatentFileApi =
              '/api/achievement/patent/uploadFile/' + this.modifyPatenForm.id
            this.showUploadPatentForm = false
            this.showUploadPatentFile = true
            this.showUploadButton = false
            this.showCompleteButton = true
            this.uploadPatentActive = 1
          }
        })

      this.showModifyPatenForm = false
      this.showModifyPatentFile = true
      this.showModifyButton = false
      this.showModifyCompleteButton = true
      this.modifyPatentActive = 1
    },
    modifyPatentComplete() {
      this.modifyCompleteButtonDisable = false
      this.reload()
    }
  },
  mounted() {
    this.getToken()
    this.getAllPatent()
  }
}
</script>