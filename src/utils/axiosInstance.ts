import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.VITE_API_BASE_URL, 
    timeout: 5000, 
    headers: {
      'Content-Type': 'application/json',
    },
  });

export default axiosInstance;