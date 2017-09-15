// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from 'router'
import axios from 'config/axios_conf'
import store from 'store/index'

Vue.config.productionTip = false

/* 载入elemenyUI配置文件 */
require('config/ele_conf.js')

/* 配置axios */
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: {
    App: App
  }
})
