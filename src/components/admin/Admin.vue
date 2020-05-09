<template>
  <div>
    <el-container style="height: 100%;">
      <el-aside width="220px"
                style="background-color: rgb(238, 241, 246)">
        <AdminLeftTag></AdminLeftTag>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 20px">
          <AdminHeader></AdminHeader>
        </el-header>

        <el-main>
          <router-view />
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
  color: #333;
}
</style>