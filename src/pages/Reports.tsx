"use client";

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { useBudget } from "@/context/BudgetContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports = () => {
  const { transactions, buckets, subscriptions, currentMonthlyIncome } = useBudget();
  const [activeYear, setActiveYear] = useState(new Date().getFullYear().toString());

  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map((m, i) => {
      const monthTransactions = transactions.filter(tx => {
        const d = new Date(tx.date);
        return d.getMonth() === i && d.getFullYear().toString() === activeYear;
      });
      
      const spending = monthTransactions.reduce((acc, tx) => acc + tx.amount, 0);
      const subs = subscriptions.reduce((acc, s) => {
        const monthly = s.frequency === 'monthly' ? s.amount : s.amount / 12;
        return acc + monthly;
      }, 0);
      
      const totalOut = spending + subs;
      const saving = Math.max(0, currentMonthlyIncome - totalOut);
      
      return {
        name: m,
        spending: totalOut,
        saving: saving,
        income: currentMonthlyIncome
      };
    });
    return data;
  }, [transactions, subscriptions, currentMonthlyIncome, activeYear]);

  const categoryData = useMemo(() => {
    const data = buckets.map(b => ({ name: b.name, value: b.spent }));
    const subsTotal = subscriptions.reduce((acc, s) => acc + (s.frequency === 'monthly' ? s.amount : s.amount / 12), 0);
    if (subsTotal > 0) data.push({ name: 'Subscriptions', value: subsTotal });
    return data.filter(d => d.value > 0);
  }, [buckets, subscriptions]);

  const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#64748b', '#8b5cf6'];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Stellar Reports</h1>
          <p className="text-slate-500">Historical financial performance & analytics</p>
        </div>
        <Tabs defaultValue={activeYear} onValueChange={setActiveYear}>
          <TabsList className="bg-slate-100 dark:bg-slate-900 rounded-xl">
            <TabsTrigger value="2023" className="rounded-lg">2023</TabsTrigger>
            <TabsTrigger value="2024" className="rounded-lg">2024</TabsTrigger>
            <TabsTrigger value="2025" className="rounded-lg">2025</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-lg">Spending vs. Saving History</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSaving" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="spending" stroke="#ef4444" fillOpacity={1} fill="url(#colorSpending)" strokeWidth={3} />
                <Area type="monotone" dataKey="saving" stroke="#10b981" fillOpacity={1} fill="url(#colorSaving)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-lg">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="250">
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
            <div className="grid grid-cols-1 gap-2 text-xs w-full mt-6">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-slate-500">{entry.name}</span>
                  </div>
                  <span className="font-bold">${entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-lg">Monthly Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="spending" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saving" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;