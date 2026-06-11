import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCOP } from "../../../../utils/formatCurrency";
import type { AdminDashboardChart } from "../../../../types/admin";

interface SavingsVsLoansChartProps {
  chart: AdminDashboardChart["chart"];
  totalSavings: number;
  totalLoanAmount: number;
}

const MONTH_LABELS = [
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

// "2026-06" → "Jun"
const monthLabel = (month: string) =>
  MONTH_LABELS[parseInt(month.slice(5), 10) - 1] ?? month;

const formatTick = (value: number) =>
  value === 0 ? "0" : `$${(value / 1_000_000).toLocaleString("es-CO")}M`;

export const SavingsVsLoansChart = ({
  chart,
  totalSavings,
  totalLoanAmount,
}: SavingsVsLoansChartProps) => {
  const data = chart.map((point) => ({
    month: monthLabel(point.month),
    ahorro: point.totalSavings,
    prestamos: point.totalLoans,
  }));

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
            <path d="M3 3v18h18" />
            <path d="m6 14 4-4 4 3 5-6" />
          </svg>
          <h2 className="text-sm font-bold text-gray-900">
            Ahorro vs prestamos ⓘ
          </h2>
        </div>
        <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
          Último año
        </span>
      </div>

      {/* Totales */}
      <div className="mt-4 flex flex-wrap gap-12">
        <div>
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <span className="h-3 w-3 rounded bg-[#1D1FDD]" /> Ahorro
          </p>
          <p className="text-3xl font-extrabold text-gray-900">
            {formatCOP(totalSavings)} COP
          </p>
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <span className="h-3 w-3 rounded bg-[#C7C8FD]" /> Prestamos
          </p>
          <p className="text-3xl font-extrabold text-gray-900">
            {formatCOP(totalLoanAmount)} COP
          </p>
        </div>
      </div>

      {/* Gráfica */}
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="adminSavingsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="adminLoansFill" x1="0" y1="0" x2="0" y2="1">
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
              width={55}
            />
            <Tooltip formatter={(value) => formatCOP(Number(value))} />
            <Area
              type="linear"
              dataKey="ahorro"
              name="Ahorro"
              stroke="#38BDF8"
              strokeWidth={2}
              fill="url(#adminSavingsFill)"
            />
            <Area
              type="linear"
              dataKey="prestamos"
              name="Prestamos"
              stroke="#6B6CF6"
              strokeWidth={2}
              fill="url(#adminLoansFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
