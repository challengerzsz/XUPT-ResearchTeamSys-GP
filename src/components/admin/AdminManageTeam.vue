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
<<<<<<< Updated upstream

      <el-tab-pane label="分配小组成员" name="arrangeTeamMembers"></el-tab-pane>
=======
      <el-tab-pane label="分配小组成员"
                   name="arrangeTeamMembers">
        <div class="arrangeTeamMembersDiv">

          <el-form :model="arrangeTeamMembersFrom">
            <el-form-item label="指导老师姓名"
                          :label-width="formLabelWidth">
              <el-autocomplete popper-class="search-input"
                               v-model="state"
                               :fetch-suggestions="querySearchAsync"
                               placeholder="请输入指导老师姓名检索小组信息"
                               @select="handleSelect">

                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">{{ item.address }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="指导老师账号"
                          :label-width="formLabelWidth">
              <el-input v-model="arrangeTeamMembersFrom.guideTeacherName"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="小组名"
                          :label-width="formLabelWidth">
              <el-input v-model="arrangeTeamMembersFrom.teamName"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="小组研究方向"
                          :label-width="formLabelWidth">
              <el-select v-model="arrangeTeamMembersFrom.teamDirection"
                         placeholder="请选择研究方向">
                <el-option label="TEACHER"
                           value=2></el-option>
                <el-option label="STUDENT"
                           value=3></el-option>
              </el-select>
            </el-form-item>
          </el-form>

        </div>

      </el-tab-pane>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
        id: '',
        guideTeacherAccount: '',
        guideTeacherName: '',
        teamName: '',
        teamDirection: ''
      },
      restaurants: [],
      state: '',
      timeout: null
    }
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          console.error(error);
        });
=======
          console.error(error)
        })
    },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号'
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113'
        },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        {
          value: '胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'
        },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        {
          value: '豪大大香鸡排超级奶爸',
          address: '上海市嘉定区曹安公路曹安路1685号'
        },
        {
          value: '茶芝兰（奶茶，手抓饼）',
          address: '上海市普陀区同普路1435号'
        },
        { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
        { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
        { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
        { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
        {
          value: 'Monica摩托主题咖啡店',
          address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F'
        },
        {
          value: '浮生若茶（凌空soho店）',
          address: '上海长宁区金钟路968号9号楼地下一层'
        },
        { value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
        { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
        {
          value: '快乐柠檬（神州智慧店）',
          address: '上海市长宁区天山西路567号1层R117号店铺'
        },
        {
          value: 'Merci Paul cafe',
          address: '上海市普陀区光复西路丹巴路28弄6号楼819'
        },
        {
          value: '猫山王（西郊百联店）',
          address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306'
        },
        { value: '枪会山', address: '上海市普陀区棕榈路' },
        { value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
        { value: '钱记', address: '上海市长宁区天山西路' },
        { value: '壹杯加', address: '上海市长宁区通协路' },
        {
          value: '唦哇嘀咖',
          address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元'
        },
        { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
        {
          value: '爱茜茜里(近铁广场)',
          address:
            '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺'
        },
        {
          value: '鲜果榨汁（金沙江路和美广店）',
          address: '普陀区金沙江路2239号金沙和美广场B1-10-6'
        },
        {
          value: '开心丽果（缤谷店）',
          address: '上海市长宁区威宁路天山路341号'
        },
        { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
        { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
        { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
        {
          value: '凡仔汉堡（老真北路店）',
          address: '上海市普陀区老真北路160号'
        },
        { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
        { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
        { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
        {
          value: '饭典*新简餐（凌空SOHO店）',
          address: '上海市长宁区金钟路968号9号楼地下一层9-83室'
        },
        {
          value: '焦耳·川式快餐（金钟路店）',
          address: '上海市金钟路633号地下一层甲部'
        },
        { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
        { value: '浏阳蒸菜', address: '天山西路430号' },
        { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
        {
          value: '樱花食堂（凌空店）',
          address: '上海市长宁区金钟路968号15楼15-105室'
        },
        { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
        {
          value: '福荣祥烧腊（平溪路店）',
          address: '上海市长宁区协和路福泉路255弄57-73号'
        },
        {
          value: '速记黄焖鸡米饭',
          address: '上海市长宁区北新泾街道金钟路180号1层01号摊位'
        },
        { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
        {
          value: '(小杨生煎)西郊百联餐厅',
          address: '长宁区仙霞西路88号百联2楼'
        },
        { value: '阳阳麻辣烫', address: '天山西路389号' },
        {
          value: '南拳妈妈龙虾盖浇饭',
          address: '普陀区金沙江路1699号鑫乐惠美食广场A13'
        }
      ]
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
>>>>>>> Stashed changes
    }
  },

  mounted() {
<<<<<<< Updated upstream
    this.getAllTeamInfo();
    this.getAllTeamResearchDirection();
    this.getAllguideTeacher();
=======
    this.getAllTeamInfo()
    this.restaurants = this.loadAll()
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
</script>
<style scoped>
.arrangeTeamMembersDiv {
  margin: 0 100px;
  width: 500px;
}
.el-autocomplete {
  width: 380px;
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.addr {
  font-size: 12px;
  color: #b4b4b4;
}
li {
  line-height: normal;
  padding: 7px;
}
.highlighted .addr {
  color: #ddd;
}
>>>>>>> Stashed changes
</style>