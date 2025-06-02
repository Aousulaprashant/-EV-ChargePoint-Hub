// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://ev-charge-point-hub.vercel.app/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
