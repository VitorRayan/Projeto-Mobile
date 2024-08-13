import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://api-receitas-pi.vercel.app',
});

export default api;