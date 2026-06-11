import { useState } from "react";
import { isAxiosError } from "axios";
import { formatCOP } from "../../../../utils/formatCurrency";
import type { AdminSavingsBox } from "../../../../types/admin";
import { useBoxTransaction } from "../hooks/useAdminSavings";

interface ManageBoxModalProps {
  box: AdminSavingsBox;
  ownerName: string;
  onClose: () => void;
}

type Action = "deposit" | "withdraw";

const ACTION_COPY: Record<Action, { title: string; submit: string }> = {
  deposit: { title: "Ingresar dinero", submit: "Confirmar ingreso" },
  withdraw: { title: "Sacar dinero", submit: "Confirmar retiro" },
};

export const ManageBoxModal = ({
  box,
  ownerName,
  onClose,
}: ManageBoxModalProps) => {
  // null = menú con los dos botones; con acción = formulario de monto
  const [action, setAction] = useState<Action | null>(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const transaction = useBoxTransaction();

  // El balance mostrado se actualiza con la respuesta del backend
  const balance = transaction.data?.box.balance ?? box.balance;

  const apiError = transaction.error
    ? isAxiosError(transaction.error) &&
      transaction.error.response?.data?.message
      ? String(transaction.error.response.data.message)
      : "No se pudo completar la operación. Inténtalo de nuevo."
    : null;

  const startAction = (next: Action) => {
    transaction.reset();
    setAmount("");
    setDescription("");
    setFormError(null);
    setAction(next);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!action) return;

    const value = Number(amount);
    if (!amount || Number.isNaN(value) || value <= 0) {
      setFormError("Ingresa un monto válido mayor a 0");
      return;
    }
    if (action === "withdraw" && value > balance) {
      setFormError("El monto supera el balance actual de la cajita");
      return;
    }
    if (!description.trim()) {
      setFormError("Ingresa una descripción del movimiento");
      return;
    }

    setFormError(null);
    transaction.mutate(
      { boxId: box.id, action, amount: value, description: description.trim() },
      { onSuccess: () => setAction(null) },
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Gestionar cajita: ${box.name}`}
        className="w-full max-w-md rounded-2xl bg-white p-8"
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
              <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
              <path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" />
            </svg>
            <h2 className="text-sm font-bold text-gray-900">
              Cajita: {box.name}
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

        <p className="mt-1 text-xs text-gray-400">Socio: {ownerName}</p>

        {/* Balance */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">Balance actual ⓘ</p>
          <p className="mt-1 text-4xl font-extrabold text-gray-900">
            {formatCOP(balance)} COP
          </p>
        </div>

        {transaction.isSuccess && !action && (
          <p className="mt-4 rounded-full bg-green-100 px-4 py-2 text-center text-xs font-semibold text-green-600">
            {transaction.data.transaction.type === "DEPOSIT"
              ? "Ingreso registrado correctamente"
              : "Retiro registrado correctamente"}
          </p>
        )}

        {action === null ? (
          /* Menú de acciones */
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => startAction("withdraw")}
              className="h-11 flex-1 cursor-pointer rounded-full bg-red-500 text-sm font-semibold text-white transition-colors hover:bg-red-600"
            >
              Sacar dinero
            </button>
            <button
              type="button"
              onClick={() => startAction("deposit")}
              className="h-11 flex-1 cursor-pointer rounded-full bg-[#1D1FDD] text-sm font-semibold text-white transition-colors hover:bg-[#1517b8]"
            >
              Ingresar dinero
            </button>
          </div>
        ) : (
          /* Formulario de monto y descripción */
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-900">
              {ACTION_COPY[action].title}
            </h3>

            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Monto
              </label>
              <input
                id="amount"
                type="number"
                min="1"
                placeholder="100000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 w-full rounded-3xl border border-gray-200 bg-white px-5 text-sm text-gray-900 placeholder:text-gray-300 outline-none transition-colors focus:border-[#1D1FDD]"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Descripción
              </label>
              <input
                id="description"
                placeholder="Ahorro mensual"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-12 w-full rounded-3xl border border-gray-200 bg-white px-5 text-sm text-gray-900 placeholder:text-gray-300 outline-none transition-colors focus:border-[#1D1FDD]"
              />
            </div>

            {(formError || apiError) && (
              <p className="text-sm text-red-500">{formError ?? apiError}</p>
            )}

            <div className="mt-2 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => setAction(null)}
                className="cursor-pointer text-sm font-bold text-[#1D1FDD]"
              >
                Volver
              </button>
              <button
                type="submit"
                disabled={transaction.isPending}
                className={`h-11 cursor-pointer rounded-full px-6 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  action === "withdraw"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-[#1D1FDD] hover:bg-[#1517b8]"
                }`}
              >
                {transaction.isPending
                  ? "Procesando..."
                  : ACTION_COPY[action].submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
