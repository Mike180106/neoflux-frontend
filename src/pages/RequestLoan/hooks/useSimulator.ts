import { useQuery } from "@tanstack/react-query";
import { neofluxApi } from "../../../api/neofluxApi";
import type { LoanSimulation, LoanTermOption } from "../../../types/loan";

// Plazos activos configurados por el fondo (GET /loans/terms)
export const useLoanTerms = () =>
  useQuery({
    queryKey: ["loans", "terms"],
    queryFn: async () => {
      const { data } = await neofluxApi.get<LoanTermOption[]>("/loans/terms");
      return data;
    },
  });

// Simulación de crédito; solo corre cuando el usuario calcula (params definidos).
// Comparte queryKey con useLoanRate de Mis préstamos para aprovechar la caché
export const useLoanSimulation = (
  params: { amount: number; termMonths: number } | null,
) =>
  useQuery({
    queryKey: ["loans", "simulate", params?.amount, params?.termMonths],
    enabled: params !== null,
    queryFn: async () => {
      const { data } = await neofluxApi.get<LoanSimulation>("/loans/simulate", {
        params: { amount: params!.amount, termMonths: params!.termMonths },
      });
      return data;
    },
  });
