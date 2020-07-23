<template>
  <el-menu :default-active="activeIndex2"
           class="el-menu-demo"
           mode="horizontal"
           @select="handleSelect"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b">
    <el-menu-item><i class="el-icon-s-platform"></i></el-menu-item>

    <el-menu-item index="0">教师中心</el-menu-item>

    <div class="userCenterFunction">
      <!-- <el-badge value="new"
                class="item">
        <el-popover placement="bottom"
                    width="200px"
                    trigger="click">
          <el-table :data="gridData">
            <el-table-column width="100"
                             property="date"
                             label="日期"></el-table-column>
            <el-table-column width="300"
                             property="data"
                             label="消息内容"></el-table-column>
          </el-table>
          <el-button slot="reference"
                     icon="el-icon-bell">消息</el-button>

        </el-popover>
      </el-badge> -->
      <el-button class="logoutButton"
                 type="info"
                 icon="el-icon-s-home"
                 @click="logout()"
                 round>退出</el-button>
    </div>

  </el-menu>
</template>


<script>
export default {
  name: 'userCenterHeader',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      gridData: [
        {
          date: '2020-06-08',
          data: '您还未完成本周周报!请尽快完成'
        },
        {
          date: '2020-06-08',
          data: '您还未完成本周周报!请尽快完成'
        },
        {
          date: '2020-06-08',
          data: '您还未完成本周周报!请尽快完成'
        },
        {
          date: '2020-06-08',
          data: '您还未完成本周周报!请尽快完成'
        }
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    logout() {
      this.$axios
        .post('/api/logout')
        .then(response => {
          if (response.data.status == 1) {
            localStorage.removeItem('TOKEN')
            this.$router.push({ path: '/login' })
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
.logoutButton {
  float: right;
}
.item {
  /* margin-top: 5px; */
  margin-right: 100px;
}
.logoutButton {
  background-color: rgba(84, 92, 100, 1);
}
.userCenterFunction {
  float: right;
  background-color: rgba(84, 92, 100, 1);
  margin-top: 10px;
  margin-right: 10px;
}
</style>