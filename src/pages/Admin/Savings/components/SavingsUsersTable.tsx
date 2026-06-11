import { useState } from "react";
import { Link } from "react-router";
import type { AdminSavingsUser } from "../../../../types/admin";

interface SavingsUsersTableProps {
  users: AdminSavingsUser[];
}

const PAGE_SIZE = 6;

export const SavingsUsersTable = ({ users }: SavingsUsersTableProps) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(Math.ceil(users.length / PAGE_SIZE), 1);
  const pageUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (users.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-400">
        No hay socios registrados
      </p>
    );
  }

  return (
    <>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="bg-[#DDDEFE] text-xs font-semibold text-[#1D1FDD]">
            <th className="rounded-l-full px-4 py-2.5 text-left">
              Nombre socio
            </th>
            <th className="px-4 py-2.5 text-left">Identificación</th>
            <th className="px-4 py-2.5 text-left">Correo electrónico</th>
            <th className="px-4 py-2.5 text-center">Cajitas de ahorro</th>
            <th className="rounded-r-full px-4 py-2.5 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pageUsers.map((user) => (
            <tr key={user.id} className="border-b border-gray-100 text-gray-900">
              <td className="px-4 py-3.5">
                <span className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8E8FFB] text-xs font-bold text-white">
                    {user.firstName[0]?.toUpperCase()}
                  </span>
                  {user.firstName} {user.lastName}
                </span>
              </td>
              <td className="px-4 py-3.5">CC {user.identificationNumber}</td>
              <td className="px-4 py-3.5 text-gray-500">{user.email}</td>
              <td className="px-4 py-3.5 text-center">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.savingsBoxes.length > 0
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {user.savingsBoxes.length}
                </span>
              </td>
              <td className="px-4 py-3.5 text-right">
                <Link
                  to={`/admin/ahorros/${user.id}`}
                  aria-label={`Ver cajitas de ${user.firstName} ${user.lastName}`}
                  className="inline-block text-[#1D1FDD] transition-opacity hover:opacity-70"
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
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </Link>
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
