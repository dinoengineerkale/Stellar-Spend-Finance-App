"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  Transaction, 
  Bucket, 
  Vehicle, 
  Course, 
  Account, 
  GiftEvent, 
  VehicleExpense,
  Paystub,
  SchoolPeriod,
  Subscription,
  Debt
} from "@/types/budget";
import { showSuccess, showError } from "@/utils/toast";

interface BudgetContextType {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'status'>) => void;
  buckets: Bucket[];
  updateBucket: (id: string, amount: number) => void;
  saveBuckets: () => void;
  vehicles: Vehicle[];
  addVehicle: (v: Omit<Vehicle, 'id' | 'expenses'>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  addVehicleExpense: (vehicleId: string, expense: Omit<VehicleExpense, 'id'>) => void;
  updateVehicleExpense: (vehicleId: string, expenseId: string, value: number) => void;
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  accounts: Account[];
  addAccount: (acc: Omit<Account, 'id'>) => void;
  giftEvents: GiftEvent[];
  updateGiftEvent: (id: string, updates: Partial<GiftEvent>) => void;
  deleteGiftEvent: (id: string) => void;
  syncContacts: () => void;
  paystubs: Paystub[];
  addPaystub: (stub: Omit<Paystub, 'id'>) => void;
  deletePaystub: (id: string) => void;
  schoolPeriods: SchoolPeriod[];
  addSchoolPeriod: (period: Omit<SchoolPeriod, 'id'>) => void;
  deleteSchoolPeriod: (id: string) => void;
  baseMonthlyIncome: number;
  setBaseMonthlyIncome: (val: number) => void;
  fixedMonthlyBills: number;
  setFixedMonthlyBills: (val: number) => void;
  subscriptions: Subscription[];
  addSubscription: (sub: Omit<Subscription, 'id'>) => void;
  deleteSubscription: (id: string) => void;
  debts: Debt[];
  addDebt: (debt: Omit<Debt, 'id'>) => void;
  updateDebt: (id: string, updates: Partial<Debt>) => void;
  currentMonthlyIncome: number;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '2024-05-24', merchant: 'Starbucks', amount: 6.50, category: 'Eating Out', status: 'completed' },
    { id: '2', date: '2024-05-23', merchant: 'Shell Gas', amount: 85.00, category: 'Vehicles', status: 'completed' },
  ]);

  const [buckets, setBuckets] = useState<Bucket[]>([
    { id: '1', name: 'Clothes', budgeted: 200, spent: 145, icon: 'Shirt', color: 'bg-blue-500' },
    { id: '2', name: 'Eating Out', budgeted: 400, spent: 380, icon: 'Utensils', color: 'bg-orange-500' },
    { id: '3', name: 'Tithing', budgeted: 500, spent: 500, icon: 'Heart', color: 'bg-red-500' },
    { id: '4', name: 'Phone Bill', budgeted: 85, spent: 85, icon: 'Smartphone', color: 'bg-indigo-500' },
    { id: '5', name: 'Savings (Advisor)', budgeted: 1000, spent: 0, icon: 'TrendingUp', color: 'bg-green-500' },
    { id: '6', name: 'Vehicles', budgeted: 500, spent: 85, icon: 'Car', color: 'bg-slate-500' },
  ]);

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'Daily Driver',
      model: 'Tesla Model 3',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1000',
      stats: { purchasePrice: 45000, totalKm: 12000, purchaseDate: '2023-05-15' },
      expenses: [
        { id: 'e1', type: 'gas', label: 'Fuel / Gas', value: 0, date: '2024-01-01' },
        { id: 'e2', type: 'maintenance', label: 'Maintenance & Repairs', value: 150, date: '2024-02-10' },
        { id: 'e3', type: 'insurance', label: 'Insurance', value: 2400, date: '2024-01-01' },
        { id: 'e4', type: 'parking', label: 'Parking', value: 300, date: '2024-03-05' },
        { id: 'e5', type: 'tickets', label: 'Tickets & Fines', value: 0, date: '2024-01-01' },
      ]
    }
  ]);

  const [courses, setCourses] = useState<Course[]>([
    { id: '1', year: 'year-1', semester: 'fall', name: 'Intro to Economics', totalCost: 850, classesPerWeek: 3, weeks: 12, hasLabs: false, hasTutorials: true },
  ]);

  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', name: 'ATB Financial Checking', type: 'Checking', balance: 4250.00, lastSync: '2 mins ago', status: 'connected' },
  ]);

  const [giftEvents, setGiftEvents] = useState<GiftEvent[]>([
    { id: '1', person: 'Mom', relationship: 'Family', date: '2024-09-14', type: 'Birthday', budget: 150, saved: 120, description: 'New gardening tools', isBought: false },
  ]);

  const [paystubs, setPaystubs] = useState<Paystub[]>([
    { id: '1', date: '2024-05-15', fileName: 'paystub_may_15.pdf', grossPay: 3200, netPay: 2350, deductions: 850 },
  ]);
  const [schoolPeriods, setSchoolPeriods] = useState<SchoolPeriod[]>([
    { id: '1', startMonth: '2026-09', endMonth: '2027-04', incomeMultiplier: 0.6 },
  ]);
  const [baseMonthlyIncome, setBaseMonthlyIncome] = useState(5200);
  const [fixedMonthlyBills, setFixedMonthlyBills] = useState(1200);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: '1', name: 'Netflix', amount: 19.99, frequency: 'monthly', nextBilling: '2024-06-15', category: 'Entertainment' },
    { id: '2', name: 'Spotify', amount: 10.99, frequency: 'monthly', nextBilling: '2024-06-20', category: 'Music' },
  ]);

  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'ATB Mastercard', balance: 1240.50, limit: 5000, apr: 19.99, minPayment: 35 },
    { id: '2', name: 'Student Loan', balance: 8500.00, limit: 10000, apr: 5.5, minPayment: 120 },
  ]);

  const currentMonthlyIncome = useMemo(() => {
    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const activePeriod = schoolPeriods.find(p => currentMonthStr >= p.startMonth && currentMonthStr <= p.endMonth);
    return activePeriod ? baseMonthlyIncome * activePeriod.incomeMultiplier : baseMonthlyIncome;
  }, [baseMonthlyIncome, schoolPeriods]);

  const addTransaction = (tx: Omit<Transaction, 'id' | 'status'>) => {
    const newTx: Transaction = { ...tx, id: Math.random().toString(36).substr(2, 9), status: 'completed' };
    setTransactions([newTx, ...transactions]);
    setBuckets(prev => prev.map(b => b.name.toLowerCase() === tx.category.toLowerCase() ? { ...b, spent: b.spent + tx.amount } : b));
  };

  const updateBucket = (id: string, amount: number) => {
    setBuckets(buckets.map(b => b.id === id ? { ...b, budgeted: Math.max(0, b.budgeted + amount) } : b));
  };

  const saveBuckets = () => showSuccess("Budget allocations saved successfully!");

  const addVehicle = (v: Omit<Vehicle, 'id' | 'expenses'>) => {
    const newVehicle: Vehicle = { ...v, id: Math.random().toString(36).substr(2, 9), expenses: [] };
    setVehicles([...vehicles, newVehicle]);
    showSuccess(`${v.name} added to fleet!`);
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const addVehicleExpense = (vehicleId: string, expense: Omit<VehicleExpense, 'id'>) => {
    setVehicles(vehicles.map(v => v.id === vehicleId ? { ...v, expenses: [...v.expenses, { ...expense, id: Math.random().toString(36).substr(2, 9) }] } : v));
    addTransaction({ date: expense.date, merchant: `Vehicle: ${expense.label}`, amount: expense.value, category: 'Vehicles' });
  };

  const updateVehicleExpense = (vehicleId: string, expenseId: string, value: number) => {
    setVehicles(vehicles.map(v => v.id === vehicleId ? { ...v, expenses: v.expenses.map(e => e.id === expenseId ? { ...e, value } : e) } : v));
  };

  const addCourse = (course: Omit<Course, 'id'>) => {
    setCourses([...courses, { ...course, id: Math.random().toString(36).substr(2, 9) }]);
    showSuccess(`${course.name} added!`);
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const addAccount = (acc: Omit<Account, 'id'>) => {
    setAccounts([...accounts, { ...acc, id: Math.random().toString(36).substr(2, 9) }]);
    showSuccess(`${acc.name} linked!`);
  };

  const updateGiftEvent = (id: string, updates: Partial<GiftEvent>) => {
    setGiftEvents(giftEvents.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteGiftEvent = (id: string) => {
    setGiftEvents(giftEvents.filter(e => e.id !== id));
  };

  const syncContacts = () => showSuccess("Synced contacts!");

  const addPaystub = (stub: Omit<Paystub, 'id'>) => {
    if (paystubs.some(p => p.date === stub.date)) return showError("Duplicate date!");
    setPaystubs([{ ...stub, id: Math.random().toString(36).substr(2, 9) }, ...paystubs]);
    setBaseMonthlyIncome(stub.netPay * 2);
    showSuccess("Paystub added!");
  };

  const deletePaystub = (id: string) => setPaystubs(paystubs.filter(p => p.id !== id));

  const addSchoolPeriod = (period: Omit<SchoolPeriod, 'id'>) => {
    if (schoolPeriods.some(p => p.startMonth === period.startMonth)) return showError("Duplicate start month!");
    setSchoolPeriods([...schoolPeriods, { ...period, id: Math.random().toString(36).substr(2, 9) }]);
    showSuccess("School period added!");
  };

  const deleteSchoolPeriod = (id: string) => setSchoolPeriods(schoolPeriods.filter(p => p.id !== id));

  const addSubscription = (sub: Omit<Subscription, 'id'>) => {
    setSubscriptions([...subscriptions, { ...sub, id: Math.random().toString(36).substr(2, 9) }]);
    showSuccess(`${sub.name} added!`);
  };

  const deleteSubscription = (id: string) => setSubscriptions(subscriptions.filter(s => s.id !== id));

  const addDebt = (debt: Omit<Debt, 'id'>) => {
    setDebts([...debts, { ...debt, id: Math.random().toString(36).substr(2, 9) }]);
    showSuccess(`${debt.name} added!`);
  };

  const updateDebt = (id: string, updates: Partial<Debt>) => {
    setDebts(debts.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  return (
    <BudgetContext.Provider value={{
      transactions, addTransaction, buckets, updateBucket, saveBuckets,
      vehicles, addVehicle, updateVehicle, addVehicleExpense, updateVehicleExpense,
      courses, addCourse, updateCourse, accounts, addAccount,
      giftEvents, updateGiftEvent, deleteGiftEvent, syncContacts,
      paystubs, addPaystub, deletePaystub, schoolPeriods, addSchoolPeriod, deleteSchoolPeriod,
      baseMonthlyIncome, setBaseMonthlyIncome, fixedMonthlyBills, setFixedMonthlyBills,
      subscriptions, addSubscription, deleteSubscription, debts, addDebt, updateDebt,
      currentMonthlyIncome
    }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error("useBudget must be used within a BudgetProvider");
  return context;
};