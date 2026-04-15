"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowDownLeft, ArrowUpRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBudget } from "@/context/BudgetContext";

const Transactions = () => {
  const { transactions } = useBudget();
  const [search, setSearch] = React.useState("");

  const filtered = transactions.filter(tx => 
    tx.merchant.toLowerCase().includes(search.toLowerCase()) || 
    tx.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Transaction Ledger</h1>
          <p className="text-slate-500">Real-time spending line items</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input className="pl-10" placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="outline" size="icon"><Filter size={18} /></Button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((tx) => (
          <Card key={tx.id} className="hover:shadow-sm transition-shadow border-slate-100 dark:border-slate-800">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 100 ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'}`}>
                  {tx.amount > 0 ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{tx.merchant}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{new Date(tx.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Tag size={10} /> {tx.category}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">${tx.amount.toFixed(2)}</div>
                <Badge variant={tx.status === 'pending' ? 'outline' : 'secondary'} className="text-[10px] uppercase px-1 py-0">{tx.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Transactions;