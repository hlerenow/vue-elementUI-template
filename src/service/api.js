/* 登录 接口 */
import http from '@/config/axios_conf';
import { apibaseUrl } from '@/config';
// import Axios from 'axios';
// var apibaseUrlV1 = apibaseUrl + '/v1';

/* 登录 */
export const login = async ({username, password}) => {
  return await http.post(`${apibaseUrl}/auth`, {
    username,
    password
  });
};
