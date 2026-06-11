import { z } from "zod";

export const simulatorSchema = z.object({
  amount: z.coerce
    .number("Ingresa el monto del préstamo")
    .positive("El monto debe ser mayor a cero"),
  termMonths: z.coerce
    .number("Selecciona el plazo en meses")
    .int()
    .positive("Selecciona el plazo en meses"),
});

// Entrada cruda del formulario (strings) vs valores ya coercionados a número
export type SimulatorFormInput = z.input<typeof simulatorSchema>;
export type SimulatorFormValues = z.output<typeof simulatorSchema>;
