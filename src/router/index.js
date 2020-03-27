import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/login',
      children:[
          {
            path: '/login',
            name: 'Login',
            component: Login
          },
          {
            path: '/register',
            name: 'Register',
            component: Register
          }
      ]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    }
  ]
})
