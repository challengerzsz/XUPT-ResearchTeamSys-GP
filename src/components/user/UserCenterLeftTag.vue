<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-menu default-active="1-1"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户信息管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item @click="showUserInfo()"
                            index="1-1">个人详细信息</el-menu-item>
              <el-menu-item @click="resetPassword()"
                            index="1-2">安全中心</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="科研小组">
              <el-menu-item @click="showTeamInfo()"
                            index="1-3">科研小组信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">过程文档管理</span>
            </template>
            <el-menu-item-group title="论文">
              <el-menu-item index="2-2"
                            @click="showUserWork()">开题、中期报告</el-menu-item>
              <el-menu-item index="2-4"
                            @click="showPaper()">小论文</el-menu-item>
              <el-menu-item index="2-5"
                            @click="showGpPaper()">毕业论文</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4"
                        @click="showDocument()">
            <i class="el-icon-document"></i>
            <span slot="title">文献管理</span>
          </el-menu-item>
          <el-menu-item index="5"
                        @click="showWeeklyManagePage()">
            <i class="el-icon-document"></i>
            <span slot="title">周报管理</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">成果管理</span>
            </template>
            <el-menu-item-group title="成果相关信息查询">
              <el-menu-item index="2-6"
                            @click="showCompetition">竞赛</el-menu-item>
              <el-menu-item index="2-7"
                            @click="showPatent">专利</el-menu-item>
              <el-menu-item index="2-8"
                            @click="showSoftwareCopyright">软件著作权</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">日常工作</span>
            </template>
            <el-menu-item-group title="个人荣誉">
              <el-menu-item @click="showClaimExpense()"
                            index="2-6">报销</el-menu-item>
              <el-menu-item index="2-7"
                            @click="showProject">项目</el-menu-item>
              <el-menu-item index="2-8">统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'userCenterLeftTag',
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    showWeeklyManagePage() {
      this.$router.push({ path: '/userCenter/weeklyManagement' })
    },
    showPreview() {
      this.$router.push({ path: '/userCenter/progressPreview' })
    },
    showUserInfo() {
      this.$router.push({ path: '/userCenter/userInfo' })
    },
    showDocument() {
      this.$router.push({ path: '/userCenter/document' })
    },
    showUserWork() {
      this.$router.push({ path: '/userCenter/userWork' })
    },
    showTeamInfo() {
      this.$router.push({ path: '/userCenter/teamInfo' })
    },
    resetPassword() {
      this.$router.push({ path: '/userCenter/securityCenter' })
    },
    showPaper() {
      this.$router.push({ path: '/userCenter/paper' })
    },
    showClaimExpense() {
      this.$router.push({ path: '/userCenter/claimExpenseCenter' })
    },
    showGpPaper() {
      this.$router.push({ path: '/userCenter/gp-paper' })
    },
    showProject() {
      this.$router.push({ path: '/userCenter/project' })
    },
    showCompetition() {
      this.$router.push({ path: '/userCenter/achievement/competition' })
    },
    showPatent() {
      this.$router.push({ path: '/userCenter/achievement/patent' })
    },
    showSoftwareCopyright() {
      this.$router.push({ path: '/userCenter/achievement/softwareCopyright' })
    }
  }
}
</script>

<style scoped>
div {
  height: 100%;
  width: 100%;
}
</style>