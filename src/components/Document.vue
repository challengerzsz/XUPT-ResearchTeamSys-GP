<template>
  <div>

    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="检索文献"
                   name="0">
        <div class="options">
          <el-row class="elRow">
            <el-button type="primary"
                       @click="postDialogVisible = true">上传文献</el-button>
          </el-row>
        </div>
        <div class="selectDiv">
          <el-input style="width:600px"
                    placeholder="请输入内容"
                    v-model="content"
                    class="input-with-select">
            <el-select style="width:100px"
                       v-model="SelectValue1"
                       placeholder="请选择"
                       slot="prepend">
              <el-option v-for="item in options1"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
            <el-select style="width:120px;margin-left:10px"
                       v-model="SelectValue2"
                       placeholder="请选择"
                       slot="prepend">
              <el-option v-for="item in options2"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
            <el-button slot="append"
                       @click="searchDocument()"
                       icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div>
          <el-table :data="tableData"
                    style="width: 100%">

            <el-table-column label="论文题目"
                             prop="topic"></el-table-column>
            <el-table-column label="作者"
                             prop="author"></el-table-column>
            <el-table-column label="研究方向"
                             prop="direction"></el-table-column>
            <el-table-column label="创新点"
                             prop="innovation"></el-table-column>
            <el-table-column label="浏览"
                             prop="desc"
                             width="70px">

              <template slot-scope="scope">
                <el-button type="success"
                           size="small"
                           icon="el-icon-document-copy"
                           @click="seeDetail(scope.row)"
                           circle></el-button>

                <div slot="reference"
                     class="name-wrapper">
                </div>
              </template>

            </el-table-column>
            <el-table-column label="操作"
                             prop="desc">

              <template slot-scope="scope">
                <el-button type="primary"
                           size="small"><a :href="scope.row.pdfUrl"
                     style="color:#FFFFFF"
                     target="_blank">下载附件</a><i class="el-icon-download el-icon--right"></i></el-button>

                <div slot="reference"
                     class="name-wrapper">
                </div>
              </template>

            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="管理已上传文献"
                   name=1>
        <div>
          <el-table :data="myDocuments"
                    style="width: 100%">

            <el-table-column label="论文题目"
                             prop="topic"></el-table-column>
            <el-table-column label="作者"
                             prop="author"></el-table-column>
            <el-table-column label="研究方向"
                             prop="direction"></el-table-column>
            <el-table-column label="创新点"
                             prop="innovation"></el-table-column>
            <el-table-column label="操作"
                             prop="desc">

              <template slot-scope="scope">
                <el-button type="danger"
                           size="small"
                           @click="deleteDocument(scope.row.id)">删除该文献信息</el-button>
              </template>

            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :visible.sync="dialogVisible"
               width="800px"
               height="auto"
               :before-close="handleClose"
               class="dialog">
      <el-divider>文献详细信息</el-divider>
      <div>
        <table>
          <tr>
            <td style="width:200px">
              作者：
            </td>
            <td v-if="documentDetail.author">
              {{documentDetail.author}}
            </td>
          </tr>
          <tr>
            <td style="width:200px">
              论文题目：
            </td>
            <td v-if="documentDetail.topic">
              {{documentDetail.topic}}
            </td>
          </tr>
          <tr>
            <td style="width:200px">
              单位（机构）：
            </td>
            <td v-if="documentDetail.organ">
              {{documentDetail.organ}}
            </td>
          </tr>
        </table>
        <el-collapse v-model="collapseActiveNames"
                     @change="handleChange">
          <el-collapse-item title="摘要"
                            name="5">
            <div>
              <h3 v-if="documentDetail">{{documentDetail.abstractContent}}</h3>
            </div>
          </el-collapse-item>
          <el-collapse-item title="使用方法"
                            name="3">
            <div>
              <h2 v-if="documentDetail">{{documentDetail.useMethod}}</h2>
            </div>
          </el-collapse-item>
          <el-collapse-item title="创新点"
                            name="6">
            <div>
              <h2 v-if="documentDetail">{{documentDetail.innovation}}</h2>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <el-divider><i class="el-icon-s-comment"> 评论区</i></el-divider>
      <div>
        <el-table :data="commentData"
                  style="width: 100%">
          <el-table-column label="日期"
                           width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户名"
                           width="180">
            <template slot-scope="scope">

              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium">{{ scope.row.userName }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="内容"
                           prop="content">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="success"
                   icon="el-icon-edit"
                   @click="showWriteCommentDialog = true">写评论</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- -----------------------------------------写评论弹窗 -->
    <el-dialog :visible.sync="showWriteCommentDialog"
               width="700px"
               height="500px"
               :before-close="handleCloseWriteCommentDialog"
               class="dialog">
      <el-divider>在这里写下你对该文献的批注</el-divider>
      <el-form label-width="100px"
               ref="commentForm"
               :model="commentForm">
        <el-form-item label="内容">
          <el-input type="textarea"
                    v-model="commentForm.content"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary"
                 @click="commentOnDocument()">提交</el-button>
      <el-button @click="showWriteCommentDialog = false">取 消</el-button>
    </el-dialog>

    <!-- -----------------------------------------上传文献弹出框 -->
    <el-dialog :visible.sync="postDialogVisible"
               width="700px"
               height="500px"
               :before-close="handleClose"
               class="dialog">
      <el-steps :active="uploadDocumentData.active"
                align-center
                finish-status="success">
        <el-step title="完善文献信息"></el-step>
        <el-step title="上传文献附件"></el-step>
      </el-steps>
      <div class="postDocument"
           v-show="uploadDocumentData.postDocumentShow">
        <el-form ref="form"
                 :model="form"
                 label-width="90px">
          <el-form-item label="论文题目">
            <el-input v-model="form.topic"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="form.author"></el-input>
          </el-form-item>
          <el-form-item label="研究方向">
            <el-input v-model="form.direction"></el-input>
          </el-form-item>
          <el-form-item label="单位(机构)">
            <el-input v-model="form.organ"></el-input>
          </el-form-item>
          <el-form-item label="创新点">
            <el-input type="textarea"
                      v-model="form.innovation"></el-input>
          </el-form-item>
          <el-form-item label="使用方法">
            <el-input type="textarea"
                      v-model="form.useMethod"></el-input>
          </el-form-item>
          <el-form-item label="摘要(中文)">
            <el-input type="textarea"
                      v-model="form.abstractContent"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea"
                      v-model="form.comments"></el-input>
          </el-form-item>
          <el-form-item label="论文原地址">
            <el-input v-model="form.orginPath"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="uploadDocument"
           v-show="uploadDocumentData.uploadDocumentShow">
        <el-upload class="upload-demo"
                   drag
                   :headers="token"
                   :action="uploadDocumentData.uploadDocumentAction"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <!-- <div class="el-upload__tip"
               slot="tip">只能上传.pdf文件</div> -->
        </el-upload>
      </div>
      <el-button style="margin-top: 12px;"
                 @click="next">{{uploadDocumentData.mention}}</el-button>
    </el-dialog>
  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import QS from 'qs'
