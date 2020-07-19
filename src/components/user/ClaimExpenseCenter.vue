<template>
  <div class="paperDiv">
    <span class="dividerSpan">
      <el-divider>功能选项</el-divider>
    </span>
    <span>
      <el-row class="buttonRow">
        <el-button type="primary"
                   @click="uploadPaper()">上传报销明细</el-button>
      </el-row>
    </span>
    <span class="dividerSpan">
      <el-divider>已上传报销明细</el-divider>
    </span>

    <div>
      <el-table :data="tableData"
                style="width: 100%">
        <!-- <el-table-column label="报销人学号"
                         style="width:10%">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.userAccount }}</el-tag>
            </div>
          </template>
        </el-table-column> -->

        <el-table-column label="报销人姓名"
                         style="width:10%">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">
                <i class="el-icon-user"></i>
                {{ scope.row.userName }}
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="报销类型"
                         style="width:10%">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.type }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="单价"
                         style="width:10%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.unitPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column label="数量"
                         style="width:10%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.amount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="总价"
                         style="width:10%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.totalPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注"
                         style="width:10%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.comment }}</span>
          </template>
        </el-table-column>

        <el-table-column label="时间"
                         style="width:10%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态"
                         style="width:10%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         style="width:10%">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ----------------------------------------上传报销明细弹出框------------------------------------------- -->
    <el-dialog title="报销明细信息"
               :visible.sync="uploadPaperDialogVisible"
               width="650px"
               :before-close="handleUploadDialogClose">
      <div class="postDocument">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="报销类型">
            <!-- <el-input v-model="form.topic"></el-input> -->
            <el-select style="width:100%"
                       v-model="form.type"
                       placeholder="请选择">
              <el-option v-for="item in claimExpenseTypeOptions"
                         :key="item.value"
                         :label="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价">
            <el-input type="text"
                      v-model="form.unitPrice"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input type="text"
                      v-model="form.amount"></el-input>
          </el-form-item>
          <el-form-item label="总价">
            <el-input disabled
                      type="text"
                      v-model="form.totalPrice"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea"
                      @focus="totalPriceCompute()"
                      v-model="form.comment"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker style="width:100%"
                            v-model="form.date"
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
    <el-dialog title="修改报销明细"
               :modal-append-to-body="false"
               :visible.sync="dialogFormVisible"
               width="500px">
      <el-form :model="form">
        <el-form-item label="报销人学号"
                      :label-width="formLabelWidth">
          <el-input disabled
                    v-model="updateform.userAccount"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="报销人姓名"
                      :label-width="formLabelWidth">
          <el-input v-model="updateform.userName"
                    disabled
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="报销类型"
                      :label-width="formLabelWidth">
          <el-input v-model="updateform.type"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="单价"
                      :label-width="formLabelWidth">
          <el-input v-model="updateform.unitPrice"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="数量"
                      :label-width="formLabelWidth">
          <el-input v-model="updateform.amount"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="总价"
                      :label-width="formLabelWidth">
          <el-input v-model="updateform.totalPrice"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注"
                      :label-width="formLabelWidth">
          <el-input v-model="updateform.comment"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="时间"
                      :label-width="formLabelWidth">
          <el-input v-model="updateform.date"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态"
                      :label-width="formLabelWidth">
          <el-select v-model="updateform.status"
                     placeholder="请选择">
            <el-option v-for="item in claimExpenseStatusOptions"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="sumbitUpdate()">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import QS from 'qs'
export default {
  inject: ['reload'],
  data() {
    return {
      formLabelWidth: '100px',
      dialogFormVisible: false,
      token: {
        Authorization: ''
      },
      uploadPaperMention: '提交',
      uploadPaperDialogVisible: false,
      uploadPaperId: null,
      claimExpenseStatusOptions: [
        { value: '已提交' },
        {
          value: '已审核'
        }
      ],
      claimExpenseTypeOptions: [
        {
          value: '版面费'
        },
        {
          value: '审稿费'
        },
        {
          value: '专利费'
        },
        {
          value: '软著费'
        },
        {
          value: '奖励'
        }
      ],
      form: {
        type: '',
        unitPrice: null,
        amount: null,
        totalPrice: null,
        comment: '',
        date: ''
      },
      updateform: {
        id: '',
        userAccount: '',
        userName: '',
        type: '',
        unitPrice: null,
        amount: null,
        totalPrice: null,
        comment: '',
        date: '',
        status: ''
      },
      tableData: []
    }
  },
  methods: {
    sumbitUpdate() {
      this.$axios
        .post(
          '/api/dailyWork/claimExpense/modifyClaimExpense',
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
    handleDelete(index, row) {
      this.updateform.id = row.id
      this.updateform.userAccount = row.userAccount
      this.updateform.userName = row.userName
      this.updateform.type = row.type
      this.updateform.unitPrice = row.unitPrice
      this.updateform.amount = row.amount
      this.updateform.totalPrice = row.totalPrice
      this.updateform.comment = row.comment
      this.updateform.date = row.date
      this.$axios
        .post(
          '/api/dailyWork/claimExpense/deleteClaimExpense/' + this.updateform.id
        )
        .then(response => {
          console.log(response.data)
          this.reload()
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.updateform.id = row.id
      this.updateform.userAccount = row.userAccount
      this.updateform.userName = row.userName
      this.updateform.type = row.type
      this.updateform.unitPrice = row.unitPrice
      this.updateform.amount = row.amount
      this.updateform.totalPrice = row.totalPrice
      this.updateform.comment = row.comment
      this.updateform.date = row.date
    },
    totalPriceCompute() {
      if (this.form.unitPrice != null && this.form.amount != null) {
        this.form.totalPrice = this.form.unitPrice * this.form.amount
      }
    },
    uploadPaper() {
      this.uploadPaperDialogVisible = true
    },
    getToken() {
      this.token.Authorization = localStorage.getItem('TOKEN')
    },
    uploadPaperNext() {
      if (
        this.form.totalPrice == null ||
        this.form.amount == null ||
        this.form.unitPrice == null
      ) {
        alert('请完善报销明细信息！！！')
      }
      var data = {
        type: this.form.type,
        unitPrice: this.form.unitPrice,
        amount: this.form.amount,
        totalPrice: this.form.totalPrice,
        comment: this.form.comment,
        date: this.form.date
      }
      this.$axios
        .post('/api/dailyWork/claimExpense/upload', QS.stringify(data))
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
    getAllMyClaimExpense() {
      this.$axios
        .get('/api/dailyWork/claimExpense/getAllMyClaimExpense')
        .then(response => {
          this.tableData = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    reset() {
      this.uploadPaperDialogVisible = false
    }
  },
  mounted() {
    this.getToken()
    this.getAllMyClaimExpense()
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