import axios from 'axios'; 
// import {SERVER_URL} from './api';
import { message } from 'antd';
import { hashHistory } from 'react-router'

axios.defaults.baseURL = ''; // 设置默认服务地址
axios.defaults.timeout = 0;//不设置超时时长

// http请求拦截器
axios.interceptors.request.use(config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    return config;
}, error => {
  return Promise.reject(error);
});

var is401 = false;

// http响应拦截器
axios.interceptors.response.use(res => {
  return res;
}, error => {
    if (error && error.response) {
      if (error.response.data.code === 401|| error.response.data.msg === 'Invalid token or empty token') {
          if(!is401){
              is401 = true;
              message.error('身份验证已过期，请重新登录');
              setTimeout(()=>{
                  hashHistory.push('/Login');
              },3000)
          }
      }
      return Promise.reject(error);
    }
    return Promise.reject({
        response: {
          data: {
              msg: '服务器出错'
          }
        }
    });
});

export default axios;
