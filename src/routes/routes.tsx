import { createBrowserRouter, Navigate } from "react-router";
import { LandingPage } from "../pages/Landing/LandingPage";
import { AuthLayout } from "../components/Layouts/AuthLayout";
import { DashboardLayout } from "../components/Layouts/DashboardLayout";
import { LoginPage } from "../pages/Login/LoginPage";
import { RegisterPage } from "../pages/Register/RegisterPage";
import { HomePage } from "../pages/Home/HomePage";
import { MyLoansPage } from "../pages/MyLoans/MyLoansPage";
import { MySavingsPage } from "../pages/MySavings/MySavingsPage";
import { RequestLoanPage } from "../pages/RequestLoan/RequestLoanPage";
import { LoanApplicationPage } from "../pages/RequestLoan/LoanApplicationPage";
import { ComingSoonPage } from "../pages/ComingSoon/ComingSoonPage";
import { AdminHomePage } from "../pages/Admin/Home/AdminHomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },

  // Rutas privadas (requieren sesión)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "home", element: <HomePage /> },
          { path: "ahorro", element: <MySavingsPage /> },
          { path: "prestamos", element: <MyLoansPage /> },
          { path: "prestamos/solicitar", element: <RequestLoanPage /> },
          {
            path: "prestamos/solicitar/formulario",
            element: <LoanApplicationPage />,
          },
          { path: "configuracion", element: <ComingSoonPage /> },
          { path: "ayuda", element: <ComingSoonPage /> },
        ],
      },
    ],
  },

  // Rutas de administrador (requieren sesión con rol ADMIN)
  {
    element: <AdminRoute />,
    children: [
      {
        element: <DashboardLayout variant="admin" />,
        children: [
          { path: "admin/home", element: <AdminHomePage /> },
          { path: "admin/socios", element: <ComingSoonPage /> },
          { path: "admin/fondo", element: <ComingSoonPage /> },
          { path: "admin/prestamos", element: <ComingSoonPage /> },
          { path: "admin/ahorros", element: <ComingSoonPage /> },
          { path: "admin/configuracion", element: <ComingSoonPage /> },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
