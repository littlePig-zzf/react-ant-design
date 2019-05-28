import axios from 'axios';
import { message } from 'antd';

function errorHandler(error) {
  let is401 = false;
  if (error && error.response) {
    const { code, msg } = error.response.data;
    if (code === 401 || msg === 'Invalid token or empty token') {
      if (!is401) {
        is401 = true;
        message.error('身份验证已过期，请重新登录');
        setTimeout(() => {
          this.props.history.push('/');
        }, 3000);
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
}

const getClient = (baseUrl = null) => {
  const token = localStorage.getItem('token');
  const options = {
    baseURL: baseUrl,
    timeout: 20000,
    withCredentials: true,
    headers: {
      Authorization: token
    }
  };
  const client = axios.create(options);
  client.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      errorHandler(error);
      return Promise.reject(error);
    }
  );

  return client;
};

export default getClient;
