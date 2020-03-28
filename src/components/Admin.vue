<template>
  <div>
    <el-container style="height: 100%;">
      <el-aside width="220px"
                style="background-color: rgb(238, 241, 246)">
        <AdminLeftTag></AdminLeftTag>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 20px">
          <el-dropdown>
            <i class="el-icon-setting"
               style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>Admin</span>
          <!-- <AdminHeader></AdminHeader> -->
        </el-header>

        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date"
                             label="日期"
                             width="140">
            </el-table-column>
            <el-table-column prop="name"
                             label="姓名"
                             width="120">
            </el-table-column>
            <el-table-column prop="address"
                             label="地址">
            </el-table-column>
            <el-table-column prop="major"
                             label="专业信息">
            </el-table-column>
            <el-table-column prop="sex"
                             label="性别">
            </el-table-column>
            <el-table-column prop="role"
                             label="角色">
            </el-table-column>
            <el-table-column prop="researchDirection"
                             label="研究方向">
            </el-table-column>
            <el-table-column prop="options"
                             label="操作">
              <el-button type="primary"
                         icon="el-icon-edit"
                         circle></el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         circle></el-button>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import AdminLeftTag from './AdminLeftTag'
import AdminHeader from './AdminHeader'

export default {
  name: 'admin',
  components: {
    AdminHeader,
    AdminLeftTag
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      major: '软件工程',
      sex: '男',
      role: '学生',
      researchDirection: '云计算',
      options: '增加'
    }
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  width: 100%;
  line-height: 60px;
}

.el-aside {
  height: 100%;
  color: #333;
}
</style>