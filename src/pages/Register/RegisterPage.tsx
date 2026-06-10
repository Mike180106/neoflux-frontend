import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router";
import { useAuthLayoutContext } from "../../components/Layouts/useAuthLayoutContext";
import { useRegister } from "./hooks/useRegister";
import {
  registerSchema,
  STEP_ONE_FIELDS,
  type RegisterFormValues,
} from "./schemas/registerSchema";
import { RegisterProgress } from "./components/RegisterProgress";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";

const PANEL_MESSAGES: Record<number, string> = {
  1: "Obtén acceso a un fondo de ahorro con la agilidad de la tecnología moderna.",
  2: "Gestiona tu capital con la tranquilidad de estar siempre protegido.",
};

const STEP_COPY: Record<number, { title: string; subtitle: string }> = {
  1: {
    title: "Empieza hoy",
    subtitle:
      "Completa tus datos básicos para comenzar a disfrutar de beneficios exclusivos y tasas competitivas.",
  },
  2: {
    title: "Estas un paso más cerca",
    subtitle:
      "Completa con tu correo electrónico y una contraseña segura para comenzar a disfrutar de beneficios exclusivos y tasas competitivas.",
  },
};

export const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const { setPanelMessage } = useAuthLayoutContext();
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      country: "Colombia",
      phone: "",
      identificationType: "CC",
      identificationNumber: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Sincroniza el mensaje del panel izquierdo con el paso actual
  useEffect(() => {
    setPanelMessage(PANEL_MESSAGES[step]);
  }, [step, setPanelMessage]);

  const handleNext = async () => {
    const isValid = await methods.trigger(STEP_ONE_FIELDS);
    if (isValid) {
      // trigger() con resolver deja errores de los campos aún no tocados del paso 2
      methods.clearErrors(["email", "password", "confirmPassword"]);
      setStep(2);
    }
  };

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => navigate("/home"),
    });
  };

  const apiError = registerMutation.error
    ? isAxiosError(registerMutation.error) &&
      registerMutation.error.response?.data?.message
      ? String(registerMutation.error.response.data.message)
      : "Ocurrió un error al registrarte. Inténtalo de nuevo."
    : null;

  const { title, subtitle } = STEP_COPY[step];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <RegisterProgress currentStep={step} />

        <h1 className="mb-3 text-4xl font-extrabold text-[#1B1BB3]">{title}</h1>
        <p className="mb-6 text-sm leading-relaxed text-gray-400">{subtitle}</p>

        {step === 1 ? <StepOne /> : <StepTwo />}

        {apiError && step === 2 && (
          <p className="mt-4 text-sm text-red-500">{apiError}</p>
        )}

        <div className="mt-7 flex items-center justify-end gap-10">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="cursor-pointer text-sm font-bold text-[#1D1FDD]"
            >
              Anterior
            </button>
          )}

          {step === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="h-12 w-40 cursor-pointer rounded-3xl bg-[#1D1FDD] text-sm font-bold text-white transition-colors hover:bg-[#1517b8]"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="h-12 w-40 cursor-pointer rounded-3xl bg-[#1D1FDD] text-sm font-bold text-white transition-colors hover:bg-[#1517b8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {registerMutation.isPending ? "Enviando..." : "Finalizar"}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
