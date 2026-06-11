import { DashboardHeader } from "../../../components/DashboardHeader";
import { StatCard } from "../Home/components/StatCard";
import { useAdminUsers } from "./hooks/useAdminUsers";
import { UsersTable } from "./components/UsersTable";

export const AdminUsersPage = () => {
  const usersQuery = useAdminUsers();
  const users = usersQuery.data ?? [];

  const activeCount = users.filter((user) => user.isActive).length;

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Gestión de socios" />

      {usersQuery.isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60">
          <p className="text-sm text-gray-400">Cargando los socios...</p>
        </div>
      ) : usersQuery.isError ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60">
          <p className="text-sm text-red-500">
            No se pudieron cargar los socios
          </p>
        </div>
      ) : (
        <>
          {/* Indicadores */}
          <div className="grid gap-5 sm:grid-cols-3">
            <StatCard
              label="Cuentas asociadas"
              value={users.length}
              highlighted
            />
            <StatCard label="Cuentas activas" value={activeCount} />
            <StatCard
              label="Cuentas inactivas"
              value={users.length - activeCount}
            />
          </div>

          {/* Tabla de socios */}
          <div className="rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1D1FDD"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="8" r="3.5" />
                  <path d="M3.5 20c.5-3 2.5-5 5.5-5s5 2 5.5 5" />
                  <path d="M16 5a3 3 0 0 1 0 6M17.5 15c1.8.6 3 2.3 3.5 4.5" />
                </svg>
                <h2 className="text-sm font-bold text-gray-900">
                  Todos los socios ⓘ
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
                  Últimos tres meses
                </span>
                <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
                  Ver todo
                </span>
              </div>
            </div>

            <UsersTable users={users} />
          </div>
        </>
      )}
    </div>
  );
};
