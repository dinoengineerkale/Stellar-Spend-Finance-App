"use client";

import React, { createContext, useContext, useState } from 'react';
import { 
  Transaction, 
  Bucket, 
  Vehicle, 
  Course, 
  Account, 
  GiftEvent, 
  VehicleExpense,
  Paystub,
  SchoolPeriod
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
  // Financial Profile
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

  // Financial Profile State
  const [paystubs, setPaystubs] = useState<Paystub[]>([
    { id: '1', date: '2024-05-15', fileName: 'paystub_may_15.pdf', grossPay: 3200, netPay: 2350, deductions: 850 },
  ]);
  const [schoolPeriods, setSchoolPeriods] = useState<SchoolPeriod[]>([
    { id: '1', startMonth: '2026-09', endMonth: '2027-04', incomeMultiplier: 0.6 },
  ]);
  const [baseMonthlyIncome, setBaseMonthlyIncome] = useState(5200);
  const [fixedMonthlyBills, setFixedMonthlyBills] = useState(1200);

  const addTransaction = (tx: Omit<Transaction, 'id' | 'status'>) => {
    const newTx: Transaction = { ...tx, id: Math.random().toString(36).substr(2, 9), status: 'completed' };
    setTransactions([newTx, ...transactions]);
    
    // Update bucket spent amount
    setBuckets(prev => prev.map(b => {
      if (b.name.toLowerCase() === tx.category.toLowerCase()) {
        return { ...b, spent: b.spent + tx.amount };
      }
      return b;
    }));
  };

  const updateBucket = (id: string, amount: number) => {
    setBuckets(buckets.map(b => b.id === id ? { ...b, budgeted: Math.max(0, b.budgeted + amount) } : b));
  };

  const saveBuckets = () => showSuccess("Budget allocations saved successfully!");

  const addVehicle = (v: Omit<Vehicle, 'id' | 'expenses'>) => {
    const newVehicle: Vehicle = { 
      ...v, 
      id: Math.random().toString(36).substr(2, 9), 
      expenses: [
        { id: 'e1', type: 'gas', label: 'Fuel / Gas', value: 0, date: new Date().toISOString() },
        { id: 'e2', type: 'maintenance', label: 'Maintenance & Repairs', value: 0, date: new Date().toISOString() },
        { id: 'e3', type: 'insurance', label: 'Insurance', value: 0, date: new Date().toISOString() },
        { id: 'e4', type: 'parking', label: 'Parking', value: 0, date: new Date().toISOString() },
        { id: 'e5', type: 'tickets', label: 'Tickets & Fines', value: 0, date: new Date().toISOString() },
      ]
    };
    setVehicles([...vehicles, newVehicle]);
    showSuccess(`${v.name} added to your fleet!`);
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const addVehicleExpense = (vehicleId: string, expense: Omit<VehicleExpense, 'id'>) => {
    setVehicles(vehicles.map(v => {
      if (v.id === vehicleId) {
        const existing = v.expenses.find(e => e.type === expense.type);
        if (existing) {
          return {
            ...v,
            expenses: v.expenses.map(e => e.type === expense.type ? { ...e, value: e.value + expense.value } : e)
          };
        }
        return {
          ...v,
          expenses: [...v.expenses, { ...expense, id: Math.random().toString(36).substr(2, 9) }]
        };
      }
      return v;
    }));
    addTransaction({
      date: expense.date,
      merchant: `Vehicle: ${expense.label}`,
      amount: expense.value,
      category: 'Vehicles'
    });
  };

  const updateVehicleExpense = (vehicleId: string, expenseId: string, value: number) => {
    setVehicles(vehicles.map(v => v.id === vehicleId ? {
      ...v,
      expenses: v.expenses.map(e => e.id === expenseId ? { ...e, value } : e)
    } : v));
    showSuccess("Expense updated!");
  };

  const addCourse = (course: Omit<Course, 'id'>) => {
    setCourses([...courses, { ...course, id: Math.random().toString(36).substr(2, 9) }]);
    showSuccess(`${course.name} added to Academy!`);
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updates } : c));
    showSuccess("Course details updated!");
  };

  const addAccount = (acc: Omit<Account, 'id'>) => {
    setAccounts([...accounts, { ...acc, id: Math.random().toString(36).substr(2, 9) }]);
    showSuccess(`${acc.name} linked successfully!`);
  };

  const updateGiftEvent = (id: string, updates: Partial<GiftEvent>) => {
    setGiftEvents(giftEvents.map(e => e.id === id ? { ...e, ...updates } : e));
    showSuccess("Event updated!");
  };

  const deleteGiftEvent = (id: string) => {
    setGiftEvents(giftEvents.filter(e => e.id !== id));
    showSuccess("Event removed from Galaxy.");
  };

  const syncContacts = () => {
    showSuccess("Synced 42 contacts from your device!");
  };

  const addPaystub = (stub: Omit<Paystub, 'id'>) => {
    if (paystubs.some(p => p.date === stub.date)) {
      showError("A paystub already exists for this date.");
      return;
    }
    const newStub = { ...stub, id: Math.random().toString(36).substr(2, 9) };
    setPaystubs([newStub, ...paystubs]);
    setBaseMonthlyIncome(stub.netPay * 2);
    showSuccess("Paystub processed and income baseline updated!");
  };

  const deletePaystub = (id: string) => {
    setPaystubs(paystubs.filter(p => p.id !== id));
    showSuccess("Paystub record deleted.");
  };

  const addSchoolPeriod = (period: Omit<SchoolPeriod, 'id'>) => {
    if (schoolPeriods.some(p => p.startMonth === period.startMonth)) {
      showError("A school phase already starts in this month.");
      return;
    }
    setSchoolPeriods([...schoolPeriods, { ...period, id: Math.random().toString(36).substr(2, 9) }]);
    showSuccess("School period recorded for forecasting.");
  };

  const deleteSchoolPeriod = (id: string) => {
    setSchoolPeriods(schoolPeriods.filter(p => p.id !== id));
    showSuccess("School phase removed.");
  };

  return (
    <BudgetContext.Provider value={{
      transactions, addTransaction,
      buckets, updateBucket, saveBuckets,
      vehicles, addVehicle, updateVehicle, addVehicleExpense, updateVehicleExpense,
      courses, addCourse, updateCourse,
      accounts, addAccount,
      giftEvents, updateGiftEvent, deleteGiftEvent, syncContacts,
      paystubs, addPaystub, deletePaystub, schoolPeriods, addSchoolPeriod, deleteSchoolPeriod,
      baseMonthlyIncome, setBaseMonthlyIncome, fixedMonthlyBills, setFixedMonthlyBills
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