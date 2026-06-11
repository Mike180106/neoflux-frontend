import { useMutation, useQueryClient } from "@tanstack/react-query";
import { neofluxApi } from "../../../api/neofluxApi";
import type { CreateLoanRequest, Loan } from "../../../types/loan";

export const useCreateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateLoanRequest) => {
      const response = await neofluxApi.post<Loan>("/loans", data);
      return response.data;
    },
    onSuccess: () => {
      // La nueva solicitud debe aparecer en Mis préstamos
      queryClient.invalidateQueries({ queryKey: ["loans", "my-loans"] });
    },
  });
};
