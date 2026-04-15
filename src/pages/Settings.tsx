"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Bell, Shield, CreditCard, LogOut, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500">Manage your financial profile and app preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20">
            <User size={18} /> Financial Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500">
            <Bell size={18} /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500">
            <Shield size={18} /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500">
            <CreditCard size={18} /> Subscription
          </Button>
          <div className="pt-4">
            <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
              <LogOut size={18} /> Sign Out
            </Button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Baseline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="income">Monthly Net Income</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <Input id="income" className="pl-7" defaultValue="5200" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bills">Fixed Monthly Bills</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <Input id="bills" className="pl-7" defaultValue="1200" />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                  <Save size={16} /> Update Baseline
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-xs text-slate-500">Switch between light and dark themes</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Smart Categorization</Label>
                  <p className="text-xs text-slate-500">Automatically tag transactions using AI</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Summary</Label>
                  <p className="text-xs text-slate-500">Receive a push notification of your daily spend</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;