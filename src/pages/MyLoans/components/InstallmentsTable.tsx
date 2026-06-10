import { useState } from "react";
import type { Installment } from "../../../types/loan";
import { formatCOP } from "../../../utils/formatCurrency";

interface InstallmentsTableProps {
  installments: Installment[];
}

const PAGE_SIZE = 5;

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

export const InstallmentsTable = ({ installments }: InstallmentsTableProps) => {
  const [page, setPage] = useState(1);

  // De la cuota más reciente a la más antigua, como el diseño
  const sorted = [...installments].sort((a, b) => b.number - a.number);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageRows = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-[#B4B6FE] text-[#1D1FDD]">
            <th className="rounded-l-full px-4 py-2.5 font-bold">
              N° de cuotas
            </th>
            <th className="px-4 py-2.5 font-bold">Valor cuota</th>
            <th className="px-4 py-2.5 font-bold">Fecha y hora</th>
            <th className="px-4 py-2.5 font-bold">Estado</th>
            <th className="rounded-r-full px-4 py-2.5 text-right font-bold">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((installment) => {
            const paid = installment.status === "PAID";
            return (
              <tr key={installment.id} className="border-b border-gray-100">
                <td className="px-4 py-3.5 text-gray-900">
                  {installment.number}
                </td>
                <td className="px-4 py-3.5 text-gray-900">
                  {formatCOP(installment.amount)} COP
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-gray-900">
                    {formatDate(paid && installment.paidAt ? installment.paidAt : installment.dueDate)}
                  </p>
                  {paid && installment.paidAt && (
                    <p className="text-xs text-gray-400">
                      {formatTime(installment.paidAt)}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      paid
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-500"
                    }`}
                  >
                    {paid ? "Pagado" : "Pendiente"}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <button
                    type="button"
                    aria-label="Ver cuota"
                    disabled={!paid}
                    className={`${
                      paid
                        ? "cursor-pointer text-[#1D1FDD]"
                        : "cursor-default text-gray-300"
                    }`}
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
