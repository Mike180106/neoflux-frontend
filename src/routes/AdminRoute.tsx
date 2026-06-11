import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore";

// Solo deja pasar admins con sesión; usuarios normales van a su home
export const AdminRoute = () => {
  const { token, user } = useAuthStore();

  if (!token) return <Navigate to="/login" replace />;
  return user?.role === "ADMIN" ? <Outlet /> : <Navigate to="/home" replace />;
};
