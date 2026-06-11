import { useState } from "react";
import { formatCOP } from "../../../../utils/formatCurrency";
import { formatShortDate, formatTime } from "../../../../utils/formatDate";
import { loanConsecutive } from "../../../../types/loan";
import type { AdminLoan } from "../../../../types/admin";

interface PendingLoansTableProps {
  loans: AdminLoan[];
}

const PAGE_SIZE = 6;

export const PendingLoansTable = ({ loans }: PendingLoansTableProps) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(Math.ceil(loans.length / PAGE_SIZE), 1);
  const pageLoans = loans.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loans.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-400">
        No hay solicitudes pendientes por revisar
      </p>
    );
  }

  return (
    <>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="bg-[#DDDEFE] text-xs font-semibold text-[#1D1FDD]">
            <th className="rounded-l-full px-4 py-2.5 text-left">
              Consecutivo préstamo
            </th>
            <th className="px-4 py-2.5 text-left">Socio</th>
            <th className="px-4 py-2.5 text-right">Monto solicitado</th>
            <th className="px-4 py-2.5 text-left">Fecha y hora de solicitud</th>
            <th className="rounded-r-full px-4 py-2.5 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pageLoans.map((loan) => (
            <tr
              key={loan.id}
              className="border-b border-gray-100 text-gray-900"
            >
              <td className="px-4 py-3.5">{loanConsecutive(loan)}</td>
              <td className="px-4 py-3.5">
                <span className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8E8FFB] text-xs font-bold text-white">
                    {loan.fullName[0]?.toUpperCase()}
                  </span>
                  {loan.fullName}
                </span>
              </td>
              <td className="px-4 py-3.5 text-right font-semibold">
                {formatCOP(loan.amount)} COP
              </td>
              <td className="px-4 py-3.5">
                {formatShortDate(loan.createdAt)}
                <span className="block text-xs text-gray-400">
                  {formatTime(loan.createdAt)}
                </span>
              </td>
              <td className="px-4 py-3.5 text-right">
                {/* Revisión de la solicitud: se implementa en el siguiente paso */}
                <button
                  type="button"
                  aria-label={`Revisar solicitud de ${loan.fullName}`}
                  className="cursor-pointer text-[#1D1FDD] transition-opacity hover:opacity-70"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 4H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" />
                    <path d="m17.5 3.5 3 3L13 14l-3.5.5L10 11l7.5-7.5Z" />
                  </svg>
                </button>
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
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
      )}
    </>
  );
};
