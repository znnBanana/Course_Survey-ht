import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 基础数据
  {
    path: '/base',
    component: Layout,
    meta: { title: '基础数据', icon: 'user', noCache: true },
    children: [
      {
        path: 'area',
        component: () => import('@/pages/base/Area'),
        name: 'base_area',
        meta: { title: '区域管理' }
      },
      {
        path: 'department',
        component: () => import('@/pages/base/Department'),
        name: 'base_department',
        meta: { title: '部门管理' }
      },
      {
        path: 'clazz',
        component: () => import('@/pages/base/Clazz'),
        name: 'base_clazz',
        meta: { title: '班级管理' }
      },
      {
        path: 'course',
        component: () => import('@/pages/base/Course'),
        name: 'base_course',
        meta: { title: '课程管理' }
      },
      {
        path: 'teacher',
        component: () => import('@/pages/base/Teacher'),
        name: 'base_teacher',
        meta: { title: '讲师管理' }
      }
    ]
  },
  // 问卷管理
  {
    path: '/question',
    component: Layout,
    meta: { title: '问卷管理', icon: 'user', noCache: true },
    children: [
      {
        path: 'questionnaire',
        component: () => import('@/pages/question/Questionnaire'),
        name: 'question_questionnaire',
        meta: { title: '问卷管理' }
      },
      {
        path: 'bank',
        component: () => import('@/pages/question/Bank'),
        name: 'question_bank',
        meta: { title: '题库管理' }
      }
    ]
  },
  // 课调管理
  {
    path: '/survey',
    component: Layout,
    meta: { title: '课调管理', icon: 'user', noCache: true },
    children: [
      {
        path: 'investigate',
        component: () => import('@/pages/survey/Investigate'),
        name: 'survey_investigate',
        meta: { title: '课调管理' }
      },
      {
        path: 'monitor',
        component: () => import('@/pages/survey/Monitor'),
        name: 'survey_monitor',
        meta: { title: '课调监控' }
      },
      {
        path: 'audit',
        component: () => import('@/pages/survey/Audit'),
        name: 'survey_audit',
        meta: { title: '课调审核' }
      }
    ]
  },
  // 课调统计
  {
    path: '/count',
    component: Layout,
    meta: { title: '课调统计', icon: 'user', noCache: true },
    children: [
      {
        path: 'complete',
        component: () => import('@/pages/count/Complete'),
        name: 'count_complete',
        meta: { title: '全部课调' }
      },
      {
        path: 'analyze',
        component: () => import('@/pages/count/Analyze'),
        name: 'count_analyze',
        meta: { title: '班级课调分析' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
