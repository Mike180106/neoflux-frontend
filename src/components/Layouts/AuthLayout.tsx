import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div>
      {/* panel izquierdo irá aquí */}
      <Outlet /> {/* aquí se renderiza LoginPage o RegisterPage */}
    </div>
  );
};
