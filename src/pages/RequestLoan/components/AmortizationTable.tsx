import { formatCOP, formatCOPWithCents } from "../../../utils/formatCurrency";
import type { LoanSimulation } from "../../../types/loan";

interface AmortizationTableProps {
  simulation: LoanSimulation | undefined;
}

export const AmortizationTable = ({ simulation }: AmortizationTableProps) => {
  // Desglose francés por cuota: el backend solo da el valor de la cuota,
  // interés y abono a capital se derivan con la tasa mensual
  const { rows } = (simulation?.table ?? []).reduce(
    (acc, row) => {
      const interest = acc.saldo * ((simulation?.monthlyRate ?? 0) / 100);
      const principal = row.amount - interest;
      const balance = Math.max(acc.saldo - principal, 0);
      return {
        saldo: balance,
        rows: [
          ...acc.rows,
          {
            number: row.installmentNumber,
            installment: row.amount,
            interest,
            principal,
            balance,
          },
        ],
      };
    },
    {
      saldo: simulation?.amount ?? 0,
      rows: [] as {
        number: number;
        installment: number;
        interest: number;
        principal: number;
        balance: number;
      }[],
    },
  );

  return (
    <div className="max-h-72 overflow-y-auto">
      <table className="w-full text-sm">
        {/* Fondo sólido: con transparencia el header dejaba ver las filas al hacer scroll */}
        <thead className="sticky top-0 bg-white">
          <tr className="bg-[#DDDEFE] text-xs font-semibold text-[#1D1FDD]">
            <th className="rounded-l-full px-3 py-2.5 text-left">
              N° de cuotas
            </th>
            <th className="px-3 py-2.5 text-right">Cuota mensual</th>
            <th className="px-3 py-2.5 text-right">
              Interés ({simulation ? simulation.monthlyRate.toFixed(2) : "—"}%)
            </th>
            <th className="px-3 py-2.5 text-right">Abono a capital</th>
            <th className="rounded-r-full px-3 py-2.5 text-right">
              Saldo pendiente
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr className="border-b border-gray-100 text-gray-900">
              <td className="px-3 py-3">0</td>
              <td className="px-3 py-3 text-right">-</td>
              <td className="px-3 py-3 text-right">-</td>
              <td className="px-3 py-3 text-right">-</td>
              <td className="px-3 py-3 text-right">-</td>
            </tr>
          ) : (
            <>
              {/* Fila 0: punto de partida con el saldo inicial del crédito */}
              <tr className="border-b border-gray-100 text-gray-900">
                <td className="px-3 py-3">0</td>
                <td className="px-3 py-3 text-right">-</td>
                <td className="px-3 py-3 text-right">-</td>
                <td className="px-3 py-3 text-right">-</td>
                <td className="px-3 py-3 text-right">
                  {formatCOP(simulation!.amount)} COP
                </td>
              </tr>
              {rows.map((row) => (
              <tr
                key={row.number}
                className="border-b border-gray-100 text-gray-900"
              >
                <td className="px-3 py-3">{row.number}</td>
                <td className="px-3 py-3 text-right">
                  {formatCOPWithCents(row.installment)} COP
                </td>
                <td className="px-3 py-3 text-right">
                  {formatCOP(row.interest)} COP
                </td>
                <td className="px-3 py-3 text-right">
                  {formatCOP(row.principal)} COP
                </td>
                <td className="px-3 py-3 text-right">
                  {formatCOP(row.balance)} COP
                </td>
              </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
