import { useState } from "react";
import { DashboardHeader } from "../../components/DashboardHeader";
import { formatCOP } from "../../utils/formatCurrency";
import { RETURNS_DESCRIPTION } from "../../types/savings";
import { useBoxSummaries, useMySavingsBoxes } from "./hooks/useSavingsData";
import { AnnualProgressCard } from "./components/AnnualProgressCard";
import { ReturnsVsDepositsCard } from "./components/ReturnsVsDepositsCard";
import { SavingsBoxCard } from "./components/SavingsBoxCard";
import { CreateBoxModal } from "./components/CreateBoxModal";
import { BoxDetailModal } from "./components/BoxDetailModal";

export const MySavingsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const boxesQuery = useMySavingsBoxes();
  const boxes = boxesQuery.data ?? [];

  const summariesQueries = useBoxSummaries(boxes.map((box) => box.id));
  const summaries = summariesQueries
    .map((query) => query.data)
    .filter((data) => data !== undefined);

  const totalSavings = boxes.reduce((sum, box) => sum + box.balance, 0);

  // Agregados de todas las cajitas (cada summary trae sus transacciones)
  const allTransactions = summaries.flatMap((s) => s.box.transactions);
  const totalDeposits = summaries.reduce(
    (sum, s) => sum + s.summary.totalDeposits,
    0,
  );
  const totalReturns = summaries.reduce(
    (sum, s) => sum + s.summary.totalReturns,
    0,
  );

  // Aportes propios del mes en curso (sin contar rendimientos)
  const now = new Date();
  const monthlySavings = allTransactions
    .filter((t) => {
      const date = new Date(t.createdAt);
      return (
        t.type === "DEPOSIT" &&
        t.description !== RETURNS_DESCRIPTION &&
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth()
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  // Summary por cajita: rendimiento para las cards y datos del modal de detalle
  const summariesByBox = new Map(summaries.map((s) => [s.box.id, s]));
  const selectedSummary = selectedBoxId
    ? summariesByBox.get(selectedBoxId)
    : undefined;

  const isLoading =
    boxesQuery.isLoading || summariesQueries.some((query) => query.isLoading);

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Mi ahorro" />

      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60">
          <p className="text-sm text-gray-400">Cargando tu ahorro...</p>
        </div>
      ) : (
        <>
          {/* Fila superior: progreso anual + rendimiento vs aportes */}
          <div className="grid gap-5 xl:grid-cols-[1.8fr_1fr]">
            <AnnualProgressCard
              totalSavings={totalSavings}
              transactions={allTransactions}
            />
            <ReturnsVsDepositsCard
              totalDeposits={totalDeposits}
              totalReturns={totalReturns}
            />
          </div>

          {/* Banner del ahorro del mes */}
          {monthlySavings > 0 && (
            <div className="rounded-2xl bg-white px-6 py-4 text-sm text-gray-700">
              ¡Enhorabuena!, este mes ahorraste{" "}
              <span className="font-semibold text-green-600">
                +{formatCOP(monthlySavings)} COP
              </span>
              , puedes observar cada uno de estos movimientos en los detalles de
              transacciones de tus cajitas.
            </div>
          )}

          {/* Mis NeoCajitas */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Mis NeoCajitas
              </h2>
              <p className="text-sm text-gray-500">
                Las NeoCajitas son cajas de ahorro que te ayudan a que tu dinero
                crezca y alcances todas para distintas metas.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[#1D1FDD] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1517b8]"
            >
              <span className="text-base leading-none">+</span> Agregar cajita
            </button>
          </div>

          {boxes.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-2xl bg-white/60">
              <p className="text-sm text-gray-400">
                Aún no tienes cajitas de ahorro, crea la primera para empezar.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {boxes.map((box) => (
                <SavingsBoxCard
                  key={box.id}
                  box={box}
                  totalReturns={
                    summariesByBox.get(box.id)?.summary.totalReturns ?? null
                  }
                  onViewDetail={() => setSelectedBoxId(box.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {showCreateModal && (
        <CreateBoxModal onClose={() => setShowCreateModal(false)} />
      )}

      {selectedSummary && (
        <BoxDetailModal
          summary={selectedSummary}
          onClose={() => setSelectedBoxId(null)}
        />
      )}
    </div>
  );
};
