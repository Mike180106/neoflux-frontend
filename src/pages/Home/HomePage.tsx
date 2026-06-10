import { DashboardHeader } from "../../components/DashboardHeader";
import { useMyLoans, useMySavingsBoxes } from "./hooks/useHomeData";
import { SavingsProgressCard } from "./components/SavingsProgressCard";
import { MoneyDistributionCard } from "./components/MoneyDistributionCard";
import { TransactionsCard } from "./components/TransactionsCard";

export const HomePage = () => {
  const savingsQuery = useMySavingsBoxes();
  const loansQuery = useMyLoans();

  const savingsBoxes = savingsQuery.data ?? [];
  const loans = loansQuery.data ?? [];

  const totalSavings = savingsBoxes.reduce((sum, box) => sum + box.balance, 0);
  // Solo cuenta préstamos vigentes (aprobados o activos)
  const totalLoans = loans
    .filter((loan) => loan.status === "APPROVED" || loan.status === "ACTIVE")
    .reduce((sum, loan) => sum + loan.amount, 0);

  const isLoading = savingsQuery.isLoading || loansQuery.isLoading;

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Home" />

      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60">
          <p className="text-sm text-gray-400">Cargando tu resumen...</p>
        </div>
      ) : (
        <>
          {/* Fila superior: progreso de ahorro + distribución */}
          <div className="grid gap-5 xl:grid-cols-[1.8fr_1fr]">
            <SavingsProgressCard totalSavings={totalSavings} />
            <MoneyDistributionCard
              totalSavings={totalSavings}
              totalLoans={totalLoans}
            />
          </div>

          {/* Transacciones */}
          <TransactionsCard loans={loans} savingsBoxes={savingsBoxes} />
        </>
      )}
    </div>
  );
};
