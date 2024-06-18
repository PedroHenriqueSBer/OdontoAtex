import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('data.token');
  console.log(token)
  if (token)
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  return config;
}, error => {
  return Promise.reject(error);
});