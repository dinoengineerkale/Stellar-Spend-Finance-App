"use client";

import React from 'react';
import InMyPocket from "@/components/InMyPocket";
import BucketList from "@/components/BucketList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
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
  Settings as SettingsIcon,
  ChevronRight,
  Tag
} from "lucide-react";
import { Link } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const buckets = [
    { id: '1', name: 'Clothes', budgeted: 200, spent: 145, icon: 'Shirt' },
    { id: '2', name: 'Eating Out', budgeted: 400, spent: 380, icon: 'Utensils' },
    { id: '3', name: 'Tithing', budgeted: 500, spent: 500, icon: 'Heart' },
    { id: '4', name: 'Phone Bill', budgeted: 85, spent: 85, icon: 'Smartphone' },
    { id: '5', name: 'Savings (Advisor)', budgeted: 1000, spent: 0, icon: 'TrendingUp' },
  ];

  const recentActivity = [
    { id: '1', merchant: 'Starbucks', amount: 6.50, category: 'Eating Out', date: 'Today' },
    { id: '2', merchant: 'Shell Gas', amount: 85.00, category: 'Car Vault', date: 'Yesterday' },
    { id: '3', merchant: 'Netflix', amount: 19.99, category: 'Subs', date: 'May 23' },
  ];

  const realHourlyRate = 32.50;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 md:pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white">
              <Rocket size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Stellar Spend</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <Link to="/" className="text-indigo-600">Dashboard</Link>
            <Link to="/budgeting" className="hover:text-indigo-600">Budgeting</Link>
            <Link to="/transactions" className="hover:text-indigo-600">Ledger</Link>
            <Link to="/reports" className="hover:text-indigo-600">Reports</Link>
            <Link to="/accounts" className="hover:text-indigo-600">Accounts</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/settings">
              <Button variant="ghost" size="icon" className="rounded-full">
                <SettingsIcon size={20} />
              </Button>
            </Link>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              K
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <InMyPocket income={5200} bills={1200} budgeted={2185} />
          </div>
          <div className="space-y-4">
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-500 text-xs uppercase flex items-center gap-2">
                  <Clock size={14} /> Real Take-Home
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-indigo-600">${realHourlyRate.toFixed(2)}<span className="text-lg text-slate-400 font-normal">/hr</span></div>
                <p className="text-xs text-slate-500 mt-2">After taxes, bills, and mandatory savings.</p>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2 text-xs h-12">
                <Plus size={16} /> Expense
              </Button>
              <Button variant="outline" className="gap-2 text-xs h-12">
                <ArrowRightLeft size={16} /> Transfer
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4">
          <Link to="/budgeting">
            <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              <PlusCircleIcon className="text-indigo-600" />
              <span className="text-[10px] font-bold uppercase">Budget</span>
            </Button>
          </Link>
          <Link to="/transactions">
            <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              <ListTodo className="text-indigo-600" />
              <span className="text-[10px] font-bold uppercase">Ledger</span>
            </Button>
          </Link>
          <Link to="/reports">
            <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              <BarChart3 className="text-indigo-600" />
              <span className="text-[10px] font-bold uppercase">Reports</span>
            </Button>
          </Link>
          <Link to="/accounts">
            <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              <Wallet className="text-indigo-600" />
              <span className="text-[10px] font-bold uppercase">Accounts</span>
            </Button>
          </Link>
          <Link to="/debt-destroyer">
            <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-orange-50 dark:hover:bg-orange-900/20">
              <Flame className="text-orange-600" />
              <span className="text-[10px] font-bold uppercase">Debt</span>
            </Button>
          </Link>
          <Link to="/car-vault">
            <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              <Car className="text-indigo-600" />
              <span className="text-[10px] font-bold uppercase">Car</span>
            </Button>
          </Link>
          <Link to="/academy">
            <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              <GraduationCap className="text-indigo-600" />
              <span className="text-[10px] font-bold uppercase">Academy</span>
            </Button>
          </Link>
          <Link to="/subscriptions">
            <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              <RefreshCw className="text-indigo-600" />
              <span className="text-[10px] font-bold uppercase">Subs</span>
            </Button>
          </Link>
          <Link to="/gift-galaxy">
            <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              <Gift className="text-indigo-600" />
              <span className="text-[10px] font-bold uppercase">Gifts</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-lg font-semibold">Budget Buckets</h3>
              <Link to="/budgeting" className="text-xs text-indigo-600 flex items-center gap-1 font-medium">
                Manage All <ChevronRight size={14} />
              </Link>
            </div>
            <BucketList buckets={buckets} />
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold px-1">Recent Activity</h3>
              <div className="grid gap-3">
                {recentActivity.map((item) => (
                  <Card key={item.id} className="p-4 hover:shadow-sm transition-shadow border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-600">
                          <Tag size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-sm">{item.merchant}</div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold">{item.category} • {item.date}</div>
                        </div>
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white">-${item.amount.toFixed(2)}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-500" /> Savings Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <div className="text-xs text-slate-500 mb-4">Financial Advisor Envelope</div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[65%]"></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-medium uppercase text-slate-400">
                  <span>Current</span>
                  <span>Goal: $20k</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                    <Gift size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Mom's Birthday</div>
                    <div className="text-xs text-slate-500">Sept 14 • Budget: $150</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Best Friend's Wedding</div>
                    <div className="text-xs text-slate-500">Oct 02 • Budget: $300</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="text-center text-slate-400 text-xs">
          © {new Date().getFullYear()} Kale. All rights reserved.
        </div>
        <MadeWithDyad />
      </footer>
    </div>
  );
};

const PlusCircleIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>
  </svg>
);

export default Index;