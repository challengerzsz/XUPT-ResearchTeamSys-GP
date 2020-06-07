<template>
  <div>
    <el-divider>您管理的同学提交的小论文记录</el-divider>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="topic"
                       label="论文题目"
                       width="300px">
      </el-table-column>
      <el-table-column prop="author"
                       label="学号"
                       width="180">
      </el-table-column>
      <el-table-column prop="authorName"
                       label="学生姓名">
      </el-table-column>
      <el-table-column prop="acceptTime"
                       label="录用时间">
      </el-table-column>
      <el-table-column prop="pdfUrl"
                       label="下载论文附件">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium"><a :href="scope.row.pdfUrl"
                 target="_blank">下载小论文</a></el-tag>
          </div>
        </template>
      </el-table-column>

    </el-table>
  </div>

</template>
<script>
export default {
  data() {
    return {
      tableData: null
    }
  },
  methods: {
    getAllMyStudentPaper() {
      this.$axios
        .get('/api/paper/getMyStudentPapers/0')
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
    this.getAllMyStudentPaper()
  }
}
</script>