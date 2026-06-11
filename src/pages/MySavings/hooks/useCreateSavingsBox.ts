import { useMutation, useQueryClient } from "@tanstack/react-query";
import { neofluxApi } from "../../../api/neofluxApi";
import type { SavingsBox } from "../../../types/savings";

export const useCreateSavingsBox = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const { data } = await neofluxApi.post<SavingsBox>("/savings/my-boxes", {
        name,
      });
      return data;
    },
    onSuccess: () => {
      // Refresca cajitas y summaries para que la nueva aparezca de inmediato
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });
};
