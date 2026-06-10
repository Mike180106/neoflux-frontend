import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore";

// Solo deja pasar si hay sesión activa; si no, manda al login
export const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
