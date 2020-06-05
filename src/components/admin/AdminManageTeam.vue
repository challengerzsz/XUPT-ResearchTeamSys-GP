<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="小组信息预览" name="teamPreview">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="小组ID" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="指导老师账号" width="180">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.guideTeacherAccount }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="指导老师姓名" width="180">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">
                  <i class="el-icon-user"></i>
                  {{ scope.row.guideTeacherName }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="小组名" width="180">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">
                  <i class="el-icon-school"></i>
                  {{ scope.row.teamName }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="学生数量" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.studentCount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="小组研究方向" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.teamDirection }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="创建小组" name="createTeam">
        <!-- rickyin -->
        <div class="createTeamDiv">
          <el-form :model="teamForm" ref="teamForm">
            <el-form-item prop="defaultGuideTeacherName" label="指导老师姓名" :label-width="formLabelWidth">
              <!-- <el-input v-model="teamForm.guideTeacherName"></el-input> -->
              <!-- 2:老师 -->
              <!-- 3:老师 -->
              <el-autocomplete
                style="float:left;width:100%"
                popper-class="my-autocomplete"
                v-model="teamForm.defaultGuideTeacherName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入指导老师姓名"
                @select="handleSelect"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.userName }}</div>
                  <span class="account">{{ item.userAccount }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item prop="guideTeacherAccount" label="指导老师账号" :label-width="formLabelWidth">
              <el-input disabled v-model="teamForm.guideTeacherAccount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="teamName" label="小组名" :label-width="formLabelWidth">
              <el-input v-model="teamForm.teamName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="teamDirection" label="小组研究方向" :label-width="formLabelWidth">
              <el-checkbox-group v-model="teamForm.teamDirection">
                <el-checkbox v-for="item in types" :label="item.directionName" :key="item.id"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
            <el-button @click="resetForm('teamForm')">取 消</el-button>
            <el-button type="primary" @click="createTeam()">提 交</el-button>
          </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <el-tab-pane label="分配小组成员" name="arrangeTeamMembers"></el-tab-pane>
    </el-tabs>

    <el-dialog
      title="修改小组信息"
      :modal-append-to-body="false"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="form">
        <el-form-item label="指导老师账号" :label-width="formLabelWidth">
          <el-input disabled v-model="form.guideTeacherAccount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="指导老师姓名" :label-width="formLabelWidth">
          <el-input v-model="form.guideTeacherName" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小组名" :label-width="formLabelWidth">
          <el-input v-model="form.teamName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小组研究方向" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.teamDirection">
            <el-checkbox v-for="item in types" :label="item.directionName" :key="item.id"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyTeamInfo()">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import QS from "qs";
export default {
  inject: ["reload"],
  data() {
    return {
      activeName: "teamPreview",
      tableData: null,
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        id: "",
        guideTeacherAccount: "",
        guideTeacherName: "",
        teamName: "",
        teamDirection: []
      },
      types: [],
      teamForm: {
        id: "",
        defaultGuideTeacherName: "",
        guideTeacherAccount: "",
        guideTeacherName: "",
        guideTeacherInfo: [],
        teamName: "",
        teamDirection: []
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      //   console.log(tab, event)
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
    createTeam() {
      var data = {
        guideTeacherAccount: this.teamForm.guideTeacherAccount,
        guideTeacherName: this.teamForm.guideTeacherName + '',
        teamName: this.teamForm.teamName,
        teamDirection: this.teamForm.teamDirection.join(';') + ';',
      }
      this.$axios
        .post('/api/team/createTeam', QS.stringify(data), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    },
    getAllTeamResearchDirection() {
      this.$axios
        .get("/api/researchDirection/getAll")
        .then(response => {
          this.types = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getAllguideTeacher() {
      this.$axios
        .get("/api/user/getUserSimpleInfo/2")
        .then(response => {
          this.teamForm.guideTeacherInfo = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.teamForm.guideTeacherInfo;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 2000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.teamForm.guideTeacherName = item.userName;
      this.teamForm.guideTeacherAccount = item.userAccount;
      this.teamForm.defaultGuideTeacherName = item.userName;
    },

    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form.id = row.id;
      this.form.guideTeacherAccount = row.guideTeacherAccount;
      this.form.guideTeacherName = row.guideTeacherName;
      this.form.teamName = row.teamName;
      this.form.teamDirection = row.teamDirection.split(";");
      this.form.teamDirection.pop();
    },
    handleDelete(index, row) {
      this.$confirm("确认删除该小组？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/team/deleteTeam/" + row.id)
            .then(response => {
              this.reload();
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    getAllTeamInfo() {
      this.$axios
        .get("/api/team/getAllTeam")
        .then(response => {
          this.tableData = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    modifyTeamInfo() {
      this.$axios
        .post("/api/team/modifyTeamInfo", QS.stringify(this.form), {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(response => {
          this.reload();
        })
        .catch(error => {
          console.error(error);
        });
    }
  },

  mounted() {
    this.getAllTeamInfo();
    this.getAllTeamResearchDirection();
    this.getAllguideTeacher();
  }
};
</script>
<style scoped>
.createTeamDiv {
  margin: 0 100px;
  width: 500px;
}

.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.account {
  font-size: 12px;
  color: #b4b4b4;
}

.highlighted .addr {
  color: #ddd;
}
li {
  line-height: normal;
  padding: 1px;
}
</style>