import type { Installment, Loan } from "./loan";

// Respuesta de GET /admin/dashboard
export interface AdminDashboard {
  totalUsers: number;
  activeLoans: number;
  loansOnTime: number;
  loansOverdue: number;
  savingsInterestRate: number;
  loanInterestRate: number;
  totalSavings: number;
  totalLoanAmount: number;
  pendingLoans: PendingLoanSummary[];
}

export interface PendingLoanSummary {
  id: string;
  fullName: string;
  amount: number;
  termMonths: number;
  creditDestination: string;
  createdAt: string;
}

// Respuesta de GET /loans/admin/pending: el préstamo completo + datos del socio
export interface AdminLoan extends Loan {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Respuesta de GET /loans/admin/:id (incluye teléfono del socio y cuotas)
export interface AdminLoanDetail extends AdminLoan {
  user: AdminLoan["user"] & { phone: string };
  installments: Installment[];
}

// Respuesta de GET /savings/admin/users
export interface AdminSavingsUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  identificationNumber: string;
  savingsBoxes: AdminSavingsBox[];
}

export interface AdminSavingsBox {
  id: string;
  name: string;
  balance: number;
}

// Respuesta de POST /savings/admin/boxes/:id/deposit y /withdraw
export interface AdminSavingsTransactionResponse {
  box: {
    id: string;
    userId: string;
    name: string;
    balance: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  transaction: {
    id: string;
    savingsBoxId: string;
    type: "DEPOSIT" | "WITHDRAWAL";
    amount: number;
    description: string | null;
    createdAt: string;
  };
}

// Respuesta de GET /admin/dashboard/chart
export interface AdminDashboardChart {
  chart: {
    month: string; // formato yyyy-MM
    totalSavings: number;
    totalLoans: number;
  }[];
}
