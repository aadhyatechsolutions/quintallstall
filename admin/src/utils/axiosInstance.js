import axios from 'axios';
import {apiConfig} from '../app/config';

const axiosInstance = axios.create({
  baseURL: apiConfig.API_URL, 
  timeout: 10000,
});

export default axiosInstance;
