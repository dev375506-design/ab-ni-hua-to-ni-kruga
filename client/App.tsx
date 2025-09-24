

// import "./global.css";
// import { Toaster } from "@/components/ui/toaster";
// import { createRoot } from "react-dom/client";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { AuthService } from "./lib/utils"; // Fixed import

// // Import all your pages
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Chat from "./pages/Chat";
// import Dashboard from "./pages/Dashboard";
// import MyProfile from "./pages/MyProfile";
// import AppliedInternships from "./pages/AppliedInternships";
// import SavedInternships from "./pages/SavedInternships";
// import RecommendedInternships from "./pages/RecommendedInternships";
// import ResumeBuilder from "./pages/ResumeBuilder";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import { LanguageProvider } from "./context/i18n";

// const queryClient = new QueryClient();

// // Define User interface
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   provider?: string;
// }

// // Protected Route component that provides user context
// const ProtectedRoute = ({ 
//   children, 
//   user, 
//   onLogout 
// }: { 
//   children: React.ReactNode; 
//   user: User | null;
//   onLogout?: () => void;
// }) => {
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
  
//   // Pass user and onLogout as props to children
//   if (React.isValidElement(children)) {
//     return React.cloneElement(children, { user, onLogout } as any);
//   }
  
//   return <>{children}</>;
// };

// // Main App component
// const App = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Function to update user state from localStorage
//   const updateUserState = (): void => {
//     try {
//       const token = AuthService.getAuthToken();
//       const userData = AuthService.getCurrentUser();
         
//       if (token && userData) {
//         setUser(userData);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       AuthService.logout();
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     // Initial load
//     updateUserState();
//     setLoading(false);

//     // Listen for storage changes
//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === 'user' || e.key === 'authToken') {
//         updateUserState();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const handleLogout = async (): Promise<void> => {
//     await AuthService.logout();
//     setUser(null);
//     window.location.href = '/';
//   };

//   const handleLoginSuccess = (userData: User): void => {
//     setUser(userData);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <LanguageProvider>
//           <BrowserRouter>
//             <Routes>
//               <Route path="/" element={<Index />} />
              
//               {/* Authentication routes */}
//               <Route 
//                 path="/login" 
//                 element={<Login onLoginSuccess={handleLoginSuccess} />} 
//               />
              
//               <Route 
//                 path="/signup" 
//                 element={<Signup onSignupSuccess={handleLoginSuccess} />} 
//               />
              
//               <Route path="/chat" element={<Chat />} />
              
//               {/* Protected routes - require authentication */}
//               <Route 
//                 path="/dashboard" 
//                 element={
//                   <ProtectedRoute user={user} onLogout={handleLogout}>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 } 
//               />
              
//               <Route 
//                 path="/profile" 
//                 element={
//                   <ProtectedRoute user={user} onLogout={handleLogout}>
//                     <MyProfile />
//                   </ProtectedRoute>
//                 } 
//               />
              
//               <Route 
//                 path="/applied" 
//                 element={
//                   <ProtectedRoute user={user} onLogout={handleLogout}>
//                     <AppliedInternships />
//                   </ProtectedRoute>
//                 } 
//               />
              
//               <Route 
//                 path="/saved" 
//                 element={
//                   <ProtectedRoute user={user} onLogout={handleLogout}>
//                     <SavedInternships />
//                   </ProtectedRoute>
//                 } 
//               />
              
//               <Route 
//                 path="/recommended" 
//                 element={
//                   <ProtectedRoute user={user} onLogout={handleLogout}>
//                     <RecommendedInternships />
//                   </ProtectedRoute>
//                 } 
//               />
              
//               <Route 
//                 path="/resume-builder" 
//                 element={
//                   <ProtectedRoute user={user} onLogout={handleLogout}>
//                     <ResumeBuilder />
//                   </ProtectedRoute>
//                 } 
//               />
              
//               {/* Catch-all route - must be last */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </BrowserRouter>
//         </LanguageProvider>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;

// createRoot(document.getElementById("root")!).render(<App />);


import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AuthService } from "./lib/utils";

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
import Login from "./pages/Login";
import LoginModal from "./components/LoginModal";
import Signup from "./pages/Signup";
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

// Protected Route component that provides user context
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
    console.log('ProtectedRoute: No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('ProtectedRoute: User authenticated:', user.email);
  
  // Pass user and onLogout as props to children
  if (React.isValidElement(children)) {
    return React.cloneElement(children, { user, onLogout } as any);
  }
  
  return <>{children}</>;
};

// Main App component
const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to update user state from localStorage
  const updateUserState = (): void => {
    try {
      const token = AuthService.getAuthToken();
      const userData = AuthService.getCurrentUser();
      
      console.log('updateUserState called:', { token: !!token, userData: !!userData });
         
      if (token && userData) {
        console.log('Setting user state:', userData);
        setUser(userData);
      } else {
        console.log('No valid auth data, clearing user state');
        setUser(null);
      }
    } catch (error) {
      console.error('Error updating user state:', error);
      AuthService.logout();
      setUser(null);
    }
  };

  useEffect(() => {
    console.log('App useEffect: Initial load');
    // Initial load
    updateUserState();
    setLoading(false);

    // Listen for storage changes (for multi-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      console.log('Storage change detected:', e.key);
      if (e.key === 'user' || e.key === 'authToken') {
        updateUserState();
      }
    };

    // Listen for custom authentication events
    const handleAuthEvent = (e: CustomEvent) => {
      console.log('Auth event detected:', e.type);
      updateUserState();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChanged', handleAuthEvent as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleAuthEvent as EventListener);
    };
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      console.log('Logging out user...');
      await AuthService.logout();
      setUser(null);
      
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('authStateChanged'));
      
      // Force redirect to home
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even on error
      setUser(null);
      localStorage.clear();
      window.location.href = '/';
    }
  };

  const handleLoginSuccess = (userData: User): void => {
    console.log('Login success, setting user data:', userData);
    setUser(userData);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('authStateChanged'));
  };

  const handleSignupSuccess = (userData: User): void => {
    console.log('Signup success, setting user data:', userData);
    setUser(userData);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('authStateChanged'));
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
              
              {/* Authentication route: render overlay modal on top of Index */}
              <Route 
                path="/login" 
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <>
                      <Index />
                      <LoginModal 
                        isOpen={true}
                        onClose={() => { window.history.length > 1 ? window.history.back() : (window.location.href = '/'); }}
                        onSuccess={handleLoginSuccess}
                      />
                    </>
                  )
                } 
              />
              
              <Route 
                path="/signup" 
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Signup onSignupSuccess={handleSignupSuccess} />
                  )
                } 
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
              
              {/* Catch-all route - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

createRoot(document.getElementById("root")!).render(<App />);