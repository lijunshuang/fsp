import axios from 'axios';

const server = axios.create({
    baseURL: 'http://192.168.1.111/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});
//  添加请求拦截器
server.interceptors.request.use(function (config) {
    // 每次发出的请求，都会经过这里
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// 添加请求拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
//暴露 接口
export default server;


