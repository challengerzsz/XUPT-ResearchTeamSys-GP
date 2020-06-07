<template>
  <div>
    <el-tabs v-model="activeName">
      <!-- -------------------------------------------------------------------------------------->
      <el-tab-pane label="开题报告信息列表" name="initReportList">
        <el-table :data="initReportData" style="width: 100%">
          <el-table-column label="论文题目" style="width:25%">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.paperName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="作者学号" style="width:25%">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.author }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="作者" style="width:25%">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">
                  <i class="el-icon-user"></i>
                  {{ scope.row.authorName }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="附件" style="width:25%">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">
                  <a :href="scope.row.reportUrl" style="cursor:pointer;" target="_blank">下载附件</a>
                </el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- -------------------------------------------------------------------------------------->
      <el-tab-pane label="中期报告信息列表" name="interimReporList">
        <el-table :data="interimReportData" style="width: 100%">
          <el-table-column label="论文题目" style="width:25%">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.paperName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="作者学号" style="width:25%">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.author }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="作者" style="width:25%">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">
                  <i class="el-icon-user"></i>
                  {{ scope.row.authorName }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="附件" style="width:25%">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">
                  <a :href="scope.row.reportUrl" style="cursor:pointer;" target="_blank">下载附件</a>
                </el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- -------------------------------------------------------------------------------------->
    </el-tabs>
  </div>
</template>
<script>
import QS from "qs";
export default {
  inject: ["reload"],
  data() {
    return {
      // 初始显示哪个pane
      activeName: 'initReportList',
      // 初期报告table信息
      initReportData: null,
      // 中期报告table信息
      interimReportData: null
    };
  },
  methods: {
    next1() {
      var data = "";
      this.$axios
        .post("/api/work/report/upload/" + this.type, data)
        .then(response => {})
        .catch(error => {
          console.error(error);
        });
      this.$axios
        .get("/api/work/report/" + 0)
        .then(response => {
          if (response.data.status == 1) {
          } else {
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    getAllinitReport() {
      this.$axios
        .get("/api/work/getTeamWorkReports/" + 0)
        .then(response => {
          if (response.data.status == 1) {
            console.log(response.data.data);
            this.initReportData = response.data.data;
          }
        })
        .catch(error => {
          console.error(error);
        });
      this.$axios
        .get("/api/work/getTeamWorkReports/" + 1)
        .then(response => {
          if (response.data.status == 1) {
            console.log(response.data.data);
            this.interimReportData = response.data.data;
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.getAllinitReport();
  }
};
</script>
<style scoped>
</style>