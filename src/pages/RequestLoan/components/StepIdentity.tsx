import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  errorClass,
  inputClass,
  labelClass,
} from "../../Register/components/fieldStyles";
import {
  identityStepSchema,
  type IdentityStepInput,
  type IdentityStepValues,
} from "../schemas/applicationSchema";

const IDENTIFICATION_TYPES = [
  { value: "CC", label: "Cédula de ciudadanía" },
  { value: "CE", label: "Cédula de extranjería" },
  { value: "PASSPORT", label: "Pasaporte" },
];

const STREET_TYPES = [
  "Calle",
  "Carrera",
  "Avenida",
  "Diagonal",
  "Transversal",
];

interface StepIdentityProps {
  defaultValues: Partial<IdentityStepInput>;
  onNext: (values: IdentityStepValues) => void;
  onBack: () => void;
}

export const StepIdentity = ({
  defaultValues,
  onNext,
  onBack,
}: StepIdentityProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdentityStepInput, unknown, IdentityStepValues>({
    resolver: zodResolver(identityStepSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="mt-5 flex flex-col gap-4">
      <p className="rounded-lg bg-sky-100 px-4 py-2.5 text-sm text-gray-700">
        <span className="font-bold">Tu privacidad es nuestra prioridad.</span>{" "}
        Protegemos tu información con tecnología de cifrado de nivel bancario.
      </p>

      <div>
        <label htmlFor="loan-fullname" className={labelClass}>
          Nombre completo <span className="text-[#1D1FDD]">*</span>
        </label>
        <input
          id="loan-fullname"
          placeholder="Joseph Mitchell"
          className={inputClass}
          {...register("fullName")}
        />
        {errors.fullName && (
          <span className={errorClass}>{errors.fullName.message}</span>
        )}
      </div>

      <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
        <div>
          <label htmlFor="loan-idtype" className={labelClass}>
            Tipo de identificación <span className="text-[#1D1FDD]">*</span>
          </label>
          <select
            id="loan-idtype"
            className={`${inputClass} cursor-pointer appearance-none`}
            {...register("identificationType")}
          >
            {IDENTIFICATION_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.identificationType && (
            <span className={errorClass}>
              {errors.identificationType.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="loan-idnumber" className={labelClass}>
            Número de identificación <span className="text-[#1D1FDD]">*</span>
          </label>
          <input
            id="loan-idnumber"
            placeholder="1043425656"
            className={inputClass}
            {...register("identificationNumber")}
          />
          {errors.identificationNumber && (
            <span className={errorClass}>
              {errors.identificationNumber.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="loan-city" className={labelClass}>
          Ciudad <span className="text-[#1D1FDD]">*</span>
        </label>
        <input
          id="loan-city"
          placeholder="Barranquilla"
          className={inputClass}
          {...register("city")}
        />
        {errors.city && (
          <span className={errorClass}>{errors.city.message}</span>
        )}
      </div>

      <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
        <div>
          <label htmlFor="loan-streettype" className={labelClass}>
            Calle <span className="text-[#1D1FDD]">*</span>
          </label>
          <select
            id="loan-streettype"
            className={`${inputClass} cursor-pointer appearance-none`}
            {...register("streetType")}
          >
            {STREET_TYPES.map((street) => (
              <option key={street} value={street}>
                {street}
              </option>
            ))}
          </select>
          {errors.streetType && (
            <span className={errorClass}>{errors.streetType.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="loan-address" className={labelClass}>
            Dirección <span className="text-[#1D1FDD]">*</span>
          </label>
          <input
            id="loan-address"
            placeholder="21B #76D - 52"
            className={inputClass}
            {...register("addressDetail")}
          />
          {errors.addressDetail && (
            <span className={errorClass}>{errors.addressDetail.message}</span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="loan-phone" className={labelClass}>
          Celular <span className="text-[#1D1FDD]">*</span>
        </label>
        <input
          id="loan-phone"
          placeholder="3002985672"
          className={inputClass}
          {...register("phone")}
        />
        {errors.phone && (
          <span className={errorClass}>{errors.phone.message}</span>
        )}
      </div>

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
          className="h-11 w-40 cursor-pointer rounded-full bg-[#1D1FDD] text-sm font-semibold text-white transition-colors hover:bg-[#1517b8]"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
