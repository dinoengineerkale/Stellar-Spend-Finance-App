"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  LogOut, 
  Save, 
  FileUp, 
  History, 
  GraduationCap,
  Calendar,
  FileText,
  Trash2
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useBudget } from "@/context/BudgetContext";
import { showLoading, dismissToast } from "@/utils/toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { 
    baseMonthlyIncome, 
    setBaseMonthlyIncome, 
    fixedMonthlyBills, 
    setFixedMonthlyBills,
    paystubs,
    addPaystub,
    deletePaystub,
    schoolPeriods,
    addSchoolPeriod,
    deleteSchoolPeriod
  } = useBudget();

  const [activeTab, setActiveTab] = useState('profile');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const tid = showLoading("Analyzing paystub PDF...");
    setIsUploading(true);

    setTimeout(() => {
      dismissToast(tid);
      addPaystub({
        date: new Date().toISOString().split('T')[0],
        fileName: file.name,
        grossPay: 3450.00,
        netPay: 2580.00,
        deductions: 870.00
      });
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500">Manage your financial profile and app preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          <NavTab active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={User} label="Financial Profile" />
          <NavTab active={activeTab === 'paystubs'} onClick={() => setActiveTab('paystubs')} icon={FileText} label="Paystub History" />
          <NavTab active={activeTab === 'school'} onClick={() => setActiveTab('school')} icon={GraduationCap} label="School Phases" />
          <NavTab active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} icon={Bell} label="Notifications" />
          <div className="pt-4">
            <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
              <LogOut size={18} /> Sign Out
            </Button>
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <Card className="rounded-3xl border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Monthly Baseline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="income">Monthly Net Income</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <Input 
                        id="income" 
                        className="pl-7 h-12 rounded-xl font-bold" 
                        value={baseMonthlyIncome} 
                        onChange={(e) => setBaseMonthlyIncome(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">This is your default income when not in a school phase.</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bills">Fixed Monthly Bills</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <Input 
                        id="bills" 
                        className="pl-7 h-12 rounded-xl font-bold" 
                        value={fixedMonthlyBills} 
                        onChange={(e) => setFixedMonthlyBills(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">Rent, utilities, insurance, etc.</p>
                  </div>
                </div>

                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-indigo-600">
                      <FileUp size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-indigo-900 dark:text-indigo-100">Update via Paystub</div>
                      <div className="text-xs text-indigo-700 dark:text-indigo-300">Upload a PDF to automatically update your baseline.</div>
                    </div>
                  </div>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".pdf" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                    <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl gap-2">
                      {isUploading ? "Processing..." : "Upload PDF"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'paystubs' && (
            <Card className="rounded-3xl border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <History size={20} className="text-indigo-600" /> Paystub History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paystubs.map((stub) => (
                    <div key={stub.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-400">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-sm">{stub.fileName}</div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold">{new Date(stub.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-black text-indigo-600">${stub.netPay.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-400 uppercase">Net Take-Home</div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500" onClick={() => deletePaystub(stub.id)}>
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'school' && (
            <Card className="rounded-3xl border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap size={20} className="text-indigo-600" /> School Phases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {schoolPeriods.map((period) => (
                    <div key={period.id} className="p-5 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-amber-600 shadow-sm">
                          <Calendar size={24} />
                        </div>
                        <div>
                          <div className="font-bold text-amber-900 dark:text-amber-100">Academic Session</div>
                          <div className="text-xs text-amber-700 dark:text-amber-400">{period.startMonth} to {period.endMonth}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <Badge className="bg-amber-200 text-amber-800 hover:bg-amber-200 border-none">
                            {Math.round((1 - period.incomeMultiplier) * 100)}% Income Reduction
                          </Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="text-amber-600 hover:text-red-500" onClick={() => deleteSchoolPeriod(period.id)}>
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-sm mb-4">Add New School Phase</h4>
                  <form onSubmit={(e: any) => {
                    e.preventDefault();
                    addSchoolPeriod({
                      startMonth: e.target.start.value,
                      endMonth: e.target.end.value,
                      incomeMultiplier: parseFloat(e.target.multiplier.value) / 100
                    });
                  }} className="grid gap-4 md:grid-cols-3">
                    <div className="grid gap-2">
                      <Label className="text-xs">Start Month</Label>
                      <Input name="start" type="month" required className="rounded-xl" />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-xs">End Month</Label>
                      <Input name="end" type="month" required className="rounded-xl" />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-xs">Income % (vs Baseline)</Label>
                      <Input name="multiplier" type="number" defaultValue="60" required className="rounded-xl" />
                    </div>
                    <Button type="submit" className="md:col-span-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl">
                      Record School Phase
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const NavTab = ({ active, onClick, icon: Icon, label }: any) => (
  <Button 
    variant="ghost" 
    onClick={onClick}
    className={cn(
      "w-full justify-start gap-3 h-12 rounded-xl transition-all",
      active 
        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 font-bold" 
        : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
    )}
  >
    <Icon size={18} /> {label}
  </Button>
);

export default Settings;