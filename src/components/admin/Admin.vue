<template>
  <div class="admin">

    <el-container>
      <el-header class="userCenterHeader">
        <AdminHeader></AdminHeader>
      </el-header>
      <el-container>
        <el-aside>
          <AdminLeftTag></AdminLeftTag>
        </el-aside>
        <el-main class="userCenterMain">
          <router-view v-if="isRouterAlive"></router-view>
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
    this.$router.push({ path: '/admin/welcome' })
  }
}
</script>

<style scoped>
.admin {
  position: fixed;
  margin-left: 0;
  height: 100%;
  width: 100%;
}
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
  position: relative;
  margin: 0;
  padding: 0;
  height: 200px;
  width: 100%;
}
</style>