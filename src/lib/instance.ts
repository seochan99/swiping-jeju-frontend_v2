import axios from 'axios';

// TODO: API URL 환경변수로 빼는게 좋지 않을까 ?
export const BASE_URL = 'https://jeju-back.swiping.kr/api/v1';

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config;
  },
  (error) => {
    // do something with request error
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    // do something with response data
    return response;
  },
  (error) => {
    // do something with response error
    return Promise.reject(error);
  },
);
