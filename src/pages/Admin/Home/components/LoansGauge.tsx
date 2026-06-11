import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface LoansGaugeProps {
  loansOnTime: number;
  loansOverdue: number;
}

export const LoansGauge = ({ loansOnTime, loansOverdue }: LoansGaugeProps) => {
  const total = loansOnTime + loansOverdue;
  const data =
    total > 0
      ? [
          { name: "En mora", value: loansOverdue, color: "#3B3DF0" },
          { name: "Al día", value: loansOnTime, color: "#8E8FFB" },
        ]
      : [{ name: "Sin datos", value: 1, color: "#E5E7EB" }];

  return (
    <div className="flex flex-col rounded-2xl bg-white p-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1D1FDD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-9-9" />
            <path d="M12 3a9 9 0 0 1 9 9h-9Z" />
          </svg>
          <h2 className="text-sm font-bold text-gray-900">Préstamos ⓘ</h2>
        </div>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
          Histórico
        </span>
      </div>

      {/* Medidor semicircular */}
      <div className="relative mx-auto mt-2 h-44 w-full max-w-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="85%"
              innerRadius="115%"
              outerRadius="150%"
              cornerRadius={8}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-x-0 bottom-2 text-center">
          <p className="text-xs text-gray-500">Total préstamos</p>
          <p className="text-3xl font-extrabold text-gray-900">{total}</p>
        </div>
      </div>

      {/* Desglose */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C7C8FD] text-[#1D1FDD]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5V13M12 16.5h.01" />
            </svg>
          </span>
          <div>
            <p className="text-xs text-gray-500">En mora</p>
            <p className="text-lg font-extrabold text-gray-900">
              {loansOverdue}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1D1FDD] text-white">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="m8.5 12.5 2.5 2.5 4.5-5" />
            </svg>
          </span>
          <div>
            <p className="text-xs text-gray-500">Al día</p>
            <p className="text-lg font-extrabold text-gray-900">
              {loansOnTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
