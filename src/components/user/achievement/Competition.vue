<template>

  <el-table :data="tableData"
            stripe
            style="width: 100%">
    <el-table-column prop="competitionName"
                     label="竞赛名"
                     width="180">

      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium">{{ scope.row.competitionName }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="category"
                     label="类别"
                     width="180">
      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium">{{ scope.row.category }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="level"
                     label="获奖类型">
      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium">{{ scope.row.level }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="members"
                     label="参与人员">
    </el-table-column>

    <el-table-column prop="competitionTime"
                     label="竞赛日期">
    </el-table-column>

  </el-table>

</template>
<script>
export default {
  data() {
    return {
      tableData: null
    }
  },
  methods: {
    getAllCompetitionInfo() {
      this.$axios
        .get('/api/achievement/competition/getAll')
        .then(response => {
          if (response.data.status == 1) {
            this.tableData = response.data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.getAllCompetitionInfo()
  }
}
</script>