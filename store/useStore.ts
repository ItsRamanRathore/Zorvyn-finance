import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Transaction, Role, UserAccount } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface FinanceState {
  transactions: Transaction[];
  role: Role;
  loading: boolean;
  theme: 'light' | 'dark';
  isAuthenticated: boolean;
  users: UserAccount[];
  currentUser: UserAccount | null;
  
  // Actions
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: Role) => void;
  setLoading: (loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  login: (email: string, password: string) => boolean;
  register: (userData: Omit<UserAccount, 'id' | 'createdAt'>) => void;
  logout: () => void;
}

export const useStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: [],
      role: 'admin',
      loading: false,
      theme: 'dark', // Default to dark for premium feel
      isAuthenticated: false,
      users: [],
      currentUser: null,

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

      login: (email, password) => {
        const { users } = (window as any).useStoreState || { users: [] }; 
        // Note: In Zustand within set, we use the state arg instead.
        // I'll use the set pattern properly.
        let success = false;
        set((state) => {
          const user = state.users.find(u => u.email === email && u.password === password);
          if (user) {
            success = true;
            return { 
              isAuthenticated: true, 
              currentUser: user,
              role: user.role // Automatically switch role to user's role
            };
          }
          return {};
        });
        return success;
      },

      register: (userData) => set((state) => {
        const newUser: UserAccount = {
          ...userData,
          id: uuidv4(),
          createdAt: new Date().toISOString()
        };
        return {
          users: [...state.users, newUser],
          isAuthenticated: true,
          currentUser: newUser,
          role: newUser.role
        };
      }),

      logout: () => set({ 
        isAuthenticated: false, 
        currentUser: null,
      }),
    }),
    {
      name: 'zorvyn-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        transactions: state.transactions, 
        role: state.role, 
        theme: state.theme,
        isAuthenticated: state.isAuthenticated,
        users: state.users,
        currentUser: state.currentUser
      }),
    }
  )
);
