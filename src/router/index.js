import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import BasicLayout from '@/layout/basicLayout'
import BlogLayout from "@/layout/blogLayout";


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/admin',
    name: 'admin',
    component: BasicLayout,
    redirect: '/home',
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
    path: '/',
    name: 'blog-preview',
    component: BlogLayout,
    redirect: '/blog/preview/list',
    hide: true,
    children: [
      {
        path: '/blog/preview/list',
        name: 'blog-preview-list',
        component: () => import('@/views/blog/preview'),
        meta: {title: '文章列表'}
      },
      {
        path: '/blog/preview/detail',
        name: 'blog-preview-detail',
        component: () => import('@/views/blog/preview/preview'),
        meta: {title: '博客预览'}
      }
    ]
  },{
    path: '/login',
    name: 'Login',
    hide: true,
    component: () => import('@/views/login'),
    meta: {title: '登录'},
  },

  {
    path: '/game',
    name: 'game',
    hide: true,
    component: () => import('@/views/game'),
    meta: {title: 'game'},
  },
  {
    path: '/game/2048',
    name: 'game-2048',
    hide: true,
    component: () => import('@/views/game/2048'),
    meta: {title: '2048'},
  },
]

/**
 * 异步路由
 * @type {*[]}
 */
export const asyncRoutes = [
  // Blog
  {
    path: '/blog/admin',
        name: 'Layout',
      component: BasicLayout,
      meta: {title: '博客', icon: 'el-icon-s-order', permissions: ['blog']},
    children: [
      {
        path: '/blog/admin/category',
        name: 'category',
        component: () => import('@/views/blog/admin/category'),
        meta: {title: '类别', permissions: ['blog-category']}
      },
      {
        path: '/blog/admin/tag',
        name: 'tag',
        component: () => import('@/views/blog/admin/tag'),
        meta: {title: '标签', permissions: ['blog-tag']}
      },
      {
        path: '/blog/admin/list',
        name: 'blog',
        component: () => import('@/views/blog/admin/article'),
        meta: {title: '博客列表', permissions: ['blog-article']}
      },{
        path: '/blog/admin/editor',
        name: 'blog-editor',
        hide: true,
        component: () => import('@/views/blog/admin/article/Editor'),
        meta: {title: '博客添加', permissions: ['blog-article-editor']}
      },
    ]
  },
  // system
  {
    path: '/system',
    component: BasicLayout,
    name: 'system',
    redirect: '/system/user',
    meta: {title: '系统管理', icon: 'el-icon-s-tools', permissions: ['system']},
    children: [
      {
        path: '/system/user',
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
  },
]


const router = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
export default router

