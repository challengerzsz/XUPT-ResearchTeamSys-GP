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
          <router-view v-if="isRouterAlive" />
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
    TeacherLeftTag,
  },
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
  mounted() {
    this.$router.push({ path: '/teacherCenter/teacherInfo' })
  },
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
  height: 100%;
  width: 500px;
  line-height: 100%;
}
.teacherCenterHeader {
  margin: 0;
  padding: 0;
}
</style>