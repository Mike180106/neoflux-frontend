import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCOP } from "../../../utils/formatCurrency";
import type { SavingsTransaction } from "../../../types/savings";

interface AnnualProgressCardProps {
  totalSavings: number;
  transactions: SavingsTransaction[];
}

const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sept",
  "Oct",
  "Nov",
  "Dic",
];

const formatTick = (value: number) =>
  value === 0 ? "0" : `$${(value / 1_000_000).toLocaleString("es-CO")}M`;

const signedAmount = (t: SavingsTransaction) =>
  t.type === "DEPOSIT" ? t.amount : -t.amount;

export const AnnualProgressCard = ({
  totalSavings,
  transactions,
}: AnnualProgressCardProps) => {
  // Saldo acumulado mes a mes del año en curso, derivado de las transacciones
  // de todas las cajitas (el backend no expone un histórico directo)
  const { chartData, monthGrowth } = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();

    // Lo ahorrado antes de este año es el punto de partida de la curva
    const initial = transactions
      .filter((t) => new Date(t.createdAt).getFullYear() < year)
      .reduce((sum, t) => sum + signedAmount(t), 0);

    const { data } = MONTHS.slice(0, now.getMonth() + 1).reduce(
      (acc, month, index) => {
        const monthTotal = transactions
          .filter((t) => {
            const date = new Date(t.createdAt);
            return date.getFullYear() === year && date.getMonth() === index;
          })
          .reduce((sum, t) => sum + signedAmount(t), 0);
        const running = acc.running + monthTotal;
        return { running, data: [...acc.data, { month, amount: running }] };
      },
      { running: initial, data: [] as { month: string; amount: number }[] },
    );

    const last = data[data.length - 1]?.amount ?? 0;
    const prev = data[data.length - 2]?.amount ?? 0;
    const growth = prev > 0 ? Math.round(((last - prev) / prev) * 100) : 0;

    return { chartData: data, monthGrowth: growth };
  }, [transactions]);

  return (
    <div className="flex flex-col rounded-2xl bg-white p-6">
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
          strokeLinejoin="round"
        >
          <path d="M3 3v18h18" />
          <path d="m6 14 4-4 4 3 5-6" />
        </svg>
        <h2 className="text-sm font-bold text-gray-900">
          Progreso ahorro anual ({new Date().getFullYear()})
        </h2>
      </div>

      {/* Total + variación mensual */}
      <p className="mt-4 text-sm text-gray-500">Ahorro total</p>
      <div className="flex items-end justify-between">
        <p className="text-4xl font-extrabold text-gray-900">
          {formatCOP(totalSavings)} COP
        </p>
        {monthGrowth !== 0 && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              monthGrowth > 0
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
            }`}
          >
            {monthGrowth > 0 ? "↗" : "↘"} {Math.abs(monthGrowth)}%
          </span>
        )}
      </div>

      {/* Gráfica */}
      <div className="mt-4 h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="annualSavingsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8E8FFB" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#8E8FFB" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
            />
            <YAxis
              tickFormatter={formatTick}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              width={50}
            />
            <Tooltip formatter={(value) => formatCOP(Number(value))} />
            <Area
              type="linear"
              dataKey="amount"
              stroke="#6B6CF6"
              strokeWidth={2}
              fill="url(#annualSavingsFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
