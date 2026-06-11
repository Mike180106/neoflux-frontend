export type LoanStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "FINISHED";

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  termMonths: number;
  creditDestination: string;
  status: LoanStatus;
  fullName: string;
  identificationType: string;
  identificationNumber: string;
  city: string;
  address: string;
  phone: string;
  company: string;
  contractType: string;
  monthlySalary: number;
  seniority: string;
  idDocumentUrl: string | null;
  laborCertificateUrl: string | null;
  monthlyInstallment: number | null;
  totalAmount: number | null;
  createdAt: string;
  updatedAt: string;
}

export type InstallmentStatus = "PENDING" | "PAID";

export interface Installment {
  id: string;
  loanId: string;
  number: number;
  amount: number;
  dueDate: string;
  status: InstallmentStatus;
  paidAt: string | null;
  createdAt: string;
}

export interface LoanDetail extends Loan {
  installments: Installment[];
}

// Respuesta de GET /loans/simulate (tasas reales del fondo)
export interface LoanSimulation {
  amount: number;
  termMonths: number;
  annualRate: number;
  monthlyRate: number;
  monthlyInstallment: number;
  totalAmount: number;
  totalInterest: number;
  table: { installmentNumber: number; amount: number }[];
}

// Respuesta de GET /loans/terms (plazos activos del fondo)
export interface LoanTermOption {
  id: string;
  months: number;
  isActive: boolean;
  createdAt: string;
}

// El backend no expone un consecutivo: se deriva del id (estable por préstamo)
export const loanConsecutive = (loan: Loan) =>
  `NF-${new Date(loan.createdAt).getFullYear()}-${
    (parseInt(loan.id.slice(0, 4), 16) % 9000) + 1000
  }`;

// Cuota actual estimada por meses transcurridos (sin cargar el detalle)
export const estimateCurrentInstallment = (loan: Loan) => {
  const start = new Date(loan.createdAt);
  const now = new Date();
  const elapsedMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return Math.min(Math.max(elapsedMonths + 1, 1), loan.termMonths);
};
