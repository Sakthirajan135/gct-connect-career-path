
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";
import Companies from "./pages/Companies";
import Resume from "./pages/Resume";
import Tests from "./pages/Tests";
import Resources from "./pages/Resources";
import Feedback from "./pages/Feedback";
import InterviewPrep from "./pages/InterviewPrep";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/applications" 
              element={
                <ProtectedRoute>
                  <Applications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/companies" 
              element={
                <ProtectedRoute>
                  <Companies />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resume" 
              element={
                <ProtectedRoute>
                  <Resume />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tests" 
              element={
                <ProtectedRoute>
                  <Tests />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resources" 
              element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/feedback" 
              element={
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/prep" 
              element={
                <ProtectedRoute>
                  <InterviewPrep />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/calendar" 
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
