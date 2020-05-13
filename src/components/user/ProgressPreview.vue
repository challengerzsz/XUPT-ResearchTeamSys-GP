<template>
  <div class="progressPreview">
    <div>
      开题报告<el-progress type="circle"
                   :percentage="0"></el-progress>
      中期报告<el-progress type="circle"
                   :percentage="25"></el-progress>
      小论文<el-progress type="circle"
                   :percentage="100"
                   status="success"></el-progress>
      大论文<el-progress type="circle"
                   :percentage="70"
                   status="warning"></el-progress>
    </div>

    <div class="bottom">
      <el-progress :text-inside="true"
                   :stroke-width="26"
                   :percentage="0"></el-progress>
      <el-progress :text-inside="true"
                   :stroke-width="24"
                   :percentage="25"
                   status="success"></el-progress>
      <el-progress :text-inside="true"
                   :stroke-width="22"
                   :percentage="100"
                   status="warning"></el-progress>
      <el-progress :text-inside="true"
                   :stroke-width="20"
                   :percentage="70"
                   status="exception"></el-progress>
    </div>

  </div>
</template>

<script>
export default {
  name: 'progressPreview'
}
</script>

<style scoped>
.progressPreview {
  width: 800px;
  height: 300px;
}
.bottom {
  margin-top: 200px;
}
</style>