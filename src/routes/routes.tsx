import { createBrowserRouter, Navigate } from "react-router";
import { LandingPage } from "../pages/Landing/LandingPage";
import { AuthLayout } from "../components/Layouts/AuthLayout";
import { LoginPage } from "../pages/Login/LoginPage";
import { RegisterPage } from "../pages/Register/RegisterPage";

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

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
