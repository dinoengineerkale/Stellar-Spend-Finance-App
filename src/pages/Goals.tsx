"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Shield, Target, Plus, Edit2, Trash2 } from "lucide-react";
import * as Icons from "lucide-react";
import { useBudget } from "@/context/BudgetContext";
import { showSuccess } from "@/utils/toast";
import { cn } from "@/lib/utils";

const Goals = () => {
  const { goals, updateGoal } = useBudget();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Financial Goals</h1>
          <p className="text-slate-500">Track your long-term wealth building</p>
        </div>
        <Button className="gap-2 bg-indigo-600"><Plus size={18} /> New Goal</Button>
      </div>

      <div className="grid gap-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <Card key={goal.id} className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className={cn("p-4 rounded-2xl text-white shadow-lg", goal.color)}>
                      {/* @ts-ignore */}
                      {React.createElement(Icons[goal.icon] || Icons.Target, { size: 32 })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{goal.name}</h3>
                      <div className="text-slate-500 flex items-center gap-2 mt-1">
                        <Target size={14} /> Target: ${goal.target.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 max-w-md space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Current Balance</div>
                        <div className="text-3xl font-black text-indigo-600">${goal.current.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Progress</div>
                        <div className="text-xl font-bold">{Math.round(progress)}%</div>
                      </div>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <EditGoalDialog goal={goal} onSave={(updates) => updateGoal(goal.id, updates)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const EditGoalDialog = ({ goal, onSave }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}><Edit2 size={16} /></Button>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader><CardTitle>Edit Goal</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={(e: any) => {
                e.preventDefault();
                onSave({
                  name: e.target.name.value,
                  current: parseFloat(e.target.current.value),
                  target: parseFloat(e.target.target.value)
                });
                setOpen(false);
                showSuccess("Goal updated!");
              }} className="space-y-4">
                <div className="space-y-2"><Label>Goal Name</Label><Input name="name" defaultValue={goal.name} required /></div>
                <div className="space-y-2"><Label>Current Amount</Label><Input name="current" type="number" defaultValue={goal.current} required /></div>
                <div className="space-y-2"><Label>Target Amount</Label><Input name="target" type="number" defaultValue={goal.target} required /></div>
                <div className="flex gap-2 pt-4">
                  <Button type="button" variant="ghost" className="flex-1" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1 bg-indigo-600">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Goals;