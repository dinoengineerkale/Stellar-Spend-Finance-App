import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { BudgetProvider } from "@/context/BudgetContext";
import { useState, useEffect, Suspense, lazy } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import PageTransition from "./components/PageTransition";
import { DashboardSkeleton } from "./components/LoadingSkeleton";

// Lazy load pages for performance
const Index = lazy(() => import("./pages/Index"));
const Vehicles = lazy(() => import("./pages/Vehicles"));
const Academy = lazy(() => import("./pages/Academy"));
const Subscriptions = lazy(() => import("./pages/Subscriptions"));
const GiftGalaxy = lazy(() => import("./pages/GiftGalaxy"));
const Forecasting = lazy(() => import("./pages/Forecasting"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Accounts = lazy(() => import("./pages/Accounts"));
const Reports = lazy(() => import("./pages/Reports"));
const DebtDestroyer = lazy(() => import("./pages/DebtDestroyer"));
const Budgeting = lazy(() => import("./pages/Budgeting"));
const Settings = lazy(() => import("./pages/Settings"));
const Goals = lazy(() => import("./pages/Goals"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

import MobileNav from "./components/MobileNav";
import Header from "./components/Header";

const queryClient = new QueryClient();

const AnimatedRoutes = ({ session }: { session: any }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{!session ? <Login /> : <Navigate to="/" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <Index /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/budgeting" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <Budgeting /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/transactions" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <Transactions /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/reports" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <Reports /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/accounts" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <Accounts /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/debt-destroyer" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <DebtDestroyer /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/vehicles" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <Vehicles /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/academy" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <Academy /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/subscriptions" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <Subscriptions /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/gift-galaxy" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <GiftGalaxy /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/goals" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <Goals /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/forecasting" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <Forecasting /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="/settings" element={
          <Suspense fallback={<DashboardSkeleton />}>
            <PageTransition>{session ? <Settings /> : <Navigate to="/login" />}</PageTransition>
          </Suspense>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

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

  if (loading) return <DashboardSkeleton />;

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BudgetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                {session && <Header />}
                <AnimatedRoutes session={session} />
                {session && <MobileNav />}
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </BudgetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;