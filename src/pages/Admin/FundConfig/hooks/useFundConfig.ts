import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { neofluxApi } from "../../../../api/neofluxApi";
import type { FundConfig } from "../../../../types/admin";
import type { LoanTermOption } from "../../../../types/loan";

export const useFundConfig = () =>
  useQuery({
    queryKey: ["admin", "fund-config"],
    queryFn: async () => {
      const { data } = await neofluxApi.get<FundConfig>("/admin/fund-config");
      return data;
    },
  });

export const useLoanTermsAdmin = () =>
  useQuery({
    queryKey: ["admin", "loan-terms"],
    queryFn: async () => {
      const { data } = await neofluxApi.get<LoanTermOption[]>(
        "/admin/loan-terms",
      );
      return data;
    },
  });

// Cambiar tasas afecta dashboard y simulaciones: se invalida todo lo cacheado
export const useUpdateFundConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: {
      annualInterestRate?: number;
      savingsReturnRate?: number;
    }) => {
      const { data } = await neofluxApi.patch<FundConfig>(
        "/admin/fund-config",
        dto,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
  });
};

export const useAddLoanTerm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (months: number) => {
      const { data } = await neofluxApi.post<LoanTermOption>(
        "/admin/loan-terms",
        { months },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "loan-terms"] });
      // El simulador y la solicitud usan /loans/terms
      queryClient.invalidateQueries({ queryKey: ["loans", "terms"] });
    },
  });
};

export const useToggleLoanTerm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (termId: string) => {
      const { data } = await neofluxApi.patch<LoanTermOption>(
        `/admin/loan-terms/${termId}/toggle`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "loan-terms"] });
      queryClient.invalidateQueries({ queryKey: ["loans", "terms"] });
    },
  });
};
