/* 登录 接口 */
import http from 'config/axios_conf'
// const baseUrl = 'http://192.168.50.226:10000'
/* 线上 */
const baseUrl = `http://52.80.8.253:3721`

export const login = async ({username, password, productType}) => {
  return await http.post(`${baseUrl}/login`, {
    username,
    password,
    productType
  })
}
