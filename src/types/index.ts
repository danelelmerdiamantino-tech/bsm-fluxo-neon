export interface Driver {
  id: string;
  name: string;
  vehicle: string;
}

export interface Revenue {
  id: string;
  driverId: string;
  driverName: string;
  vehicle: string;
  amount: number;
  date: string;
}

export interface Expense {
  id: string;
  vehicle: string;
  type: 'combustivel' | 'manutencao' | 'multas' | 'outros';
  amount: number;
  date: string;
  description?: string;
}

export interface Salary {
  id: string;
  driverId: string;
  driverName: string;
  amount: number;
  date: string;
  month: string;
}

export type ExpenseType = {
  value: Expense['type'];
  label: string;
};
