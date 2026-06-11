import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Link, useNavigate } from "react-router";
import { useAuthLayoutContext } from "../../components/Layouts/useAuthLayoutContext";
import { EyeIcon } from "../../components/icons/EyeIcon";
import {
  errorClass,
  inputClass,
  labelClass,
} from "../Register/components/fieldStyles";
import { useLogin } from "./hooks/useLogin";
import { loginSchema, type LoginFormValues } from "./schemas/loginSchema";

export const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setPanelMessage } = useAuthLayoutContext();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  useEffect(() => {
    setPanelMessage(
      "Obtén acceso a un fondo de ahorro con la agilidad de la tecnología moderna.",
    );
  }, [setPanelMessage]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      // Cada rol entra a su propio dashboard
      onSuccess: ({ user }) =>
        navigate(user.role === "ADMIN" ? "/admin/home" : "/home"),
    });
  };

  const apiError = loginMutation.error
    ? isAxiosError(loginMutation.error) &&
      loginMutation.error.response?.data?.message
      ? String(loginMutation.error.response.data.message)
      : "Ocurrió un error al iniciar sesión. Inténtalo de nuevo."
    : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="mb-3 text-4xl leading-tight font-extrabold">
        <span className="text-[#1B1BB3]">Tu futuro financiero</span>{" "}
        <span className="text-gray-900">comienza aquí.</span>
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-gray-400">
        Tu seguridad es nuestro compromiso. Por favor, identifícate para
        acceder a tu panel financiero.
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>
            Usuario <span className="text-[#1D1FDD]">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Example@gmail.com"
            className={inputClass}
            {...register("email")}
          />
          {errors.email && (
            <span className={errorClass}>{errors.email.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Contraseña <span className="text-[#1D1FDD]">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="••••••••"
              className={`${inputClass} pr-12`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible((v) => !v)}
              aria-label={
                passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-700"
            >
              <EyeIcon open={passwordVisible} />
            </button>
          </div>
          {errors.password && (
            <span className={errorClass}>{errors.password.message}</span>
          )}
          <div className="mt-2 text-right">
            <Link
              to="#"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </div>

      {apiError && <p className="mt-4 text-sm text-red-500">{apiError}</p>}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="mt-8 h-12 w-full cursor-pointer rounded-3xl bg-[#1D1FDD] text-sm font-bold text-white transition-colors hover:bg-[#1517b8] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loginMutation.isPending ? "Ingresando..." : "Ingresa"}
      </button>

      <p className="mt-8 text-center text-sm text-gray-400">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-[#59B2FF] hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </form>
  );
};
