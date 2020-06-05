<template>
  <div class="layui-fluid">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md12">
        <div class="layui-card">
          <div class="layui-card-body">
            <blockquote class="layui-elem-quote">
              欢迎管理员：
              <span class="x-red">Admin</span>！当前时间: {{nowDateTime}}
            </blockquote>
          </div>
        </div>
      </div>
      <div class="layui-col-md12">
        <div class="layui-card">
          <div class="layui-card-header">数据统计</div>
          <div class="layui-card-body">
            <ul class="layui-row layui-col-space10 layui-this x-admin-carousel x-admin-backlog">
              <li class="layui-col-md2 layui-col-xs6">
                <a href="javascript:;"
                   class="x-admin-backlog-body">
                  <h3>小组数</h3>
                  <p>
                    <cite>{{teamCount}}</cite>
                  </p>
                </a>
              </li>
              <li class="layui-col-md2 layui-col-xs6">
                <a href="javascript:;"
                   class="x-admin-backlog-body">
                  <h3>成员数量</h3>
                  <p>
                    <cite>{{memberCount}}</cite>
                  </p>
                </a>
              </li>
              <li class="layui-col-md2 layui-col-xs6">
                <a href="javascript:;"
                   class="x-admin-backlog-body">
                  <h3>论文数量</h3>
                  <p>
                    <cite>{{paperCount}}</cite>
                  </p>
                </a>
              </li>
              <li class="layui-col-md2 layui-col-xs6">
                <a href="javascript:;"
                   class="x-admin-backlog-body">
                  <h3>成果数量</h3>
                  <p>
                    <cite>{{achievementCount}}</cite>
                  </p>
                </a>
              </li>
              <li class="layui-col-md2 layui-col-xs6">
                <a href="javascript:;"
                   class="x-admin-backlog-body">
                  <h3>文献数</h3>
                  <p>
                    <cite>{{documentCount}}</cite>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="layui-col-sm6 layui-col-md3">
        <div class="layui-card">
          <div class="layui-card-header">
            下载
            <span class="layui-badge layui-bg-cyan layuiadmin-badge">月</span>
          </div>
          <div class="layui-card-body">
            <p class="layuiadmin-big-font">33,555</p>
            <p>
              新下载
              <span class="layuiadmin-span-color">10%
                <i class="layui-inline layui-icon layui-icon-face-smile-b"></i></span>
            </p>
          </div>
        </div>
      </div>
      <div class="layui-col-sm6 layui-col-md3">
        <div class="layui-card">
          <div class="layui-card-header">
            下载
            <span class="layui-badge layui-bg-cyan layuiadmin-badge">月</span>
          </div>
          <div class="layui-card-body">
            <p class="layuiadmin-big-font">33,555</p>
            <p>
              新下载
              <span class="layuiadmin-span-color">10%
                <i class="layui-inline layui-icon layui-icon-face-smile-b"></i></span>
            </p>
          </div>
        </div>
      </div>
      <div class="layui-col-sm6 layui-col-md3">
        <div class="layui-card">
          <div class="layui-card-header">
            下载
            <span class="layui-badge layui-bg-cyan layuiadmin-badge">月</span>
          </div>
          <div class="layui-card-body">
            <p class="layuiadmin-big-font">33,555</p>
            <p>
              新下载
              <span class="layuiadmin-span-color">10%
                <i class="layui-inline layui-icon layui-icon-face-smile-b"></i></span>
            </p>
          </div>
        </div>
      </div>
      <div class="layui-col-sm6 layui-col-md3">
        <div class="layui-card">
          <div class="layui-card-header">
            下载
            <span class="layui-badge layui-bg-cyan layuiadmin-badge">月</span>
          </div>
          <div class="layui-card-body">
            <p class="layuiadmin-big-font">33,555</p>
            <p>
              新下载
              <span class="layuiadmin-span-color">10%
                <i class="layui-inline layui-icon layui-icon-face-smile-b"></i></span>
            </p>
          </div>
        </div>
      </div>
      <div class="layui-col-md12">
        <div class="layui-card">
          <div class="layui-card-header">系统信息</div>
          <div class="layui-card-body">
            <table class="layui-table">
              <tbody>
                <tr>
                  <th>当前版本</th>
                  <td>V1.0</td>
                </tr>
                <tr>
                  <th>服务器地址</th>
                  <td>39.97.112.65</td>
                </tr>
                <tr>
                  <th>操作系统</th>
                  <td>CentOS 2 vCPU 4 GiB （I/O优化）</td>
                </tr>
                <tr>
                  <th>运行环境</th>
                  <td>
                    Springboot 2.3 Tomcat Nginx
                  </td>
                </tr>
                <tr>
                  <th>JDK版本</th>
                  <td>1.8</td>
                </tr>
                <tr>
                  <th>代码托管</th>
                  <td>https://github.com/challengerzsz/XUPT-ResearchTeamSys-GP
                    <br>
                    https://github.com/challengerzsz/ResearchTeamManagementSys-Api-GP
                  </td>
                </tr>
                <tr>
                  <th>MYSQL版本</th>
                  <td>5.6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="layui-col-md12">
        <div class="layui-card">
          <div class="layui-card-header">开发者</div>
          <div class="layui-card-body">
            <table class="layui-table">
              <tbody>
                <tr>
                  <th>版权所有</th>
                  <td>
                    research.xupt.edu.cn
                    <a href="https://research.xupt.edu.cn"
                       target="_blank">访问官网</a>
                  </td>
                </tr>
                <tr>
                  <th>开发者</th>
                  <td>曾帅智(challengerzsz@126.com)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- <style id="welcome_style"></style>
      <div class="layui-col-md12">
        <blockquote class="layui-elem-quote layui-quote-nm">
          感谢layui,百度Echarts,jquery,本系统由x-admin提供技术支持。
        </blockquote>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nowDateTime: null,
      teamCount:null,
      memberCount:null,
      paperCount:null,
      achievementCount:null,
      documentCount:null
    }
  },
  methods: {
    showTime() {
      var now = new Date()
      var nowTime = now.toLocaleString()
      var week = now.getDay() //星期
      //判断星期几
      var weeks = ['日', '一', '二', '三', '四', '五', '六']
      var getWeek = '星期' + weeks[week]
      this.nowDateTime = nowTime + ' ' + getWeek
    },
    getTotalCount() {
      this.$axios
        .get('/api/admin/countAll')
        .then(response => {
          console.log(response.data)
          this.teamCount = response.data.data.teamCount;
          this.memberCount = response.data.data.memberCount;
          this.paperCount = response.data.data.paperCount;
          this.achievementCount = response.data.data.achievementCount;
          this.documentCount = response.data.data.documentCount;
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.showTime(), this.getTotalCount()
  }
}
</script>