<template>

  <div class="projectDiv">
    <span style="float:left;width:100%">
      <el-divider>功能选项</el-divider>
    </span>
    <span>
      <el-row style="float:left">
        <el-button type="primary"
                   @click="uploadProject('uploadProjectForm')">上传项目信息</el-button>
      </el-row>
    </span>

    <span style="float:left;width:100%">
      <el-divider>已上传项目信息</el-divider>
    </span>

    <div>

      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="projectNo"
                         label="项目编号"
                         width="auto">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.projectNo }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="projectName"
                         label="项目名">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.projectName }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type"
                         label="类型">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.type }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="level"
                         label="级别">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.level }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="hostName"
                         label="主持人">
        </el-table-column>
        <el-table-column prop="members"
                         label="参与人员">
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

    <!-- -----------------------------------------------上传项目信息弹窗-------------- -->
    <el-dialog :title="dialogName"
               :visible.sync="uploadProjectDialogVisible"
               width="650px"
               center=""
               :before-close="handleUploadProjectDialogClose">
      <div class="uploadProject">
        <el-form ref="uploadProjectForm"
                 :model="uploadProjectForm"
                 label-width="100px">
          <el-form-item label="项目编号"
                        prop="projectNo">
            <el-input v-model="uploadProjectForm.projectNo"
                      style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="项目名称"
                        prop="projectName">
            <el-input v-model="uploadProjectForm.projectName"
                      style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="类型"
                        prop="type">
            <el-select v-model="uploadProjectForm.type"
                       placeholder="请选择"
                       style="width:300px">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别"
                        prop="level">
            <el-select v-model="uploadProjectForm.level"
                       placeholder="请选择"
                       style="width:300px">
              <el-option v-for="item in levelOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主持人"
                        prop="hostName">
            <el-input v-model="uploadProjectForm.hostName"
                      style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="参与人员"
                        prop="members">
            <el-input v-model="uploadProjectForm.members"
                      style="width:300px"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer"
            class="dialog-footer">

        <el-button style="margin-top: 12px;"
                   @click="uploadProjectSubmit"
                   v-show="uploadButton">提交</el-button>
        <el-button style="margin-top: 12px;"
                   @click="modifyProjectSubmit"
                   v-show="modifyButton">修改</el-button>
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
      dialogName: '',
      buttonName: '',
      tableData: null,
      uploadProjectDialogVisible: false,
      uploadButton: null,
      modifyButton: null,
      uploadFormShow: null,
      modifyFormShow: null,
      uploadProjectForm: {
        id: null,
        projectNo: '',
        projectName: '',
        type: '',
        level: '',
        hostName: '',
        members: ''
      },
      typeOptions: [
        {
          value: '国家级',
          label: '国家级'
        },
        {
          value: '省级',
          label: '省级'
        },
        {
          value: '市级',
          label: '市级'
        },
        {
          value: '区级',
          label: '区级'
        }
      ],
      levelOptions: [
        {
          value: '一等奖',
          label: '一等奖'
        },
        {
          value: '二等奖',
          label: '二等奖'
        },
        {
          value: '三等奖',
          label: '三等奖'
        }
      ]
    }
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm('确认删除该项目记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/api/dailyWork/project/delete/' + row.id)
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
    handleEdit(index, row) {
      this.uploadProjectDialogVisible = true
      this.modifyButton = true
      this.uploadButton = false
      this.uploadProjectForm.projectNo = row.projectNo
      this.uploadProjectForm.projectName = row.projectName
      this.uploadProjectForm.type = row.type
      this.uploadProjectForm.level = row.level
      this.uploadProjectForm.hostName = row.hostName
      this.uploadProjectForm.members = row.members
      this.uploadProjectForm.id = row.id
      //   this.uploadFormShow = false
      //   this.modifyFormShow = true
      this.dialogName = '修改项目信息'
    },
    modifyProjectSubmit() {
      this.$axios
        .post(
          '/api/dailyWork/project/modifyProject',
          QS.stringify(this.uploadProjectForm)
        )
        .then(response => {
          if (response.data.status == 1) {
            this.uploadProjectDialogVisible = false
            this.reload()
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    uploadProject(str) {
      this.uploadProjectDialogVisible = true
      this.modifyButton = false
      this.uploadButton = true
      //   this.uploadFormShow = true
      //   this.modifyFormShow = false
      this.dialogName = '上传项目信息'
    },
    getAllProjectInfo() {
      this.$axios
        .get('/api/dailyWork/project/getAll')
        .then(response => {
          if (response.data.status == 1) {
            this.tableData = response.data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleUploadProjectDialogClose() {
      this.uploadProjectDialogVisible = false
    },
    uploadProjectSubmit() {
      this.$axios
        .post(
          '/api/dailyWork/project/upload',
          QS.stringify(this.uploadProjectForm)
        )
        .then(response => {
          if (response.data.status == 1) {
            this.uploadProjectDialogVisible = false
            this.reload()
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.getAllProjectInfo()
  }
}
</script>