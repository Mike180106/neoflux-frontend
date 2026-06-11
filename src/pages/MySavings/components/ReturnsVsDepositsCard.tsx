import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { formatCOP } from "../../../utils/formatCurrency";

interface ReturnsVsDepositsCardProps {
  totalDeposits: number;
  totalReturns: number;
}

const COLORS = { deposits: "#C7C8FD", returns: "#3B3DF0" };

export const ReturnsVsDepositsCard = ({
  totalDeposits,
  totalReturns,
}: ReturnsVsDepositsCardProps) => {
  const total = totalDeposits + totalReturns;
  const hasData = total > 0;

  const data = hasData
    ? [
        { name: "Aportes", value: totalDeposits, color: COLORS.deposits },
        { name: "Rendimiento", value: totalReturns, color: COLORS.returns },
      ]
    : [{ name: "Sin datos", value: 1, color: "#E5E7EB" }];

  const percent = (value: number) =>
    hasData ? ((value / total) * 100).toFixed(1).replace(".", ",") : "0";

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
          <h2 className="text-sm font-bold text-gray-900">
            Rendimiento vs Aportes
          </h2>
        </div>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
          Histórico
        </span>
      </div>

      {/* Dona + leyenda */}
      <div className="mt-4 flex flex-1 items-center gap-2">
        <div className="flex flex-col gap-4">
          {[
            {
              label: "Aportes",
              value: totalDeposits,
              color: COLORS.deposits,
            },
            {
              label: "Rendimiento",
              value: totalReturns,
              color: COLORS.returns,
            },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-start gap-2">
              <span
                className="mt-1 h-3 w-3 shrink-0 rounded"
                style={{ backgroundColor: color }}
              />
              <div>
                <p className="text-xs text-gray-500">
                  {label} ({percent(value)} %)
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {formatCOP(value)} COP
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-44 min-w-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius="20%"
                outerRadius="95%"
                paddingAngle={hasData ? 3 : 0}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
