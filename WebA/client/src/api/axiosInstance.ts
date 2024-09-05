// client/src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your server's base URL
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
