export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  merchant: string;
  status: 'pending' | 'completed';
}

export interface Bucket {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  icon: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
  nextBilling: string;
}

export interface CarStats {
  purchasePrice: number;
  totalInsurance: number;
  totalGas: number;
  totalParking: number;
  totalTickets: number;
  totalKm: number;
  purchaseDate: string;
}

export interface Course {
  id: string;
  name: string;
  totalCost: number;
  classesPerWeek: number;
  weeks: number;
  hasLabs: boolean;
  hasTutorials: boolean;
}

export interface GiftEvent {
  id: string;
  person: string;
  relationship: string;
  date: string;
  type: 'birthday' | 'anniversary' | 'wedding' | 'holiday';
  budget: number;
}