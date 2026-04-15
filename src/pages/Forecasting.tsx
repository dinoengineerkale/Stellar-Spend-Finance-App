"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, TrendingUp, AlertCircle, Calendar, DollarSign } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useBudget } from "@/context/BudgetContext";

const Forecasting = () => {
  const { paystubs, schoolPeriods, baseMonthlyIncome } = useBudget();
  
  const latestStub = paystubs[0];
  const activeSchoolPeriod = schoolPeriods[0]; // Simplified for UI

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Stellar Forecast</h1>
          <p className="text-slate-500">Income projection & school planning</p>
        </div>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl">
          <FileUp size={18} /> Import Paystub PDF
        </Button>
      </div>

      {activeSchoolPeriod && (
        <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400 rounded-2xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold">Upcoming School Period</AlertTitle>
          <AlertDescription>
            You've marked {activeSchoolPeriod.startMonth} - {activeSchoolPeriod.endMonth} as a school period. Income projections have been adjusted to {activeSchoolPeriod.incomeMultiplier * 100}% of baseline.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-3xl border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign size={20} className="text-green-600" /> Latest Paystub Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {latestStub ? (
              <div className="p-4 border rounded-2xl bg-slate-50 dark:bg-slate-900/50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gross Pay</span>
                  <span className="font-bold">${latestStub.grossPay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-red-500">
                  <span>Taxes & Deductions</span>
                  <span>-${latestStub.deductions.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t flex justify-between font-bold text-lg">
                  <span>Net Take-Home</span>
                  <span className="text-indigo-600">${latestStub.netPay.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 italic text-sm">No paystubs uploaded yet.</div>
            )}
            <p className="text-[10px] text-slate-400 italic">Data extracted from "{latestStub?.fileName || 'N/A'}"</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-600" /> Future Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
              <Calendar className="text-indigo-600" />
              <div>
                <div className="text-sm font-bold">Baseline Income</div>
                <div className="text-xs text-slate-500">${baseMonthlyIncome.toLocaleString()} / month</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Est. School Phase Income</span>
                <span className="font-bold">${(baseMonthlyIncome * (activeSchoolPeriod?.incomeMultiplier || 1)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Est. Monthly Surplus</span>
                <span className="font-bold text-green-600">+$1,200.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-12 border-dashed border-2 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 bg-white dark:bg-slate-900/50">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
          <FileUp size={32} />
        </div>
        <div>
          <h3 className="font-bold text-lg">Drop Paystub Here</h3>
          <p className="text-sm text-slate-500 max-w-xs">We'll automatically extract your earnings, taxes, and deductions for future forecasting.</p>
        </div>
        <Button variant="outline" className="rounded-xl">Select File</Button>
      </Card>
    </div>
  );
};

export default Forecasting;