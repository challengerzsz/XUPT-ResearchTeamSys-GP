<template>

  <div>
    <span style="float:left;width:100%">
      <el-divider>功能选项</el-divider>
    </span>
    <el-input style="width:600px"
              placeholder="请输入内容"
              v-model="searchContent"
              class="input-with-select">
      <el-select style="width:100px"
                 v-model="defaultSelect"
                 placeholder="请选择"
                 slot="prepend">
        <el-option v-for="item in options1"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"></el-option>
      </el-select>

      <el-button slot="append"
                 @click="searchProject()"
                 icon="el-icon-search"></el-button>
    </el-input>
    <span style="float:left;width:100%">
      <el-divider>已上传项目信息</el-divider>
    </span>
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
      <el-table-column prop="filePath"
                       label="项目附件">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <span v-if="scope.row.filePath == null">
              <el-tag size="medium">未上传附件</el-tag>
            </span>
            <span v-if="scope.row.filePath != null">
              <el-tag size="medium"><a :href="scope.row.filePath"
                   target="_blank">下载附件</a></el-tag>
            </span>
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
      defaultSelect: 0,
      searchContent: null,
      options1: [
        {
          value: 0,
          label: '项目名'
        },
        {
          value: 1,
          label: '主持人'
        }
      ],
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
    },
    searchProject() {
      if (this.searchContent != null || this.searchContent != '') {
        this.$axios
          .get('/api/dailyWork/project/search/' + this.defaultSelect, {
            params: {
              searchContent: this.searchContent
            }
          })
          .then(response => {
            if (response.data.status == 1) {
              this.tableData = response.data.data
            } else {
              this.tableData = null
            }
          })
      }
    }
  },
  mounted() {
    this.getAllProjectInfo()
  }
}
</script>