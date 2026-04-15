"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Save, Info, Wallet } from "lucide-react";
import * as Icons from "lucide-react";
import { useBudget } from "@/context/BudgetContext";

const Budgeting = () => {
  const { buckets, updateBucket, saveBuckets } = useBudget();
  const readyToAssign = 1815;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Budgeting Command</h1>
          <p className="text-slate-500">Give every dollar a job</p>
        </div>
        <Button onClick={saveBuckets} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <Card className="bg-indigo-600 text-white border-none shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Wallet size={100} /></div>
        <CardContent className="p-8">
          <div className="text-sm font-medium uppercase tracking-wider text-indigo-100 mb-1">Ready to Assign</div>
          <div className="text-5xl font-black">${readyToAssign.toLocaleString()}</div>
          <p className="text-indigo-200 text-xs mt-4 flex items-center gap-1"><Info size={14} /> This is your "In My Pocket" balance after bills.</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold px-1">Budget Buckets</h3>
        <div className="grid gap-4">
          {buckets.map((bucket) => {
            const percentage = (bucket.spent / bucket.budgeted) * 100;
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
                        <div className="font-bold text-lg">{bucket.name}</div>
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
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateBucket(bucket.id, 10)}><Plus size={12} /></Button>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateBucket(bucket.id, -10)}><Minus size={12} /></Button>
                      </div>
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

export default Budgeting;