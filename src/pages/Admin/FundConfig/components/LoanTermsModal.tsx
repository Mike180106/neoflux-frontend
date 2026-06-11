import { useState } from "react";
import type { LoanTermOption } from "../../../../types/loan";
import {
  useAddLoanTerm,
  useToggleLoanTerm,
} from "../hooks/useFundConfig";

interface LoanTermsModalProps {
  terms: LoanTermOption[];
  onClose: () => void;
}

export const LoanTermsModal = ({ terms, onClose }: LoanTermsModalProps) => {
  const [newMonths, setNewMonths] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const addTerm = useAddLoanTerm();
  const toggleTerm = useToggleLoanTerm();

  const sortedTerms = [...terms].sort((a, b) => a.months - b.months);

  const handleAdd = () => {
    const months = parseInt(newMonths, 10);
    if (!months || months <= 0) {
      setInputError("Ingresa un número de meses válido");
      return;
    }
    if (terms.some((t) => t.months === months)) {
      setInputError("Ese plazo ya existe, actívalo desde la lista");
      return;
    }
    setInputError(null);
    addTerm.mutate(months, { onSuccess: () => setNewMonths("") });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Plazos para las cuotas de los préstamos"
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
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M8 3v4M16 3v4M3 10h18" />
            </svg>
            <h2 className="text-sm font-bold text-gray-900">
              Plazos para las cuotas de los préstamos ⓘ
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

        {/* Lista de plazos con su interruptor */}
        <div className="mt-6 flex flex-col gap-3">
          {sortedTerms.map((term) => (
            <div
              key={term.id}
              className="flex items-center justify-between rounded-2xl border border-gray-200 px-5 py-3"
            >
              <p className="text-sm font-semibold text-gray-900">
                {term.months} meses
                {!term.isActive && (
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    (inactivo)
                  </span>
                )}
              </p>
              <button
                type="button"
                role="switch"
                aria-checked={term.isActive}
                aria-label={`${term.isActive ? "Desactivar" : "Activar"} plazo de ${term.months} meses`}
                disabled={toggleTerm.isPending}
                onClick={() => toggleTerm.mutate(term.id)}
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors disabled:cursor-not-allowed ${
                  term.isActive ? "bg-[#1D1FDD]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                    term.isActive ? "left-5.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
          {sortedTerms.length === 0 && (
            <p className="py-4 text-center text-sm text-gray-400">
              Aún no hay plazos configurados
            </p>
          )}
        </div>

        {/* Agregar nuevo plazo */}
        <p className="mt-6 mb-2 text-sm font-semibold text-gray-900">
          Agregar nuevo plazo
        </p>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              min={1}
              placeholder="Ej: 24"
              value={newMonths}
              onChange={(event) => setNewMonths(event.target.value)}
              className="h-12 w-full rounded-3xl border border-gray-200 bg-white px-5 text-sm text-gray-900 placeholder:text-gray-300 outline-none transition-colors focus:border-[#1D1FDD]"
            />
            <span className="absolute top-1/2 right-5 -translate-y-1/2 text-sm text-gray-400">
              meses
            </span>
          </div>
          <button
            type="button"
            disabled={addTerm.isPending}
            onClick={handleAdd}
            className="h-12 cursor-pointer rounded-full bg-[#1D1FDD] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1517b8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {addTerm.isPending ? "Agregando..." : "+ Agregar"}
          </button>
        </div>
        {inputError && (
          <p className="mt-2 text-xs text-red-500">{inputError}</p>
        )}
        {(addTerm.isError || toggleTerm.isError) && (
          <p className="mt-2 text-xs text-red-500">
            No se pudo guardar el cambio, inténtalo de nuevo
          </p>
        )}

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
