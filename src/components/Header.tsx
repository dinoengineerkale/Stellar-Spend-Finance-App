"use client";

import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Rocket, Settings as SettingsIcon, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Budget', path: '/budgeting' },
    { label: 'Ledger', path: '/transactions' },
    { label: 'Reports', path: '/reports' },
    { label: 'Accounts', path: '/accounts' },
    { label: 'Debt', path: '/debt-destroyer' },
    { label: 'Vehicles', path: '/vehicles' },
    { label: 'Academy', path: '/academy' },
    { label: 'Subs', path: '/subscriptions' },
    { label: 'Gifts', path: '/gift-galaxy' },
  ];

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
            <Rocket size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Stellar Spend</h1>
        </Link>
        
        <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "px-3 py-2 rounded-lg transition-colors",
                location.pathname === item.path 
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30" 
                  : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/goals">
            <Button variant="ghost" size="icon" className="rounded-full text-indigo-600">
              <Target size={20} />
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <SettingsIcon size={20} />
            </Button>
          </Link>
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 dark:shadow-none">
            K
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;