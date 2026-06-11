import type { ReactNode } from "react";

interface ReviewSectionProps {
  step: number;
  title: string;
  children: ReactNode;
}

// Sección informativa de la revisión (solo lectura)
export const ReviewSection = ({ step, title, children }: ReviewSectionProps) => {
  return (
    <div className="rounded-2xl bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-400">Paso {step} de 3</span>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
};
