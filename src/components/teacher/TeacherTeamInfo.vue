<template>
  <div>
    <el-divider>您当前管理的科研小组信息</el-divider>
    <el-table :data="teamData" style="width: 100%">
      <el-table-column label="指导老师账号" style="width:20%">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.guideTeacherAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="指导老师姓名" style="width:20%">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.guideTeacherName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="小组名" style="width:20%">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.teamName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="小组学生数" style="width:20%">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.studentCount }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="小组研究方向" style="width:20%">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.teamDirection }}</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script scope>
export default {
  data() {
    return {
      // 科研小组table信息
      teamData: null
    };
  },
  methods: {
    getAllTeamInfo() {
      this.$axios
        .get("/api/team/getMyTeams/")
        .then(response => {
          if (response.data.status == 1) {
            console.log(response.data.data);
            this.teamData = response.data.data;
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.getAllTeamInfo();
  }
};
</script>