import { DashboardHeader } from "../../../components/DashboardHeader";
import { usePendingLoans } from "./hooks/usePendingLoans";
import { PendingLoansTable } from "./components/PendingLoansTable";

export const AdminLoansPage = () => {
  const pendingQuery = usePendingLoans();

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Gestión de préstamos" />

      {/* Pestañas: por ahora solo solicitudes pendientes */}
      <div className="flex items-center gap-2 rounded-full bg-white/70 p-1.5">
        <span className="rounded-full bg-[#1D1FDD] px-6 py-2 text-sm font-semibold text-white">
          Solicitudes pendientes
        </span>
      </div>

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
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.5 2" />
            </svg>
            <h2 className="text-sm font-bold text-gray-900">
              Tabla de solicitudes ⓘ
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

        {pendingQuery.isLoading ? (
          <p className="py-12 text-center text-sm text-gray-400">
            Cargando solicitudes...
          </p>
        ) : pendingQuery.isError ? (
          <p className="py-12 text-center text-sm text-red-500">
            No se pudieron cargar las solicitudes
          </p>
        ) : (
          <PendingLoansTable loans={pendingQuery.data ?? []} />
        )}
      </div>
    </div>
  );
};
