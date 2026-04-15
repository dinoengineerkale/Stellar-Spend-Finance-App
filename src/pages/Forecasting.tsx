"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, TrendingUp, AlertCircle, Calendar, DollarSign } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Forecasting = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Stellar Forecast</h1>
          <p className="text-slate-500">Income projection & school planning</p>
        </div>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <FileUp size={18} /> Import Paystub PDF
        </Button>
      </div>

      <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Upcoming School Period</AlertTitle>
        <AlertDescription>
          You've marked Sept 2026 - April 2027 as a school period. Income projections have been adjusted for reduced working hours.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign size={20} className="text-green-600" /> Paystub Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-900/50 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Gross Pay (Bi-weekly)</span>
                <span className="font-bold">$3,200.00</span>
              </div>
              <div className="flex justify-between text-sm text-red-500">
                <span>Taxes & Deductions</span>
                <span>-$850.00</span>
              </div>
              <div className="pt-2 border-t flex justify-between font-bold text-lg">
                <span>Net Take-Home</span>
                <span className="text-indigo-600">$2,350.00</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 italic">Data extracted from "Pay Summary" table in your last upload.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-600" /> 2026-2027 Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <Calendar className="text-indigo-600" />
              <div>
                <div className="text-sm font-bold">School Phase</div>
                <div className="text-xs text-slate-500">Sept 2026 - April 2027</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Est. Monthly Income</span>
                <span className="font-bold">$1,800.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Est. School Costs</span>
                <span className="font-bold text-red-500">-$900.00</span>
              </div>
              <div className="pt-2 border-t flex justify-between font-bold">
                <span>Projected Surplus</span>
                <span className="text-green-600">$900.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-8 border-dashed border-2 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
          <FileUp size={32} />
        </div>
        <div>
          <h3 className="font-bold text-lg">Drop Paystub Here</h3>
          <p className="text-sm text-slate-500 max-w-xs">We'll automatically extract your earnings, taxes, and deductions for future forecasting.</p>
        </div>
        <Button variant="outline">Select File</Button>
      </Card>
    </div>
  );
};

export default Forecasting;