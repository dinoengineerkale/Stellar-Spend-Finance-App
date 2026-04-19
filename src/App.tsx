import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BudgetProvider } from "@/context/BudgetContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import Academy from "./pages/Academy";
import Subscriptions from "./pages/Subscriptions";
import GiftGalaxy from "./pages/GiftGalaxy";
import Forecasting from "./pages/Forecasting";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import Reports from "./pages/Reports";
import DebtDestroyer from "./pages/DebtDestroyer";
import Budgeting from "./pages/Budgeting";
import Settings from "./pages/Settings";
import Goals from "./pages/Goals";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MobileNav from "./components/MobileNav";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <BudgetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
              {session && <Header />}
              <Routes>
                <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
                <Route path="/" element={session ? <Index /> : <Navigate to="/login" />} />
                <Route path="/budgeting" element={session ? <Budgeting /> : <Navigate to="/login" />} />
                <Route path="/transactions" element={session ? <Transactions /> : <Navigate to="/login" />} />
                <Route path="/reports" element={session ? <Reports /> : <Navigate to="/login" />} />
                <Route path="/accounts" element={session ? <Accounts /> : <Navigate to="/login" />} />
                <Route path="/debt-destroyer" element={session ? <DebtDestroyer /> : <Navigate to="/login" />} />
                <Route path="/vehicles" element={session ? <Vehicles /> : <Navigate to="/login" />} />
                <Route path="/academy" element={session ? <Academy /> : <Navigate to="/login" />} />
                <Route path="/subscriptions" element={session ? <Subscriptions /> : <Navigate to="/login" />} />
                <Route path="/gift-galaxy" element={session ? <GiftGalaxy /> : <Navigate to="/login" />} />
                <Route path="/goals" element={session ? <Goals /> : <Navigate to="/login" />} />
                <Route path="/forecasting" element={session ? <Forecasting /> : <Navigate to="/login" />} />
                <Route path="/settings" element={session ? <Settings /> : <Navigate to="/login" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {session && <MobileNav />}
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </BudgetProvider>
    </QueryClientProvider>
  );
};

export default App;