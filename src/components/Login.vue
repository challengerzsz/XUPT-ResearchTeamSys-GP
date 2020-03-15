<template>
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
        <el-input v-model="ruleForm.defaultUserAccount"
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
</template>
<script>
export default {
  name: 'login',
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入工号或学号'))
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
        defaultUserAccount: '',
        password: ''
      },
      rules: {
        defaultUserAccount: [{ validator: validateAccount, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
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