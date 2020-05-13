<template>
  <div class="userCenterHeader">
    <el-menu :default-active="activeIndex2"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item><i class="el-icon-s-platform"></i></el-menu-item>

      <el-menu-item index="0">用户中心</el-menu-item>
      <el-menu-item class="logoutButton"
                    @click="logout()"><i class="el-icon-moon-night"
           style="margin-right: 15px;font-size:20px"></i></el-menu-item>

      <el-menu-item style="float:right;margin-right: 40px;font-size:10px">
        <el-badge value="new"
                  class="item">
          <el-button size="small">消息</el-button>
        </el-badge>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'userCenterHeader',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    logout() {
      this.$axios
        .post('/api/logout')
        .then(response => {
          if (response.data.status == 1) {
            localStorage.removeItem('TOKEN')
            this.$router.push({ path: '/login' })
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
div {
  padding: 0, 0, 0, 0;
  margin: 0, 0, 0, 0;
  width: 100%;
  height: 100%;
}
.logoutButton {
  float: right;
}
</style>