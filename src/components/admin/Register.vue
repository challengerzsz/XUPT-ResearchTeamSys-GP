<template>
  <div class="register">
    <el-form :model="registerForm"
             :rules="rules"
             ref="registerForm"
             label-width="100px">

      <el-form-item label="姓名"
                    prop="userName">
        <el-input v-model="registerForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="用户学号"
                    prop="userAccount">
        <el-input v-model="registerForm.userAccount"
                  placeholder="今后作为用户登录账号"></el-input>
      </el-form-item>
      <el-form-item label="性别"
                    prop="sex">
        <el-select v-model="registerForm.sex" style="width:100%"
                   placeholder="请选择性别">
          <el-option label="男"
                     value=0></el-option>
          <el-option label="女"
                     value=1></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色" 
                    prop="role">
        <el-select v-model="registerForm.role" style="width:100%"
                   placeholder="请选择用户角色"
                   @click="checkRole()">
          <el-option label="教师"
                     value=2></el-option>
          <el-option label="学生"
                     value=3></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型"
                    prop="classify">
        <el-select v-model="registerForm.classify" style="width:100%"
                   :disabled=isDisable()
                   placeholder="请选择学生类型">
          <el-option label="学硕"
                     value="学硕"></el-option>
          <el-option label="专硕"
                     value="专硕"></el-option>
          <el-option label="工程硕士"
                     value="工程硕士"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="研究方向"
                    prop="researchDirection">
        <el-select v-model="registerForm.researchDirection" style="width:100%"
                   placeholder="请选择研究方向">
          <el-option v-for="item in researchDirections"
                     :key="item.directionName"
                     :label="item.directionName"
                     :value="item.directionName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('registerForm')">新增用户</el-button>
        <el-button @click="resetForm('registerForm')">重置信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import QS from 'qs'
export default {
  data() {
    return {
      registerForm: {
        userName: '',
        userAccount: '',
        sex: '',
        role: '',
        classify: '',
        researchDirection: '',
        guideTeacher: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        userAccount: [
          { required: true, message: '请输入用户学号', trigger: 'change' }
        ],
        sex: [{ required: true, message: '请选择用户性别', trigger: 'change' }],
        classify: [
          { required: true, message: '请选择用户性别', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择用户角色', trigger: 'change' }
        ],
        researchDirection: [
          { required: true, message: '请选择研究方向', trigger: 'change' }
        ]
      },
      researchDirections: null
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.registerForm.role == 2) {
            this.registerForm.classify = null
          }
          this.$axios
            .post('/api/user/register', QS.stringify(this.registerForm))
            .then(response => {
              this.$refs[formName].resetFields()
            })
            .catch(error => {
              console.error(error)
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    isDisable() {
      return this.registerForm.role == 1
    },
    getAllResearchDirection() {
      this.$axios
        .get('/api/researchDirection/getAll')
        .then(response => {
          this.researchDirections = response.data.data
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.getAllResearchDirection()
  }
}
</script>
<style scoped>
.register {
  margin: 0 100px;
  width: 500px;
}
</style>