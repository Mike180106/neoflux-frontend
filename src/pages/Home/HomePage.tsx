import { useAuthStore } from "../../store/authStore";
import { useMyLoans, useMySavingsBoxes } from "./hooks/useHomeData";
import { SavingsProgressCard } from "./components/SavingsProgressCard";
import { MoneyDistributionCard } from "./components/MoneyDistributionCard";
import { TransactionsCard } from "./components/TransactionsCard";

export const HomePage = () => {
  const user = useAuthStore((state) => state.user);
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
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Home</h1>
          <p className="text-sm text-gray-500">
            ¡Hola {user?.firstName ?? ""}!, mira lo que tenemos para ti hoy
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-full bg-white/70 px-3 py-1.5">
          {/* Idioma (visual) */}
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm text-gray-700">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z" />
            </svg>
            ES
          </span>

          {/* Notificaciones (visual) */}
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9Z" />
              <path d="M10 18.5a2 2 0 0 0 4 0" />
            </svg>
            <span className="absolute top-1.5 right-2 h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>

          {/* Usuario */}
          <span className="text-sm font-bold text-gray-900">
            {user ? `${user.firstName} ${user.lastName}` : ""}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8E8FFB] font-bold text-white">
            {user?.firstName?.[0]?.toUpperCase() ?? "?"}
          </span>
        </div>
      </header>

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
