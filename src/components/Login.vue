<template>
  <div class="login-bg">
    <div class="login layui-anim layui-anim-up">
      <div class="message"><b>科研团队教学管理系统</b></div>
      <div id="darkbannerwrap"></div>
      <el-form :model="loginForm"
               status-icon
               :rules="rules"
               label-position="right"
               label-width="auto"
               ref="loginForm"
               class="loginForm">
        <el-form-item class="elementItem"
                      prop="defaultUserAccount">
          <el-input v-model="loginForm.username"
                    autocomplete="off"
                    placeholder="职工账号|学生账号"></el-input>
        </el-form-item>
        <hr class="hr15" />
        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="密码"
                    v-model="loginForm.password"></el-input>
        </el-form-item>
        <hr class="hr15" />
        <el-form-item>
          <el-button class="el-button"
                     type="primary"
                     size="medium"
                     @keyup.enter="submitForm('loginForm')"
                     @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import QS from 'qs'
import jwt from 'jsonwebtoken'
export default {
  name: '',
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入工号或学号'))
      } else {
        // if (this.loginForm.password !== '') {
        //   this.$refs.loginForm.validateField('checkPass')
        // }
        callback()
      }
    }

    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'))
      }
    }

    return {
      loginForm: {
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
    login() {
      var axios = this.$axios
      layui.use(['form'], function() {
        var form = layui.form
        // 监听提交
        form.on('submit(login)', function(data) {
          console.log(QS.stringify(data.field))
          axios
            .post('/api/login', QS.stringify(data.field))
            .then(response => {
              var rspStatus = response.data.status
              console.log(rspStatus)
              // err
              if (rspStatus != 1) {
              }
              if (rspStatus == 1) {
                alert('成功')
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
        })
        return false
      })
    },
    submitForm(formName) {
      var data = {
        username: this.loginForm.username,
        password: this.loginForm.password
      }
      this.$axios
        .post('/api/login', QS.stringify(data))
        .then(response => {
          var rspStatus = response.data.status
          console.log(rspStatus)
          // err
          if (rspStatus != 1) {
            this.$message.error(response.data.msg)
          }
          if (rspStatus == 1) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            let backendToken = response.data.data
            window.localStorage.setItem('TOKEN', backendToken)

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
    }
  },
  mounted() {
    this.login()
  }
}
</script>
<style scoped>
.el-button {
  width: 300px;
  height: 43px;
  text-align: center;
  margin-left: 15px;
}
.login-bg {
  /*background: #eeeeee url() 0 0 no-repeat;*/
  background: url(/static/imgs/bg.png) no-repeat center;
  background-size: cover;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
}
.login {
  margin: 120px auto 0 auto;
  min-height: 420px;
  max-width: 420px;
  padding: 40px;
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  /* overflow-x: hidden; */
  box-sizing: border-box;
}
.login a.logo {
  display: block;
  height: 58px;
  width: 167px;
  margin: 0 auto 30px auto;
  background-size: 167px 42px;
}
.login .message {
  margin: 10px 0 0 -58px;
  padding: 18px 10px 18px 60px;
  background: #409eff;
  position: relative;
  color: #fff;
  font-size: 16px;
}
.login #darkbannerwrap {
  background: url(/static/imgs/aiwrap.png);
  width: 18px;
  height: 10px;
  margin: 0 0 20px -58px;
  position: relative;
}

.login input[type='text'],
.login input[type='file'],
.login input[type='password'],
.login input[type='email'],
select {
  border: 1px solid #dcdee0;
  vertical-align: middle;
  border-radius: 3px;
  height: 50px;
  padding: 0px 16px;
  font-size: 14px;
  color: #555555;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}
.login input[type='text']:focus,
.login input[type='file']:focus,
.login input[type='password']:focus,
.login input[type='email']:focus,
select:focus {
  border: 1px solid #27a9e3;
}
.login input[type='submit'],
.login input[type='button'] {
  display: inline-block;
  vertical-align: middle;
  padding: 12px 24px;
  margin: 0px;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  color: #ffffff;
  background-color: #189f92;
  border-radius: 3px;
  border: none;
  -webkit-appearance: none;
  outline: none;
  width: 100%;
}
.login hr {
  background: #fff url() 0 0 no-repeat;
}
.login hr.hr15 {
  height: 15px;
  border: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
.login hr.hr20 {
  height: 20px;
  border: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
</style>
