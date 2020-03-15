<template>
  <div id="app">
    <header>
      <el-menu :default-active="activeIndex2"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">
        <el-menu-item><i class="el-icon-s-tools"></i></el-menu-item>
        <!-- <el-menu-item style="width:auto"><img src="http://xupt.edu.cn/newWeb/images/xy_logo.png"/></el-menu-item> -->

        <el-menu-item index="1">科研团队管理系统首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">了解整个系统</template>
          <el-menu-item index="2-1">如何使用</el-menu-item>
          <el-menu-item index="2-2">开发指南</el-menu-item>
          <el-menu-item index="2-3">功能介绍</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" style="margin-right:0"><i class="el-icon-user-solid"/></el-menu-item>
        <!-- <el-menu-item index="4"><a href="https://www.ele.me"
             target="_blank">订单管理</a></el-menu-item> -->
      </el-menu>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      activeIndex3: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>