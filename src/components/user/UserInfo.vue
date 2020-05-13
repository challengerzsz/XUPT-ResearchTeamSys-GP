<template>
  <div class="userInfoMain">
    <div>
      <div class="userImg">
        <el-avatar :size="150"
                   src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
      <div class="userInfo">
        <el-form ref="form"
                 :model="form"
                 label-width="150px">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-checkbox v-model="form.male"
                         label="男"
                         name="type"></el-checkbox>
            <el-checkbox label="女"
                         name="type"></el-checkbox>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.major"></el-input>
          </el-form-item>

          <el-form-item label="接收实时推送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="研究方向">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="大数据"
                           name="type"></el-checkbox>
              <el-checkbox label="云计算"
                           name="type"></el-checkbox>
              <el-checkbox label="脑电"
                           name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item> -->
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
export default {
  name: 'userInfo',
  data() {
    return {
      form: {
        name: '曾帅智',
        male: true,
        major: '软件工程',
        delivery: true,
        type: true,
        desc: '越努力越幸运！'
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
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