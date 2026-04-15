"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, TrendingDown, AlertTriangle, ArrowRight, CreditCard } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DebtDestroyer = () => {
  const debts = [
    { id: '1', name: 'ATB Mastercard', balance: 1240.50, limit: 5000, apr: 19.99, minPayment: 35 },
    { id: '2', name: 'Student Loan', balance: 8500.00, limit: 10000, apr: 5.5, minPayment: 120 },
  ];

  const totalDebt = debts.reduce((acc, d) => acc + d.balance, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Debt Destroyer</h1>
          <p className="text-slate-500">Strategic payoff planning & interest tracking</p>
        </div>
        <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-xl text-orange-600 flex items-center gap-2">
          <Flame size={20} />
          <span className="font-bold">Snowball Mode</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900 text-white border-none overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <TrendingDown size={160} />
          </div>
          <CardHeader>
            <CardTitle className="text-slate-400 text-xs uppercase">Total Debt Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${totalDebt.toLocaleString()}</div>
            <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
              <TrendingDown size={16} />
              <span>Down 4.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-100 dark:border-orange-900/30 bg-orange-50/30 dark:bg-orange-900/10">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <AlertTriangle size={16} className="text-orange-500" /> Interest Warning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">$142.50</div>
            <p className="text-xs text-slate-500 mt-1">Estimated interest charges this month across all accounts.</p>
            <Button variant="link" className="p-0 h-auto text-orange-600 text-xs mt-2">See breakdown <ArrowRight size={12} /></Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Debt Accounts</h3>
        <div className="grid gap-4">
          {debts.map((debt) => {
            const utilization = (debt.balance / debt.limit) * 100;
            return (
              <Card key={debt.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600">
                        <CreditCard size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{debt.name}</div>
                        <div className="text-xs text-slate-500">{debt.apr}% APR • Min. Payment: ${debt.minPayment}</div>
                      </div>
                    </div>
                    
                    <div className="flex-1 max-w-md space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-500 uppercase">Utilization</span>
                        <span>{Math.round(utilization)}%</span>
                      </div>
                      <Progress value={utilization} className="h-2" />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>$0</span>
                        <span>Limit: ${debt.limit.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-900 dark:text-white">${debt.balance.toLocaleString()}</div>
                      <Button size="sm" className="mt-2 bg-indigo-600">Make Payment</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DebtDestroyer;