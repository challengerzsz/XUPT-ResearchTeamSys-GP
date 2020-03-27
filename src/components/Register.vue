<template>
  <div>
    <CommonHeader></CommonHeader>
    <div class="registerDiv">

      <div>
        <img src="http://xupt.edu.cn/newWeb/images/xy_logo.png" />
      </div>
      <el-form ref="form"
               :model="form"
               label-position="left"
               label-width="auto">
        <el-form-item label="教师工号|学号">
          <el-input v-model="form.name"
                    class="input"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input class="input"
                    type="password"
                    placeholder="最大长度20位"
                    v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password"
                    class="input"
                    placeholder="确认您的密码"
                    v-model="form.rePassword"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label="性别">
              <el-select v-model="form.region"
                         class="input"
                         placeholder="男/女">
                <el-option label="男"
                           value="male"></el-option>
                <el-option label="女"
                           value="famale"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="类型">
              <el-select v-model="form.region"
                         class="input"
                         placeholder="学硕/专硕/工程硕士">
                <el-option label="学硕"
                           value="male"></el-option>
                <el-option label="专硕"
                           value="famale"></el-option>
                <el-option label="工程硕士"
                           value="famale"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="专业"
                      style="width: auto;">
          <el-select v-model="form.major"
                     class="input"
                     placeholder="专业名称">
            <el-option label="计算机科学与技术"
                       value="male"></el-option>
            <el-option label="软件工程"
                       value="famale"></el-option>
            <el-option label="网络工程"
                       value="famale"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入学/毕业时间">
          <el-col :span="11">
            <el-date-picker type="date"
                            class="input"
                            placeholder="选择入学日期"
                            v-model="form.date1"></el-date-picker>
          </el-col>
          <el-col class="line"
                  :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date"
                            class="input"
                            placeholder="选择毕业日期"
                            v-model="form.date2"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="研究类型">
          <el-checkbox-group v-model="form.type"
                             class="input">
            <el-checkbox label="脑电"
                         name="type"></el-checkbox>
            <el-checkbox label="大数据"
                         name="type"></el-checkbox>
            <el-checkbox label="云计算"
                         name="type"></el-checkbox>
            <el-checkbox label="人工智能AI"
                         name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource"
                        class="input">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> -->
        <!-- <el-form-item label="活动形式">
        <el-input type="textarea"
                  class="input"
                  v-model="form.desc"></el-input>
      </el-form-item> -->
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">注册</el-button>
          <el-button @click="onCancle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>
<script>
import CommonHeader from './CommonHeader'

export default {
  name: 'register',
  components: {
    CommonHeader
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    onCancle() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.registerDiv {
  margin-top: 2cm;
  margin-right: 2cm;
  width: auto;
  float: right;
}
.input {
  float: left;
  width: 100%;
  margin-left: 0px;
}
</style>