import { useState } from "react";
import type { PendingLoanSummary } from "../../../../types/admin";

interface PendingActivitiesCardProps {
  pendingLoans: PendingLoanSummary[];
}

const PAGE_SIZE = 2;

export const PendingActivitiesCard = ({
  pendingLoans,
}: PendingActivitiesCardProps) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(Math.ceil(pendingLoans.length / PAGE_SIZE), 1);
  const pageLoans = pendingLoans.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="flex flex-col rounded-2xl bg-white p-6">
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
          strokeLinejoin="round"
        >
          <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z" />
          <path d="M14 3v5h5M9 13h6M9 17h4" />
        </svg>
        <h2 className="text-sm font-bold text-gray-900">
          Actividades pendientes ⓘ
        </h2>
      </div>

      {pendingLoans.length === 0 ? (
        <p className="flex-1 py-10 text-center text-sm text-gray-400">
          No hay solicitudes pendientes por revisar
        </p>
      ) : (
        <>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="bg-[#DDDEFE] text-xs font-semibold text-[#1D1FDD]">
                <th className="rounded-l-full px-4 py-2.5 text-left">Socio</th>
                <th className="px-4 py-2.5 text-left">Acción</th>
                <th className="rounded-r-full px-4 py-2.5 text-right">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {pageLoans.map((loan) => (
                <tr
                  key={loan.id}
                  className="border-b border-gray-100 text-gray-900"
                >
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8E8FFB] text-xs font-bold text-white">
                        {loan.fullName[0]?.toUpperCase()}
                      </span>
                      {loan.fullName}
                    </span>
                  </td>
                  <td
                    className="max-w-44 truncate px-4 py-3 text-gray-500"
                    title={`Revisión solicitud préstamo: ${loan.creditDestination}`}
                  >
                    Revisión solicitud préstamo
                  </td>
                  <td className="px-4 py-3 text-right">
                    {/* Se conectará con Gestión de préstamos */}
                    <button
                      type="button"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#1D1FDD] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1517b8]"
                    >
                      Completar
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-auto flex items-center justify-between pt-4 text-sm text-gray-500">
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
        </>
      )}
    </div>
  );
};
