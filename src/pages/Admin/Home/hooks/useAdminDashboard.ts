import { useQuery } from "@tanstack/react-query";
import { neofluxApi } from "../../../../api/neofluxApi";
import type {
  AdminDashboard,
  AdminDashboardChart,
} from "../../../../types/admin";

export const useAdminDashboard = () =>
  useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: async () => {
      const { data } = await neofluxApi.get<AdminDashboard>("/admin/dashboard");
      return data;
    },
  });

export const useAdminDashboardChart = () =>
  useQuery({
    queryKey: ["admin", "dashboard", "chart"],
    queryFn: async () => {
      const { data } = await neofluxApi.get<AdminDashboardChart>(
        "/admin/dashboard/chart",
      );
      return data;
    },
  });
