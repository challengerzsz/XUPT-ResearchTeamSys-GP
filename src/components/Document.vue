<template>
  <div>
    <div class="options">
      <el-row class="elRow">
        <el-button type="primary"
                   @click="postDialogVisible = true">上传文献</el-button>
      </el-row>
    </div>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-form-item label="作者">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="论文题目">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="使用方法">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="单位(机构)">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="摘要(中文)">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="创新点">
              <span>{{ props.row.new }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="论文题目"
                       prop="id">
      </el-table-column>
      <el-table-column label="作者"
                       prop="name">
      </el-table-column>
      <el-table-column label="关键字"
                       prop="desc">
      </el-table-column>
      <el-table-column label="浏览"
                       prop="desc">
        <el-button type="success"
                   icon="el-icon-document-copy"
                   @click="dialogVisible = true"
                   circle></el-button>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible"
               width="70%"
               height="500px"
               :before-close="handleClose"
               class="dialog">
      <div>
        <div class="downloadButton">
          <el-button type="success">下载该文档PDF文件</el-button>
        </div>
        <div style="clear:both" />
        <br />
        <div class="commentArea">
          <el-tree :data="data"
                   :props="defaultProps"
                   @node-click="handleNodeClick"></el-tree>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="postDialogVisible"
               width="70%"
               height="500px"
               :before-close="handleClose"
               class="dialog">
      <div class="postDocument">
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="论文题目">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="单位(机构)">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="创新点">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="使用方法">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="摘要(中文)">
            <el-input type="textarea"
                      v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-upload class="upload-demo"
                   drag
                   action="https://jsonplaceholder.typicode.com/posts/"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip"
               slot="tip">只能上传.pdf文件</div>
        </el-upload>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false, submit()">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      postDialogVisible: false,
      tableData: [
        {
          id: '浅议人工智能背景下的大学英语口语教学与评价',
          name: '	王璐',
          category: '西安邮电大学',
          desc: '人工智能 ; 大学英语 ; 口语教学 ; 口语评价 ;',
          address:
            '科技与网络的发展,带来教育的重大变革。人工智能的出现为大学英语口语教学与评价提供了全新的技术支持和更广阔的资源平台。口语教学与评价与人工智能及互联网相融合,大大地改善了传统教学模式和评价模式的弊端。极大地提高了口语教学效果与口语评价的客观性与科学性。 ',
          originUrl: 'www.cnki.com/xxxx',
          shopId: '10333',
          new: 'AI'
        },
        {
          id: '浅议人工智能背景下的大学英语口语教学与评价',
          name: '	王璐',
          category: '西安邮电大学',
          desc: '人工智能 ; 大学英语 ; 口语教学 ; 口语评价 ;',
          address:
            '科技与网络的发展,带来教育的重大变革。人工智能的出现为大学英语口语教学与评价提供了全新的技术支持和更广阔的资源平台。口语教学与评价与人工智能及互联网相融合,大大地改善了传统教学模式和评价模式的弊端。极大地提高了口语教学效果与口语评价的客观性与科学性。 ',
          originUrl: 'www.cnki.com/xxxx',
          shopId: '10333',
          new: 'AI'
        },
        {
          id: '浅议人工智能背景下的大学英语口语教学与评价',
          name: '	王璐',
          category: '西安邮电大学',
          desc: '人工智能 ; 大学英语 ; 口语教学 ; 口语评价 ;',
          address:
            '科技与网络的发展,带来教育的重大变革。人工智能的出现为大学英语口语教学与评价提供了全新的技术支持和更广阔的资源平台。口语教学与评价与人工智能及互联网相融合,大大地改善了传统教学模式和评价模式的弊端。极大地提高了口语教学效果与口语评价的客观性与科学性。 ',
          originUrl: 'www.cnki.com/xxxx',
          shopId: '10333',
          new: 'AI'
        },
        {
          id: '浅议人工智能背景下的大学英语口语教学与评价',
          name: '	王璐',
          category: '西安邮电大学',
          desc: '人工智能 ; 大学英语 ; 口语教学 ; 口语评价 ;',
          address:
            '科技与网络的发展,带来教育的重大变革。人工智能的出现为大学英语口语教学与评价提供了全新的技术支持和更广阔的资源平台。口语教学与评价与人工智能及互联网相融合,大大地改善了传统教学模式和评价模式的弊端。极大地提高了口语教学效果与口语评价的客观性与科学性。 ',
          originUrl: 'www.cnki.com/xxxx',
          shopId: '10333',
          new: 'AI'
        },
        {
          id: '浅议人工智能背景下的大学英语口语教学与评价',
          name: '	王璐',
          category: '西安邮电大学',
          desc: '人工智能 ; 大学英语 ; 口语教学 ; 口语评价 ;',
          address:
            '科技与网络的发展,带来教育的重大变革。人工智能的出现为大学英语口语教学与评价提供了全新的技术支持和更广阔的资源平台。口语教学与评价与人工智能及互联网相融合,大大地改善了传统教学模式和评价模式的弊端。极大地提高了口语教学效果与口语评价的客观性与科学性。 ',
          originUrl: 'www.cnki.com/xxxx',
          shopId: '10333',
          new: 'AI'
        },
        {
          id: '浅议人工智能背景下的大学英语口语教学与评价',
          name: '	王璐',
          category: '西安邮电大学',
          desc: '人工智能 ; 大学英语 ; 口语教学 ; 口语评价 ;',
          address:
            '科技与网络的发展,带来教育的重大变革。人工智能的出现为大学英语口语教学与评价提供了全新的技术支持和更广阔的资源平台。口语教学与评价与人工智能及互联网相融合,大大地改善了传统教学模式和评价模式的弊端。极大地提高了口语教学效果与口语评价的客观性与科学性。 ',
          originUrl: 'www.cnki.com/xxxx',
          shopId: '10333',
          new: 'AI'
        }
      ],
      data: [
        {
          label: '这篇论文对AI技术进行了认真的分析，可以查阅',
          children: [
            {
              label: 'AI应用',
              children: [
                {
                  label: '赞同楼上观点'
                }
              ]
            }
          ]
        },
        {
          label: '这篇文章建议给英文好的同学阅读哈',
          children: [
            {
              label: '英语不好还真读不了',
              children: [
                {
                  label: '哈哈哈 看个论文还得英语好'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 提交
    submit() {
      console.log(this.content)
      console.log(this.html)
    },
    handleNodeClick(data) {
      console.log(data)
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
.options {
  float: left;
}
.downloadButton {
  float: left;
}
.commentArea {
  width: auto;
}
.dialog {
  height: auto;
}
.postDocument {
  width: 500px;
}
</style>