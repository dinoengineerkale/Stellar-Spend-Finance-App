"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Fuel, ShieldAlert, Ticket, ParkingCircle, Wrench, Plus, Edit2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Vehicle {
  id: string;
  name: string;
  model: string;
  image: string;
  stats: {
    purchasePrice: number;
    totalInsurance: number;
    totalGas: number;
    totalParking: number;
    totalTickets: number;
    totalMaintenance: number;
    totalKm: number;
    purchaseDate: string;
  };
}

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'Daily Driver',
      model: 'Tesla Model 3',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1000',
      stats: {
        purchasePrice: 45000,
        totalInsurance: 2400,
        totalGas: 0,
        totalParking: 300,
        totalTickets: 0,
        totalMaintenance: 150,
        totalKm: 12000,
        purchaseDate: '2023-05-15',
      }
    },
    {
      id: '2',
      name: 'Weekend Cruiser',
      model: 'Porsche 911',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000',
      stats: {
        purchasePrice: 120000,
        totalInsurance: 4800,
        totalGas: 3200,
        totalParking: 150,
        totalTickets: 250,
        totalMaintenance: 1200,
        totalKm: 5000,
        purchaseDate: '2022-10-01',
      }
    }
  ]);

  const [activeId, setActiveId] = useState('1');
  const [isEditing, setIsEditing] = useState(false);
  
  const activeVehicle = vehicles.find(v => v.id === activeId)!;

  const totalCost = Object.values(activeVehicle.stats).reduce<number>((acc, val) => 
    typeof val === 'number' ? acc + val : acc, 0
  );
  
  const daysOwned = Math.max(1, Math.floor((new Date().getTime() - new Date(activeVehicle.stats.purchaseDate).getTime()) / (1000 * 3600 * 24)));
  const costPerKm = totalCost / activeVehicle.stats.totalKm;
  const costPerDay = totalCost / daysOwned;

  const handleUpdateVehicle = (field: keyof Vehicle, value: string) => {
    setVehicles(vehicles.map(v => v.id === activeId ? { ...v, [field]: value } : v));
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-[calc(100-64px)]">
      {/* Vertical Vehicle Switcher */}
      <aside className="w-full md:w-64 border-r border-slate-200 dark:border-slate-800 p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex justify-between items-center px-2 mb-4">
          <h2 className="font-bold text-slate-900 dark:text-white">My Fleet</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Plus size={18} />
          </Button>
        </div>
        <div className="space-y-2">
          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveId(v.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left",
                activeId === v.id 
                  ? "bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700" 
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                activeId === v.id ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-slate-700"
              )}>
                <Car size={20} />
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-sm truncate">{v.name}</div>
                <div className="text-[10px] uppercase tracking-wider opacity-60 truncate">{v.model}</div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1 flex-1">
            {isEditing ? (
              <div className="flex gap-2 items-center">
                <Input 
                  value={activeVehicle.name} 
                  onChange={(e) => handleUpdateVehicle('name', e.target.value)}
                  className="text-2xl font-bold h-10 w-64"
                />
                <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
                  <Check size={20} className="text-green-600" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 items-center group">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{activeVehicle.name}</h1>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setIsEditing(true)}>
                  <Edit2 size={16} />
                </Button>
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-500">
              {isEditing ? (
                <Input 
                  value={activeVehicle.model} 
                  onChange={(e) => handleUpdateVehicle('model', e.target.value)}
                  className="h-8 w-48 text-sm"
                  placeholder="Vehicle Model"
                />
              ) : (
                <p>{activeVehicle.model} • Lifetime ownership analysis</p>
              )}
            </div>
          </div>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus size={18} /> Add Expense
          </Button>
        </div>

        {/* Dealership Quality Photo */}
        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl group">
          <img 
            src={activeVehicle.image} 
            alt={activeVehicle.model}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <div className="text-sm font-medium uppercase tracking-[0.2em] opacity-80 mb-1">Current Asset</div>
            <div className="text-4xl font-black">{activeVehicle.model}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900 text-white border-none shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-400 text-xs uppercase tracking-widest">Total Lifetime Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalCost.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 text-xs uppercase tracking-widest">Cost Per Kilometer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">${costPerKm.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 text-xs uppercase tracking-widest">Cost Per Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">${costPerDay.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench size={20} className="text-indigo-600" /> Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <BreakdownItem icon={Fuel} label="Fuel / Gas" value={activeVehicle.stats.totalGas} color="text-orange-500" />
              <BreakdownItem icon={Wrench} label="Maintenance & Repairs" value={activeVehicle.stats.totalMaintenance} color="text-indigo-500" />
              <BreakdownItem icon={ShieldAlert} label="Insurance" value={activeVehicle.stats.totalInsurance} color="text-blue-500" />
              <BreakdownItem icon={ParkingCircle} label="Parking" value={activeVehicle.stats.totalParking} color="text-emerald-500" />
              <BreakdownItem icon={Ticket} label="Tickets & Fines" value={activeVehicle.stats.totalTickets} color="text-red-500" />
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center justify-center p-8 text-center space-y-6 border-dashed border-2 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-full shadow-xl">
              <Car size={48} className="text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Odometer Tracking</h3>
              <p className="text-sm text-slate-500 mt-2">Total Distance: <span className="font-bold text-slate-900 dark:text-white">{activeVehicle.stats.totalKm.toLocaleString()} km</span></p>
              <p className="text-xs text-slate-400 mt-1">Purchased on {new Date(activeVehicle.stats.purchaseDate).toLocaleDateString()}</p>
            </div>
            <Button variant="outline" className="w-full max-w-xs rounded-xl">Update Odometer</Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

const BreakdownItem = ({ icon: Icon, label, value, color }: any) => (
  <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 transition-colors">
    <div className="flex items-center gap-3">
      <div className={cn("p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm", color)}>
        <Icon size={18} />
      </div>
      <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
    </div>
    <span className="font-bold text-slate-900 dark:text-white">${value.toLocaleString()}</span>
  </div>
);

export default Vehicles;