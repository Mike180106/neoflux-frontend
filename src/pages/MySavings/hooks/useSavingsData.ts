import { useQueries } from "@tanstack/react-query";
import { neofluxApi } from "../../../api/neofluxApi";
import type { SavingsBoxSummaryResponse } from "../../../types/savings";

export { useMySavingsBoxes } from "../../../hooks/useMySavingsBoxes";

// Un summary por cajita (GET /savings/my-boxes/:id/summary): de ahí salen
// las transacciones (gráfica anual) y los rendimientos (dona y cards)
export const useBoxSummaries = (boxIds: string[]) =>
  useQueries({
    queries: boxIds.map((id) => ({
      queryKey: ["savings", "summary", id],
      queryFn: async () => {
        const { data } = await neofluxApi.get<SavingsBoxSummaryResponse>(
          `/savings/my-boxes/${id}/summary`,
        );
        return data;
      },
    })),
  });
