import Axios from 'axios'
// import Router from 'router'

/* 请求拦截 可用户做登录设置请求投头字段 */
Axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

/* 响应拦截 做登录权限验证 */
Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default Axios
