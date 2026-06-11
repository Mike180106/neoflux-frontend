import { useState, type ReactNode } from "react";
import { DashboardHeader } from "../../../components/DashboardHeader";
import { useFundConfig, useLoanTermsAdmin } from "./hooks/useFundConfig";
import { LoanTermsModal } from "./components/LoanTermsModal";
import { EditRateModal } from "./components/EditRateModal";

type ActiveModal = "terms" | "loanRate" | "savingsRate" | null;

// Botón circular de edición de cada tarjeta
const EditButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#1D1FDD] text-white transition-colors hover:bg-[#1517b8]"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" />
      <path d="m17.5 3.5 3 3L13 14l-3.5.5L10 11l7.5-7.5Z" />
    </svg>
  </button>
);

// Tarjeta con la franja izquierda de la tasa en gradiente
const RateCard = ({
  rate,
  icon,
  title,
  description,
  onEdit,
}: {
  rate: number;
  icon: ReactNode;
  title: string;
  description: string;
  onEdit: () => void;
}) => (
  <div className="flex overflow-hidden rounded-2xl bg-white">
    <div
      className="flex w-36 shrink-0 items-center justify-center text-white"
      style={{
        background: "linear-gradient(135deg, #6B6CF6 0%, #3B3DF0 60%, #1D1FDD 100%)",
      }}
    >
      <p className="text-3xl font-extrabold">{rate}%</p>
    </div>
    <div className="flex flex-1 items-center justify-between gap-6 p-6">
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
      <EditButton onClick={onEdit} label={`Editar ${title}`} />
    </div>
  </div>
);

export const AdminFundConfigPage = () => {
  const configQuery = useFundConfig();
  const termsQuery = useLoanTermsAdmin();
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const config = configQuery.data;
  const isLoading = configQuery.isLoading || termsQuery.isLoading;

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Configuración de fondo" />

      {isLoading || !config ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60">
          <p className="text-sm text-gray-400">
            {configQuery.isError || termsQuery.isError
              ? "No se pudo cargar la configuración del fondo"
              : "Cargando la configuración..."}
          </p>
        </div>
      ) : (
        <>
          {/* Plazos */}
          <div className="flex items-center justify-between gap-6 rounded-2xl bg-white p-6">
            <div>
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
                <h2 className="text-base font-bold text-gray-900">
                  Plazos para las cuotas de los préstamos
                </h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                La Configuración de Plazos permite establecer los tiempos
                posibles para el pago de cuotas disponibles para diferir los
                préstamos en NEOFLUX. Es un parámetro ajustable que regula la
                flexibilidad de pago del socio y proyecta el retorno de capital
                del fondo.
              </p>
            </div>
            <EditButton
              onClick={() => setActiveModal("terms")}
              label="Editar plazos de los préstamos"
            />
          </div>

          {/* Interés de préstamos */}
          <RateCard
            rate={config.annualInterestRate}
            title="Interés global préstamos"
            description="El Interés Global es la tasa fija que determina el costo de todos los préstamos en NEOFLUX. Al ser definida por la administración, es el eje central que regula la rentabilidad del sistema y el beneficio para el socio."
            icon={
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
                <path d="M12 3v18M5 7l7-4 7 4M3 13l2-6 2 6a3 3 0 0 1-4 0ZM17 13l2-6 2 6a3 3 0 0 1-4 0Z" />
              </svg>
            }
            onEdit={() => setActiveModal("loanRate")}
          />

          {/* Tasa de ahorro */}
          <RateCard
            rate={config.savingsReturnRate}
            title="Tasa E.A de ahorro"
            description="La Tasa Efectivo Anual (E.A.) de ahorro es el rendimiento real que recibe el socio por su dinero en un año. Permite a la administración de NEOFLUX incentivar el ahorro, ajustando qué tanto crece el capital de los usuarios según nuestra estrategia."
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1D1FDD"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <circle cx="12" cy="12" r="2.5" />
                <path d="M7 12h.01M17 12h.01" />
              </svg>
            }
            onEdit={() => setActiveModal("savingsRate")}
          />
        </>
      )}

      {activeModal === "terms" && (
        <LoanTermsModal
          terms={termsQuery.data ?? []}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "loanRate" && config && (
        <EditRateModal
          title="Interés global préstamos"
          label="Nueva tasa de interés anual"
          currentRate={config.annualInterestRate}
          field="annualInterestRate"
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "savingsRate" && config && (
        <EditRateModal
          title="Tasa E.A de ahorro"
          label="Nueva tasa E.A de ahorro"
          currentRate={config.savingsReturnRate}
          field="savingsReturnRate"
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};
