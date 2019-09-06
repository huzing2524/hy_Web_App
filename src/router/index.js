import Vue from 'vue'
import Router from 'vue-router'
// import Bus from '@/bus/'
import { SetDefaultHeader } from '_common/http'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('_views/layouts/'),
      children: [
        {
          path: '/home',
          component: () => import('_views/home/'),
          name: 'home',
          meta: {
            title: '监控管理',
            needLogin: true,
          },
        },
        {
          path: '/home/chart/',
          component: () => import('_views/home/chart/'),
          name: 'chart',
          meta: {
            title: '监控管理',
            needLogin: true,
          },
        },
        {
          path: '/police',
          component: () => import('_views/police/'),
          name: 'police',
          meta: {
            title: '报警管理',
            needLogin: true,
          },
        },
        {
          path: '/analysis',
          component: () => import('_views/analysis/'),
          name: 'analysis',
          meta: {
            title: '数据分析',
            needLogin: true,
          },
        },
        {
          path: '/police/confirm',
          component: () => import('_views/police/confirm'),
          name: 'police_confirm',
          meta: {
            title: '确认报警',
            needLogin: true,
          },
        },
        {
          path: '/analysis/detail',
          component: () => import('_views/analysis/detail'),
          name: 'analysis_detail',
          meta: {
            title: '实时数据详情',
            needLogin: true,
          },
        },
        {
          path: '/me',
          component: () => import('_views/me/'),
          name: 'me',
          meta: {
            title: '我的',
            needLogin: true,
          },
        },
      ],
    },

    {
      path: '/user',
      component: () => import('_views/user/'),
      name: 'User',
      children: [
        {
          path: 'login/:type',
          component: () => import('_views/user/login_register/'),
          name: 'LoginRegister',
          meta: {
            title: '登录',
          },
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

/**
 * 路由拦截
 * 不是所有版块都需要鉴权的,所以需要鉴权的在路由meta添加添加一个字段needLogin,
 * 设置为true的时候就必须走鉴权,像登录页这些不要,是可以直接访问的!
 */

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  let loginPathReg = /^.+\/login\/.+$/
  if (loginPathReg.test(to.path)) {
    next()
    return
  }

  let authorization = to.query.token || localStorage.getItem('Authorization')
  let phone = to.query.phone
  let username = to.query.name || phone
  if (authorization) {
    localStorage.setItem('Authorization', authorization)
    SetDefaultHeader('Authorization', authorization)
    if (phone) {
      localStorage.setItem('Phone', phone)
      localStorage.setItem('UserName', username)
    }
    next()
  } else {
    localStorage.clear()
    next({
      path: '/user/login/1?from=' + to.fullPath,
    })
  }
  // next()
})

export default router
