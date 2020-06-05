<template>
  <div class="userInfoMain">
    <div>
      <div class="userImg">
        <el-avatar :size="150"
                   :src="form.avatar"></el-avatar>
      </div>
      <div class="userInfo">
        <el-form ref="form"
                 :model="form"
                 label-width="150px">
          <el-form-item label="学号">
            <el-input :disabled="true"
                      v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.male"
                      label="0">男</el-radio>
            <el-radio v-model="form.male"
                      label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="学历">
            <el-select style="width:100%;"
                       size="medium"
                       v-model="form.education"
                       placeholder="请选择">
              <el-option v-for="item in educations"
                         :key="item.value"
                         :label="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="接收实时推送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="研究方向">
            <el-checkbox-group v-model="form.type">
              <el-checkbox v-for="item in types"
                           :label="item.directionName"
                           :key="item.id"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="textarea"
                      v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import QS from 'qs'
export default {
  name: 'userInfo',
  data() {
    return {
      form: {
        id: '',
        account: '04163104',
        avatar:
          'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        name: '张三',
        male: '1',
        delivery: true,
        type: [],
        desc: '',
        education: ''
      },
      types: [],
      educations: [
        {
          value: '学硕'
        },
        {
          value: '专硕'
        },
        {
          value: '工程硕士'
        }
      ]
    }
  },
  methods: {
    getUserInfo() {
      this.$axios
        .get('/api/user/info')
        .then(response => {
          this.form.account = response.data.data.userAccount
          this.form.name = response.data.data.userName
          this.form.male = response.data.data.sex + ''
          this.form.desc = response.data.data.personalSignature
          var researchDirection = response.data.data.researchDirection
          this.form.type = researchDirection.split(';')
          this.form.education = response.data.data.classify
          this.form.type.pop()
          this.form.id = response.data.data.id
        })
        .catch(error => {
          console.error(error)
        })
      this.$axios
        .get('/api/researchDirection/getAll')
        .then(response => {
          this.types = response.data.data
          console.log(response.data.data)
        })
        .catch(error => {
          console.error(error)
        })
    },
    onSubmit() {
      var data = {
        id: this.form.id,
        username: this.form.name,
        sex: this.form.male + '',
        classify: this.form.education,
        researchDirection: this.form.type.join(';') + ';',
        personalSignature: this.form.desc
      }
      this.$axios
        .post('/api/user/modifyInfo', QS.stringify(data), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.userInfoMain {
  position: absolute;
}
.userImg {
  height: 10px;
  width: 10px;
  margin-top: 10px;
  margin-left: 100px;
  float: left;
}
.userInfo {
  margin-left: 300px;
  margin-top: 15px;
  height: 50px;
  width: 500px;
  float: left;
}
</style>