import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { neofluxApi } from "../../../../api/neofluxApi";
import type { AdminLoanDetail } from "../../../../types/admin";

export const useAdminLoanDetail = (loanId: string) =>
  useQuery({
    queryKey: ["admin", "loans", loanId],
    queryFn: async () => {
      const { data } = await neofluxApi.get<AdminLoanDetail>(
        `/loans/admin/${loanId}`,
      );
      return data;
    },
  });

// Aprobar/rechazar invalidan pendientes y dashboard para refrescar el panel
const useLoanDecision = (action: "approve" | "reject") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loanId: string) => {
      const { data } = await neofluxApi.patch(
        `/loans/admin/${loanId}/${action}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
};

export const useApproveLoan = () => useLoanDecision("approve");
export const useRejectLoan = () => useLoanDecision("reject");
