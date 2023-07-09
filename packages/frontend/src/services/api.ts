import axios from 'axios';
import StorageService, { StorageKeys } from './storageService';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
});

api.interceptors.request.use((config) => {
  const token = StorageService.get(StorageKeys.JWT_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
