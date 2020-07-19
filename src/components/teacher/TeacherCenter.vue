<template>
  <el-container>
    <el-container>
      <el-header class="teacherCenterHeader">
        <TeacherHeader></TeacherHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <TeacherLeftTag></TeacherLeftTag>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
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
  },
  mounted() {
    this.$router.push({ path: '/teacherCenter/teacherInfo' })
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
  width: 100%;
}
.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  height: 800px;
  width: 500px;
  line-height: 100%;
}
.teacherCenterHeader {
  margin: 0;
  padding: 0;
}
</style>