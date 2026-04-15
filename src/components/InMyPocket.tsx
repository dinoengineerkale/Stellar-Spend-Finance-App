"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface InMyPocketProps {
  income: number;
  bills: number;
  budgeted: number;
}

const InMyPocket = ({ income, bills, budgeted }: InMyPocketProps) => {
  const leftOver = income - bills - budgeted;

  return (
    <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Wallet size={120} />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-indigo-100 text-sm font-medium uppercase tracking-wider">In My Pocket</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-bold mb-4">${leftOver.toLocaleString()}</div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-indigo-200">Monthly Income</span>
            <span className="font-semibold flex items-center gap-1">
              <ArrowUpRight size={14} className="text-green-400" />
              ${income.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-indigo-200">Bills & Budgets</span>
            <span className="font-semibold flex items-center gap-1">
              <ArrowDownRight size={14} className="text-red-400" />
              ${(bills + budgeted).toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InMyPocket;