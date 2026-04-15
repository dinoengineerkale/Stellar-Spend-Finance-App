"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Landmark, Plus, ShieldCheck, RefreshCw, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBudget } from "@/context/BudgetContext";

const Accounts = () => {
  const { accounts, addAccount } = useBudget();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Account Command</h1>
          <p className="text-slate-500">Secure bank & credit card integrations</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gap-2 bg-indigo-600"><Plus size={18} /> Link New Account</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Link Financial Account</DialogTitle></DialogHeader>
            <form onSubmit={(e: any) => {
              e.preventDefault();
              addAccount({
                name: e.target.name.value,
                type: e.target.type.value,
                balance: parseFloat(e.target.balance.value),
                lastSync: 'Just now',
                status: 'connected'
              });
              setOpen(false);
            }} className="space-y-4">
              <div className="space-y-2"><Label>Institution Name</Label><Input name="name" placeholder="e.g. RBC, TD Bank" required /></div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <select name="type" className="w-full p-2 border rounded-md">
                  <option value="Checking">Checking</option>
                  <option value="Savings">Savings</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Investment">Investment</option>
                </select>
              </div>
              <div className="space-y-2"><Label>Current Balance</Label><Input name="balance" type="number" step="0.01" required /></div>
              <Button type="submit" className="w-full bg-indigo-600">Securely Link Account</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 flex items-center gap-4">
        <div className="p-2 bg-white dark:bg-slate-900 rounded-lg text-indigo-600"><ShieldCheck size={24} /></div>
        <div className="flex-1">
          <div className="text-sm font-bold text-indigo-900 dark:text-indigo-100">Bank-Grade Security</div>
          <div className="text-xs text-indigo-700 dark:text-indigo-300">Your data is encrypted using 256-bit AES and protected by open-banking standards.</div>
        </div>
      </div>

      <div className="grid gap-4">
        {accounts.map((acc) => (
          <Card key={acc.id} className="overflow-hidden">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600">
                  {acc.type === 'Credit Card' ? <CreditCard size={24} /> : <Landmark size={24} />}
                </div>
                <div>
                  <div className="font-bold text-lg">{acc.name}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-2"><Badge variant="outline" className="text-[10px]">{acc.type}</Badge><span>• Last synced {acc.lastSync}</span></div>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-8">
                <div className="text-right">
                  <div className={`text-2xl font-black ${acc.balance < 0 ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>${Math.abs(acc.balance).toLocaleString()}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Current Balance</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600"><RefreshCw size={18} /></Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600"><ExternalLink size={18} /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Accounts;