<template>
  <div class="layui-col-md12">
    <div class="layui-card">
      <el-divider>您所在的小组信息</el-divider>

      <div class="layui-card-body">
        <table class="layui-table">
          <tbody v-for="item in teamInfo"
                 :key="item.index">
            <tr align="center"
                v-if="item">
              <template>
                <th>{{ item.key }}</th>
                <td>{{item.value}}</td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      teamInfo: {
        teamName: {
          key: '小组名:',
          value: ''
        },
        guideTeacherInfo: {
          key: '指导老师信息:',
          value: ''
        },
        teamDirection: {
          key: '小组研究方向:',
          value: null
        },
        // teamImg: null,
        studentCount: {
          key: '小组学生人数:',
          value: ''
        }
      }
    }
  },
  methods: {
    getMyTeamInfo() {
      this.$axios
        .get('/api/team/getMyTeamInfo')
        .then(response => {
          // .join(';') + ';'
          response.data.data.guideTeachers.forEach(element => {
            this.teamInfo.guideTeacherInfo.value +=
              element.userName + ' (' + element.userAccount + ')' + ';'
          })

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