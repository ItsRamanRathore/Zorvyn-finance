import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Transaction, Role } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface FinanceState {
  transactions: Transaction[];
  role: Role;
  loading: boolean;
  theme: 'light' | 'dark';
  
  // Actions
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: Role) => void;
  setLoading: (loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: [],
      role: 'admin',
      loading: false,
      theme: 'dark', // Default to dark for premium feel

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
      
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'zorvyn-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        transactions: state.transactions, 
        role: state.role, 
        theme: state.theme 
      }),
    }
  )
);
