import { useState } from "react";
import {
  estimateCurrentInstallment,
  loanConsecutive,
  type Loan,
} from "../../../types/loan";
import { formatCOP } from "../../../utils/formatCurrency";
import { useLoanDetail, useLoanRate } from "../hooks/useLoanDetail";
import { InstallmentsTable } from "./InstallmentsTable";

interface LoanCardProps {
  loan: Loan;
}

// Seguro de vida: el backend no lo expone, valor fijo de referencia
const LIFE_INSURANCE = 15_000;

const DUE_SOON_DAYS = 5;

export const LoanCard = ({ loan }: LoanCardProps) => {
  const [expanded, setExpanded] = useState(false);
  // Instante de montaje: estable entre re-renders
  const [now] = useState(() => Date.now());

  // El detalle (cuotas) y la tasa solo se cargan al expandir
  const detailQuery = useLoanDetail(loan.id, expanded);
  const rateQuery = useLoanRate(loan.amount, loan.termMonths, expanded);

  const installments = detailQuery.data?.installments ?? [];

  // Con cuotas reales: actual = pagadas + 1; sin cargar aún: estimada por fecha
  const paidCount = installments.filter((i) => i.status === "PAID").length;
  const current =
    installments.length > 0
      ? Math.min(paidCount + 1, loan.termMonths)
      : estimateCurrentInstallment(loan);
  const progress = (current / loan.termMonths) * 100;

  // Próxima a vencerse: la siguiente cuota pendiente vence en <= 5 días
  const nextPending = installments.find((i) => i.status === "PENDING");
  const dueSoon = nextPending
    ? (new Date(nextPending.dueDate).getTime() - now) /
        (1000 * 60 * 60 * 24) <=
      DUE_SOON_DAYS
    : false;

  const pendingBalance = installments
    .filter((i) => i.status === "PENDING")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="rounded-2xl bg-white px-8 py-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {loanConsecutive(loan)}
          </h2>
          <span className="text-xs text-gray-400">Consecutivo préstamo</span>
        </div>

        <div className="flex items-center gap-4">
          {dueSoon ? (
            <span className="rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold text-orange-500">
              Cuota próxima a vencerse
            </span>
          ) : (
            <span className="rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold text-green-600">
              Vas al día con tu pago, ¡excelente!
            </span>
          )}

          <button
            type="button"
            aria-label={expanded ? "Ocultar detalle" : "Ver detalle del préstamo"}
            onClick={() => setExpanded((v) => !v)}
            className={`cursor-pointer text-gray-700 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-[#1D1FDD]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-right text-xs text-gray-500">
        Cuota {current} de {loan.termMonths}
      </p>

      {/* Detalle desplegable */}
      {expanded && (
        <div className="mt-4">
          {detailQuery.isLoading ? (
            <p className="py-8 text-center text-sm text-gray-400">
              Cargando detalle...
            </p>
          ) : detailQuery.isError ? (
            <p className="py-8 text-center text-sm text-red-500">
              No se pudo cargar el detalle del préstamo
            </p>
          ) : (
            <>
              {/* Indicadores */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-400">
                    Saldo total pendiente ⓘ
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-gray-900">
                    {formatCOP(pendingBalance)} COP
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">
                    Interés corriente (EA) ⓘ
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-gray-900">
                    {rateQuery.data ? `${rateQuery.data.annualRate}%` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Seguro de vida ⓘ</p>
                  <p className="mt-1 text-3xl font-extrabold text-gray-900">
                    {formatCOP(LIFE_INSURANCE)} COP
                  </p>
                </div>
              </div>

              {/* Cuotas */}
              <div className="mt-6 mb-4 flex items-center gap-2">
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
                  <rect x="3" y="8" width="18" height="12" rx="2" />
                  <path d="M7 8V5h13v10" />
                </svg>
                <h3 className="text-sm font-bold text-gray-900">Cuotas</h3>
              </div>

              <InstallmentsTable installments={installments} />
            </>
          )}
        </div>
      )}
    </div>
  );
};
