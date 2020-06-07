<template>
  <el-table :data="tableData"
            stripe
            style="width: 100%">
    <el-table-column prop="projectNo"
                     label="项目编号"
                     width="180">

      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium">{{ scope.row.projectNo }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="projectName"
                     label="项目名"
                     width="180">
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
    <el-table-column prop="hostName"
                     label="主持人">
    </el-table-column>
    <el-table-column prop="members"
                     label="参与人员">
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
    }
  },
  mounted() {
    this.getAllProjectInfo()
  }
}
</script>