export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  status: 'pending' | 'completed';
}

export interface Bucket {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  icon: string;
  color: string;
}

export interface VehicleExpense {
  id: string;
  type: string;
  label: string;
  value: number;
  date: string;
}

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  image: string;
  stats: {
    purchasePrice: number;
    totalKm: number;
    purchaseDate: string;
  };
  expenses: VehicleExpense[];
}

export interface Course {
  id: string;
  year: string;
  semester: string;
  name: string;
  totalCost: number;
  classesPerWeek: number;
  weeks: number;
  hasLabs: boolean;
  hasTutorials: boolean;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  lastSync: string;
  status: string;
}

export interface GiftEvent {
  id: string;
  person: string;
  relationship: string;
  date: string;
  type: string;
  budget: number;
  saved: number;
}