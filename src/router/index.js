import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('pages/login')), 'login')

const test = r => require.ensure([], () => r(require('@/test')), 'test')

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})

/* 路由权限拦截 */
router.beforeEach((to, from, next) => {
  next()
})

export default router
