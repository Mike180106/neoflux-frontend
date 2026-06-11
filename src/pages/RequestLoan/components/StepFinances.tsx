import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  errorClass,
  inputClass,
  labelClass,
} from "../../Register/components/fieldStyles";
import {
  financesStepSchema,
  type FinancesStepInput,
  type FinancesStepValues,
} from "../schemas/applicationSchema";

const CONTRACT_TYPES = [
  { value: "INDEFINIDO", label: "Indefinido" },
  { value: "FIJO", label: "Término fijo" },
  { value: "OBRA_LABOR", label: "Obra o labor" },
  { value: "PRESTACION_SERVICIOS", label: "Prestación de servicios" },
];

const SENIORITY_OPTIONS = [
  "Menos de 1 año",
  "1 - 3 años",
  "3 - 5 años",
  "Más de 5 años",
];

interface StepFinancesProps {
  defaultValues: Partial<FinancesStepInput>;
  isSubmitting: boolean;
  submitError: boolean;
  onFinish: (values: FinancesStepValues) => void;
  onBack: () => void;
}

export const StepFinances = ({
  defaultValues,
  isSubmitting,
  submitError,
  onFinish,
  onBack,
}: StepFinancesProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancesStepInput, unknown, FinancesStepValues>({
    resolver: zodResolver(financesStepSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onFinish)}
      className="mt-5 flex flex-col gap-4"
    >
      <p className="rounded-lg bg-sky-100 px-4 py-2.5 text-sm text-gray-700">
        Analizamos tu perfil para ofrecerte un cupo de crédito responsable que{" "}
        <span className="font-bold">cuide tu salud financiera</span>.
      </p>

      <div>
        <label htmlFor="loan-company" className={labelClass}>
          Empresa <span className="text-[#1D1FDD]">*</span>
        </label>
        <input
          id="loan-company"
          placeholder="Desktop S.A"
          className={inputClass}
          {...register("company")}
        />
        {errors.company && (
          <span className={errorClass}>{errors.company.message}</span>
        )}
      </div>

      <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
        <div>
          <label htmlFor="loan-contract" className={labelClass}>
            Tipo de contrato <span className="text-[#1D1FDD]">*</span>
          </label>
          <select
            id="loan-contract"
            className={`${inputClass} cursor-pointer appearance-none`}
            {...register("contractType")}
          >
            {CONTRACT_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.contractType && (
            <span className={errorClass}>{errors.contractType.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="loan-salary" className={labelClass}>
            Salario mensual <span className="text-[#1D1FDD]">*</span>
          </label>
          <div className="relative">
            <span className="absolute top-1/2 left-5 -translate-y-1/2 text-sm text-gray-400">
              $
            </span>
            <input
              id="loan-salary"
              type="number"
              placeholder="10.000.000"
              className={`${inputClass} px-10`}
              {...register("monthlySalary")}
            />
            <span className="absolute top-1/2 right-5 -translate-y-1/2 text-sm text-gray-400">
              COP
            </span>
          </div>
          {errors.monthlySalary && (
            <span className={errorClass}>{errors.monthlySalary.message}</span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="loan-seniority" className={labelClass}>
          Antiguedad <span className="text-[#1D1FDD]">*</span>
        </label>
        <select
          id="loan-seniority"
          className={`${inputClass} cursor-pointer appearance-none`}
          {...register("seniority")}
        >
          {SENIORITY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.seniority && (
          <span className={errorClass}>{errors.seniority.message}</span>
        )}
      </div>

      {submitError && (
        <p className="text-sm text-red-500">
          No se pudo enviar la solicitud, inténtalo de nuevo
        </p>
      )}

      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer text-sm font-semibold text-[#1D1FDD] hover:underline"
        >
          Anterior
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-40 cursor-pointer rounded-full bg-[#1D1FDD] text-sm font-semibold text-white transition-colors hover:bg-[#1517b8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Enviando..." : "Finalizar"}
        </button>
      </div>
    </form>
  );
};
