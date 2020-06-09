<template>

  <div class="securityDiv">
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="重置密码"
                   name="resetPassword">
        <el-form class="resetPwd"
                 ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="当前密码">
            <el-input v-model="form.oldPwd"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.newPwd"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="form.confirmNewPwd"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">重置密码</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
import QS from 'qs'
export default {
  data() {
    return {
      activeName: 'resetPassword',
      form: {
        oldPwd: '',
        newPwd: '',
        confirmNewPwd: ''
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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
    },
    onSubmit() {
      var data = {
        oldPwd: this.form.oldPwd,
        newPwd: this.form.newPwd
      }
      this.$axios
        .post('/api/user/resetPwd', QS.stringify(this.form))
        .then(response => {
          console.log(response)
          if (response.data.status == 1) {
            this.logout()
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
.resetPwd {
  margin: 50px 30px;
  width: 350px;
}
</style>