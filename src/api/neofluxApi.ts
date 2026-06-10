import axios from "axios";
import { useAuthStore } from "../store/authStore";

// Instancia única de axios apuntando al backend de Nest.js (VITE_API_URL en .env)
export const neofluxApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Adjunta el JWT de la sesión a toda petición (los endpoints privados lo exigen)
neofluxApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
