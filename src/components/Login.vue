<template>

  <div>
    <CommonHeader></CommonHeader>
    <div class="loginDiv">
      <div>
        <img src="http://xupt.edu.cn/newWeb/images/xy_logo.png" />
      </div>
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               label-position="right"
               label-width="auto"
               ref="ruleForm"
               class="loginForm">
        <el-form-item class="elementItem"
                      label="职工账号|学生账号"
                      prop="defaultUserAccount">
          <el-input v-model="ruleForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="register()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>
import CommonHeader from './CommonHeader'
import QS from 'qs'
import jwt from 'jsonwebtoken'

export default {
  name: 'login',
  components: {
    CommonHeader
  },
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入工号或学号'))
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'))
      }
    }

    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validateAccount, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      var data = {
        username: this.ruleForm.username,
        password: this.ruleForm.password
      }
      this.$axios
        .post('/api/login', QS.stringify(data))
        .then(response => {
          var rspStatus = response.data.status
          console.log(rspStatus)
          // err
          if (rspStatus != 1) console.error('bad')
          if (rspStatus == 1) {
            let backendToken = response.data.data
            window.localStorage.setItem('TOKEN', backendToken)
            console.log(backendToken)
            let str = jwt.decode(backendToken.replace('Bearer ', ''))
            const currentUserRole = JSON.parse(str.authorities)[0].authority
            const roleAdmin = 'ROLE_ADMIN'
            const roleTeacher = 'ROLE_TEACHER'
            const roleStudent = 'ROLE_STUDENT'
            if (currentUserRole === roleAdmin) {
              this.$router.push({ path: '/admin' })
            } else if (currentUserRole === roleStudent) {
              this.$router.push({ path: '/userCenter' })
            } else if (currentUserRole === roleTeacher) {
              this.$router.push({ path: '/teacherCenter' })
            }
          }
        })
        .catch(error => {
          console.error(error)
        })
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          console.warn('there is an error occured on validated the form!')
          return false
        }
      })
    },
    register() {
      console.log('register')
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>

<style scoped>
.loginDiv {
  margin-top: 5cm;
  margin-right: 2cm;
  width: 10cm;
  float: right;
}
</style>