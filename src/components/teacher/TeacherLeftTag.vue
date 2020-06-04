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
              <span>教学管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">小组管理</template>
              <el-menu-item @click="showUsers()"
                            index="1-1">成员总览</el-menu-item>
              <el-menu-item index="1-2">周报情况</el-menu-item>
              <el-menu-item index="1-3">成员调整</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span slot="title">小组各项信息总览</span>
            </template>
            <el-menu-item-group title="成果总览">
              <el-menu-item index="2-1">获奖相关</el-menu-item>
              <el-menu-item index="2-2">专利相关</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="报销">
              <el-menu-item index="2-1">报销申请</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">个人信息维护</span>
          </el-menu-item>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'teacherLeftTag',
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