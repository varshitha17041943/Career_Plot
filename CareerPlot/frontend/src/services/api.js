import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export const resumeAPI = {
  upload: (formData) => api.post('/uploadResume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const interviewAPI = {
  start: (data) => api.post('/interview/start', data),
  answer: (data) => api.post('/interview/answer', data),
};

export const dashboardAPI = {
  getData: () => api.get('/dashboard'),
};

export default api;
