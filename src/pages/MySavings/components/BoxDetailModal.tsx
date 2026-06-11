import { useState } from "react";
import { formatCOP } from "../../../utils/formatCurrency";
import { formatShortDate, formatTime } from "../../../utils/formatDate";
import {
  transactionConsecutive,
  type SavingsBoxSummaryResponse,
} from "../../../types/savings";

interface BoxDetailModalProps {
  summary: SavingsBoxSummaryResponse;
  onClose: () => void;
}

// Tasa E.A del ahorro: el backend solo la expone al admin (fund-config),
// valor fijo de referencia
const SAVINGS_RATE_EA = 9.8;

const PAGE_SIZE = 3;

const formatLongDate = (value: string) => {
  const date = new Date(value);
  return `${date.getDate()} de ${date.toLocaleDateString("es-CO", {
    month: "long",
  })}, ${date.getFullYear()}`;
};

export const BoxDetailModal = ({ summary, onClose }: BoxDetailModalProps) => {
  const [page, setPage] = useState(1);

  const { box } = summary;

  // Movimientos más recientes primero (el summary los trae ascendentes)
  const transactions = [...box.transactions].reverse();
  const totalPages = Math.max(Math.ceil(transactions.length / PAGE_SIZE), 1);
  const pageTransactions = transactions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const lastDeposit = transactions.find((t) => t.type === "DEPOSIT");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Detalle de cajita: ${box.name}`}
        className="w-full max-w-xl rounded-2xl bg-white p-8"
        onClick={(event) => event.stopPropagation()}
      >
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
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <h2 className="text-sm font-bold text-gray-900">
              Detalle de cajita: {box.name} ⓘ
            </h2>
          </div>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6 18 18M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* Indicadores */}
        <h3 className="mt-5 text-sm font-bold text-gray-900">
          Detalle de la cajita
        </h3>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">Fecha de último abono ⓘ</p>
            <p className="text-2xl font-extrabold text-gray-900">
              {lastDeposit ? formatLongDate(lastDeposit.createdAt) : "—"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">Valor total ⓘ</p>
            <p className="text-2xl font-extrabold text-gray-900">
              {formatCOP(box.balance)} COP
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">Tasa E.A ⓘ</p>
            <p className="text-2xl font-extrabold text-gray-900">
              {SAVINGS_RATE_EA}%
            </p>
          </div>
        </div>

        {/* Movimientos */}
        <h3 className="mt-5 text-sm font-bold text-gray-900">
          Estado de la revisión
        </h3>
        {transactions.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">
            Esta cajita aún no tiene movimientos
          </p>
        ) : (
          <>
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="rounded-full bg-[#C7C8FD]/60 text-xs font-semibold text-[#1D1FDD]">
                  <th className="rounded-l-full px-4 py-2.5 text-left">
                    Consecutivo
                  </th>
                  <th className="px-4 py-2.5 text-right">Valor</th>
                  <th className="rounded-r-full px-4 py-2.5 text-right">
                    Fecha transacción
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 text-gray-900"
                  >
                    <td className="px-4 py-3">
                      {transactionConsecutive(transaction)}
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-semibold ${
                        transaction.type === "WITHDRAWAL" ? "text-red-500" : ""
                      }`}
                    >
                      {transaction.type === "WITHDRAWAL" ? "-" : ""}
                      {formatCOP(transaction.amount)} COP
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatShortDate(transaction.createdAt)}
                      <span className="block text-xs text-gray-400">
                        {formatTime(transaction.createdAt)}
                      </span>
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
          </>
        )}

        {/* Acciones */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="h-11 w-48 cursor-pointer rounded-full border border-[#1D1FDD] text-sm font-semibold text-[#1D1FDD] transition-colors hover:bg-[#1D1FDD]/5"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
