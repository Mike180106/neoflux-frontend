import { useState } from "react";
import { Link, useParams } from "react-router";
import { DashboardHeader } from "../../../components/DashboardHeader";
import { formatCOP } from "../../../utils/formatCurrency";
import type { AdminSavingsBox } from "../../../types/admin";
import { useAdminSavingsUsers } from "./hooks/useAdminSavings";
import { ManageBoxModal } from "./components/ManageBoxModal";

export const UserBoxesPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [selectedBox, setSelectedBox] = useState<AdminSavingsBox | null>(null);

  // Reutiliza la lista de socios (cacheada); de ahí salen las cajitas del socio
  const usersQuery = useAdminSavingsUsers();
  const user = usersQuery.data?.find((u) => u.id === userId);

  // Mantiene el modal sincronizado tras un depósito/retiro (la query se invalida)
  const currentBox = user?.savingsBoxes.find((b) => b.id === selectedBox?.id);

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Gestión de ahorros" />

      <div className="rounded-2xl bg-white p-6">
        {/* Encabezado */}
        <div className="flex items-center justify-between gap-2">
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
              <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
              <path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" />
            </svg>
            <h2 className="text-sm font-bold text-gray-900">
              {user
                ? `Cajitas de ${user.firstName} ${user.lastName} ⓘ`
                : "Cajitas del socio ⓘ"}
            </h2>
          </div>
          <Link
            to="/admin/ahorros"
            className="text-sm font-semibold text-[#1D1FDD] hover:underline"
          >
            Volver
          </Link>
        </div>

        {usersQuery.isLoading ? (
          <p className="py-12 text-center text-sm text-gray-400">
            Cargando cajitas...
          </p>
        ) : !user ? (
          <p className="py-12 text-center text-sm text-red-500">
            No se encontró el socio
          </p>
        ) : user.savingsBoxes.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-400">
            Este socio aún no tiene cajitas de ahorro
          </p>
        ) : (
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {user.savingsBoxes.map((box) => (
              <button
                key={box.id}
                type="button"
                onClick={() => setSelectedBox(box)}
                className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 text-left transition-shadow hover:shadow-md"
              >
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
                    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
                    <path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" />
                  </svg>
                  <h3 className="text-sm font-bold text-gray-900">Cajita ⓘ</h3>
                </div>

                <p className="mt-3 text-sm font-semibold text-gray-900">
                  {box.name}
                </p>

                <p className="mt-4 text-xs text-gray-400">Balance actual ⓘ</p>
                <p className="mt-1 text-2xl font-extrabold text-gray-900">
                  {formatCOP(box.balance)} COP
                </p>

                <span className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1FDD] py-2 text-sm font-semibold text-white">
                  Gestionar cajita
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedBox && user && (
        <ManageBoxModal
          box={currentBox ?? selectedBox}
          ownerName={`${user.firstName} ${user.lastName}`}
          onClose={() => setSelectedBox(null)}
        />
      )}
    </div>
  );
};
