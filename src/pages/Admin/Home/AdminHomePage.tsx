import { DashboardHeader } from "../../../components/DashboardHeader";
import {
  useAdminDashboard,
  useAdminDashboardChart,
} from "./hooks/useAdminDashboard";
import { StatCard } from "./components/StatCard";
import { SavingsVsLoansChart } from "./components/SavingsVsLoansChart";
import { LoansGauge } from "./components/LoansGauge";
import { PendingActivitiesCard } from "./components/PendingActivitiesCard";

export const AdminHomePage = () => {
  const dashboardQuery = useAdminDashboard();
  const chartQuery = useAdminDashboardChart();

  const dashboard = dashboardQuery.data;
  const isLoading = dashboardQuery.isLoading || chartQuery.isLoading;

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Home" />

      {isLoading || !dashboard ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60">
          <p className="text-sm text-gray-400">
            {dashboardQuery.isError
              ? "No se pudo cargar el dashboard"
              : "Cargando el resumen del fondo..."}
          </p>
        </div>
      ) : (
        <>
          {/* Indicadores */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Cuentas asociadas"
              value={dashboard.totalUsers}
              highlighted
            />
            <StatCard label="Préstamos en curso" value={dashboard.activeLoans} />
            <StatCard
              label="% intereses prestamo"
              value={dashboard.loanInterestRate}
            />
            <StatCard label="% tasa E.A" value={dashboard.savingsInterestRate} />
          </div>

          {/* Ahorro vs préstamos */}
          <SavingsVsLoansChart
            chart={chartQuery.data?.chart ?? []}
            totalSavings={dashboard.totalSavings}
            totalLoanAmount={dashboard.totalLoanAmount}
          />

          {/* Fila inferior: medidor + actividades */}
          <div className="grid gap-5 xl:grid-cols-[1fr_1.6fr]">
            <LoansGauge
              loansOnTime={dashboard.loansOnTime}
              loansOverdue={dashboard.loansOverdue}
            />
            <PendingActivitiesCard pendingLoans={dashboard.pendingLoans} />
          </div>
        </>
      )}
    </div>
  );
};
