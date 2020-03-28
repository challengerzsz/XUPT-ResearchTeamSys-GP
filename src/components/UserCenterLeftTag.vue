<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户信息管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item index="1-1">查看详细信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="科研小组">
              <el-menu-item index="1-3">科研小组信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">专项管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">进度预览</template>
              <el-menu-item index="2-1">总体学业进度预览</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="论文">
              <el-menu-item index="2-2">开题报告</el-menu-item>
              <el-menu-item index="2-3">中期报告</el-menu-item>
              <el-menu-item index="2-4">小论文</el-menu-item>
              <el-menu-item index="2-5">大论文</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="个人荣誉">
              <el-menu-item index="2-6">竞赛</el-menu-item>
              <el-menu-item index="2-7">专利</el-menu-item>
              <el-menu-item index="2-8">软件著作权</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">周报管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">报销</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'userCenterLeftTag',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
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