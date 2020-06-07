<template>
  <el-table :data="tableData"
            stripe
            style="width: 100%">
    <el-table-column prop="softwareCopyrightName"
                     label="软件著作权"
                     width="180">

      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium">{{ scope.row.softwareCopyrightName }}</el-tag>
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
    <el-table-column prop="documentPath"
                     label="文档">
      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium"><a :href="scope.row.documentPath"
               target="_blank">下载文档</a></el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="projectPath"
                     label="代码">
      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium"><a :href="scope.row.projectPath"
               target="_blank">下载代码</a></el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="certificatePath"
                     label="证书">
      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium"><a :href="scope.row.certificatePath"
               target="_blank">下载证书</a></el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="time"
                     label="时间">
      <template slot-scope="scope">
        <div slot="reference"
             class="name-wrapper">
          <el-tag size="medium">{{ scope.row.time }}</el-tag>
        </div>
      </template>
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
    getSoftWareCopyrightInfo() {
      this.$axios
        .get('/api/achievement/softWareCopyright/getAll')
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
    this.getSoftWareCopyrightInfo()
  }
}
</script>