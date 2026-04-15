"use client";

import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Bucket } from "@/types/budget";
import * as Icons from "lucide-react";

interface BucketListProps {
  buckets: Bucket[];
}

const BucketList = ({ buckets }: BucketListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white px-1">Budget Buckets</h3>
      <div className="grid gap-3">
        {buckets.map((bucket) => {
          const percentage = (bucket.spent / bucket.budgeted) * 100;
          const remaining = bucket.budgeted - bucket.spent;
          
          return (
            <Card key={bucket.id} className="p-4 hover:shadow-md transition-shadow border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                    {/* @ts-ignore */}
                    {React.createElement(Icons[bucket.icon] || Icons.Package, { size: 20 })}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">{bucket.name}</div>
                    <div className="text-xs text-slate-500">${bucket.spent} of ${bucket.budgeted}</div>
                  </div>
                </div>
                <div className={`text-sm font-bold ${remaining < 0 ? 'text-red-500' : 'text-green-600'}`}>
                  ${remaining.toLocaleString()} left
                </div>
              </div>
              <Progress value={Math.min(percentage, 100)} className="h-2" />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BucketList;