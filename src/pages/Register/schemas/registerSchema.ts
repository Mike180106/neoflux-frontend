import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "Ingresa tus nombres"),
    lastName: z.string().min(2, "Ingresa tus apellidos"),
    birthDate: z
      .string()
      .min(1, "Ingresa tu fecha de nacimiento")
      .refine((value) => new Date(value) < new Date(), {
        message: "La fecha debe ser en el pasado",
      }),
    country: z.string().min(1, "Selecciona un país"),
    phone: z
      .string()
      .regex(/^\d{7,15}$/, "Ingresa un número de celular válido (solo dígitos)"),
    identificationType: z.string().min(1, "Selecciona un tipo de identificación"),
    identificationNumber: z
      .string()
      .regex(/^\d{5,15}$/, "Ingresa un número de identificación válido"),
    company: z.string().min(1, "Ingresa tu empresa"),
    email: z.email("Ingresa un correo electrónico válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe incluir al menos una mayúscula")
      .regex(/\d/, "Debe incluir al menos un número"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// Campos que valida el botón "Siguiente" del paso 1
export const STEP_ONE_FIELDS = [
  "firstName",
  "lastName",
  "birthDate",
  "country",
  "phone",
  "identificationType",
  "identificationNumber",
  "company",
] as const;
