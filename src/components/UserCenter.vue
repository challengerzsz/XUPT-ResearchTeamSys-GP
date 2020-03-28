<template>
  <div>
    <el-container>
      <el-container>
        <el-header>
          <UserCenterHeader></UserCenterHeader>
        </el-header>
        <el-container>

          <el-aside width="200px">
            <UserCenterLeftTag></UserCenterLeftTag>
          </el-aside>
          <el-main>
            <!-- <UserInfo></UserInfo> -->
            <!-- <router-view></router-view> -->
            <ProgressPreview></ProgressPreview>
          </el-main>
        </el-container>

      </el-container>

    </el-container>

  </div>
</template>

<script>
import UserCenterLeftTag from './UserCenterLeftTag'
import UserCenterHeader from './UserCenterHeader'
import UserInfo from './UserInfo'
import ProgressPreview from './ProgressPreview'

export default {
  name: 'userCenter',
  components: {
    UserCenterLeftTag,
    UserCenterHeader,
    UserInfo,
    ProgressPreview
  }
}
</script>

<style>
.el-container {
  height: 100%;
  width: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 800px;
  width: 500px;
  line-height: 100%;
}
</style>