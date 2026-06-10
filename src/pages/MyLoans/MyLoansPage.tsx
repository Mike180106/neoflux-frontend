import { DashboardHeader } from "../../components/DashboardHeader";
import { useMyLoans } from "../../hooks/useMyLoans";
import { LoanCard } from "./components/LoanCard";
import { LoansManagementTable } from "./components/LoansManagementTable";

export const MyLoansPage = () => {
  const loansQuery = useMyLoans();
  const loans = loansQuery.data ?? [];

  // Tarjetas: solo préstamos vigentes; la tabla muestra el historial completo
  const activeLoans = loans.filter(
    (loan) => loan.status === "ACTIVE" || loan.status === "APPROVED",
  );

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Mis préstamos" />

      {loansQuery.isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60">
          <p className="text-sm text-gray-400">Cargando tus préstamos...</p>
        </div>
      ) : (
        <>
          {activeLoans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}

          <LoansManagementTable loans={loans} />
        </>
      )}
    </div>
  );
};
