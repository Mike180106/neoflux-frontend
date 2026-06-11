import { useState } from "react";
import { Link } from "react-router";
import { DashboardHeader } from "../../components/DashboardHeader";
import { useAuthStore } from "../../store/authStore";
import { useCreateLoan } from "./hooks/useCreateLoan";
import type {
  CreditStepInput,
  CreditStepValues,
  FinancesStepInput,
  FinancesStepValues,
  IdentityStepInput,
  IdentityStepValues,
} from "./schemas/applicationSchema";
import { ApplicationStepper } from "./components/ApplicationStepper";
import { StepCredit } from "./components/StepCredit";
import { StepIdentity } from "./components/StepIdentity";
import { StepFinances } from "./components/StepFinances";
import { ApplicationSuccess } from "./components/ApplicationSuccess";

export const LoanApplicationPage = () => {
  const user = useAuthStore((state) => state.user);
  const createLoan = useCreateLoan();

  const [step, setStep] = useState(1);
  // Cada paso guarda lo suyo para no perderlo al navegar con Anterior
  const [creditData, setCreditData] = useState<Partial<CreditStepInput>>({});
  const [identityData, setIdentityData] = useState<Partial<IdentityStepInput>>(
    {
      // Precargado desde el perfil del usuario
      fullName: user ? `${user.firstName} ${user.lastName}` : "",
      identificationType: user?.identificationType as
        | IdentityStepInput["identificationType"]
        | undefined,
      identificationNumber: user?.identificationNumber ?? "",
      phone: user?.phone ?? "",
      streetType: "Calle",
    },
  );
  const [financesData, setFinancesData] = useState<Partial<FinancesStepInput>>(
    {
      company: user?.company ?? "",
      contractType: "INDEFINIDO",
      seniority: "1 - 3 años",
    },
  );

  const handleCreditNext = (values: CreditStepValues) => {
    setCreditData(values);
    setStep(2);
  };

  const handleIdentityNext = (values: IdentityStepValues) => {
    setIdentityData(values);
    setStep(3);
  };

  const handleFinish = (values: FinancesStepValues) => {
    setFinancesData(values);

    const credit = creditData as CreditStepValues;
    const identity = identityData as IdentityStepValues;

    createLoan.mutate({
      amount: Number(credit.amount),
      termMonths: Number(credit.termMonths),
      creditDestination: credit.creditDestination!,
      fullName: identity.fullName!,
      identificationType: identity.identificationType!,
      identificationNumber: identity.identificationNumber!,
      city: identity.city!,
      // Tipo de vía + nomenclatura en un solo campo (el backend espera address)
      address: `${identity.streetType} ${identity.addressDetail}`,
      phone: identity.phone!,
      company: values.company,
      contractType: values.contractType,
      monthlySalary: values.monthlySalary,
      seniority: values.seniority,
    });
  };

  const createdLoan = createLoan.data;

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader title="Solicitar préstamos" />

      {/* Migas de pan */}
      <div className="flex items-center justify-between">
        <Link
          to="/prestamos/solicitar"
          aria-label="Volver a solicitar préstamos"
          className="text-[#1D1FDD] transition-opacity hover:opacity-70"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M13.5 8.5 10 12l3.5 3.5" />
          </svg>
        </Link>
        <p className="text-sm text-gray-900">
          <Link
            to="/prestamos/solicitar"
            className="text-sky-500 hover:underline"
          >
            Solicitar préstamos
          </Link>{" "}
          &gt; Solicitud formal de préstamo
        </p>
      </div>

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
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v10M9.5 9.5h3.75a1.75 1.75 0 1 1 0 3.5h-2.5a1.75 1.75 0 1 0 0 3.5h3.75" />
          </svg>
          <h2 className="text-sm font-bold text-gray-900">
            Solicitud formal de préstamo ⓘ
          </h2>
        </div>

        {createdLoan ? (
          <ApplicationSuccess loan={createdLoan} />
        ) : (
          <>
            <ApplicationStepper currentStep={step} />

            {step === 1 && (
              <StepCredit
                defaultValues={creditData}
                onNext={handleCreditNext}
              />
            )}
            {step === 2 && (
              <StepIdentity
                defaultValues={identityData}
                onNext={handleIdentityNext}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <StepFinances
                defaultValues={financesData}
                isSubmitting={createLoan.isPending}
                submitError={createLoan.isError}
                onFinish={handleFinish}
                onBack={() => setStep(2)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
