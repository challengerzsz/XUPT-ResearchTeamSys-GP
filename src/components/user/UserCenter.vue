<template>
  <div>
    <el-container>
      <el-container>
        <el-header class="userCenterHeader">
          <UserCenterHeader></UserCenterHeader>
        </el-header>
        <el-container>

          <el-aside width="200px">
            <UserCenterLeftTag></UserCenterLeftTag>
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
import UserCenterLeftTag from './UserCenterLeftTag'
import UserCenterHeader from './UserCenterHeader'

export default {
  name: 'userCenter',
  components: {
    UserCenterLeftTag,
    UserCenterHeader
  }
}
</script>

<style>
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