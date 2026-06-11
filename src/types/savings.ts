export interface SavingsBox {
  id: string;
  userId: string;
  name: string;
  balance: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SavingsTransactionType = "DEPOSIT" | "WITHDRAWAL";

export interface SavingsTransaction {
  id: string;
  savingsBoxId: string;
  type: SavingsTransactionType;
  amount: number;
  description: string | null;
  createdAt: string;
}

// Respuesta de GET /savings/my-boxes/:id/summary
export interface SavingsBoxSummaryResponse {
  box: SavingsBox & { transactions: SavingsTransaction[] };
  summary: {
    totalDeposits: number;
    totalWithdrawals: number;
    totalReturns: number;
    currentBalance: number;
  };
}

// El backend marca los rendimientos como depósitos con esta descripción fija
export const RETURNS_DESCRIPTION = "Rendimiento diario";

// El backend no expone un consecutivo: se deriva del id (estable por transacción)
export const transactionConsecutive = (transaction: SavingsTransaction) =>
  `TA-${new Date(transaction.createdAt).getFullYear()}-${
    (parseInt(transaction.id.slice(0, 4), 16) % 9000) + 1000
  }`;
