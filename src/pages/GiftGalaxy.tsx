"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Calendar, UserPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const GiftGalaxy = () => {
  const events = [
    { id: '1', person: 'Mom', relationship: 'Family', date: '2024-09-14', type: 'Birthday', budget: 150, saved: 120 },
    { id: '2', person: 'Best Friend', relationship: 'Friend', date: '2024-10-02', type: 'Wedding', budget: 300, saved: 50 },
    { id: '3', person: 'Dad', relationship: 'Family', date: '2024-06-16', type: 'Fathers Day', budget: 100, saved: 100 },
    { id: '4', person: 'Boyfriend', relationship: 'Partner', date: '2024-12-25', type: 'Holiday', budget: 500, saved: 200 },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gift Galaxy</h1>
          <p className="text-slate-500">Social circle event budgeting</p>
        </div>
        <Button className="gap-2 bg-pink-600 hover:bg-pink-700">
          <UserPlus size={18} /> Sync Contacts
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input className="pl-10 bg-white dark:bg-slate-900" placeholder="Search people or events..." />
      </div>

      <div className="grid gap-6">
        {events.map((event) => {
          const progress = (event.saved / event.budget) * 100;
          return (
            <Card key={event.id} className="overflow-hidden border-l-4 border-l-pink-500">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-600">
                      <Heart size={28} />
                    </div>
                    <div>
                      <div className="font-bold text-xl">{event.person}</div>
                      <div className="text-sm text-slate-500 flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">{event.relationship}</Badge>
                        <span>• {event.type} on {new Date(event.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <div className="text-xs text-slate-400 uppercase font-bold">Budget Goal</div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">${event.budget}</div>
                    </div>
                    <div className="w-full md:w-48 space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>SAVED: ${event.saved}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-pink-500 transition-all duration-500" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
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

const Badge = ({ children, variant, className }: any) => (
  <span className={`px-2 py-0.5 rounded-full border ${className}`}>
    {children}
  </span>
);

export default GiftGalaxy;