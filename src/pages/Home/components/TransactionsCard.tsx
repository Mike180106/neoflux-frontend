import { useState } from "react";
import type { Loan, LoanStatus } from "../../../types/loan";
import type { SavingsBox } from "../../../types/savings";
import { formatCOP } from "../../../utils/formatCurrency";

interface TransactionsCardProps {
  loans: Loan[];
  savingsBoxes: SavingsBox[];
}

type RowStatus = "Completado" | "Pendiente" | "Denegado";

interface Row {
  id: string;
  name: string;
  createdAt: string;
  amount: number;
  status: RowStatus;
}

const PAGE_SIZE = 5;

const LOAN_STATUS_MAP: Record<LoanStatus, RowStatus> = {
  PENDING: "Pendiente",
  APPROVED: "Completado",
  ACTIVE: "Completado",
  FINISHED: "Completado",
  REJECTED: "Denegado",
};

const STATUS_STYLES: Record<RowStatus, string> = {
  Completado: "bg-green-100 text-green-600",
  Pendiente: "bg-orange-100 text-orange-500",
  Denegado: "bg-red-100 text-red-500",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const formatTime = (iso: string) =>
  new Date(iso)
    .toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: true })
    .toLowerCase();

export const TransactionsCard = ({
  loans,
  savingsBoxes,
}: TransactionsCardProps) => {
  const [page, setPage] = useState(1);

  // Une préstamos y cajas de ahorro en una sola lista, de más reciente a más antiguo
  const rows: Row[] = [
    ...loans.map((loan) => ({
      id: loan.id,
      name: `Préstamo ${loan.creditDestination.toLowerCase()}`,
      createdAt: loan.createdAt,
      amount: loan.amount,
      status: LOAN_STATUS_MAP[loan.status],
    })),
    ...savingsBoxes.map((box) => ({
      id: box.id,
      name: `Ahorro ${box.name.toLowerCase()}`,
      createdAt: box.createdAt,
      amount: box.balance,
      status: "Completado" as const,
    })),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
          <h2 className="text-sm font-bold text-gray-900">Transacciones</h2>
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
              Nombre de la transacción
            </th>
            <th className="px-4 py-2.5 font-bold">Fecha y hora</th>
            <th className="px-4 py-2.5 font-bold">Monto</th>
            <th className="rounded-r-full px-4 py-2.5 text-right font-bold">
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
          {pageRows.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                Aún no tienes transacciones
              </td>
            </tr>
          )}
          {pageRows.map((row) => (
            <tr key={row.id} className="border-b border-gray-100">
              <td className="px-4 py-3.5 text-gray-900">{row.name}</td>
              <td className="px-4 py-3.5">
                <p className="text-gray-900">{formatDate(row.createdAt)}</p>
                <p className="text-xs text-gray-400">
                  {formatTime(row.createdAt)}
                </p>
              </td>
              <td className="px-4 py-3.5 text-gray-900">
                {formatCOP(row.amount)}
              </td>
              <td className="px-4 py-3.5 text-right">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[row.status]}`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
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
