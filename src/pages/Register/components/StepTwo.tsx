import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import type { RegisterFormValues } from "../schemas/registerSchema";
import { errorClass, inputClass, labelClass } from "./fieldStyles";

interface PasswordFieldProps {
  id: "password" | "confirmPassword";
  label: string;
}

const PasswordField = ({ id, label }: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder="••••••••"
          className={`${inputClass} pr-12`}
          {...register(id)}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-700"
        >
          <EyeIcon open={visible} />
        </button>
      </div>
      {errors[id] && <span className={errorClass}>{errors[id]?.message}</span>}
    </div>
  );
};

export const StepTwo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className={labelClass}>
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          placeholder="Neoflux@email.com"
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <span className={errorClass}>{errors.email.message}</span>
        )}
      </div>

      <PasswordField id="password" label="Contraseña" />
      <PasswordField id="confirmPassword" label="Confirmar contraseña" />
    </div>
  );
};
