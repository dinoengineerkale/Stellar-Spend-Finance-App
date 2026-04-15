"use client";

import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ListTodo, BarChart3, Wallet, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import AddTransactionDialog from "./AddTransactionDialog";

const MobileNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/' },
    { icon: ListTodo, label: 'Ledger', path: '/transactions' },
    { icon: PlusCircle, label: 'Add', path: '#', primary: true },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Wallet, label: 'Accounts', path: '/accounts' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          if (item.primary) {
            return (
              <AddTransactionDialog 
                key={item.label}
                trigger={
                  <button 
                    className="bg-indigo-600 text-white p-3 rounded-full -mt-10 shadow-lg shadow-indigo-200 dark:shadow-none border-4 border-slate-50 dark:border-slate-950"
                  >
                    <item.icon size={24} />
                  </button>
                }
              />
            );
          }

          return (
            <Link 
              key={item.label} 
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;