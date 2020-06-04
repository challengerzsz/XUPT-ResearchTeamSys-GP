<template>
  <div>

    <div class="options">
      <el-row class="elRow">
        <el-button type="primary"
                   @click="dialogVisible = true">开始写这周的周报</el-button>
      </el-row>
    </div>
    <el-dialog :visible.sync="dialogVisible"
               width="70%"
               :before-close="handleClose">
      <div>
        <h2> 2020-5 第2周周报</h2>
      </div>
      <div class="editor">
        <mavon-editor v-model="content"
                      ref="md"
                      @change="change"
                      style="min-height: 600px" />
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false, submit()">提 交</el-button>
      </span>
    </el-dialog>

    <el-dialog title="2020-1 第一周周报内容"
               :visible.sync="weeklyByIddialogVisible"
               width="70%"
               :before-close="handleClose">
      <div class="editor">
        <mavon-editor v-model="weeklyByIdContent"
                      ref="md"
                      @change="change"
                      style="min-height: 600px" />
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="weeklyByIddialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <div class="oldWeeklyContent">
      <el-row :gutter="12">

        <el-divider content-position="left">2020-1 周报内容</el-divider>
        <el-col :span="50">
          <el-card shadow="hover"
                   @click.native="showWeeklyById()">
            2020-1 第一周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-1 第二周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-1 第三周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-1 第四周 周报内容
          </el-card>
        </el-col>

      </el-row>

      <el-row :gutter="12">

        <el-divider content-position="left">2020-2 周报内容</el-divider>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-2 第一周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-2 第二周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-2 第三周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-2 第四周 周报内容
          </el-card>
        </el-col>

      </el-row>
      <el-row :gutter="12">

        <el-divider content-position="left">2020-3 周报内容</el-divider>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-3 第一周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-3 第二周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-3 第三周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-3 第四周 周报内容
          </el-card>
        </el-col>

      </el-row>
      <el-row :gutter="12">

        <el-divider content-position="left">2020-4 周报内容</el-divider>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-4 第一周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-4 第二周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-4 第三周 周报内容
          </el-card>
        </el-col>
        <el-col :span="50">
          <el-card shadow="hover">
            2020-4 第四周 周报内容
          </el-card>
        </el-col>

      </el-row>

    </div>

  </div>

</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'weeklyManagement',
  components: {
    mavonEditor
  },
  data() {
    return {
      content: '', // 输入的markdown
      html: '', // 及时转的html
      dialogVisible: false,
      weeklyByIdContent: '',
      weeklyByIddialogVisible: false
    }
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
    },
    // 提交
    submit() {
      console.log(this.content)
      console.log(this.html)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    showWeeklyById() {
      console.log(123)
      this.weeklyByIdContent =
        '# 2020-1 第一周周报\n## 目标\n- AI入门\n- 吃饭\n- 睡觉\n## 已完成\n- AI入门了\n- 吃了饭\n- 睡了觉'
      this.weeklyByIddialogVisible = true
    }
  },
  mounted() {}
}
</script>
<style scoped>
.editor {
  margin-top: 100px;
}
.options {
  float: left;
}
.oldWeeklyContent {
  float: left;
  margin-top: 100px;
  width: 100%;
}
</style>