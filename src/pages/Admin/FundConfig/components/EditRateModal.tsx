import { useState } from "react";
import { useUpdateFundConfig } from "../hooks/useFundConfig";

interface EditRateModalProps {
  title: string;
  label: string;
  currentRate: number;
  // Campo del fund-config que se actualiza con la nueva tasa
  field: "annualInterestRate" | "savingsReturnRate";
  onClose: () => void;
}

export const EditRateModal = ({
  title,
  label,
  currentRate,
  field,
  onClose,
}: EditRateModalProps) => {
  const [value, setValue] = useState(String(currentRate));
  const [inputError, setInputError] = useState<string | null>(null);

  const updateConfig = useUpdateFundConfig();

  const handleSave = () => {
    const rate = parseFloat(value);
    if (Number.isNaN(rate) || rate <= 0) {
      setInputError("Ingresa una tasa válida mayor a cero");
      return;
    }
    setInputError(null);
    updateConfig.mutate({ [field]: rate }, { onSuccess: onClose });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
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
              <circle cx="12" cy="12" r="9" />
              <path d="M15.5 8.5 8.5 15.5M9 9h.01M15 15h.01" />
            </svg>
            <h2 className="text-sm font-bold text-gray-900">{title} ⓘ</h2>
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

        {/* Tasa actual + nueva */}
        <p className="mt-6 text-sm text-gray-500">
          Tasa actual:{" "}
          <span className="font-bold text-gray-900">{currentRate}%</span>
        </p>

        <label
          htmlFor="rate-input"
          className="mt-4 mb-2 block text-sm font-semibold text-gray-900"
        >
          {label} <span className="text-[#1D1FDD]">*</span>
        </label>
        <div className="relative">
          <input
            id="rate-input"
            type="number"
            min={0}
            step="0.1"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="h-12 w-full rounded-3xl border border-gray-200 bg-white px-5 text-sm text-gray-900 placeholder:text-gray-300 outline-none transition-colors focus:border-[#1D1FDD]"
          />
          <span className="absolute top-1/2 right-5 -translate-y-1/2 text-sm text-gray-400">
            %
          </span>
        </div>
        {inputError && (
          <p className="mt-2 text-xs text-red-500">{inputError}</p>
        )}
        {updateConfig.isError && (
          <p className="mt-2 text-xs text-red-500">
            No se pudo actualizar la tasa, inténtalo de nuevo
          </p>
        )}

        {/* Acciones */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="h-11 cursor-pointer rounded-full border border-[#1D1FDD] text-sm font-semibold text-[#1D1FDD] transition-colors hover:bg-[#1D1FDD]/5"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={updateConfig.isPending}
            onClick={handleSave}
            className="h-11 cursor-pointer rounded-full bg-[#1D1FDD] text-sm font-semibold text-white transition-colors hover:bg-[#1517b8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updateConfig.isPending ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};
