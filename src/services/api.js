// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/', 
  timeout: 10000000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  // Se è presente config.noAuth, non aggiungere il token
  if (config.noAuth) return config;

  const token = localStorage.getItem('token');
  const tokenType = localStorage.getItem('tokenType') || 'Bearer';
  if (token) {
    config.headers.Authorization = `${tokenType} ${token}`;
  }
  return config;
});

export default api;
