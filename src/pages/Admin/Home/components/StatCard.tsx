interface StatCardProps {
  label: string;
  value: string | number;
  // La primera card del mockup va resaltada con gradiente
  highlighted?: boolean;
}

export const StatCard = ({ label, value, highlighted }: StatCardProps) => {
  return (
    <div
      className={`flex flex-col rounded-2xl p-5 ${
        highlighted ? "text-white" : "bg-white text-gray-900"
      }`}
      style={
        highlighted
          ? {
              background:
                "linear-gradient(135deg, #6B6CF6 0%, #3B3DF0 60%, #1D1FDD 100%)",
            }
          : undefined
      }
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold">{label}</p>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            highlighted ? "bg-white text-[#1D1FDD]" : "text-[#1D1FDD]"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </span>
      </div>
      <p className="mt-3 text-5xl font-extrabold">{value}</p>
    </div>
  );
};
