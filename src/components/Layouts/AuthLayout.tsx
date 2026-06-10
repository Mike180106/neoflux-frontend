import { useState } from "react";
import { Outlet } from "react-router";
import logoDark from "../../assets/images/logo-dark.png";
import authGradient from "../../assets/images/auth-gradient.png";
import type { AuthLayoutContext } from "./useAuthLayoutContext";

export const AuthLayout = () => {
  const [panelMessage, setPanelMessage] = useState(
    "Obtén acceso a un fondo de ahorro con la agilidad de la tecnología moderna.",
  );

  return (
    <div className="min-h-screen bg-white font-['Noto_Sans',sans-serif] lg:grid lg:grid-cols-2">
      {/* Panel izquierdo con gradiente */}
      <aside className="relative m-8 hidden flex-col justify-between overflow-hidden rounded-[32px] p-12 lg:flex">
        <img
          src={authGradient}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <img
          src={logoDark}
          alt="Neoflux"
          className="relative z-10 h-10 w-auto self-start object-contain"
        />

        <p className="relative z-10 max-w-2xl text-4xl leading-snug font-bold text-white">
          {panelMessage}
        </p>
      </aside>

      {/* Lado derecho: formularios */}
      <main className="flex items-start justify-center px-6 py-8 lg:items-center lg:px-16">
        <div className="w-full max-w-md">
          <Outlet context={{ setPanelMessage } satisfies AuthLayoutContext} />
        </div>
      </main>
    </div>
  );
};
