<template>
  <div class="register">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px">
      <el-form-item label="姓名"
                    prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="用户学号"
                    prop="name">
        <el-input v-model="ruleForm.name"
                  placeholder="今后作为用户登录账号"></el-input>
      </el-form-item>
      <el-form-item label="性别"
                    prop="region">
        <el-select v-model="ruleForm.region"
                   placeholder="请选择性别">
          <el-option label="男"
                     value="shanghai"></el-option>
          <el-option label="女"
                     value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="活动时间"
                    required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.date1"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line"
                :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间"
                            v-model="ruleForm.date2"
                            style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item> -->
      <el-form-item label="用户类型"
                    prop="region">
        <el-select v-model="ruleForm.region"
                   placeholder="请选择用户类型">
          <el-option label="教师"
                     value="shanghai"></el-option>
          <el-option label="学生"
                     value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="即时配送"
                    prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item> -->
      <el-form-item label="研究方向"
                    prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="脑电"
                       name="type"></el-checkbox>
          <el-checkbox label="大数据"
                       name="type"></el-checkbox>
          <el-checkbox label="人工智能"
                       name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="指导老师"
                    prop="region">
        <el-select v-model="ruleForm.region"
                   placeholder="请指定指导老师">
          <el-option label="张荣"
                     value="shanghai"></el-option>
          <el-option label="张三"
                     value="beijing"></el-option>
          <el-option label="李四"
                     value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="特殊资源"
                    prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <!-- <el-form-item label="活动形式"
                    prop="desc">
        <el-input type="textarea"
                  v-model="ruleForm.desc"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">新增用户</el-button>
        <el-button @click="resetForm('ruleForm')">重置信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个研究方向',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.register {
  width: 500px;
}
</style>