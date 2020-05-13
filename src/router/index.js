import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Admin from "@/components/admin/Admin";
import UserCenter from "@/components/user/UserCenter";
import ProgressPreview from "@/components/user/ProgressPreview";
import AdminManageUser from "@/components/admin/AdminManageUser";
import AdminManageUserRole from "@/components/admin/AdminManageUserRole";
import TeacherCenter from "@/components/teacher/TeacherCenter";
import WeeklyManagement from "@/components/user/WeeklyManagement";
import UserInfo from "@/components/user/UserInfo";

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
        },
        {
          path: "/register",
          name: "Register",
          component: Register
        }
      ]
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      children: [
        {
          path: "/admin/manageUser",
          name: "AdminManageUser",
          component: AdminManageUser
        },
        {
          path: "/admin/ManageUserRole",
          name: "AdminManageUserRole",
          component: AdminManageUserRole
        }
      ]
    },
    {
      path: "/userCenter",
      name: "UserCenter",
      component: UserCenter,
      children: [
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
        }
      ]
    },
    {
      path: "/teacherCenter",
      name: "TeacherCenter",
      component: TeacherCenter
    }
  ]
});
