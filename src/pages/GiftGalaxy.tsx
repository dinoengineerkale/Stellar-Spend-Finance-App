"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, UserPlus, Search, Edit2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useBudget } from "@/context/BudgetContext";

const GiftGalaxy = () => {
  const { giftEvents, updateGiftEvent, syncContacts } = useBudget();
  const [search, setSearch] = useState("");

  const filteredEvents = giftEvents.filter(e => e.person.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gift Galaxy</h1>
          <p className="text-slate-500">Social circle event budgeting</p>
        </div>
        <Button onClick={syncContacts} className="gap-2 bg-pink-600 hover:bg-pink-700"><UserPlus size={18} /> Sync Contacts</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input className="pl-10 bg-white dark:bg-slate-900" placeholder="Search people or events..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid gap-6">
        {filteredEvents.map((event) => {
          const progress = (event.saved / event.budget) * 100;
          return (
            <Card key={event.id} className="overflow-hidden border-l-4 border-l-pink-500">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-600"><Heart size={28} /></div>
                    <div>
                      <div className="font-bold text-xl flex items-center gap-2">
                        {event.person}
                        <EditEventDialog event={event} onSave={(updates) => updateGiftEvent(event.id, updates)} />
                      </div>
                      <div className="text-sm text-slate-500 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full border text-[10px]">{event.relationship}</span>
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
                      <div className="flex justify-between text-[10px] font-bold text-slate-500"><span>SAVED: ${event.saved}</span><span>{Math.round(progress)}%</span></div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-pink-500 transition-all duration-500" style={{ width: `${progress}%` }} />
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

const EditEventDialog = ({ event, onSave }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400"><Edit2 size={14} /></Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit Event</DialogTitle></DialogHeader>
        <form onSubmit={(e: any) => {
          e.preventDefault();
          onSave({
            budget: parseFloat(e.target.budget.value),
            saved: parseFloat(e.target.saved.value),
            date: e.target.date.value
          });
          setOpen(false);
        }} className="space-y-4">
          <div className="space-y-2"><Label>Budget Goal ($)</Label><Input name="budget" type="number" defaultValue={event.budget} required /></div>
          <div className="space-y-2"><Label>Amount Saved ($)</Label><Input name="saved" type="number" defaultValue={event.saved} required /></div>
          <div className="space-y-2"><Label>Event Date</Label><Input name="date" type="date" defaultValue={event.date} required /></div>
          <Button type="submit" className="w-full bg-pink-600">Update Event</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GiftGalaxy;