"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, UserPlus, Search, Edit2, Trash2, CheckCircle2, RefreshCw, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useBudget } from "@/context/BudgetContext";
import { cn } from "@/lib/utils";

const GiftGalaxy = () => {
  const { giftEvents, updateGiftEvent, deleteGiftEvent, addGiftEvent, syncContacts } = useBudget();
  const [search, setSearch] = useState("");

  const filteredEvents = giftEvents.filter(e => e.person.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gift Galaxy</h1>
          <p className="text-slate-500">Social circle event budgeting</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={syncContacts} variant="outline" className="gap-2"><UserPlus size={18} /> Sync</Button>
          <NewGiftDialog onAdd={addGiftEvent} />
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input className="pl-10 bg-white dark:bg-slate-900" placeholder="Search people or events..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid gap-6">
        {filteredEvents.map((event) => {
          const progress = (event.saved / event.budget) * 100;
          return (
            <Card key={event.id} className={cn(
              "overflow-hidden border-l-4 transition-all",
              event.isBought ? "border-l-emerald-500 opacity-75" : "border-l-pink-500"
            )}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => updateGiftEvent(event.id, { isBought: !event.isBought })}
                      className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center transition-colors",
                        event.isBought ? "bg-emerald-50 text-emerald-600" : "bg-pink-50 text-pink-600"
                      )}
                    >
                      {event.isBought ? <CheckCircle2 size={28} /> : <Heart size={28} />}
                    </button>
                    <div>
                      <div className={cn(
                        "font-bold text-xl flex items-center gap-2",
                        event.isBought && "line-through text-slate-400"
                      )}>
                        {event.person}
                        {event.isYearly && <RefreshCw size={14} className="text-slate-400" />}
                        <div className="flex gap-1">
                          <EditEventDialog event={event} onSave={(updates) => updateGiftEvent(event.id, updates)} />
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-red-500" onClick={() => deleteGiftEvent(event.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-slate-500 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full border text-[10px]">{event.relationship}</span>
                          <span>• {event.type} on {new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        {event.description && (
                          <p className="text-xs italic text-slate-400">"{event.description}"</p>
                        )}
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
                        <div className={cn(
                          "h-full transition-all duration-500",
                          event.isBought ? "bg-emerald-500" : "bg-pink-500"
                        )} style={{ width: `${progress}%` }} />
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

const NewGiftDialog = ({ onAdd }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button className="gap-2 bg-pink-600"><Plus size={18} /> New Event</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Gift Event</DialogTitle></DialogHeader>
        <form onSubmit={(e: any) => {
          e.preventDefault();
          onAdd({
            person: e.target.person.value,
            relationship: e.target.relationship.value,
            budget: parseFloat(e.target.budget.value),
            saved: 0,
            date: e.target.date.value,
            type: e.target.type.value,
            description: e.target.description.value,
            isYearly: e.target.yearly.checked,
            isBought: false
          });
          setOpen(false);
        }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Person</Label><Input name="person" required /></div>
            <div className="space-y-2"><Label>Relationship</Label><Input name="relationship" required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Event Type</Label><Input name="type" placeholder="Birthday, Wedding..." required /></div>
            <div className="space-y-2"><Label>Budget Goal ($)</Label><Input name="budget" type="number" required /></div>
          </div>
          <div className="space-y-2"><Label>Event Date</Label><Input name="date" type="date" required /></div>
          <div className="space-y-2"><Label>Gift Idea</Label><Textarea name="description" /></div>
          <div className="flex items-center justify-between">
            <Label>Yearly Recurring</Label>
            <Switch name="yearly" />
          </div>
          <Button type="submit" className="w-full bg-pink-600">Add to Galaxy</Button>
        </form>
      </DialogContent>
    </Dialog>
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
            person: e.target.person.value,
            relationship: e.target.relationship.value,
            budget: parseFloat(e.target.budget.value),
            saved: parseFloat(e.target.saved.value),
            date: e.target.date.value,
            description: e.target.description.value,
            isYearly: e.target.yearly.checked
          });
          setOpen(false);
        }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Person</Label><Input name="person" defaultValue={event.person} required /></div>
            <div className="space-y-2"><Label>Relationship</Label><Input name="relationship" defaultValue={event.relationship} required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Budget Goal ($)</Label><Input name="budget" type="number" defaultValue={event.budget} required /></div>
            <div className="space-y-2"><Label>Amount Saved ($)</Label><Input name="saved" type="number" defaultValue={event.saved} required /></div>
          </div>
          <div className="space-y-2"><Label>Event Date</Label><Input name="date" type="date" defaultValue={event.date} required /></div>
          <div className="space-y-2"><Label>Gift Idea</Label><Textarea name="description" defaultValue={event.description} /></div>
          <div className="flex items-center justify-between">
            <Label>Yearly Recurring</Label>
            <Switch name="yearly" defaultChecked={event.isYearly} />
          </div>
          <Button type="submit" className="w-full bg-pink-600">Update Event</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GiftGalaxy;