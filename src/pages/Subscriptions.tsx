"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Plus, RefreshCw, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBudget } from "@/context/BudgetContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Subscriptions = () => {
  const { subscriptions, addSubscription, deleteSubscription } = useBudget();
  const [open, setOpen] = useState(false);

  const monthlyTotal = subscriptions.reduce((acc, sub) => {
    return acc + (sub.frequency === 'monthly' ? sub.amount : sub.amount / 12);
  }, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Subscription Command</h1>
          <p className="text-slate-500">Automated recurring expense tracking</p>
        </div>
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
              <div className="space-y-2"><Label>Category</Label><Input name="category" placeholder="e.g. Entertainment" required /></div>
              <Button type="submit" className="w-full bg-indigo-600">Add Service</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-indigo-600 text-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-indigo-100 text-xs uppercase">Monthly Burn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${monthlyTotal.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-xs uppercase">Active Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">{subscriptions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-xs uppercase">Next Renewal</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Calendar className="text-indigo-600" size={24} />
            <div className="text-xl font-bold">Upcoming</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Subscriptions</h3>
        <div className="grid gap-4">
          {subscriptions.map((sub) => (
            <Card key={sub.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600">
                    <RefreshCw size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{sub.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Badge variant="secondary" className="text-[10px] px-1 py-0">{sub.category}</Badge>
                      <span>• Renews {new Date(sub.nextBilling).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-bold text-lg">${sub.amount.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-400 uppercase">{sub.frequency}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500" onClick={() => deleteSubscription(sub.id)}>
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;