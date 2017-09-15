import Env from './env'

/* 开发环境下配置的url */
// api基本请求路径
var apibaseUrl = 'http://dev.yeegen.com'

// 应用根路径
var baseUrl = 'http://app.yeegen.com:7070'

/*生产环境配置*/
if (process.env.NODE_ENV === 'production') {
  console.log('生产环境')
  /* 重写打印函数 */
  console.log = function() {}
  apibaseUrl = 'http://app.yeegen.com'
  baseUrl = 'http://app.yeegen.com'
}


/* 导出参数 */
export {
  env: Env,
  apibaseUrl,
  apiLocalUrl,
  baseUrl
}