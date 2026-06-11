import { DashboardHeader } from "../../../components/DashboardHeader";
import { useAdminSavingsUsers } from "./hooks/useAdminSavings";
import { SavingsUsersTable } from "./components/SavingsUsersTable";

export const AdminSavingsPage = () => {
  const usersQuery = useAdminSavingsUsers();

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Gestión de ahorros" />

      <div className="rounded-2xl bg-white p-6">
        {/* Encabezado de la tabla */}
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

        {usersQuery.isLoading ? (
          <p className="py-12 text-center text-sm text-gray-400">
            Cargando socios...
          </p>
        ) : usersQuery.isError ? (
          <p className="py-12 text-center text-sm text-red-500">
            No se pudieron cargar los socios
          </p>
        ) : (
          <SavingsUsersTable users={usersQuery.data ?? []} />
        )}
      </div>
    </div>
  );
};
