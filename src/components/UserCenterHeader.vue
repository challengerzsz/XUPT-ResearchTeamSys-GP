<template>
  <div>
    <el-menu :default-active="activeIndex2"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item><i class="el-icon-s-platform"></i></el-menu-item>

      <el-menu-item index="0">用户中心</el-menu-item>
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
</style>