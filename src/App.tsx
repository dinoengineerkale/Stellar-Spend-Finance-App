import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";
import MobileNav from "./components/MobileNav";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/gift-galaxy" element={<GiftGalaxy />} />
            <Route path="/forecasting" element={<Forecasting />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/debt-destroyer" element={<DebtDestroyer />} />
            <Route path="/budgeting" element={<Budgeting />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;