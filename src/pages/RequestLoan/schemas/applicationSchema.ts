import { z } from "zod";

// Paso 1: condiciones del crédito
export const creditStepSchema = z.object({
  amount: z.coerce
    .number("Ingresa el monto del préstamo")
    .positive("El monto debe ser mayor a cero"),
  termMonths: z.coerce
    .number("Selecciona el plazo en meses")
    .int()
    .positive("Selecciona el plazo en meses"),
  creditDestination: z
    .string()
    .trim()
    .min(1, "Ingresa el destino del crédito"),
});

// Paso 2: identidad y contacto
export const identityStepSchema = z.object({
  fullName: z.string().trim().min(1, "Ingresa tu nombre completo"),
  identificationType: z.enum(
    ["CC", "CE", "PASSPORT"],
    "Selecciona el tipo de identificación",
  ),
  identificationNumber: z
    .string()
    .trim()
    .min(5, "Ingresa un número de identificación válido"),
  city: z.string().trim().min(1, "Ingresa tu ciudad"),
  streetType: z.string().min(1, "Selecciona el tipo de vía"),
  addressDetail: z.string().trim().min(1, "Ingresa la dirección"),
  phone: z.string().trim().min(7, "Ingresa un celular válido"),
});

// Paso 3: información financiera
export const financesStepSchema = z.object({
  company: z.string().trim().min(1, "Ingresa el nombre de la empresa"),
  contractType: z.enum(
    ["INDEFINIDO", "FIJO", "OBRA_LABOR", "PRESTACION_SERVICIOS"],
    "Selecciona el tipo de contrato",
  ),
  monthlySalary: z.coerce
    .number("Ingresa tu salario mensual")
    .positive("El salario debe ser mayor a cero"),
  seniority: z.string().min(1, "Selecciona tu antigüedad"),
});

export type CreditStepInput = z.input<typeof creditStepSchema>;
export type CreditStepValues = z.output<typeof creditStepSchema>;
export type IdentityStepInput = z.input<typeof identityStepSchema>;
export type IdentityStepValues = z.output<typeof identityStepSchema>;
export type FinancesStepInput = z.input<typeof financesStepSchema>;
export type FinancesStepValues = z.output<typeof financesStepSchema>;
