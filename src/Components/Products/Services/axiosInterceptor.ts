import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      alert(error.response.message);
    }

    return Promise.reject(error);
  }
);
