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
            <router-view v-if="isRouterAlive"></router-view>
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
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  mounted() {
    this.$router.push({ path: '/userCenter/userInfo' })
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
  height: 100%;
  width: 500px;
  line-height: 100%;
}
.userCenterHeader {
  margin: 0;
  padding: 0;
}
</style>