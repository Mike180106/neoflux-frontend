import { useState } from "react";
import { formatCOP } from "../../../../utils/formatCurrency";
import { formatShortDate } from "../../../../utils/formatDate";
import { loanConsecutive } from "../../../../types/loan";
import type { AdminLoanDetail } from "../../../../types/admin";
import { useLoanSimulation } from "../../../RequestLoan/hooks/useSimulator";

interface ApprovalSummaryProps {
  loan: AdminLoanDetail;
  isApproving: boolean;
  approveError: boolean;
  onApprove: () => void;
  onBack: () => void;
}

const PAGE_SIZE = 5;

// Fecha de corte de cada cuota: mismo día, N meses después del desembolso
const cutoffDate = (monthsAhead: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsAhead);
  return formatShortDate(date.toISOString());
};

export const ApprovalSummary = ({
  loan,
  isApproving,
  approveError,
  onApprove,
  onBack,
}: ApprovalSummaryProps) => {
  const [page, setPage] = useState(1);

  // Las tasas y cuotas reales del fondo salen del simulador
  const simulationQuery = useLoanSimulation({
    amount: loan.amount,
    termMonths: loan.termMonths,
  });
  const simulation = simulationQuery.data;

  // Desglose de interés por cuota (sistema francés)
  const { rows } = (simulation?.table ?? []).reduce(
    (acc, row) => {
      const interest = acc.saldo * ((simulation?.monthlyRate ?? 0) / 100);
      return {
        saldo: acc.saldo - (row.amount - interest),
        rows: [
          ...acc.rows,
          { number: row.installmentNumber, interest, total: row.amount },
        ],
      };
    },
    {
      saldo: loan.amount,
      rows: [] as { number: number; interest: number; total: number }[],
    },
  );

  const totalPages = Math.max(Math.ceil(rows.length / PAGE_SIZE), 1);
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="rounded-2xl bg-white p-6">
      {/* Encabezado */}
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
          <path d="M12 7v10M9.5 9.5h3.75a1.75 1.75 0 1 1 0 3.5h-2.5a1.75 1.75 0 1 0 0 3.5h3.75" />
        </svg>
        <h2 className="text-sm font-bold text-gray-900">
          Aprobación de préstamo ⓘ
        </h2>
      </div>

      {simulationQuery.isLoading ? (
        <p className="py-12 text-center text-sm text-gray-400">
          Calculando condiciones del préstamo...
        </p>
      ) : (
        <>
          {/* Resumen */}
          <h3 className="mt-5 text-lg font-bold text-gray-900">
            Resumen información relevante
          </h3>
          <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="text-sm text-gray-400">Número de radicado</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {loanConsecutive(loan, "NP")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Plazo</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {loan.termMonths} meses
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Monto solicitado</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {formatCOP(loan.amount)} COP
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Fecha desembolso</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {cutoffDate(0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Tasa de interés aplicada</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {simulation ? `${simulation.monthlyRate.toFixed(2)}%` : "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total intereses</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {simulation ? `${formatCOP(simulation.totalInterest)} COP` : "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Monto total a recibir</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {simulation ? `${formatCOP(simulation.totalAmount)} COP` : "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Tipo de préstamo</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {loan.creditDestination}
              </p>
            </div>
          </div>

          {/* Cuotas */}
          <h3 className="mt-8 text-lg font-bold text-gray-900">
            Previsualización cuotas del préstamo
          </h3>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="bg-[#DDDEFE] text-xs font-semibold text-[#1D1FDD]">
                <th className="rounded-l-full px-4 py-2.5 text-left">
                  N° de cuotas
                </th>
                <th className="px-4 py-2.5 text-left">Fecha de corte</th>
                <th className="px-4 py-2.5 text-right">Valor intereses</th>
                <th className="rounded-r-full px-4 py-2.5 text-right">
                  Cuota total
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr
                  key={row.number}
                  className="border-b border-gray-100 text-gray-900"
                >
                  <td className="px-4 py-3.5">{row.number}</td>
                  <td className="px-4 py-3.5">{cutoffDate(row.number)}</td>
                  <td className="px-4 py-3.5 text-right">
                    {formatCOP(row.interest)} COP
                  </td>
                  <td className="px-4 py-3.5 text-right font-semibold">
                    {formatCOP(row.total)} COP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              >
                ‹ Anterior
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      className={`h-7 w-7 cursor-pointer rounded-lg text-xs font-semibold ${
                        n === page
                          ? "bg-[#1D1FDD] text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {n}
                    </button>
                  ),
                )}
              </div>
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente ›
              </button>
            </div>
          )}

          {approveError && (
            <p className="mt-4 text-right text-sm text-red-500">
              No se pudo aprobar el préstamo, inténtalo de nuevo
            </p>
          )}

          {/* Acciones */}
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="cursor-pointer text-sm font-semibold text-[#1D1FDD] hover:underline"
            >
              Volver
            </button>
            <button
              type="button"
              disabled={isApproving || !simulation}
              onClick={onApprove}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-[#1D1FDD] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1517b8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 10h18M8 15h4" />
              </svg>
              {isApproving
                ? "Aprobando..."
                : "Aprobar y desembolsar préstamo"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
