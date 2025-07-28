import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor – Add Auth Token Automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token'); // get token from localStorage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response Interceptor – Handle 401 Errors Globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized! Redirecting to login...');
      // Optional: redirect to login page
      window.location.href = '/login';
    }else if(error.response.status === 500){
        console.error("server error, please try again later")
    }else if(error.code === 'ECONNABORTED'){
  console.error("Request timeout, please try again.");
}

    return Promise.reject(error);
  }
);

export default axiosInstance;
