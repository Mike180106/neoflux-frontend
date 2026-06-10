import { useAuthStore } from "../../store/authStore";

export const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Home</h1>
          <p className="text-sm text-gray-500">
            ¡Hola {user?.firstName ?? ""}!, mira lo que tenemos para ti hoy
          </p>
        </div>

        {/* Chip de usuario */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">
            {user ? `${user.firstName} ${user.lastName}` : ""}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B4B6FE] font-bold text-white">
            {user?.firstName?.[0]?.toUpperCase() ?? "?"}
          </div>
        </div>
      </header>

      {/* Contenido: aquí irán las tarjetas del dashboard (ahorro, gastos, transacciones) */}
      <section className="mt-6 flex flex-1 items-center justify-center rounded-2xl bg-white/60">
        <p className="text-sm text-gray-400">
          Pronto verás aquí tu resumen financiero
        </p>
      </section>
    </div>
  );
};
