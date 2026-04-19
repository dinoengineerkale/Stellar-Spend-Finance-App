"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Fuel, ShieldAlert, Ticket, ParkingCircle, Wrench, Plus, Edit2, Check, Camera, Gauge, Trash2, History, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useBudget } from "@/context/BudgetContext";
import { cn } from "@/lib/utils";
import { showSuccess, showLoading, dismissToast, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

const Vehicles = () => {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle, addVehicleExpense } = useBudget();
  const [activeId, setActiveId] = useState(vehicles[0]?.id || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const activeVehicle = vehicles.find(v => v.id === activeId) || vehicles[0];

  const consolidatedExpenses = useMemo(() => {
    if (!activeVehicle) return [];
    const groups: Record<string, number> = {
      'Fuel / Gas': 0,
      'Maintenance': 0,
      'Insurance': 0,
      'Parking': 0,
      'Tickets': 0
    };
    activeVehicle.expenseHistory.forEach(e => {
      if (groups[e.label] !== undefined) groups[e.label] += e.value;
      else groups['Other'] = (groups['Other'] || 0) + e.value;
    });
    return Object.entries(groups).map(([label, value]) => ({ label, value }));
  }, [activeVehicle]);

  if (!activeVehicle) return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] space-y-4">
      <Car size={64} className="text-slate-300" />
      <h2 className="text-xl font-bold">No vehicles in your fleet</h2>
      <AddVehicleDialog onAdd={addVehicle} trigger={<Button className="bg-indigo-600">Add Your First Vehicle</Button>} />
    </div>
  );

  const totalCost = activeVehicle.expenseHistory.reduce((acc, e) => acc + e.value, 0) + activeVehicle.stats.purchasePrice;
  const daysOwned = Math.max(1, Math.floor((new Date().getTime() - new Date(activeVehicle.stats.purchaseDate).getTime()) / (1000 * 3600 * 24)));
  const costPerKm = totalCost / activeVehicle.stats.totalKm;
  const costPerDay = totalCost / daysOwned;

  const handleScanReceipt = async () => {
    const tid = showLoading("Scanning receipt with Stellar OCR...");
    setIsScanning(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('financial-processor', {
        body: { action: 'scan-receipt' }
      });

      if (error) throw error;

      dismissToast(tid);
      addVehicleExpense(activeId, {
        label: data.data.category,
        value: data.data.amount,
        date: data.data.date
      });
      showSuccess(`Receipt scanned! Added $${data.data.amount} to ${data.data.category}.`);
    } catch (err) {
      dismissToast(tid);
      showError("Failed to scan receipt.");
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleGenerateImage = () => {
    const randomId = Math.floor(Math.random() * 1000);
    updateVehicle(activeId, { image: `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&q=80&w=1000` });
    showSuccess("New asset visual generated!");
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
      <aside className="w-full md:w-64 border-r border-slate-200 dark:border-slate-800 p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex justify-between items-center px-2 mb-4">
          <h2 className="font-bold text-slate-900 dark:text-white">My Fleet</h2>
          <AddVehicleDialog onAdd={addVehicle} />
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

      <main className="flex-1 p-6 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex gap-2 items-center group">
              {isEditingName ? (
                <Input 
                  defaultValue={activeVehicle.name} 
                  onBlur={(e) => {
                    updateVehicle(activeId, { name: e.target.value });
                    setIsEditingName(false);
                  }}
                  autoFocus
                  className="text-2xl font-bold h-10 w-64"
                />
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{activeVehicle.name}</h1>
                  <Button variant="ghost" size="icon" onClick={() => setIsEditingName(true)}>
                    <Edit2 size={16} />
                  </Button>
                  <EditVehicleDialog vehicle={activeVehicle} onSave={(updates) => updateVehicle(activeId, updates)} />
                  <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600" onClick={() => deleteVehicle(activeId)}>
                    <Trash2 size={16} />
                  </Button>
                </>
              )}
            </div>
            <p className="text-slate-500">{activeVehicle.model} • Lifetime ownership analysis</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGenerateImage} variant="outline" className="gap-2">
              <RefreshCw size={18} /> New Image
            </Button>
            <Button onClick={handleScanReceipt} disabled={isScanning} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Camera size={18} /> {isScanning ? "Scanning..." : "Scan Receipt"}
            </Button>
            <AddExpenseDialog onAdd={(exp) => addVehicleExpense(activeId, exp)} />
          </div>
        </div>

        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl group">
          <img src={activeVehicle.image} alt={activeVehicle.model} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <div className="text-sm font-medium uppercase tracking-[0.2em] opacity-80 mb-1">Current Asset</div>
            <div className="text-4xl font-black">{activeVehicle.model}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900 text-white border-none shadow-xl">
            <CardHeader className="pb-2"><CardTitle className="text-slate-400 text-xs uppercase">Total Lifetime Cost</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">${totalCost.toLocaleString()}</div></CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="pb-2"><CardTitle className="text-slate-500 text-xs uppercase">Cost Per KM</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold text-indigo-600">${costPerKm.toFixed(2)}</div></CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="pb-2"><CardTitle className="text-slate-500 text-xs uppercase">Cost Per Day</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold text-indigo-600">${costPerDay.toFixed(2)}</div></CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2"><Wrench size={20} className="text-indigo-600" /> Expense Breakdown</CardTitle>
              <Button variant="ghost" size="sm" className="gap-2" onClick={() => setShowHistory(!showHistory)}>
                <History size={16} /> {showHistory ? "Show Summary" : "Show History"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {showHistory ? (
                <div className="space-y-2">
                  {activeVehicle.expenseHistory.map(exp => (
                    <div key={exp.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <Calendar size={14} className="text-slate-400" />
                        <div>
                          <div className="font-medium text-sm">{exp.label}</div>
                          <div className="text-[10px] text-slate-500">{new Date(exp.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="font-bold">${exp.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              ) : (
                consolidatedExpenses.map(exp => (
                  <BreakdownItem 
                    key={exp.label} 
                    icon={getIcon(exp.label)} 
                    label={exp.label} 
                    value={exp.value} 
                    color={getColor(exp.label)}
                  />
                ))
              )}
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center justify-center p-8 text-center space-y-6 border-dashed border-2 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-full shadow-xl"><Gauge size={48} className="text-indigo-600" /></div>
            <div>
              <h3 className="font-bold text-xl">Odometer Tracking</h3>
              <p className="text-sm text-slate-500 mt-2">Total Distance: <span className="font-bold text-slate-900 dark:text-white">{activeVehicle.stats.totalKm.toLocaleString()} km</span></p>
            </div>
            <UpdateOdometerDialog current={activeVehicle.stats.totalKm} onUpdate={(km) => updateVehicle(activeId, { stats: { ...activeVehicle.stats, totalKm: km } })} />
          </Card>
        </div>
      </main>
    </div>
  );
};

const getIcon = (label: string) => {
  if (label.includes('Fuel')) return Fuel;
  if (label.includes('Maintenance')) return Wrench;
  if (label.includes('Insurance')) return ShieldAlert;
  if (label.includes('Parking')) return ParkingCircle;
  return Ticket;
};

const getColor = (label: string) => {
  if (label.includes('Fuel')) return 'text-orange-500';
  if (label.includes('Maintenance')) return 'text-indigo-500';
  if (label.includes('Insurance')) return 'text-blue-500';
  if (label.includes('Parking')) return 'text-emerald-500';
  return 'text-red-500';
};

const BreakdownItem = ({ icon: Icon, label, value, color }: any) => (
  <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
    <div className="flex items-center gap-3">
      <div className={cn("p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm", color)}><Icon size={18} /></div>
      <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
    </div>
    <span className="font-bold text-slate-900 dark:text-white">${value.toLocaleString()}</span>
  </div>
);

const EditVehicleDialog = ({ vehicle, onSave }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit2 size={16} /></Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit Vehicle Details</DialogTitle></DialogHeader>
        <form onSubmit={(e: any) => {
          e.preventDefault();
          onSave({
            name: e.target.name.value,
            model: e.target.model.value,
            stats: { ...vehicle.stats, purchasePrice: parseFloat(e.target.price.value) }
          });
          setOpen(false);
          showSuccess("Vehicle updated!");
        }} className="space-y-4">
          <div className="space-y-2"><Label>Nickname</Label><Input name="name" defaultValue={vehicle.name} required /></div>
          <div className="space-y-2"><Label>Model</Label><Input name="model" defaultValue={vehicle.model} required /></div>
          <div className="space-y-2"><Label>Purchase Price</Label><Input name="price" type="number" defaultValue={vehicle.stats.purchasePrice} required /></div>
          <Button type="submit" className="w-full bg-indigo-600">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AddVehicleDialog = ({ onAdd, trigger }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Plus size={18} /></Button>}</DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add New Vehicle</DialogTitle></DialogHeader>
        <form onSubmit={(e: any) => {
          e.preventDefault();
          onAdd({
            name: e.target.name.value,
            model: e.target.model.value,
            image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1000',
            stats: { purchasePrice: parseFloat(e.target.price.value), totalKm: 0, purchaseDate: new Date().toISOString() }
          });
          setOpen(false);
        }} className="space-y-4">
          <div className="space-y-2"><Label>Nickname</Label><Input name="name" placeholder="e.g. My Truck" required /></div>
          <div className="space-y-2"><Label>Model</Label><Input name="model" placeholder="e.g. Ford F-150" required /></div>
          <div className="space-y-2"><Label>Purchase Price</Label><Input name="price" type="number" placeholder="0" required /></div>
          <Button type="submit" className="w-full bg-indigo-600">Add to Fleet</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AddExpenseDialog = ({ onAdd }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button className="gap-2 bg-indigo-600"><Plus size={18} /> Add Expense</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Vehicle Expense</DialogTitle></DialogHeader>
        <form onSubmit={(e: any) => {
          e.preventDefault();
          onAdd({
            label: e.target.type.options[e.target.type.selectedIndex].text,
            value: parseFloat(e.target.amount.value),
            date: new Date().toISOString()
          });
          setOpen(false);
        }} className="space-y-4">
          <div className="space-y-2">
            <Label>Expense Type</Label>
            <select name="type" className="w-full p-2 border rounded-md">
              <option value="gas">Fuel / Gas</option>
              <option value="maintenance">Maintenance</option>
              <option value="insurance">Insurance</option>
              <option value="parking">Parking</option>
              <option value="tickets">Tickets</option>
            </select>
          </div>
          <div className="space-y-2"><Label>Amount</Label><Input name="amount" type="number" step="0.01" required /></div>
          <Button type="submit" className="w-full bg-indigo-600">Record Expense</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const UpdateOdometerDialog = ({ current, onUpdate }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="outline" className="w-full max-w-xs rounded-xl">Update Odometer</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Update Odometer</DialogTitle></DialogHeader>
        <form onSubmit={(e: any) => {
          e.preventDefault();
          onUpdate(parseInt(e.target.km.value));
          setOpen(false);
          showSuccess("Odometer updated!");
        }} className="space-y-4">
          <div className="space-y-2"><Label>Current Reading (km)</Label><Input name="km" type="number" defaultValue={current} required /></div>
          <Button type="submit" className="w-full bg-indigo-600">Save Reading</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Vehicles;