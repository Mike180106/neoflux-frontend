import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { neofluxApi } from "../../../../api/neofluxApi";
import type {
  AdminSavingsTransactionResponse,
  AdminSavingsUser,
} from "../../../../types/admin";

const USERS_QUERY_KEY = ["savings", "admin", "users"];

export const useAdminSavingsUsers = () =>
  useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: async () => {
      const { data } =
        await neofluxApi.get<AdminSavingsUser[]>("/savings/admin/users");
      return data;
    },
  });

interface BoxTransactionInput {
  boxId: string;
  action: "deposit" | "withdraw";
  amount: number;
  description: string;
}

// Deposita o retira dinero de una cajita y refresca la lista de socios
export const useBoxTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      boxId,
      action,
      amount,
      description,
    }: BoxTransactionInput) => {
      const { data } = await neofluxApi.post<AdminSavingsTransactionResponse>(
        `/savings/admin/boxes/${boxId}/${action}`,
        { amount, description },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
};
