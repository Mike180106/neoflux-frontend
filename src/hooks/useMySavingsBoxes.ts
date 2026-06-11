import { useQuery } from "@tanstack/react-query";
import { neofluxApi } from "../api/neofluxApi";
import type { SavingsBox } from "../types/savings";

export const useMySavingsBoxes = () =>
  useQuery({
    queryKey: ["savings", "my-boxes"],
    queryFn: async () => {
      const { data } = await neofluxApi.get<SavingsBox[]>("/savings/my-boxes");
      return data;
    },
  });
