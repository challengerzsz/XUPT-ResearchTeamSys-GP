<template>

  <el-container style="height: 100%;">
    <el-aside width="220px"
              style="background-color: rgb(238, 241, 246)">
      <TeacherLeftTag></TeacherLeftTag>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 20px">
        <TeacherHeader></TeacherHeader>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import TeacherHeader from './TeacherHeader'
import TeacherLeftTag from './TeacherLeftTag'

export default {
  name: 'teacherCenter',
  components: {
    TeacherHeader,
    TeacherLeftTag
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #f2f6fc;
  color: #333;
  width: 100%;
  line-height: 60px;
  size: 100px;
}

.el-aside {
  height: 100%;
  background-color: #f2f6fc;
  color: #fcf6f2;
}
</style>