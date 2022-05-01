import axios from 'axios';

import { BASE_URL } from '~~/models/constants/constants';

// axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     config.params = { ...config.params, timestamp: Date.now() };
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
