<template>
  <el-table :data="tableData"
            stripe
            style="width: 100%">
    <el-table-column prop="patentName"
                     label="专利名"
                     width="180">

      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium">{{ scope.row.patentName }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="members"
                     label="参与人员"
                     width="180">
      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium">{{ scope.row.members }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="status"
                     label="状态">
      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium">{{ scope.row.status }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="filePath"
                     label="专利证书">
      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium"><a :href="scope.row.filePath"
               target="_blank">下载附件</a></el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="patentTime"
                     label="时间">
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
        .get('/api/achievement/patent/getAll')
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