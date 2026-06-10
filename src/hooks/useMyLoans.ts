import { useQuery } from "@tanstack/react-query";
import { neofluxApi } from "../api/neofluxApi";
import type { Loan } from "../types/loan";

export const useMyLoans = () =>
  useQuery({
    queryKey: ["loans", "my-loans"],
    queryFn: async () => {
      const { data } = await neofluxApi.get<Loan[]>("/loans/my-loans");
      return data;
    },
  });
