<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-menu default-active="1"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">

          <el-submenu index="1">
            <el-menu-item-group title="统计">
              <el-menu-item index="1-6"
                            @click="showCountPage()">查看统计信息</el-menu-item>
            </el-menu-item-group>
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>综合管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">用户管理</template>
              <el-menu-item @click="showUsers()"
                            index="1-1">用户总览</el-menu-item>
              <el-menu-item @click="showRegister()"
                            index="1-3">新增用户</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="权限控制">
              <el-menu-item index="1-4"
                            @click="showuserRole()">权限控制</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

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
    },
    showRegister() {
      this.$router.push({ path: '/admin/register' })
    },
    showCountPage() {
      this.$router.push({ path: '/admin/welcome' })
    }
  }
}
</script>
<style scoped>
div {
  height: 100%;
  width: 100%;
}
</style>