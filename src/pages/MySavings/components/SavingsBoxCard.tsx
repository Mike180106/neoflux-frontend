import { formatCOP } from "../../../utils/formatCurrency";
import type { SavingsBox } from "../../../types/savings";

interface SavingsBoxCardProps {
  box: SavingsBox;
  // Rendimiento acumulado de la cajita (summary.totalReturns); null mientras carga
  totalReturns: number | null;
  onViewDetail: () => void;
}

export const SavingsBoxCard = ({
  box,
  totalReturns,
  onViewDetail,
}: SavingsBoxCardProps) => {
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
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" />
        </svg>
        <h3 className="text-sm font-bold text-gray-900">Cajita ⓘ</h3>
      </div>

      <p className="mt-3 text-sm font-semibold text-gray-900">{box.name}</p>

      <p className="mt-4 text-xs text-gray-400">Total agregado ⓘ</p>
      <p className="mt-1 text-2xl font-extrabold text-gray-900">
        {formatCOP(box.balance)} COP
      </p>

      <p className="mt-4 text-xs text-gray-400">Crecimiento del dinero ⓘ</p>
      <p className="mt-1 text-2xl font-extrabold text-gray-900">
        {totalReturns === null ? "—" : `${formatCOP(totalReturns)} COP`}
      </p>

      <button
        type="button"
        onClick={onViewDetail}
        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1D1FDD] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1517b8]"
      >
        <svg
          width="16"
          height="16"
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
        Ver detalle
      </button>
    </div>
  );
};
