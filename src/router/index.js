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
    singleChild: true,
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
    path: '/blog',
    name: 'Layout',
    component: BasicLayout,
    meta: {title: '博客', icon: 'el-icon-s-order'},
    children: [
      {
        path: '/blog/list',
        name: 'blog',
        component: () => import('@/views/blog/index'),
        meta: {title: '博客列表'}
      },
      {
        path: '/blog/category',
        name: 'category',
        component: () => import('@/views/blog/category'),
        meta: {title: '类别'}
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login'),
    meta: {title: '登录'},
  }
]

/**
 * 异步路由
 * @type {*[]}
 */
export const asyncRoutes = [
  {
    path: '/system',
    component: BasicLayout,
    name: 'system',
    redirect: '/system/user',
    meta: {title: '系统管理', icon: 'el-icon-s-tools', permissions: ['system']},
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user/index'),
        meta: {title: '用户', permissions: ['system-user']},
      },
      {
        path: '/system/role',
        name: 'role',
        component: () => import('@/views/system/role/index'),
        meta: {title: '角色', permissions: ['system-role']},
      },
      {
        path: '/system/permission',
        name: 'permission',
        component: () => import('@/views/system/permission/index'),
        meta: {title: '权限', permissions: ['system-permission']},
      }
    ]
  }
]


const router = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
export default router
