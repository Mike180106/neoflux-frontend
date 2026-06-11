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
import { ComingSoonPage } from "../pages/ComingSoon/ComingSoonPage";
import { ProtectedRoute } from "./ProtectedRoute";

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
          { path: "configuracion", element: <ComingSoonPage /> },
          { path: "ayuda", element: <ComingSoonPage /> },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
