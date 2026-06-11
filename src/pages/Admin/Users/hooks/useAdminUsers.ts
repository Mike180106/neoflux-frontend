import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { neofluxApi } from "../../../../api/neofluxApi";
import type { AdminUser, AdminUserDetail } from "../../../../types/admin";

export const useAdminUsers = () =>
  useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const { data } = await neofluxApi.get<AdminUser[]>("/admin/users");
      return data;
    },
  });

export const useAdminUserDetail = (userId: string) =>
  useQuery({
    queryKey: ["admin", "users", userId],
    queryFn: async () => {
      const { data } = await neofluxApi.get<AdminUserDetail>(
        `/admin/users/${userId}`,
      );
      return data;
    },
  });

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await neofluxApi.patch(
        `/admin/users/${userId}/toggle-status`,
      );
      return data;
    },
    onSuccess: () => {
      // Refresca listado, detalle y los contadores del dashboard
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
};
