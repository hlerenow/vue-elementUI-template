import Axios from 'axios';
import Router from '@/router/index';
import store from 'store/index';

var axios = Axios.create();
/* 请求拦截 */
axios.interceptors.request.use(function (config) {
  var tk = store.getters.GET_USER_DATA.token;
  config.headers['Authorization'] = 'Bearer ' + tk;
  return config;
}, function (error) {
  return Promise.reject(error);
});

/* 响应拦截 */
axios.interceptors.response.use(function (response) {
  if (response.status === 401) {
    Router.replace('/');
    /* 如果验证失败 会返回这个字段 */
    return {
      noPower: '您还未登录或登录已失效，请登录后查看信息'
    };
  } else {
    return response;
  }
}, function (error) {
  return Promise.reject(error);
});

export default axios;
