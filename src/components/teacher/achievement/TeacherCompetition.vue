<template>
  <div class="paperDiv">
    <span class="dividerSpan">
      <el-divider>功能选项</el-divider>
    </span>
    <span>
      <el-row class="buttonRow">
        <el-button type="primary"
                   @click="uploadPaper()">上传竞赛信息</el-button>
      </el-row>
    </span>
    <span class="dividerSpan">
      <el-divider>已上传竞赛信息</el-divider>
    </span>

    <div>
      <el-table :data="tableData">
        <el-table-column label="竞赛名称"
                         style="width:auto">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.competitionName }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="竞赛级别">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">
                <i class="el-icon-user"></i>
                {{ scope.row.category }}
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="获奖类型">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.level }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="成员">
          <template slot-scope="scope">
            <span>{{ scope.row.members }}</span>
          </template>
        </el-table-column>

        <el-table-column label="竞赛时间">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.competitionTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="filePath"
                         label="项目附件">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <span v-if="scope.row.filePath == null">
                <el-tag size="medium">未上传附件</el-tag>
              </span>
              <span v-if="scope.row.filePath != null">
                <el-tag size="medium"><a :href="scope.row.filePath"
                     target="_blank">下载附件</a></el-tag>
              </span>

            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         width="400px">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
            <el-button type="success"
                       v-show="scope.row.filePath == null"
                       size="small"
                       @click="uploadFile(scope.row)">上传附件</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ----------------------------------------上传竞赛信息弹出框------------------------------------------- -->
    <el-dialog title="上传竞赛信息"
               :visible.sync="uploadPaperDialogVisible"
               width="650px"
               :before-close="handleUploadDialogClose">
      <div class="postDocument">
        <el-form ref="form"
                 :model="uploadForm"
                 label-width="100px">
          <el-form-item label="竞赛名称">
            <!-- <el-input v-model="form.topic"></el-input> -->
            <el-input type="text"
                      v-model="uploadForm.competitionName"></el-input>
          </el-form-item>
          <el-form-item label="竞赛级别">
            <el-input type="text"
                      v-model="uploadForm.category"></el-input>
          </el-form-item>
          <el-form-item label="获奖类型">
            <el-input type="text"
                      v-model="uploadForm.level"></el-input>
          </el-form-item>
          <el-form-item label="成员">
            <el-input type="text"
                      v-model="uploadForm.members"></el-input>
          </el-form-item>
          <el-form-item label="竞赛时间">
            <el-date-picker style="width:100%"
                            v-model="uploadForm.competitionTime"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button style="margin-top: 12px;"
                   @click="uploadPaperNext">{{uploadPaperMention}}</el-button>
      </span>
    </el-dialog>
    <!-- ----------------------------------------修改竞赛信息弹出框------------------------------------------- -->
    <el-dialog title="修改竞赛信息"
               :modal-append-to-body="false"
               :visible.sync="dialogFormVisible"
               width="800px">
      <div>
        <el-form :model="updateform"
                 label-width="100px">
          <el-form-item label="竞赛名称"
                        :label-width="formLabelWidth">
            <el-input v-model="updateform.competitionName"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="竞赛级别"
                        :label-width="formLabelWidth">
            <el-input v-model="updateform.category"
                      autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="获奖类型"
                        :label-width="formLabelWidth">
            <el-input v-model="updateform.level"
                      autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="成员"
                        :label-width="formLabelWidth">
            <el-input v-model="updateform.members"
                      autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="竞赛时间">
            <el-date-picker style="width:100%"
                            v-model="updateform.competitionTime"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="sumbitUpdate()">确 认</el-button>
      </div>
    </el-dialog>

    <!-- -----------------------------------------上传附件弹窗 -->
    <el-dialog :visible.sync="showUploadFileDialog"
               width="700px"
               height="500px"
               :before-close="handleCloseUploadFileDialog"
               class="dialog">
      <el-divider>补充上传竞赛附件</el-divider>
      <el-upload class="upload-demo"
                 drag
                 :on-success="handleUploadCompetitionFileSuccess"
                 :headers="token"
                 :action="uploadCompetitionFileUrl"
                 multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!-- <div class="el-upload__tip"
             slot="tip">只能上传.pdf文件</div> -->
      </el-upload>
      <el-button style="margin-top: 12px;"
                 @click="uploadFileDone"
                 v-show="showDoneButton">完成</el-button>

    </el-dialog>
  </div>
