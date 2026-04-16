"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { 
  Transaction, 
  Bucket, 
  Vehicle, 
  Course, 
  Account, 
  GiftEvent, 
  VehicleExpenseItem,
  Paystub,
  SchoolPeriod,
  Subscription,
  Debt,
  Goal
} from "@/types/budget";
import { showSuccess, showError } from "@/utils/toast";

interface BudgetContextType {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'status'>) => void;
  buckets: Bucket[];
  addBucket: (b: Omit<Bucket, 'id' | 'spent'>) => void;
  updateBucket: (id: string, amount: number) => void;
  deleteBucket: (id: string) => void;
  saveBuckets: () => void;
  vehicles: Vehicle[];
  addVehicle: (v: Omit<Vehicle, 'id' | 'expenseHistory'>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  addVehicleExpense: (vehicleId: string, expense: Omit<VehicleExpenseItem, 'id'>) => void;
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  accounts: Account[];
  addAccount: (acc: Omit<Account, 'id'>) => void;
  giftEvents: GiftEvent[];
  addGiftEvent: (event: Omit<GiftEvent, 'id'>) => void;
  updateGiftEvent: (id: string, updates: Partial<GiftEvent>) => void;
  deleteGiftEvent: (id: string) => void;
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
  deleteDebt: (id: string) => void;
  goals: Goal[];
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  currentMonthlyIncome: number;
  syncContacts: () => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

const STORAGE_KEY = 'stellar_spend_data';

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial State with Persistence
  const [isLoaded, setIsLoaded] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [buckets, setBuckets] = useState<Bucket[]>([
    { id: '1', name: 'Clothes', budgeted: 200, spent: 0, icon: 'Shirt', color: 'bg-blue-500' },
    { id: '2', name: 'Eating Out', budgeted: 400, spent: 0, icon: 'Utensils', color: 'bg-orange-500' },
    { id: '3', name: 'Tithing', budgeted: 500, spent: 0, icon: 'Heart', color: 'bg-red-500', isRecurringBill: true },
    { id: '4', name: 'Phone Bill', budgeted: 85, spent: 0, icon: 'Smartphone', color: 'bg-indigo-500', isRecurringBill: true },
    { id: '5', name: 'Other', budgeted: 100, spent: 0, icon: 'Package', color: 'bg-slate-500' },
  ]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'Daily Driver',
      model: 'Tesla Model 3',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1000',
      stats: { purchasePrice: 45000, totalKm: 12000, purchaseDate: '2023-05-15' },
      expenseHistory: [
        { id: 'e1', label: 'Insurance', value: 2400, date: '2024-01-01' },
        { id: 'e2', label: 'Maintenance', value: 150, date: '2024-02-10' },
      ]
    }
  ]);
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', name: 'Financial Advisor Envelope', current: 12450, target: 20000, icon: 'TrendingUp', color: 'bg-emerald-500' },
    { id: '2', name: 'Emergency Fund', current: 5000, target: 15000, icon: 'Shield', color: 'bg-blue-500' },
  ]);
  const [giftEvents, setGiftEvents] = useState<GiftEvent[]>([]);
  const [paystubs, setPaystubs] = useState<Paystub[]>([]);
  const [schoolPeriods, setSchoolPeriods] = useState<SchoolPeriod[]>([]);
  const [baseMonthlyIncome, setBaseMonthlyIncome] = useState(5200);
  const [fixedMonthlyBills, setFixedMonthlyBills] = useState(1200);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', name: 'ATB Checking', type: 'Checking', balance: 4250.00, lastSync: 'Just now', status: 'connected' },
  ]);
  const [courses, setCourses] = useState<Course[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setTransactions(data.transactions || []);
        setBuckets(data.buckets || []);
        setVehicles(data.vehicles || []);
        setGoals(data.goals || []);
        setGiftEvents(data.giftEvents || []);
        setPaystubs(data.paystubs || []);
        setSchoolPeriods(data.schoolPeriods || []);
        setBaseMonthlyIncome(data.baseMonthlyIncome || 5200);
        setFixedMonthlyBills(data.fixedMonthlyBills || 1200);
        setSubscriptions(data.subscriptions || []);
        setDebts(data.debts || []);
        setAccounts(data.accounts || []);
        setCourses(data.courses || []);
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      const data = {
        transactions, buckets, vehicles, goals, giftEvents, paystubs,
        schoolPeriods, baseMonthlyIncome, fixedMonthlyBills, subscriptions,
        debts, accounts, courses
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [isLoaded, transactions, buckets, vehicles, goals, giftEvents, paystubs, schoolPeriods, baseMonthlyIncome, fixedMonthlyBills, subscriptions, debts, accounts, courses]);

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

  const addBucket = (b: Omit<Bucket, 'id' | 'spent'>) => {
    setBuckets([...buckets, { ...b, id: Math.random().toString(36).substr(2, 9), spent: 0 }]);
    showSuccess(`${b.name} bucket created!`);
  };

  const updateBucket = (id: string, amount: number) => {
    setBuckets(buckets.map(b => b.id === id ? { ...b, budgeted: Math.max(0, b.budgeted + amount) } : b));
  };

  const deleteBucket = (id: string) => {
    setBuckets(buckets.filter(b => b.id !== id));
    showSuccess("Bucket removed.");
  };

  const saveBuckets = () => showSuccess("Budget allocations saved!");

  const addVehicle = (v: Omit<Vehicle, 'id' | 'expenseHistory'>) => {
    setVehicles([...vehicles, { ...v, id: Math.random().toString(36).substr(2, 9), expenseHistory: [] }]);
    showSuccess(`${v.name} added to fleet!`);
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const deleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    showSuccess("Vehicle removed from fleet.");
  };

  const addVehicleExpense = (vehicleId: string, expense: Omit<VehicleExpenseItem, 'id'>) => {
    setVehicles(vehicles.map(v => v.id === vehicleId ? {
      ...v,
      expenseHistory: [{ ...expense, id: Math.random().toString(36).substr(2, 9) }, ...v.expenseHistory]
    } : v));
    addTransaction({ date: expense.date, merchant: `Vehicle: ${expense.label}`, amount: expense.value, category: 'Vehicles' });
  };

  const addGiftEvent = (event: Omit<GiftEvent, 'id'>) => {
    setGiftEvents([...giftEvents, { ...event, id: Math.random().toString(36).substr(2, 9) }]);
    showSuccess("Gift event added!");
  };

  const updateGiftEvent = (id: string, updates: Partial<GiftEvent>) => {
    setGiftEvents(giftEvents.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteGiftEvent = (id: string) => {
    setGiftEvents(giftEvents.filter(e => e.id !== id));
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(goals.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const addPaystub = (stub: Omit<Paystub, 'id'>) => {
    setPaystubs([{ ...stub, id: Math.random().toString(36).substr(2, 9) }, ...paystubs]);
    setBaseMonthlyIncome(stub.netPay * 2);
    showSuccess("Paystub added!");
  };

  const deletePaystub = (id: string) => setPaystubs(paystubs.filter(p => p.id !== id));

  const addSchoolPeriod = (period: Omit<SchoolPeriod, 'id'>) => {
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

  const deleteDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
    showSuccess("Debt account removed.");
  };

  const addCourse = (course: Omit<Course, 'id'>) => {
    setCourses([...courses, { ...course, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const addAccount = (acc: Omit<Account, 'id'>) => {
    setAccounts([...accounts, { ...acc, id: Math.random().toString(36).substr(2, 9) }]);
  };

  return (
    <BudgetContext.Provider value={{
      transactions, addTransaction, buckets, addBucket, updateBucket, deleteBucket, saveBuckets,
      vehicles, addVehicle, updateVehicle, deleteVehicle, addVehicleExpense,
      courses, addCourse, updateCourse, accounts, addAccount,
      giftEvents, addGiftEvent, updateGiftEvent, deleteGiftEvent,
      paystubs, addPaystub, deletePaystub, schoolPeriods, addSchoolPeriod, deleteSchoolPeriod,
      baseMonthlyIncome, setBaseMonthlyIncome, fixedMonthlyBills, setFixedMonthlyBills,
      subscriptions, addSubscription, deleteSubscription, debts, addDebt, updateDebt, deleteDebt,
      goals, updateGoal, currentMonthlyIncome, syncContacts: () => showSuccess("Synced!")
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