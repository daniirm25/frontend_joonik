import axios from 'axios';
// import { InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // URL base de la API
});

apiClient.interceptors.request.use((config) => {
  const token  = localStorage.getItem("token")
  if (token && config.headers){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default apiClient;