import { Link } from "react-router";
import { formatCOP } from "../../../utils/formatCurrency";
import { loanConsecutive, type Loan } from "../../../types/loan";

const TIMELINE = [
  "Envío de solicitud.",
  "Verificación de documentos y capacidad de pago.",
  "Notificación de aprobación y desembolso.",
];

interface ApplicationSuccessProps {
  loan: Loan;
}

export const ApplicationSuccess = ({ loan }: ApplicationSuccessProps) => {
  return (
    <div className="mt-5">
      <h3 className="text-xl font-bold text-gray-900">
        ¡Solicitud recibida con éxito!
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Hemos recibido tu información. Nuestro equipo comenzará la validación
        de inmediato.
      </p>

      <p className="mt-6 text-xs text-gray-400">Número de radicado</p>
      <p className="text-4xl font-extrabold text-gray-900">
        {loanConsecutive(loan, "NP")}
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs text-gray-400">Monto solicitado</p>
          <p className="text-sm font-bold text-gray-900">
            {formatCOP(loan.amount)} COP
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Plazo</p>
          <p className="text-sm font-bold text-gray-900">
            {loan.termMonths} meses
          </p>
        </div>
      </div>

      {/* Línea de tiempo del proceso */}
      <div className="mt-6 flex flex-col">
        {TIMELINE.map((step, index) => (
          <div key={step} className="flex gap-4">
            <div className="flex flex-col items-center">
              {index === 0 ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1FDD] text-white">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>
              ) : (
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
                    index === 1
                      ? "border-[#1D1FDD] text-[#1D1FDD]"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {index + 1}
                </span>
              )}
              {index < TIMELINE.length - 1 && (
                <span className="h-6 w-px bg-gray-300" />
              )}
            </div>
            <p className="pt-1.5 text-sm text-gray-700">{step}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-700">
        Sigue tu solicitud en <span className="font-bold">Mis Préstamos</span>.
        Recibirás una alerta por correo y en la plataforma al finalizar la
        verificación.
      </p>

      <div className="mt-6 flex justify-end">
        <Link
          to="/prestamos/solicitar"
          className="rounded-full bg-[#1D1FDD] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1517b8]"
        >
          Ir a vista principal
        </Link>
      </div>
    </div>
  );
};
