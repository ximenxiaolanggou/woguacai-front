import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import BasicLayout from '@/layout/basicLayout'


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    name: 'Layout',
    component: BasicLayout,
    hidden: false,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {title: '首页', icon: 'el-icon-s-home'}
      }
    ]
  },
  {
    path: '/system',
    component: BasicLayout,
    name: 'system',
    redirect: '/system/user',
    meta: {title: '系统管理', icon: 'el-icon-s-tools'},
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user/index'),
        meta: {title: '用户'},
      },
      {
        path: '/system/role',
        name: 'role',
        component: () => import('@/views/system/role/index'),
        meta: {title: '角色'},
      },
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {title: '角色'},
  },

]


const router = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
export default router
