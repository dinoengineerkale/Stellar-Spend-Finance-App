import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CarVault from "./pages/CarVault";
import Academy from "./pages/Academy";
import Subscriptions from "./pages/Subscriptions";
import GiftGalaxy from "./pages/GiftGalaxy";
import Forecasting from "./pages/Forecasting";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/car-vault" element={<CarVault />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/gift-galaxy" element={<GiftGalaxy />} />
          <Route path="/forecasting" element={<Forecasting />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;