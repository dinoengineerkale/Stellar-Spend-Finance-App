"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, RefreshCw, Trash2, PieChart as PieIcon, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBudget } from "@/context/BudgetContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Subscriptions = () => {
  const { subscriptions, addSubscription, deleteSubscription } = useBudget();
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');

  const totals = useMemo(() => {
    const monthly = subscriptions.reduce((acc, sub) => {
      return acc + (sub.frequency === 'monthly' ? sub.amount : sub.amount / 12);
    }, 0);
    return { monthly, yearly: monthly * 12 };
  }, [subscriptions]);

  const categoryData = useMemo(() => {
    const groups: Record<string, number> = {
      'Necessary': 0,
      'Fitness/Health': 0,
      'Entertainment': 0,
      'Other': 0
    };
    subscriptions.forEach(sub => {
      const amount = viewMode === 'monthly' 
        ? (sub.frequency === 'monthly' ? sub.amount : sub.amount / 12)
        : (sub.frequency === 'yearly' ? sub.amount : sub.amount * 12);
      groups[sub.category] = (groups[sub.category] || 0) + amount;
    });
    return Object.entries(groups).map(([name, value]) => ({ name, value })).filter(d => d.value > 0);
  }, [subscriptions, viewMode]);

  const COLORS = ['#6366f1', '#10b981', '#ec4899', '#f59e0b'];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Subscription Command</h1>
          <p className="text-slate-500">Automated recurring expense tracking</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setViewMode(viewMode === 'monthly' ? 'yearly' : 'monthly')}
            className="gap-2"
          >
            <RefreshCw size={18} /> Show {viewMode === 'monthly' ? 'Yearly' : 'Monthly'}
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus size={18} /> Add Subscription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Subscription</DialogTitle></DialogHeader>
              <form onSubmit={(e: any) => {
                e.preventDefault();
                addSubscription({
                  name: e.target.name.value,
                  amount: parseFloat(e.target.amount.value),
                  frequency: e.target.frequency.value,
                  nextBilling: e.target.date.value,
                  category: e.target.category.value
                });
                setOpen(false);
              }} className="space-y-4">
                <div className="space-y-2"><Label>Service Name</Label><Input name="name" required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Amount ($)</Label><Input name="amount" type="number" step="0.01" required /></div>
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <select name="frequency" className="w-full p-2 border rounded-md">
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2"><Label>Next Billing Date</Label><Input name="date" type="date" required /></div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select name="category" className="w-full p-2 border rounded-md">
                    <option value="Necessary">Necessary</option>
                    <option value="Fitness/Health">Fitness/Health</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <Button type="submit" className="w-full bg-indigo-600">Add Service</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-indigo-600 text-white border-none shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-indigo-100 text-xs uppercase tracking-widest">Total {viewMode} Burn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black">${totals[viewMode].toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-500 text-xs uppercase tracking-widest">Active Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-indigo-600">{subscriptions.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><List size={20} className="text-indigo-600" /> Active Subscriptions</h3>
            <div className="grid gap-4">
              {subscriptions.map((sub) => (
                <Card key={sub.id} className="hover:shadow-md transition-all border-none shadow-sm">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600">
                        <RefreshCw size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{sub.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <Badge variant="secondary" className="text-[10px] px-1 py-0">{sub.category}</Badge>
                          <span>• Renews {new Date(sub.nextBilling).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-black text-lg">${sub.amount.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">{sub.frequency}</div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-slate-300 hover:text-red-500" onClick={() => deleteSubscription(sub.id)}>
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Card className="shadow-lg border-none h-fit sticky top-24">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><PieIcon size={20} className="text-indigo-600" /> Category Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-slate-600 dark:text-slate-400">{entry.name}</span>
                  </div>
                  <span className="font-bold">${entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscriptions;