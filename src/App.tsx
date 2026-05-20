import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navigation } from "@/components/Navigation";
import { AuthPage } from "@/pages/AuthPage";
import { HomePage } from "@/pages/HomePage";
import { CalculadoraPage } from "@/pages/CalculadoraPage";
import { MinhaContaPage } from "@/pages/MinhaContaPage";
import { SuperAdminPanel } from "@/pages/SuperAdminPanel";
import { RelatoriosPage } from "@/pages/RelatoriosPage";
import { UpgradePage } from "@/pages/UpgradePage";
import { ManualPage } from "@/pages/ManualPage";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <FeedbackButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/cadastro" element={<AuthPage />} />
          <Route 
            path="/admin"
            element={
              <ProtectedRoute requiredRole="super_admin">
                <Navigation />
                <SuperAdminPanel />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Navigation />
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/calculadora" 
            element={
              <ProtectedRoute>
                <Navigation />
                <CalculadoraPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/minha-conta" 
            element={
              <ProtectedRoute>
                <Navigation />
                <MinhaContaPage />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/relatorios"
            element={
              <ProtectedRoute>
                <Navigation />
                <RelatoriosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upgrade"
            element={
              <ProtectedRoute skipTrialCheck>
                <Navigation />
                <UpgradePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manual"
            element={<ManualPage />}
          />
          <Route path="/index" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;