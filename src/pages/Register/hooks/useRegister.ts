import { useMutation } from "@tanstack/react-query";
import { neofluxApi } from "../../../api/neofluxApi";
import { useAuthStore } from "../../../store/authStore";
import type { AuthResponse, RegisterRequest } from "../../../types/auth";

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await neofluxApi.post<AuthResponse>(
        "/auth/register",
        data,
      );
      return response.data;
    },
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
    },
  });
};
