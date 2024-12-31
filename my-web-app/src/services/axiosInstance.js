import axios from 'axios';

// Axios instance for Server 1 (Default Export)
const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.178:5000', // Server 1 URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized for Server 1');
    }
    return Promise.reject(error);
  }
);

// Axios instance for Server 2 (Named Export)
const axiosInstance2 = axios.create({
  baseURL: 'http://192.168.0.178:5001', // Server 2 URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance2.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken2'); // Separate token for Server 2 if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance2.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized for Server 2');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; // Default export for Server 1
export { axiosInstance2 };   // Named export for Server 2
