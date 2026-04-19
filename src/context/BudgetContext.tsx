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
import { supabase } from "@/integrations/supabase/client";

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
  isLoading: boolean;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [giftEvents, setGiftEvents] = useState<GiftEvent[]>([]);
  const [paystubs, setPaystubs] = useState<Paystub[]>([]);
  const [schoolPeriods, setSchoolPeriods] = useState<SchoolPeriod[]>([]);
  const [baseMonthlyIncome, setBaseMonthlyIncome] = useState(5200);
  const [fixedMonthlyBills, setFixedMonthlyBills] = useState(1200);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const [
        { data: txData },
        { data: bucketData },
        { data: vehicleData },
        { data: goalData },
        { data: giftData },
        { data: stubData },
        { data: periodData },
        { data: subData },
        { data: debtData },
        { data: accData },
        { data: courseData }
      ] = await Promise.all([
        supabase.from('transactions').select('*').order('date', { ascending: false }),
        supabase.from('buckets').select('*'),
        supabase.from('vehicles').select('*, expenseHistory:vehicle_expenses(*)'),
        supabase.from('goals').select('*'),
        supabase.from('gift_events').select('*'),
        supabase.from('paystubs').select('*'),
        supabase.from('school_periods').select('*'),
        supabase.from('subscriptions').select('*'),
        supabase.from('debts').select('*'),
        supabase.from('accounts').select('*'),
        supabase.from('courses').select('*')
      ]);

      setTransactions(txData || []);
      setBuckets(bucketData || []);
      setVehicles(vehicleData || []);
      setGoals(goalData || []);
      setGiftEvents(giftData || []);
      setPaystubs(stubData || []);
      setSchoolPeriods(periodData || []);
      setSubscriptions(subData || []);
      setDebts(debtData || []);
      setAccounts(accData || []);
      setCourses(courseData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') fetchData();
      if (event === 'SIGNED_OUT') {
        setTransactions([]);
        setBuckets([]);
        setVehicles([]);
        setGoals([]);
        setGiftEvents([]);
        setPaystubs([]);
        setSchoolPeriods([]);
        setSubscriptions([]);
        setDebts([]);
        setAccounts([]);
        setCourses([]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const currentMonthlyIncome = useMemo(() => {
    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const activePeriod = schoolPeriods.find(p => currentMonthStr >= p.startMonth && currentMonthStr <= p.endMonth);
    return activePeriod ? baseMonthlyIncome * activePeriod.incomeMultiplier : baseMonthlyIncome;
  }, [baseMonthlyIncome, schoolPeriods]);

  const addTransaction = async (tx: Omit<Transaction, 'id' | 'status'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('transactions').insert([{ ...tx, user_id: user.id }]).select();
    if (error) {
      showError("Failed to record transaction.");
      return;
    }
    setTransactions([data[0], ...transactions]);
    
    // Update bucket spent amount locally and in DB
    const bucket = buckets.find(b => b.name.toLowerCase() === tx.category.toLowerCase());
    if (bucket) {
      const newSpent = bucket.spent + tx.amount;
      await supabase.from('buckets').update({ spent: newSpent }).eq('id', bucket.id);
      setBuckets(prev => prev.map(b => b.id === bucket.id ? { ...b, spent: newSpent } : b));
    }
  };

  const addBucket = async (b: Omit<Bucket, 'id' | 'spent'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('buckets').insert([{ ...b, user_id: user.id, spent: 0 }]).select();
    if (error) {
      showError("Failed to create bucket.");
      return;
    }
    setBuckets([...buckets, data[0]]);
    showSuccess(`${b.name} bucket created!`);
  };

  const updateBucket = async (id: string, amount: number) => {
    const bucket = buckets.find(b => b.id === id);
    if (!bucket) return;
    const newBudgeted = Math.max(0, bucket.budgeted + amount);
    const { error } = await supabase.from('buckets').update({ budgeted: newBudgeted }).eq('id', id);
    if (error) return;
    setBuckets(buckets.map(b => b.id === id ? { ...b, budgeted: newBudgeted } : b));
  };

  const deleteBucket = async (id: string) => {
    const { error } = await supabase.from('buckets').delete().eq('id', id);
    if (error) return;
    setBuckets(buckets.filter(b => b.id !== id));
    showSuccess("Bucket removed.");
  };

  const saveBuckets = () => showSuccess("Budget allocations saved!");

  const addVehicle = async (v: Omit<Vehicle, 'id' | 'expenseHistory'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('vehicles').insert([{
      user_id: user.id,
      name: v.name,
      model: v.model,
      image: v.image,
      purchase_price: v.stats.purchasePrice,
      total_km: v.stats.totalKm,
      purchase_date: v.stats.purchaseDate
    }]).select();

    if (error) return;
    setVehicles([...vehicles, { ...data[0], expenseHistory: [], stats: { purchasePrice: data[0].purchase_price, totalKm: data[0].total_km, purchaseDate: data[0].purchase_date } }]);
    showSuccess(`${v.name} added to fleet!`);
  };

  const updateVehicle = async (id: string, updates: Partial<Vehicle>) => {
    const dbUpdates: any = {};
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.model) dbUpdates.model = updates.model;
    if (updates.image) dbUpdates.image = updates.image;
    if (updates.stats) {
      if (updates.stats.purchasePrice) dbUpdates.purchase_price = updates.stats.purchasePrice;
      if (updates.stats.totalKm !== undefined) dbUpdates.total_km = updates.stats.totalKm;
      if (updates.stats.purchaseDate) dbUpdates.purchase_date = updates.stats.purchaseDate;
    }

    const { error } = await supabase.from('vehicles').update(dbUpdates).eq('id', id);
    if (error) return;
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const deleteVehicle = async (id: string) => {
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    if (error) return;
    setVehicles(vehicles.filter(v => v.id !== id));
    showSuccess("Vehicle removed from fleet.");
  };

  const addVehicleExpense = async (vehicleId: string, expense: Omit<VehicleExpenseItem, 'id'>) => {
    const { data, error } = await supabase.from('vehicle_expenses').insert([{
      vehicle_id: vehicleId,
      label: expense.label,
      value: expense.value,
      date: expense.date
    }]).select();

    if (error) return;
    setVehicles(vehicles.map(v => v.id === vehicleId ? {
      ...v,
      expenseHistory: [data[0], ...v.expenseHistory]
    } : v));
    addTransaction({ date: expense.date, merchant: `Vehicle: ${expense.label}`, amount: expense.value, category: 'Vehicles' });
  };

  const addGiftEvent = async (event: Omit<GiftEvent, 'id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('gift_events').insert([{ ...event, user_id: user.id }]).select();
    if (error) return;
    setGiftEvents([...giftEvents, data[0]]);
    showSuccess("Gift event added!");
  };

  const updateGiftEvent = async (id: string, updates: Partial<GiftEvent>) => {
    const { error } = await supabase.from('gift_events').update(updates).eq('id', id);
    if (error) return;
    setGiftEvents(giftEvents.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteGiftEvent = async (id: string) => {
    const { error } = await supabase.from('gift_events').delete().eq('id', id);
    if (error) return;
    setGiftEvents(giftEvents.filter(e => e.id !== id));
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    const { error } = await supabase.from('goals').update(updates).eq('id', id);
    if (error) return;
    setGoals(goals.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const addPaystub = async (stub: Omit<Paystub, 'id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('paystubs').insert([{
      user_id: user.id,
      date: stub.date,
      file_name: stub.fileName,
      gross_pay: stub.grossPay,
      net_pay: stub.netPay,
      deductions: stub.deductions
    }]).select();

    if (error) return;
    setPaystubs([data[0], ...paystubs]);
    setBaseMonthlyIncome(stub.netPay * 2);
    showSuccess("Paystub added!");
  };

  const deletePaystub = async (id: string) => {
    const { error } = await supabase.from('paystubs').delete().eq('id', id);
    if (error) return;
    setPaystubs(paystubs.filter(p => p.id !== id));
  };

  const addSchoolPeriod = async (period: Omit<SchoolPeriod, 'id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('school_periods').insert([{
      user_id: user.id,
      start_month: period.startMonth,
      end_month: period.endMonth,
      income_multiplier: period.incomeMultiplier
    }]).select();

    if (error) return;
    setSchoolPeriods([...schoolPeriods, data[0]]);
    showSuccess("School period added!");
  };

  const deleteSchoolPeriod = async (id: string) => {
    const { error } = await supabase.from('school_periods').delete().eq('id', id);
    if (error) return;
    setSchoolPeriods(schoolPeriods.filter(p => p.id !== id));
  };

  const addSubscription = async (sub: Omit<Subscription, 'id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('subscriptions').insert([{
      user_id: user.id,
      name: sub.name,
      amount: sub.amount,
      frequency: sub.frequency,
      next_billing: sub.nextBilling,
      category: sub.category
    }]).select();

    if (error) return;
    setSubscriptions([...subscriptions, data[0]]);
    showSuccess(`${sub.name} added!`);
  };

  const deleteSubscription = async (id: string) => {
    const { error } = await supabase.from('subscriptions').delete().eq('id', id);
    if (error) return;
    setSubscriptions(subscriptions.filter(s => s.id !== id));
  };

  const addDebt = async (debt: Omit<Debt, 'id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('debts').insert([{
      user_id: user.id,
      name: debt.name,
      balance: debt.balance,
      limit: debt.limit,
      apr: debt.apr,
      min_payment: debt.minPayment
    }]).select();

    if (error) return;
    setDebts([...debts, data[0]]);
    showSuccess(`${debt.name} added!`);
  };

  const updateDebt = async (id: string, updates: Partial<Debt>) => {
    const { error } = await supabase.from('debts').update(updates).eq('id', id);
    if (error) return;
    setDebts(debts.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const deleteDebt = async (id: string) => {
    const { error } = await supabase.from('debts').delete().eq('id', id);
    if (error) return;
    setDebts(debts.filter(d => d.id !== id));
    showSuccess("Debt account removed.");
  };

  const addCourse = async (course: Omit<Course, 'id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('courses').insert([{
      user_id: user.id,
      year: course.year,
      semester: course.semester,
      name: course.name,
      total_cost: course.totalCost,
      classes_per_week: course.classesPerWeek,
      weeks: course.weeks,
      has_labs: course.hasLabs,
      has_tutorials: course.hasTutorials
    }]).select();

    if (error) return;
    setCourses([...courses, data[0]]);
  };

  const updateCourse = async (id: string, updates: Partial<Course>) => {
    const { error } = await supabase.from('courses').update(updates).eq('id', id);
    if (error) return;
    setCourses(courses.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const addAccount = async (acc: Omit<Account, 'id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('accounts').insert([{
      user_id: user.id,
      name: acc.name,
      type: acc.type,
      balance: acc.balance,
      last_sync: acc.lastSync,
      status: acc.status
    }]).select();

    if (error) return;
    setAccounts([...accounts, data[0]]);
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
      goals, updateGoal, currentMonthlyIncome, syncContacts: () => showSuccess("Synced!"),
      isLoading
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