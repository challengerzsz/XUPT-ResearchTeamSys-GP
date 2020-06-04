<template>
  <div>
    <el-container>
      <el-container>
        <el-header class="userCenterHeader">
          <AdminHeader></AdminHeader>
        </el-header>
        <el-container>

          <el-aside>
            <AdminLeftTag></AdminLeftTag>
          </el-aside>
          <el-main class="userCenterMain">
            <router-view></router-view>
          </el-main>
        </el-container>

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
.userCenterHeader {
  height: 500px;
}
</style>