import type { Loan } from "./loan";

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

// Respuesta de GET /admin/dashboard/chart
export interface AdminDashboardChart {
  chart: {
    month: string; // formato yyyy-MM
    totalSavings: number;
    totalLoans: number;
  }[];
}
