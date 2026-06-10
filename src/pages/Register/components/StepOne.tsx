import { useFormContext } from "react-hook-form";
import calendarIcon from "../../../assets/icons/calendar.svg";
import type { RegisterFormValues } from "../schemas/registerSchema";
import { errorClass, inputClass, labelClass } from "./fieldStyles";

const COUNTRIES = ["Colombia", "México", "Perú", "Ecuador", "Chile", "Argentina"];

const IDENTIFICATION_TYPES = [
  { value: "CC", label: "Cédula" },
  { value: "CE", label: "Cédula de extranjería" },
  { value: "TI", label: "Tarjeta de identidad" },
  { value: "PA", label: "Pasaporte" },
];

export const StepOne = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  // El input date no soporta placeholder: gris mientras esté vacío
  const birthDateEmpty = !watch("birthDate");

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            Nombres
          </label>
          <input
            id="firstName"
            placeholder="Daniel"
            className={inputClass}
            {...register("firstName")}
          />
          {errors.firstName && (
            <span className={errorClass}>{errors.firstName.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Apellidos
          </label>
          <input
            id="lastName"
            placeholder="Arias"
            className={inputClass}
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className={errorClass}>{errors.lastName.message}</span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="birthDate" className={labelClass}>
          Fecha de nacimiento
        </label>
        <div className="relative">
          <img
            src={calendarIcon}
            alt=""
            className="pointer-events-none absolute top-1/2 left-5 h-5 w-[18px] -translate-y-1/2"
          />
          <input
            id="birthDate"
            type="date"
            onClick={(e) => e.currentTarget.showPicker?.()}
            className={`${inputClass} pl-12 [&::-webkit-calendar-picker-indicator]:hidden ${
              birthDateEmpty ? "text-gray-300" : ""
            }`}
            {...register("birthDate")}
          />
        </div>
        {errors.birthDate && (
          <span className={errorClass}>{errors.birthDate.message}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label htmlFor="country" className={labelClass}>
            País
          </label>
          <select id="country" className={inputClass} {...register("country")}>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className={errorClass}>{errors.country.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Número de celular
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="3002985673"
            className={inputClass}
            {...register("phone")}
          />
          {errors.phone && (
            <span className={errorClass}>{errors.phone.message}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label htmlFor="identificationType" className={labelClass}>
            Tipo de identificación
          </label>
          <select
            id="identificationType"
            className={inputClass}
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
          <label htmlFor="identificationNumber" className={labelClass}>
            # de identificación
          </label>
          <input
            id="identificationNumber"
            inputMode="numeric"
            placeholder="123456789"
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
        <label htmlFor="company" className={labelClass}>
          Empresa
        </label>
        <input
          id="company"
          placeholder="Google"
          className={inputClass}
          {...register("company")}
        />
        {errors.company && (
          <span className={errorClass}>{errors.company.message}</span>
        )}
      </div>
    </div>
  );
};
