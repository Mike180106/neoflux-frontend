import { useMutation } from "@tanstack/react-query";
import { neofluxApi } from "../../../api/neofluxApi";
import { useAuthStore } from "../../../store/authStore";
import type { AuthResponse } from "../../../types/auth";
import type { LoginFormValues } from "../schemas/loginSchema";

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await neofluxApi.post<AuthResponse>("/auth/login", data);
      return response.data;
    },
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
    },
  });
};
