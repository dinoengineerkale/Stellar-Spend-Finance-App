"use client";

import React from 'react';
import InMyPocket from "@/components/InMyPocket";
import BucketList from "@/components/BucketList";
import AddTransactionDialog from "@/components/AddTransactionDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Calendar, 
  Car, 
  GraduationCap,
  Clock,
  Gift,
  RefreshCw,
  BarChart3,
  ListTodo,
  Wallet,
  Flame,
  Plus,
  ArrowRightLeft,
  ChevronRight,
  Tag
} from "lucide-react";
import { Link } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { cn } from "@/lib/utils";
import { useBudget } from "@/context/BudgetContext";

const Index = () => {
  const { buckets, transactions, currentMonthlyIncome, fixedMonthlyBills, giftEvents } = useBudget();

  const totalBudgeted = buckets.reduce((acc, b) => acc + b.budgeted, 0);
  const recentActivity = transactions.slice(0, 3);
  const realHourlyRate = (currentMonthlyIncome - fixedMonthlyBills - totalBudgeted) / 160; // Approx 160 working hours

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 md:pb-12">
      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <InMyPocket income={currentMonthlyIncome} bills={fixedMonthlyBills} budgeted={totalBudgeted} />
          </div>
          <div className="space-y-4">
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm rounded-3xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-500 text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} /> Real Take-Home
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-indigo-600">${Math.max(0, realHourlyRate).toFixed(2)}<span className="text-lg text-slate-400 font-normal">/hr</span></div>
                <p className="text-xs text-slate-500 mt-2">After taxes, bills, and all budget allocations.</p>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-3">
              <AddTransactionDialog 
                trigger={
                  <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2 text-xs h-14 rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-none">
                    <Plus size={16} /> Expense
                  </Button>
                }
              />
              <Link to="/accounts" className="w-full">
                <Button variant="outline" className="w-full gap-2 text-xs h-14 rounded-2xl border-slate-200 dark:border-slate-800">
                  <ArrowRightLeft size={16} /> Transfer
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4">
          <NavButton to="/budgeting" icon={PlusCircleIcon} label="Budget" />
          <NavButton to="/transactions" icon={ListTodo} label="Ledger" />
          <NavButton to="/reports" icon={BarChart3} label="Reports" />
          <NavButton to="/accounts" icon={Wallet} label="Accounts" />
          <NavButton to="/debt-destroyer" icon={Flame} label="Debt" color="text-orange-600" hover="hover:bg-orange-50" />
          <NavButton to="/vehicles" icon={Car} label="Vehicles" />
          <NavButton to="/academy" icon={GraduationCap} label="Academy" />
          <NavButton to="/subscriptions" icon={RefreshCw} label="Subs" />
          <NavButton to="/gift-galaxy" icon={Gift} label="Gifts" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Budget Buckets</h3>
                <Link to="/budgeting" className="text-xs text-indigo-600 flex items-center gap-1 font-bold uppercase tracking-wider">
                  Manage All <ChevronRight size={14} />
                </Link>
              </div>
              <BucketList buckets={buckets} />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white px-1">Recent Activity</h3>
              <div className="grid gap-3">
                {recentActivity.map((item) => (
                  <Card key={item.id} className="p-5 hover:shadow-md transition-all border-none shadow-sm rounded-2xl bg-white dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600">
                          <Tag size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{item.merchant}</div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{item.category} • {new Date(item.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="font-black text-lg text-slate-900 dark:text-white">-${item.amount.toFixed(2)}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="rounded-3xl border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-emerald-600 text-white pb-6">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <TrendingUp size={18} /> Savings Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-3xl font-black text-slate-900 dark:text-white">$12,450</div>
                <div className="text-xs text-slate-500 mb-6">Financial Advisor Envelope</div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
                <div className="flex justify-between mt-3 text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                  <span>Current</span>
                  <span>Goal: $20k</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {giftEvents.slice(0, 2).map(event => (
                  <EventItem 
                    key={event.id}
                    icon={Gift} 
                    label={event.person} 
                    date={new Date(event.date).toLocaleDateString()} 
                    budget={event.budget} 
                    color={event.isBought ? "bg-emerald-100 text-emerald-600" : "bg-pink-100 text-pink-600"} 
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
        <div className="text-center text-slate-400 text-xs font-medium uppercase tracking-widest">
          © {new Date().getFullYear()} Stellar Spend. All rights reserved.
        </div>
        <MadeWithDyad />
      </footer>
    </div>
  );
};

const NavButton = ({ to, icon: Icon, label, color = "text-indigo-600", hover = "hover:bg-indigo-50" }: any) => (
  <Link to={to}>
    <Button variant="outline" className={cn(
      "w-full h-28 flex-col gap-3 bg-white dark:bg-slate-900 border-none shadow-sm hover:shadow-md transition-all rounded-3xl",
      hover, "dark:hover:bg-indigo-900/20"
    )}>
      <Icon className={cn("w-6 h-6", color)} />
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</span>
    </Button>
  </Link>
);

const EventItem = ({ icon: Icon, label, date, budget, color }: any) => (
  <div className="flex items-center gap-4 p-1">
    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", color)}>
      <Icon size={20} />
    </div>
    <div>
      <div className="text-sm font-bold text-slate-900 dark:text-white">{label}</div>
      <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{date} • Budget: ${budget}</div>
    </div>
  </div>
);

const PlusCircleIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>
  </svg>
);

export default Index;