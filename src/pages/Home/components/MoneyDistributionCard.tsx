import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { formatCOP } from "../../../utils/formatCurrency";

interface MoneyDistributionCardProps {
  totalSavings: number;
  totalLoans: number;
}

export const MoneyDistributionCard = ({
  totalSavings,
  totalLoans,
}: MoneyDistributionCardProps) => {
  const total = totalSavings + totalLoans;
  const data =
    total > 0
      ? [
          { name: "Ahorros", value: totalSavings },
          { name: "Préstamos", value: totalLoans },
        ]
      : [{ name: "Sin datos", value: 1 }];

  const COLORS = total > 0 ? ["#8E8FFB", "#3B3DF0"] : ["#E5E7EB"];

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
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v9l6.5 4" />
          </svg>
          <h2 className="text-sm font-bold text-gray-900">
            ¿A dónde fue tu dinero?
          </h2>
        </div>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
          Últimos tres meses
        </span>
      </div>

      {/* Medidor semicircular */}
      <div className="relative mx-auto mt-2 h-40 w-full max-w-65">
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
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-x-0 bottom-2 text-center">
          <p className="text-xs text-gray-500">Total dinero</p>
          <p className="text-xl font-extrabold text-gray-900">
            {formatCOP(total)}
          </p>
        </div>
      </div>

      {/* Desglose */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          { label: "Ahorros", value: totalSavings, color: "#8E8FFB" },
          { label: "Préstamos", value: totalLoans, color: "#3B3DF0" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: color }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v8M9.5 10h5M9.5 14h5" />
              </svg>
            </div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-bold text-gray-900">
              {formatCOP(value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
