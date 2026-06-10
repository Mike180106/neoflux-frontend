import { useQuery } from "@tanstack/react-query";
import { neofluxApi } from "../../../api/neofluxApi";
import type { SavingsBox } from "../../../types/savings";
import type { Loan } from "../../../types/loan";

export const useMySavingsBoxes = () =>
  useQuery({
    queryKey: ["savings", "my-boxes"],
    queryFn: async () => {
      const { data } = await neofluxApi.get<SavingsBox[]>("/savings/my-boxes");
      return data;
    },
  });

export const useMyLoans = () =>
  useQuery({
    queryKey: ["loans", "my-loans"],
    queryFn: async () => {
      const { data } = await neofluxApi.get<Loan[]>("/loans/my-loans");
      return data;
    },
  });
