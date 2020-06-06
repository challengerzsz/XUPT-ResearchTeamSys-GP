<template>
  <el-carousel :interval="4000"
               type="card"
               height="400px">
    <el-carousel-item v-for="item in teamInfo"
                      :key="item">
      <h3 class="medium"
          v-if="item">{{ item.key }}<br>{{item.value}}</h3>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    return {
      teamInfo: {
        teamName: {
          key: '小组名:',
          value: null
        },
        guideTeacherName: {
          key: '指导老师姓名:',
          value: null
        },
        guideTeacherAccount: {
          key: '指导老师账号:',
          value: null
        },
        teamDirection: {
          key: '小组研究方向:',
          value: null
        },
        // teamImg: null,
        studentCount: {
          key: '小组学生人数:',
          value: null
        }
      }
    }
  },
  methods: {
    getMyTeamInfo() {
      this.$axios
        .get('/api/team/getMyTeamInfo')
        .then(response => {
          this.teamInfo.guideTeacherAccount.value =
            response.data.data.guideTeacherAccount
          this.teamInfo.guideTeacherName.value =
            response.data.data.guideTeacherName
          this.teamInfo.teamName.value = response.data.data.teamName
          //   this.teamInfo.teamImg = response.data.data.teamImg
          this.teamInfo.studentCount.value = response.data.data.studentCount
          this.teamInfo.teamDirection.value = response.data.data.teamDirection
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.getMyTeamInfo()
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