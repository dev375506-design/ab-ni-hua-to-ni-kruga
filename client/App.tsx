// import "./global.css";

// import { Toaster } from "@/components/ui/toaster";
// import { createRoot } from "react-dom/client";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Chat from "./pages/Chat";
// import Dashboard from "./pages/Dashboard";
// import MyProfile from "./pages/MyProfile";
// import AppliedInternships from "./pages/AppliedInternships";
// import SavedInternships from "./pages/SavedInternships";
// import RecommendedInternships from "./pages/RecommendedInternships";
// import ResumeBuilder from "./pages/ResumeBuilder";
// import { LanguageProvider } from "./context/i18n";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <LanguageProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/chat" element={<Chat />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/profile" element={<MyProfile />} />
//             <Route path="/applied" element={<AppliedInternships />} />
//             <Route path="/saved" element={<SavedInternships />} />
//             <Route path="/recommended" element={<RecommendedInternships />} />
//             <Route path="/resume-builder" element={<ResumeBuilder />} />
//             {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </LanguageProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// createRoot(document.getElementById("root")!).render(<App />);


import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Import all your pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import AppliedInternships from "./pages/AppliedInternships";
import SavedInternships from "./pages/SavedInternships";
import RecommendedInternships from "./pages/RecommendedInternships";
import ResumeBuilder from "./pages/ResumeBuilder";
import Login from "./pages/Login"; // Add this import
import { LanguageProvider } from "./context/i18n";

const queryClient = new QueryClient();

// Define User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  provider?: string;
}

// Protected Route component that also provides user context
const ProtectedRoute = ({ 
  children, 
  user, 
  onLogout 
}: { 
  children: React.ReactNode; 
  user: User | null;
  onLogout?: () => void;
}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Clone children and pass user and onLogout props if needed
  return React.cloneElement(children as React.ReactElement, { user, onLogout });
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to update user state from localStorage
  const updateUserState = (): void => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
         
      if (token && userData) {
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  useEffect(() => {
    // Initial load
    updateUserState();
    setLoading(false);

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'token') {
        updateUserState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Add the missing login route */}
              <Route 
                path="/login" 
                element={<Login onLoginSuccess={updateUserState} />} 
              />
              
              <Route path="/chat" element={<Chat />} />
              
              {/* Protected routes - require authentication */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute user={user} onLogout={handleLogout}>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute user={user} onLogout={handleLogout}>
                    <MyProfile />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/applied" 
                element={
                  <ProtectedRoute user={user} onLogout={handleLogout}>
                    <AppliedInternships />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/saved" 
                element={
                  <ProtectedRoute user={user} onLogout={handleLogout}>
                    <SavedInternships />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/recommended" 
                element={
                  <ProtectedRoute user={user} onLogout={handleLogout}>
                    <RecommendedInternships />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/resume-builder" 
                element={
                  <ProtectedRoute user={user} onLogout={handleLogout}>
                    <ResumeBuilder />
                  </ProtectedRoute>
                } 
              />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);