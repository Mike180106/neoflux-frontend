import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  errorClass,
  inputClass,
  labelClass,
} from "../../Register/components/fieldStyles";
import {
  creditStepSchema,
  type CreditStepInput,
  type CreditStepValues,
} from "../schemas/applicationSchema";
import { useLoanTerms } from "../hooks/useSimulator";

interface StepCreditProps {
  defaultValues: Partial<CreditStepInput>;
  onNext: (values: CreditStepValues) => void;
}

export const StepCredit = ({ defaultValues, onNext }: StepCreditProps) => {
  const termsQuery = useLoanTerms();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreditStepInput, unknown, CreditStepValues>({
    resolver: zodResolver(creditStepSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="mt-5 flex flex-col gap-4">
      <p className="rounded-lg bg-sky-100 px-4 py-2.5 text-sm text-gray-700">
        <span className="font-bold">Tú decides las condiciones.</span> Elige el
        monto y el tiempo de pago que mejor funcionen para ti hoy.
      </p>

      <div>
        <label htmlFor="loan-amount" className={labelClass}>
          Monto <span className="text-[#1D1FDD]">*</span>
        </label>
        <div className="relative">
          <span className="absolute top-1/2 left-5 -translate-y-1/2 text-sm text-gray-400">
            $
          </span>
          <input
            id="loan-amount"
            type="number"
            placeholder="1.400.000"
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
      </div>

      <div>
        <label htmlFor="loan-term" className={labelClass}>
          Plazo (Meses) <span className="text-[#1D1FDD]">*</span>
        </label>
        <select
          id="loan-term"
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
      </div>

      <div>
        <label htmlFor="loan-destination" className={labelClass}>
          Destino del crédito <span className="text-[#1D1FDD]">*</span>
        </label>
        <input
          id="loan-destination"
          placeholder="Libre inversión"
          className={inputClass}
          {...register("creditDestination")}
        />
        {errors.creditDestination && (
          <span className={errorClass}>{errors.creditDestination.message}</span>
        )}
      </div>

      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          className="h-11 w-40 cursor-pointer rounded-full bg-[#1D1FDD] text-sm font-semibold text-white transition-colors hover:bg-[#1517b8]"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
