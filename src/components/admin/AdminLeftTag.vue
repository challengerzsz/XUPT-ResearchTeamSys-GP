<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu default-active="1"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户与权限管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">用户管理</template>
              <el-menu-item @click="showUsers()"
                            index="1-1">用户总览</el-menu-item>
              <el-menu-item index="1-2">用户信息维护</el-menu-item>
              <el-menu-item index="1-3">新增用户</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="权限控制">
              <el-menu-item index="1-4"
                            @click="showuserRole()">权限信息总览</el-menu-item>
              <el-menu-item index="1-5">权限信息维护</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="系统重要信息维护">
              <el-menu-item index="1-6">研究方向维护</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">系统各项信息总览</span>
            </template>
            <el-menu-item-group title="系统重要信息维护">
              <el-menu-item index="2-1">系统信息查看</el-menu-item>
              <el-menu-item index="2-2">研究方向维护</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3"
                        disabled>
            <i class="el-icon-document"></i>
            <span slot="title">其余功能</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">其余功能</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'adminHeader',
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key)
      console.log(keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    showUsers() {
      this.$router.push({ path: '/admin/manageUser' })
    },
    showuserRole() {
      this.$router.push({ path: '/admin/manageUserRole' })
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}
</style>