import { useState } from "react";
import {
  estimateCurrentInstallment,
  loanConsecutive,
  type Loan,
  type LoanStatus,
} from "../../../types/loan";
import { formatCOP } from "../../../utils/formatCurrency";

interface LoansManagementTableProps {
  loans: Loan[];
}

const PAGE_SIZE = 5;

const STATUS_LABELS: Record<LoanStatus, { label: string; className: string }> =
  {
    PENDING: { label: "En revisión", className: "bg-sky-100 text-sky-600" },
    APPROVED: { label: "Completado", className: "bg-green-100 text-green-600" },
    ACTIVE: { label: "Completado", className: "bg-green-100 text-green-600" },
    FINISHED: { label: "Completado", className: "bg-green-100 text-green-600" },
    REJECTED: { label: "Denegado", className: "bg-red-100 text-red-500" },
  };

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const formatTime = (iso: string) =>
  new Date(iso)
    .toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

// Próxima cuota estimada: fecha de creación + cuota actual en meses
const nextInstallmentDate = (loan: Loan) => {
  if (loan.status !== "ACTIVE" && loan.status !== "APPROVED")
    return loan.createdAt;
  const date = new Date(loan.createdAt);
  date.setMonth(date.getMonth() + estimateCurrentInstallment(loan));
  return date.toISOString();
};

export const LoansManagementTable = ({ loans }: LoansManagementTableProps) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(loans.length / PAGE_SIZE));
  const pageRows = loans.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="rounded-2xl bg-white p-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
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
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
          <h2 className="text-sm font-bold text-gray-900">
            Gestión de préstamos
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

      {/* Tabla */}
      <table className="mt-5 w-full text-left text-sm">
        <thead>
          <tr className="bg-[#B4B6FE] text-[#1D1FDD]">
            <th className="rounded-l-full px-4 py-2.5 font-bold">
              Consecutivo préstamo
            </th>
            <th className="px-4 py-2.5 font-bold">Saldo pendiente</th>
            <th className="px-4 py-2.5 font-bold">Próxima cuota</th>
            <th className="px-4 py-2.5 font-bold">Estado</th>
            <th className="rounded-r-full px-4 py-2.5 text-right font-bold">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {pageRows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                Aún no has solicitado préstamos
              </td>
            </tr>
          )}
          {pageRows.map((loan) => {
            const status = STATUS_LABELS[loan.status];
            return (
              <tr key={loan.id} className="border-b border-gray-100">
                <td className="px-4 py-3.5 text-gray-900">
                  {loanConsecutive(loan)}
                </td>
                <td className="px-4 py-3.5 text-gray-900">
                  {formatCOP(loan.totalAmount ?? loan.amount)} COP
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-gray-900">
                    {formatDate(nextInstallmentDate(loan))}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatTime(nextInstallmentDate(loan))}
                  </p>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  {/* Detalle del préstamo: se integrará con /loans/my-loans/:id */}
                  <button
                    type="button"
                    aria-label="Ver préstamo"
                    className="cursor-pointer text-[#1D1FDD]"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Paginación */}
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`h-7 w-7 cursor-pointer rounded-md text-xs ${
                n === page
                  ? "bg-[#B4B6FE] font-bold text-[#1D1FDD]"
                  : "hover:bg-gray-100"
              }`}
            >
              {n}
            </button>
          ))}
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
    </div>
  );
};
