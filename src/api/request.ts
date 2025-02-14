import axios from 'axios';

const api = axios.create({
  baseURL: ' https://api.coze.cn',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});

//测试用，如果用户登录则可以发请求，与组件无关
api.interceptors.request.use(
  config => {
    const loginToken = true;
    const sercetToken = import.meta.env.VITE_SECRET_TOEKN;
    if (loginToken) {
      config.headers.Authorization = `Bearer ${sercetToken}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
export default api;
