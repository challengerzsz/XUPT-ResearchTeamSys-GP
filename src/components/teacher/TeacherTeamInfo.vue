<template>
  <div>
    <el-divider>您当前管理的科研小组信息</el-divider>
    <el-table :data="teamData"
              style="width: 100%">
      <!-- <el-table-column label="指导老师账号" style="width:20%">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.guideTeacherAccount }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="指导老师信息"
                       width="300px">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium"
                    style="margin-left:5px"
                    v-for="(item, index) in scope.row.guideTeachers"
                    :key="index">{{ item.userName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="小组名"
                       width="200px">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium">{{ scope.row.teamName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="小组学生信息"
                       style="width:20%">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium"
                    style="margin-left:2px"
                    v-for="(item, index) in scope.row.students"
                    :key="index">{{ item.userName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="小组研究方向"
                       style="width:20%">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
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
    }
  },
  methods: {
    getAllTeamInfo() {
      this.$axios
        .get('/api/team/getMyTeams')
        .then(response => {
          if (response.data.status == 1) {
            this.teamData = response.data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.getAllTeamInfo()
  }
}
</script>