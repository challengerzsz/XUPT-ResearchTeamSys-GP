<template>
  <div>
    <el-dropdown>
      <i class="el-icon-setting"
         style="margin-right: 15px;font-size:20px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span><b>科研团队后台管理</b></span>
  </div>
</template>

<script>
export default {
  name: 'adminHeader',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
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
