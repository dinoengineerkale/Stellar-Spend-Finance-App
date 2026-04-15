"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Fuel, ShieldAlert, Ticket, ParkingCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const CarVault = () => {
  // Mock data for demonstration
  const stats = {
    purchasePrice: 25000,
    totalInsurance: 4800,
    totalGas: 3200,
    totalParking: 450,
    totalTickets: 120,
    totalKm: 15000,
    purchaseDate: '2023-01-01',
  };

  const totalCost = stats.purchasePrice + stats.totalInsurance + stats.totalGas + stats.totalParking + stats.totalTickets;
  const daysOwned = Math.floor((new Date().getTime() - new Date(stats.purchaseDate).getTime()) / (1000 * 3600 * 24));
  const costPerKm = totalCost / stats.totalKm;
  const costPerDay = totalCost / daysOwned;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Car Vault</h1>
          <p className="text-slate-500">Lifetime ownership analysis</p>
        </div>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Camera size={18} /> Scan Receipt
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 text-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-400 text-xs uppercase">Total Lifetime Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalCost.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-xs uppercase">Cost Per Kilometer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">${costPerKm.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-xs uppercase">Cost Per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">${costPerDay.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Fuel className="text-orange-500" size={20} />
                <span>Fuel / Gas</span>
              </div>
              <span className="font-semibold">${stats.totalGas.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-blue-500" size={20} />
                <span>Insurance</span>
              </div>
              <span className="font-semibold">${stats.totalInsurance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <ParkingCircle className="text-indigo-500" size={20} />
                <span>Parking</span>
              </div>
              <span className="font-semibold">${stats.totalParking.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Ticket className="text-red-500" size={20} />
                <span>Tickets</span>
              </div>
              <span className="font-semibold">${stats.totalTickets.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center p-8 text-center space-y-4 border-dashed border-2">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
            <Car size={48} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Vehicle Details</h3>
            <p className="text-sm text-slate-500">Purchased on {new Date(stats.purchaseDate).toLocaleDateString()}</p>
            <p className="text-sm text-slate-500">Total Distance: {stats.totalKm.toLocaleString()} km</p>
          </div>
          <Button variant="outline" className="w-full">Update Odometer</Button>
        </Card>
      </div>
    </div>
  );
};

export default CarVault;