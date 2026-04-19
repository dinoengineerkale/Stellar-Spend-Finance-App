"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[StellarSpend] Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
          <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-red-100 dark:border-red-900/30">
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto text-red-600">
              <AlertTriangle size={40} />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Anomaly Detected</h1>
              <p className="text-slate-500 text-sm">
                Stellar Spend encountered an unexpected error. Our engineers have been notified.
              </p>
              {this.state.error && (
                <pre className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] text-left overflow-auto max-h-32 text-red-500 font-mono">
                  {this.state.error.toString()}
                </pre>
              )}
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 gap-2 rounded-xl"
                onClick={() => window.location.href = '/'}
              >
                <Home size={18} /> Home
              </Button>
              <Button 
                className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                onClick={() => window.location.reload()}
              >
                <RefreshCcw size={18} /> Reboot
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;