<template>
  <div>
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="小组信息预览"
                   name="teamPreview">

      </el-tab-pane>
      <el-tab-pane label="配置管理"
                   name="second">创建小组</el-tab-pane>
      <el-tab-pane label="角色管理"
                   name="third">分配小组成员</el-tab-pane>
      <el-tab-pane label="定时任务补偿"
                   name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'teamPreview'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>