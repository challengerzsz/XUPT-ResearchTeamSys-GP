<template>
  <el-carousel :interval="4000"
               type="card"
               height="400px">
    <el-carousel-item v-for="item in array"
                      :key="item">
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    return {
      array: {
        teamName: '第一研究组',
        teamTeacher: '张荣',
        teamCount: '40人'
      }
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 50px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>