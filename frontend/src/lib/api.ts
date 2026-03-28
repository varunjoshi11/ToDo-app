import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = (data: { name: string; email: string; password: string }) =>
  api.post('/api/auth/register', data);

export const loginUser = (data: { email: string; password: string }) =>
  api.post('/api/auth/login', data);

// Todo APIs
export const getTodos = () => api.get('/api/todos');

export const createTodo = (data: { title: string; description: string; completed: boolean }) =>
  api.post('/api/todos', data);

export const updateTodo = (id: number, data: { title: string; description: string; completed: boolean }) =>
  api.put(`/api/todos/${id}`, data);

export const deleteTodo = (id: number) => api.delete(`/api/todos/${id}`);

export default api;