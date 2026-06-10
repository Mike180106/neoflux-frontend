interface RegisterProgressProps {
  currentStep: number; // 1-indexed
  totalSteps?: number;
}

export const RegisterProgress = ({
  currentStep,
  totalSteps = 2,
}: RegisterProgressProps) => {
  return (
    <div className="mb-7 flex items-center gap-6">
      {Array.from({ length: totalSteps }, (_, index) => (
        <span
          key={index}
          className={`h-1 flex-1 rounded-full ${
            index < currentStep ? "bg-[#1D1FDD]" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};
