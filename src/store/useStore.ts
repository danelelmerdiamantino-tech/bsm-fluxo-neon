import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Revenue, Expense, Salary, Driver } from '@/types';
import { drivers as initialDrivers } from '@/data/initialData';

interface AppState {
  drivers: Driver[];
  revenues: Revenue[];
  expenses: Expense[];
  salaries: Salary[];
  addRevenue: (revenue: Omit<Revenue, 'id'>) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addSalary: (salary: Omit<Salary, 'id'>) => void;
  deleteRevenue: (id: string) => void;
  deleteExpense: (id: string) => void;
  deleteSalary: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      drivers: initialDrivers,
      revenues: [],
      expenses: [],
      salaries: [],
      addRevenue: (revenue) =>
        set((state) => ({
          revenues: [...state.revenues, { ...revenue, id: crypto.randomUUID() }],
        })),
      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, { ...expense, id: crypto.randomUUID() }],
        })),
      addSalary: (salary) =>
        set((state) => ({
          salaries: [...state.salaries, { ...salary, id: crypto.randomUUID() }],
        })),
      deleteRevenue: (id) =>
        set((state) => ({
          revenues: state.revenues.filter((r) => r.id !== id),
        })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
      deleteSalary: (id) =>
        set((state) => ({
          salaries: state.salaries.filter((s) => s.id !== id),
        })),
    }),
    {
      name: 'bsm-transport-storage',
    }
  )
);
