import { create } from 'zustand';
import { Transaction, Role, TransactionType } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface FinanceState {
  transactions: Transaction[];
  role: Role;
  loading: boolean;
  
  // Actions
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: Role) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<FinanceState>((set) => ({
  transactions: [],
  role: 'admin', // Default to admin for evaluation
  loading: false,

  setTransactions: (transactions) => set({ transactions }),
  
  addTransaction: (transaction) => set((state) => ({
    transactions: [
      { ...transaction, id: uuidv4() },
      ...state.transactions,
    ],
  })),

  updateTransaction: (id, updatedFields) => set((state) => ({
    transactions: state.transactions.map((t) => 
      t.id === id ? { ...t, ...updatedFields } : t
    ),
  })),

  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter((t) => t.id !== id),
  })),

  setRole: (role) => set({ role }),
  
  setLoading: (loading) => set({ loading }),
}));
