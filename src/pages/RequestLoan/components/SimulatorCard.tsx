import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCOPWithCents } from "../../../utils/formatCurrency";
import {
  errorClass,
  inputClass,
  labelClass,
} from "../../Register/components/fieldStyles";
import {
  simulatorSchema,
  type SimulatorFormInput,
  type SimulatorFormValues,
} from "../schemas/simulatorSchema";
import { useLoanSimulation, useLoanTerms } from "../hooks/useSimulator";
import { AmortizationTable } from "./AmortizationTable";

export const SimulatorCard = () => {
  // Parámetros confirmados con "Calcular préstamo"; null = aún sin simular
  const [simParams, setSimParams] = useState<{
    amount: number;
    termMonths: number;
  } | null>(null);

  const termsQuery = useLoanTerms();
  const simulationQuery = useLoanSimulation(simParams);
  const simulation = simulationQuery.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SimulatorFormInput, unknown, SimulatorFormValues>({
    resolver: zodResolver(simulatorSchema),
  });

  const onSubmit = handleSubmit((values) => {
    setSimParams({ amount: values.amount, termMonths: values.termMonths });
  });

  return (
    <div className="rounded-2xl bg-white p-6">
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
        >
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
        </svg>
        <h2 className="text-sm font-bold text-gray-900">
          Simulador de prestamos ⓘ
        </h2>
      </div>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_1.6fr]">
        {/* Formulario */}
        <form onSubmit={onSubmit}>
          <label htmlFor="sim-amount" className={labelClass}>
            Monto <span className="text-[#1D1FDD]">*</span>
          </label>
          <div className="relative">
            <span className="absolute top-1/2 left-5 -translate-y-1/2 text-sm text-gray-400">
              $
            </span>
            <input
              id="sim-amount"
              type="number"
              placeholder="10.000"
              className={`${inputClass} px-10`}
              {...register("amount")}
            />
            <span className="absolute top-1/2 right-5 -translate-y-1/2 text-sm text-gray-400">
              COP
            </span>
          </div>
          {errors.amount && (
            <span className={errorClass}>{errors.amount.message}</span>
          )}

          <label htmlFor="sim-term" className={`${labelClass} mt-4`}>
            Plazo (Meses) <span className="text-[#1D1FDD]">*</span>
          </label>
          <select
            id="sim-term"
            defaultValue=""
            className={`${inputClass} cursor-pointer appearance-none`}
            {...register("termMonths")}
          >
            <option value="" disabled>
              {termsQuery.isLoading ? "Cargando plazos..." : "Selecciona"}
            </option>
            {(termsQuery.data ?? []).map((term) => (
              <option key={term.id} value={term.months}>
                {term.months} meses
              </option>
            ))}
          </select>
          {errors.termMonths && (
            <span className={errorClass}>{errors.termMonths.message}</span>
          )}

          <button
            type="submit"
            disabled={simulationQuery.isLoading}
            className="mt-6 flex cursor-pointer items-center gap-2 rounded-full bg-[#1D1FDD] px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1517b8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
            </svg>
            {simulationQuery.isLoading ? "Calculando..." : "Calcular préstamo"}
          </button>
        </form>

        {/* Resultado */}
        <div>
          <p className="text-sm text-gray-500">
            Cuota mensual estimada + intereses
          </p>
          <div className="flex items-center justify-between gap-4">
            <p className="text-4xl font-extrabold text-gray-900">
              {simulation
                ? formatCOPWithCents(simulation.monthlyInstallment)
                : "$0"}{" "}
              COP
            </p>
            {simulation && (
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-600">
                Interés del {simulation.annualRate}% E.A
              </span>
            )}
          </div>

          {simulationQuery.isError && (
            <p className="mt-4 text-sm text-red-500">
              No se pudo calcular la simulación, inténtalo de nuevo
            </p>
          )}

          <p className="mt-4 mb-2 text-sm text-gray-500">
            Tabla de amortización
          </p>
          <AmortizationTable simulation={simulation} />
        </div>
      </div>
    </div>
  );
};
