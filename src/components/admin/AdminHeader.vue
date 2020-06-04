<template>
  <div class="adminHeader">
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="0"><i class="el-icon-s-platform"></i></el-menu-item>

      <el-menu-item index="1">管理后台</el-menu-item>
      <el-button class="logoutButton"
                 type="info"
                 icon="el-icon-s-home"
                 @click="logout()"
                 round>退出</el-button>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'adminHeader',
  data() {
    return {
      activeIndex: '0'
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
.adminHeader {
  height: auto;
  width: 100%;
  position: absolute;
  margin-left: 0;
}
.logoutButton {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
  background-color: rgba(84, 92, 100, 1);
}
</style>
