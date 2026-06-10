import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "../schemas/registerSchema";
import { errorClass, inputClass, labelClass } from "./fieldStyles";

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
    {!open && <line x1="4" y1="4" x2="20" y2="20" />}
  </svg>
);

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
          className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-gray-500"
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
