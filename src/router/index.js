import Vue from 'vue';
import Router from 'vue-router';
import Store from 'store';

/* 页面按需加载 */
const login = (r) => require.ensure([], () => r(require('pages/login')), 'login');
const admin = (r) => require.ensure([], () => r(require('pages/admin')), 'admin');
const test = (r) => require.ensure([], () => r(require('@/test')), 'test');

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/admin',
      name: '',
      component: admin
    },
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
});

/* 路由权限拦截 */
router.beforeEach((to, from, next) => {
  /* 调试使用 */
  // next();
  // return;
  /* 调试使用end */
  if (to.name === 'login' || to.name === 'test') {
    next();
    return;
  }
  if (Store.getters.GET_USER_DATA.token === '') {
    router.replace('/');
  } else {
    next();
  }
});

export default router;
