import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { DashboardHeader } from "../../../components/DashboardHeader";
import { formatCOP } from "../../../utils/formatCurrency";
import { formatShortDate } from "../../../utils/formatDate";
import {
  useAdminLoanDetail,
  useApproveLoan,
  useRejectLoan,
} from "./hooks/useLoanAdmin";
import { ReviewSection } from "./components/ReviewSection";
import { ReviewField } from "./components/ReviewField";
import { ApprovalSummary } from "./components/ApprovalSummary";

const IDENTIFICATION_LABELS: Record<string, string> = {
  CC: "Cédula",
  CE: "Cédula de extranjería",
  PASSPORT: "Pasaporte",
};

const CONTRACT_LABELS: Record<string, string> = {
  INDEFINIDO: "Indefinido",
  FIJO: "Término fijo",
  OBRA_LABOR: "Obra o labor",
  PRESTACION_SERVICIOS: "Prestación de servicios",
};

export const ReviewLoanPage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const loanQuery = useAdminLoanDetail(id);
  const approveLoan = useApproveLoan();
  const rejectLoan = useRejectLoan();

  // "review" muestra la información; "summary" es el resumen de aprobación
  const [stage, setStage] = useState<"review" | "summary">("review");

  const loan = loanQuery.data;

  const handleReject = () => {
    rejectLoan.mutate(id, {
      onSuccess: () => navigate("/admin/prestamos"),
    });
  };

  const handleApprove = () => {
    approveLoan.mutate(id, {
      onSuccess: () => navigate("/admin/prestamos"),
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Gestión de préstamos" />

      {/* Migas de pan */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/prestamos"
          aria-label="Volver a gestión de préstamos"
          className="text-[#1D1FDD] transition-opacity hover:opacity-70"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M13.5 8.5 10 12l3.5 3.5" />
          </svg>
        </Link>
        <p className="text-sm text-gray-900">
          <Link to="/admin/prestamos" className="text-sky-500 hover:underline">
            Gestión de préstamos
          </Link>{" "}
          &gt;{" "}
          {stage === "summary" ? (
            <>
              <button
                type="button"
                onClick={() => setStage("review")}
                className="cursor-pointer text-sky-500 hover:underline"
              >
                Revisar solicitud
              </button>{" "}
              &gt; Resumen aprobación
            </>
          ) : (
            "Revisar solicitud"
          )}
        </p>
      </div>

      {loanQuery.isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60">
          <p className="text-sm text-gray-400">Cargando la solicitud...</p>
        </div>
      ) : loanQuery.isError || !loan ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white/60">
          <p className="text-sm text-red-500">
            No se pudo cargar la solicitud
          </p>
        </div>
      ) : stage === "summary" ? (
        <ApprovalSummary
          loan={loan}
          isApproving={approveLoan.isPending}
          approveError={approveLoan.isError}
          onApprove={handleApprove}
          onBack={() => setStage("review")}
        />
      ) : (
        <>
          <ReviewSection step={1} title="Identidad">
            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
              <ReviewField label="Nombre asociado" value={loan.fullName} />
              <ReviewField label="Estado" value="Activo" />
              <ReviewField
                label="Tipo de identificación"
                value={
                  IDENTIFICATION_LABELS[loan.identificationType] ??
                  loan.identificationType
                }
              />
              <ReviewField
                label="# de identificación"
                value={loan.identificationNumber}
              />
              <ReviewField label="Ciudad" value={loan.city} />
              <ReviewField label="Dirección" value={loan.address} />
              <ReviewField
                label="Fecha de la solicitud"
                value={formatShortDate(loan.createdAt)}
              />
              <ReviewField label="Celular" value={loan.phone} />
              <ReviewField
                label="Correo electrónico"
                value={loan.user.email}
              />
            </div>
          </ReviewSection>

          <ReviewSection step={2} title="Finanzas">
            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
              <ReviewField label="Empresa" value={loan.company} />
              <ReviewField
                label="Tipo de contrato"
                value={CONTRACT_LABELS[loan.contractType] ?? loan.contractType}
              />
              <ReviewField label="Antigüedad" value={loan.seniority} />
              <ReviewField
                label="Salario mensual"
                value={`${formatCOP(loan.monthlySalary)} COP`}
              />
            </div>
          </ReviewSection>

          <ReviewSection step={3} title="Crédito">
            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
              <ReviewField
                label="Monto"
                value={`${formatCOP(loan.amount)} COP`}
              />
              <ReviewField label="Plazo" value={`${loan.termMonths} meses`} />
              <ReviewField
                label="Destino del crédito"
                value={loan.creditDestination}
              />
            </div>
          </ReviewSection>

          {rejectLoan.isError && (
            <p className="text-right text-sm text-red-500">
              No se pudo rechazar el préstamo, inténtalo de nuevo
            </p>
          )}

          {/* Decisión de la revisión */}
          <div className="flex items-center justify-between">
            <Link
              to="/admin/prestamos"
              className="text-sm font-semibold text-[#1D1FDD] hover:underline"
            >
              Volver
            </Link>
            <div className="flex items-center gap-4">
              <button
                type="button"
                disabled={rejectLoan.isPending}
                onClick={handleReject}
                className="cursor-pointer rounded-full bg-red-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {rejectLoan.isPending ? "Rechazando..." : "Rechazar solicitud"}
              </button>
              <button
                type="button"
                onClick={() => setStage("summary")}
                className="cursor-pointer rounded-full bg-[#1D1FDD] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1517b8]"
              >
                Aprobar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
