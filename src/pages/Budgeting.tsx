"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Save, Info, Wallet, Trash2, PlusCircle } from "lucide-react";
import * as Icons from "lucide-react";
import { useBudget } from "@/context/BudgetContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Budgeting = () => {
  const { buckets, updateBucket, saveBuckets, addBucket, deleteBucket, currentMonthlyIncome, fixedMonthlyBills, subscriptions } = useBudget();
  
  const monthlySubs = subscriptions.reduce((acc, s) => acc + (s.frequency === 'monthly' ? s.amount : s.amount / 12), 0);
  const totalBudgeted = buckets.reduce((acc, b) => acc + b.budgeted, 0);
  const readyToAssign = currentMonthlyIncome - fixedMonthlyBills - monthlySubs - totalBudgeted;

  const funBuckets = buckets.filter(b => !b.isRecurringBill);
  const recurringBuckets = buckets.filter(b => b.isRecurringBill);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Budgeting Command</h1>
          <p className="text-slate-500">Give every dollar a job</p>
        </div>
        <div className="flex gap-2">
          <NewBucketDialog onAdd={addBucket} />
          <Button onClick={saveBuckets} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Save size={18} /> Save Changes
          </Button>
        </div>
      </div>

      <Card className={cn(
        "text-white border-none shadow-xl overflow-hidden relative transition-colors duration-500",
        readyToAssign < 0 ? "bg-red-600" : "bg-indigo-600"
      )}>
        <div className="absolute top-0 right-0 p-8 opacity-10"><Wallet size={100} /></div>
        <CardContent className="p-8">
          <div className="text-sm font-medium uppercase tracking-wider text-indigo-100 mb-1">Ready to Assign</div>
          <div className="text-5xl font-black">${readyToAssign.toLocaleString()}</div>
          <p className="text-indigo-200 text-xs mt-4 flex items-center gap-1">
            <Info size={14} /> {readyToAssign < 0 ? "You have over-allocated your funds!" : "This is your surplus after bills and subscriptions."}
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="fun" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl">
          <TabsTrigger value="fun" className="rounded-xl">Fun Buckets</TabsTrigger>
          <TabsTrigger value="recurring" className="rounded-xl">Recurring Bills</TabsTrigger>
        </TabsList>

        <TabsContent value="fun" className="mt-6 space-y-4">
          <BucketSection buckets={funBuckets} onUpdate={updateBucket} onDelete={deleteBucket} />
        </TabsContent>

        <TabsContent value="recurring" className="mt-6 space-y-4">
          <BucketSection buckets={recurringBuckets} onUpdate={updateBucket} onDelete={deleteBucket} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const BucketSection = ({ buckets, onUpdate, onDelete }: any) => (
  <div className="grid gap-4">
    {buckets.map((bucket: any) => {
      const percentage = bucket.budgeted > 0 ? (bucket.spent / bucket.budgeted) * 100 : 0;
      return (
        <Card key={bucket.id} className="overflow-hidden border-slate-100 dark:border-slate-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl text-white ${bucket.color}`}>
                  {/* @ts-ignore */}
                  {React.createElement(Icons[bucket.icon] || Icons.Package, { size: 24 })}
                </div>
                <div>
                  <div className="font-bold text-lg flex items-center gap-2">
                    {bucket.name}
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-300 hover:text-red-500" onClick={() => onDelete(bucket.id)}>
                      <Trash2 size={12} />
                    </Button>
                  </div>
                  <div className="text-xs text-slate-500">Spent: ${bucket.spent}</div>
                </div>
              </div>
              <div className="flex-1 max-w-xs space-y-2">
                <div className="flex justify-between text-xs font-bold"><span className="text-slate-500 uppercase">Allocation</span><span>{Math.round(percentage)}%</span></div>
                <Progress value={Math.min(percentage, 100)} className="h-2" />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-32">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <Input className="pl-6 text-right font-bold" value={bucket.budgeted} readOnly />
                </div>
                <div className="flex flex-col gap-1">
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onUpdate(bucket.id, 10)}><Plus size={12} /></Button>
                  <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onUpdate(bucket.id, -10)}><Minus size={12} /></Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

const NewBucketDialog = ({ onAdd }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="outline" className="gap-2"><PlusCircle size={18} /> New Bucket</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Create Budget Bucket</DialogTitle></DialogHeader>
        <form onSubmit={(e: any) => {
          e.preventDefault();
          onAdd({
            name: e.target.name.value,
            budgeted: parseFloat(e.target.budget.value),
            icon: e.target.icon.value,
            color: 'bg-indigo-500',
            isRecurringBill: e.target.type.value === 'recurring'
          });
          setOpen(false);
        }} className="space-y-4">
          <div className="space-y-2"><Label>Bucket Name</Label><Input name="name" required /></div>
          <div className="space-y-2"><Label>Initial Budget ($)</Label><Input name="budget" type="number" defaultValue="0" required /></div>
          <div className="space-y-2">
            <Label>Type</Label>
            <select name="type" className="w-full p-2 border rounded-md">
              <option value="fun">Fun / Discretionary</option>
              <option value="recurring">Recurring Bill</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Icon (Lucide Name)</Label>
            <Input name="icon" defaultValue="Package" placeholder="e.g. Coffee, Car, Heart" />
          </div>
          <Button type="submit" className="w-full bg-indigo-600">Create Bucket</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Budgeting;