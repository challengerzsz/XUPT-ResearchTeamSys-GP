import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import Login from "@/components/Login";
import Admin from "@/components/admin/Admin";
import UserCenter from "@/components/user/UserCenter";
import ProgressPreview from "@/components/user/ProgressPreview";
import AdminManageUser from "@/components/admin/AdminManageUser";
import AdminManageUserRole from "@/components/admin/AdminManageUserRole";
import TeacherCenter from "@/components/teacher/TeacherCenter";
import WeeklyManagement from "@/components/user/WeeklyManagement";
import UserInfo from "@/components/user/UserInfo";
import Register from "@/components/admin/Register";
import Document from "@/components/Document.vue";
import UserWork from "@/components/user/UserWork.vue";
import TeamInfo from "@/components/user/TeamInfo.vue";
import Websocket from "@/components/Websocket.vue";
import Welcome from "@/components/admin/AdminWelcome.vue";
import Team from "@/components/admin/AdminManageTeam.vue";
import SecurityCenter from "@/components/user/SecurityCenter.vue";
import Paper from "@/components/Paper.vue";
import ClaimExpense from "@/components/user/ClaimExpenseCenter.vue";
import GPPaper from "@/components/user/GPPaper.vue";
import Project from "@/components/user/Project";
import Competition from "@/components/user/achievement/Competition.vue";
import Patent from "@/components/user/achievement/Patent.vue";
import SoftwareCopyright from "@/components/user/achievement/SoftwareCopyright.vue";
import TeacherTeamInfo from "@/components/teacher/TeacherTeamInfo.vue";
import TeacherPaper from "@/components/teacher/TeacherPaper.vue";
import TeacherGpPaper from "@/components/teacher/TeacherGpPaper.vue";
import TeacherDocument from "@/components/Document.vue";
import TeacherWeeklyReport from "@/components/teacher/TeacherWeeklyReport.vue";
import TeacherProject from "@/components/teacher/TeacherProject.vue";
import TeacherCompetition from "@/components/teacher/achievement/TeacherCompetition.vue";
import TeacherPatent from "@/components/teacher/achievement/TeacherPatent.vue";
import TeacherSoftwareCopyright from "@/components/teacher/achievement/TeacherSoftwareCopyright.vue";
import TeacherWork from "@/components/teacher/TeacherWork.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
      redirect: "/login",
      children: [
        {
          path: "/login",
          name: "Login",
          component: Login
        }
      ]
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      children: [
        {
          path: "/admin/welcome",
          name: "Welcome",
          component: Welcome
        },
        {
          path: "/admin/manageUser",
          name: "AdminManageUser",
          component: AdminManageUser
        },
        {
          path: "/admin/ManageUserRole",
          name: "AdminManageUserRole",
          component: AdminManageUserRole
        },
        {
          path: "/admin/register",
          name: "register",
          component: Register
        },
        {
          path: "/admin/team",
          name: "team",
          component: Team
        }
      ]
    },
    {
      path: "/userCenter",
      name: "UserCenter",
      component: UserCenter,
      children: [
        {
          path: "/userCenter/securityCenter",
          name: "SecurityCenter",
          component: SecurityCenter
        },
        {
          path: "/userCenter/progressPreview",
          name: "ProgressPreview",
          component: ProgressPreview
        },
        {
          path: "/userCenter/weeklyManagement",
          name: "WeeklyManagement",
          component: WeeklyManagement
        },
        {
          path: "/userCenter/userInfo",
          name: "UserInfo",
          component: UserInfo
        },
        {
          path: "/userCenter/document",
          name: "Document",
          component: Document
        },
        {
          path: "/userCenter/userWork",
          name: "UserWork",
          component: UserWork
        },
        {
          path: "/userCenter/teamInfo",
          name: "TeamInfo",
          component: TeamInfo
        },
        {
          path: "/userCenter/paper",
          name: "Paper",
          component: Paper
        },
        {
          path: "/userCenter/claimExpenseCenter",
          name: "claimExpenseCenter",
          component: ClaimExpense
        },
        {
          path: "/userCenter/gp-paper",
          name: "GPPaper",
          component: GPPaper
        },
        {
          path: "/userCenter/project",
          name: "Project",
          component: Project
        },
        {
          path: "/userCenter/achievement/competition",
          name: "Competition",
          component: Competition
        },
        {
          path: "/userCenter/achievement/patent",
          name: "Patent",
          component: Patent
        },
        {
          path: "/userCenter/achievement/softwareCopyright",
          name: "SoftwareCopyright",
          component: SoftwareCopyright
        }
      ]
    },
    {
      path: "/teacherCenter",
      name: "TeacherCenter",
      component: TeacherCenter,
      children: [
        {
          path: "/teacherCenter/teacherInfo",
          name: "UserInfo",
          component: UserInfo
        },
        {
          path: "/teacherCenter/teacherTeamInfo",
          name: "TeacherTeamInfo",
          component: TeacherTeamInfo
        },
        {
          path: "/teacherCenter/securityCenter",
          name: "SecurityCenter",
          component: SecurityCenter
        },
        {
          path: "/teacherCenter/paper",
          name: "TeacherPaper",
          component: TeacherPaper
        },
        {
          path: "/teacherCenter/gp-paper",
          name: "TeacherGpPaper",
          component: TeacherGpPaper
        },
        {
          path: "/teacher/document",
          name: "TeacherDocument",
          component: TeacherDocument
        },
        {
          path: "/teacher/weeklyReport",
          name: "TeacherWeeklyReport",
          component: TeacherWeeklyReport
        },
        {
          path: "/teacher/claimExpense",
          name: "ClaimExpense",
          component: ClaimExpense
        },
        {
          path: "/teacher/project",
          name: "TeacherProject",
          component: TeacherProject
        },
        {
          path: "/teacher/achievement/competition",
          name: "TeacherCompetition",
          component: TeacherCompetition
        },
        {
          path: "/teacher/achievement/patent",
          name: "TeacherPatent",
          component: TeacherPatent
        },
        {
          path: "/teacher/achievement/softwareCopyright",
          name: "TeacherSoftwareCopyright",
          component: TeacherSoftwareCopyright},
        {
          path: "/teacherCenter/teacherWork",
          name: "TeacherWork",
          component: TeacherWork
        }
      ]
    },
    {
      path: "/websocket",
      name: "Websocket",
      component: Websocket
    }
  ]
});
