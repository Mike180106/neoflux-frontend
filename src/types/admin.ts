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

// Respuesta de GET /admin/dashboard/chart
export interface AdminDashboardChart {
  chart: {
    month: string; // formato yyyy-MM
    totalSavings: number;
    totalLoans: number;
  }[];
}
