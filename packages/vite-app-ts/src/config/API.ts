import axios from 'axios';

import { BASE_URL } from '~~/models/constants/constants';

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
