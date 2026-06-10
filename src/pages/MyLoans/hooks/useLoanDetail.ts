import { useQuery } from "@tanstack/react-query";
import { neofluxApi } from "../../../api/neofluxApi";
import type { LoanDetail, LoanSimulation } from "../../../types/loan";

// Detalle del préstamo con sus cuotas; solo se pide al expandir la tarjeta
export const useLoanDetail = (loanId: string, enabled: boolean) =>
  useQuery({
    queryKey: ["loans", "my-loans", loanId],
    enabled,
    queryFn: async () => {
      const { data } = await neofluxApi.get<LoanDetail>(
        `/loans/my-loans/${loanId}`,
      );
      return data;
    },
  });

// La tasa EA no viene en el préstamo: se obtiene simulando con sus mismos términos
export const useLoanRate = (
  amount: number,
  termMonths: number,
  enabled: boolean,
) =>
  useQuery({
    queryKey: ["loans", "simulate", amount, termMonths],
    enabled,
    queryFn: async () => {
      const { data } = await neofluxApi.get<LoanSimulation>("/loans/simulate", {
        params: { amount, termMonths },
      });
      return data;
    },
  });