export default {
  inject: ['reload'],
  data() {
    return {
      activeName: '0',
      content: '',
      SelectValue1: 0,
      SelectValue2: 0,
      options1: [
        {
          value: 0,
          label: '本人',
        },
        {
          value: 1,
          label: '系统',
        },
      ],
      options2: [
        {
          value: 0,
          label: '论文题目',
        },
        {
          value: 1,
          label: '作者',
        },
        {
          value: 2,
          label: '研究方向',
        },
      ],
      dialogVisible: false,
      postDialogVisible: false,
      uploadDocumentData: {
        active: 0,
        mention: '下一步',
        postDocumentShow: true,
        uploadDocumentShow: false,
        uploadDocumentAction: '',
        documentId: '',
      },
      token: {
        Authorization: '',
      },
      collapseActiveNames: ['1', '2', '3', '4', '5', '6'],
      tableData: [],
      documentDetail: {},
      commentData: null,
      form: {
        topic: '',
        author: '',
        direction: '',
        organ: '',
        innovation: '',
        useMethod: '',
        abstractContent: '',
        comments: '',
        orginPath: '',
      },
      commentForm: {
        content: '',
      },
      showWriteCommentDialog: false,
      myDocuments: null,
    }
  },
  methods: {
    deleteDocument(documentId) {
      this.$confirm('确认删除该文献信息？该操作不可撤销！')
        .then((_) => {
          this.$axios
            .get('/api/document/deleteDocument/' + documentId)
            .then((response) => {
              this.reload()
            })
            .catch((error) => {
              console.error(error)
            })
        })
        .catch((_) => {})
    },
    handleClick(tab, event) {
      if (tab.name == '1') {
        this.$axios
          .get('/api/document/getAllMyDocuments')
          .then((response) => {
            this.myDocuments = response.data.data
          })
          .catch((error) => {
            console.error(error)
          })
      }
    },
    seeDetail(row) {
      this.getAllDoeumentComments(row.id)
      this.dialogVisible = true
      this.documentDetail = row
    },
    getAllDoeumentComments(documentId) {
      this.$axios
        .get('/api/document/getComments/' + documentId)
        .then((response) => {
          this.commentData = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    commentOnDocument() {
      if (this.commentForm.content != null || this.commentForm.content != '') {
        this.$axios
          .post(
            '/api/document/commentOnDocument/' + this.documentDetail.id,
            QS.stringify(this.commentForm)
          )
          .then((response) => {
            this.reload()
          })
          .catch((error) => {
            console.error(error)
          })
      }
    },
    getAllDocument() {
      this.$axios
        .get('/api/document/getAllDocument')
        .then((response) => {
          this.tableData = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          this.reset()
        })
        .catch((_) => {})
    },
    handleCloseWriteCommentDialog() {
      this.showWriteCommentDialog = false
    },
    next() {
      this.uploadDocumentData.active++
      if (this.uploadDocumentData.active == 1) {
        this.$axios
          .post('/api/document/uploadDocument', QS.stringify(this.form))
          .then((response) => {
            this.uploadDocumentData.documentId = response.data.data
            this.uploadDocumentData.uploadDocumentAction =
              '/api/document/uploadDocumentFile/' +
              this.uploadDocumentData.documentId
          })
          .catch((error) => {
            console.error(error)
          })
        this.uploadDocumentData.postDocumentShow = false
        this.uploadDocumentData.uploadDocumentShow = true
      }
      if (this.uploadDocumentData.active == 2) {
        this.uploadDocumentData.mention = '完成'
      }
      if (this.uploadDocumentData.active == 3) {
        this.postDialogVisible = false
        this.reload()
      }
    },
    reset() {
      this.postDialogVisible = false
      this.uploadDocumentData.active = 0
      this.uploadDocumentData.mention = '下一步'
      this.uploadDocumentData.postDocumentShow = true
      this.uploadDocumentData.uploadDocumentShow = false
      this.dialogVisible = false
    },
    searchDocument() {
      var data = {
        content: this.content,
      }
      this.$axios
        .get(
          '/api/document/search/' +
            this.SelectValue1 +
            '/' +
            this.SelectValue2 +
            '?' +
            QS.stringify(data)
        )
        .then((response) => {
          if (response.data.status == 1) {
            this.tableData = response.data.data
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    // 提交
    submit() {
      console.log(this.content)
      console.log(this.html)
    },
    onSubmit() {
      console.log('submit!')
    },
    getToken() {
      this.token.Authorization = localStorage.getItem('TOKEN')
    },
    handleChange(val) {
      console.log(val)
    },
  },
  mounted() {
    this.getToken()
    this.getAllDocument()
  },
}
</script>
<style scoped>
.options {
  float: left;
}
.downloadButton {
  float: left;
}
.dialog {
  height: auto;
}
.postDocument {
  width: 500px;
  margin: 0 auto;
  margin-top: 40px;
}
table,
table tr th,
table tr td {
  border: 1px solid #000000;
}
table {
  width: 100%;
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
}
</style>