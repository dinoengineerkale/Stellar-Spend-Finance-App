"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, DollarSign, Tag, Calendar as CalendarIcon } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface AddTransactionDialogProps {
  trigger?: React.ReactNode;
}

const AddTransactionDialog = ({ trigger }: AddTransactionDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Transaction recorded in Stellar Ledger!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
            <Plus size={18} /> Add Expense
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">New Transaction</DialogTitle>
          <DialogDescription>
            Record a new spending item to your Stellar Ledger.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input id="amount" placeholder="0.00" className="pl-10 text-lg font-bold" type="number" step="0.01" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="merchant">Merchant / Description</Label>
            <Input id="merchant" placeholder="e.g. Starbucks, Amazon" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select defaultValue="eating-out">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eating-out">Eating Out</SelectItem>
                  <SelectItem value="vehicles">Vehicles</SelectItem>
                  <SelectItem value="academy">Academy</SelectItem>
                  <SelectItem value="subscriptions">Subscriptions</SelectItem>
                  <SelectItem value="tithing">Tithing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Account</Label>
              <Select defaultValue="checking">
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">ATB Checking</SelectItem>
                  <SelectItem value="credit">ATB Mastercard</SelectItem>
                  <SelectItem value="savings">Wealthsimple</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-lg font-bold">
              Record Expense
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;