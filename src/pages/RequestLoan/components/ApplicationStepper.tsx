const STEPS = ["Crédito", "Identidad", "Finanzas", "Detalles"];

interface ApplicationStepperProps {
  // Paso actual en base 1; los anteriores se marcan completados
  currentStep: number;
}

export const ApplicationStepper = ({ currentStep }: ApplicationStepperProps) => {
  return (
    <div className="mt-5 flex items-start">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const isDone = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div
            key={label}
            className={`flex items-start ${index > 0 ? "flex-1" : ""}`}
          >
            {/* Línea conectora */}
            {index > 0 && (
              <div className="mx-3 mt-4 h-px flex-1 bg-gray-300" />
            )}

            <div className="flex flex-col items-center gap-1.5">
              {isDone ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1FDD] text-white">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>
              ) : (
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
                    isCurrent
                      ? "border-[#1D1FDD] text-[#1D1FDD]"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {stepNumber}
                </span>
              )}
              <span
                className={`text-sm ${
                  isCurrent || isDone
                    ? "font-bold text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
