export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: TransactionType;
  isRecurring?: boolean;
  frequency?: 'weekly' | 'monthly';
  remindersEnabled?: boolean;
}

export type Role = 'admin' | 'viewer';

export interface SummaryData {
  balance: number;
  income: number;
  expenses: number;
}

export interface ChartDataPoint {
  name: string;
  balance: number;
  income: number;
  expenses: number;
}

export interface CategoryData {
  name: string;
  value: number;
}
