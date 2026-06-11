interface ReviewFieldProps {
  label: string;
  value: string;
}

// Dato de solo lectura dentro de las secciones de revisión
export const ReviewField = ({ label, value }: ReviewFieldProps) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
  </div>
);
