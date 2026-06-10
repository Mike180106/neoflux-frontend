import axios from "axios";

// Instancia única de axios apuntando al backend de Nest.js (VITE_API_URL en .env)
export const neofluxApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