</template>
<script>
import QS from 'qs'
export default {
  inject: ['reload'],
  data() {
    return {
      uploadCompetitionFileUrl: '',
      showUploadFileDialog: false,
      showDoneButton: false,
      formLabelWidth: '100px',
      dialogFormVisible: false,
      token: {
        Authorization: ''
      },
      uploadPaperMention: '提交',
      uploadPaperDialogVisible: false,
      //上传竞赛信息数据
      uploadForm: {
        id: null,
        competitionName: null,
        category: null,
        level: null,
        members: null,
        competitionTime: null
      },
      //修改竞赛信息数据
      updateform: {
        id: null,
        competitionName: null,
        category: null,
        level: null,
        members: null,
        competitionTime: null
      },
      tableData: []
    }
  },
  methods: {
    handleUploadCompetitionFileSuccess() {
      this.showDoneButton = true
    },
    handleCloseUploadFileDialog() {
      this.showUploadFileDialog = false
    },
    uploadFileDone() {
      this.showUploadFileDialog = false
      this.reload()
    },
    //修改竞赛信息
    sumbitUpdate() {
      this.$axios
        .post(
          '/api/achievement/competition/modify',
          QS.stringify(this.updateform)
        )
        .then(response => {
          console.log(response.data)
          this.dialogFormVisible = false
          this.reload()
        })
        .catch(error => {
          console.error(error)
        })
    },
    //点击删除按钮触发删除竞赛信息
    handleDelete(index, row) {
      this.updateform.id = row.id
      this.updateform.competitionName = row.competitionName
      this.updateform.category = row.category
      this.updateform.level = row.level
      this.updateform.members = row.members
      this.updateform.competitionTime = row.competitionTime
      this.$axios
        .post('/api/achievement/competition/delete/' + this.updateform.id)
        .then(response => {
          console.log(response.data)
          this.reload()
        })
        .catch(error => {
          console.error(error)
        })
    },
    //点击编辑按钮触发
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.updateform.id = row.id
      this.updateform.competitionName = row.competitionName
      this.updateform.category = row.category
      this.updateform.level = row.level
      this.updateform.members = row.members
      this.updateform.competitionTime = row.competitionTime
    },
    //点击上传竞赛信息按钮触发
    uploadPaper() {
      this.uploadPaperDialogVisible = true
    },
    getToken() {
      this.token.Authorization = localStorage.getItem('TOKEN')
    },
    //上传竞赛信息
    uploadPaperNext() {
      if (
        this.uploadForm.competitionName == null ||
        this.uploadForm.category == null ||
        this.uploadForm.level == null ||
        this.uploadForm.members == null ||
        this.uploadForm.competitionTime == null
      ) {
        alert('请完善要上传的竞赛信息！！！')
      }
      var data = {
        competitionName: this.uploadForm.competitionName,
        category: this.uploadForm.category,
        level: this.uploadForm.level,
        members: this.uploadForm.members,
        competitionTime: this.uploadForm.competitionTime
      }
      this.$axios
        .post('/api/achievement/competition/upload', QS.stringify(data))
        .then(response => {
          console.log(response.data)
          this.reload()
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleUploadDialogClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.reset()
        })
        .catch(_ => {})
    },
    getAllCompetitions() {
      this.$axios
        .get('/api/achievement/competition/getAll')
        .then(response => {
          this.tableData = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    reset() {
      this.uploadPaperDialogVisible = false
    },
    uploadFile(row) {
      this.showUploadFileDialog = true
      this.uploadCompetitionFileUrl =
        '/api/achievement/competition/uploadFile/' + row.id
    }
  },
  mounted() {
    this.getToken()
    this.getAllCompetitions()
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