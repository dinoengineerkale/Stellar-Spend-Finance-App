"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, TrendingDown, TrendingUp, AlertTriangle, ArrowRight, CreditCard, Plus, Edit2, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useBudget } from "@/context/BudgetContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DebtDestroyer = () => {
  const { debts, addDebt, updateDebt, deleteDebt } = useBudget();
  const [open, setOpen] = useState(false);

  const totalDebt = debts.reduce((acc, d) => acc + d.balance, 0);
  const totalInterest = debts.reduce((acc, d) => acc + (d.balance * (d.apr / 100) / 12), 0);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Debt Destroyer</h1>
          <p className="text-slate-500">Strategic payoff planning & interest tracking</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-indigo-600"><Plus size={18} /> Add Debt</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Debt Account</DialogTitle></DialogHeader>
              <form onSubmit={(e: any) => {
                e.preventDefault();
                addDebt({
                  name: e.target.name.value,
                  balance: parseFloat(e.target.balance.value),
                  limit: parseFloat(e.target.limit.value),
                  apr: parseFloat(e.target.apr.value),
                  minPayment: parseFloat(e.target.min.value)
                });
                setOpen(false);
              }} className="space-y-4">
                <div className="space-y-2"><Label>Account Name</Label><Input name="name" required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Balance ($)</Label><Input name="balance" type="number" step="0.01" required /></div>
                  <div className="space-y-2"><Label>Limit ($)</Label><Input name="limit" type="number" step="0.01" required /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>APR (%)</Label><Input name="apr" type="number" step="0.01" required /></div>
                  <div className="space-y-2"><Label>Min Payment ($)</Label><Input name="min" type="number" step="0.01" required /></div>
                </div>
                <Button type="submit" className="w-full bg-indigo-600">Add Account</Button>
              </form>
            </DialogContent>
          </Dialog>
          <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-xl text-orange-600 flex items-center gap-2">
            <Flame size={20} />
            <span className="font-bold">Snowball Mode</span>
          </div>
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
              <TrendingUp size={16} className="rotate-180" />
              <span>Tracking payoff progress</span>
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
            <div className="text-2xl font-bold text-orange-600">${totalInterest.toFixed(2)}</div>
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
                        <div className="font-bold text-lg flex items-center gap-2">
                          {debt.name}
                          <EditDebtDialog debt={debt} onSave={(updates) => updateDebt(debt.id, updates)} />
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-300 hover:text-red-500" onClick={() => deleteDebt(debt.id)}>
                            <Trash2 size={12} />
                          </Button>
                        </div>
                        <div className="text-xs text-slate-500">{debt.apr}% APR • Min. Payment: ${debt.minPayment}</div>
                      </div>
                    </div>
                    
                    <div className="flex-1 max-md:w-full space-y-2">
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

const EditDebtDialog = ({ debt, onSave }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400"><Edit2 size={12} /></Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit Debt Account</DialogTitle></DialogHeader>
        <form onSubmit={(e: any) => {
          e.preventDefault();
          onSave({
            name: e.target.name.value,
            balance: parseFloat(e.target.balance.value),
            limit: parseFloat(e.target.limit.value),
            apr: parseFloat(e.target.apr.value),
            minPayment: parseFloat(e.target.min.value)
          });
          setOpen(false);
        }} className="space-y-4">
          <div className="space-y-2"><Label>Account Name</Label><Input name="name" defaultValue={debt.name} required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Balance ($)</Label><Input name="balance" type="number" step="0.01" defaultValue={debt.balance} required /></div>
            <div className="space-y-2"><Label>Limit ($)</Label><Input name="limit" type="number" step="0.01" defaultValue={debt.limit} required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>APR (%)</Label><Input name="apr" type="number" step="0.01" defaultValue={debt.apr} required /></div>
            <div className="space-y-2"><Label>Min Payment ($)</Label><Input name="min" type="number" step="0.01" defaultValue={debt.minPayment} required /></div>
          </div>
          <Button type="submit" className="w-full bg-indigo-600">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DebtDestroyer;