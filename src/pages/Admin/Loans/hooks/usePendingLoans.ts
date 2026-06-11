import { useQuery } from "@tanstack/react-query";
import { neofluxApi } from "../../../../api/neofluxApi";
import type { AdminLoan } from "../../../../types/admin";

export const usePendingLoans = () =>
  useQuery({
    queryKey: ["admin", "loans", "pending"],
    queryFn: async () => {
      const { data } = await neofluxApi.get<AdminLoan[]>(
        "/loans/admin/pending",
      );
      return data;
    },
  });
