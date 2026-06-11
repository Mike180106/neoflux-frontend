import { z } from "zod";

export const createBoxSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Ingresa el nombre de la cajita")
    .max(50, "El nombre no puede superar los 50 caracteres"),
});

export type CreateBoxFormValues = z.infer<typeof createBoxSchema>;
