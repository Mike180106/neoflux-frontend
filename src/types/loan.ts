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
  createdAt: string;
}
