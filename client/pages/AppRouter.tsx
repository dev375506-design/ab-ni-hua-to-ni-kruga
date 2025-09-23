// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Index from './Index';
// import Dashboard from "@/components/Dashboard";
// import Chat from "./Chat";
// import Login from "./Login";

// export default function AppRouter() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     // Check for user data in localStorage
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (e) {
//         console.error('Error parsing user data', e);
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//       }
//     }
    
//     setLoading(false);
//   }, []);
  
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     window.location.href = '/';
//   };

//   if (loading) {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/login" element={<Login />} />
//         <Route 
//           path="/dashboard" 
//           element={
//             user ? 
//               <Dashboard user={user} onLogout={handleLogout} /> : 
//               <Navigate to="/login" replace />
//           } 
//         />
//         <Route path="/chat" element={<Chat />} />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Index from './Index';
// import Dashboard from "@/components/Dashboard";
// import Chat from "./Chat";
// import Login from "./Login";

// // Define User interface for better TypeScript support
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   provider?: string;
// }

// export default function AppRouter() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
     
//   // Function to update user state from localStorage
//   const updateUserState = (): void => {
//     try {
//       const token = localStorage.getItem('token');
//       const userData = localStorage.getItem('user');
         
//       if (token && userData) {
//         const parsedUser: User = JSON.parse(userData);
//         setUser(parsedUser);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       // Clear corrupted data
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     // Initial load
//     updateUserState();
//     setLoading(false);

//     // Listen for storage changes (useful for multi-tab scenarios)
//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === 'user' || e.key === 'token') {
//         updateUserState();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     // Cleanup
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const handleLogout = (): void => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     // Use window.location for immediate redirect
//     window.location.href = '/';
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//         <span className="ml-2">Loading...</span>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route 
//           path="/login" 
//           element={<Login onLoginSuccess={updateUserState} />} 
//         />
//         <Route
//           path="/dashboard"
//           element={
//             user ? (
//               <Dashboard user={user} onLogout={handleLogout} />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//         <Route path="/chat" element={<Chat />} />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Import your components - make sure these paths are correct
import Index from './Index';
import Chat from "./Chat";
import Login from "./Login";

// Temporary simple Dashboard for testing
const Dashboard = ({ user, onLogout }: any) => (
  <div className="p-8 min-h-screen bg-gray-100">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard Works! 🎉</h1>
      <div className="bg-green-100 p-4 rounded-lg mb-4">
        <p className="text-green-800">✅ Login successful!</p>
        <p className="text-green-800">✅ Dashboard component loaded!</p>
        <p className="text-green-800">✅ Routing working!</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h2 className="font-semibold text-blue-800">User Info:</h2>
        <p>Name: {user?.name || 'No name'}</p>
        <p>Email: {user?.email || 'No email'}</p>
        <p>Role: {user?.role || 'No role'}</p>
      </div>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  </div>
);

// Define User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  provider?: string;
}

// Debug component to log route changes
function RouteDebugger() {
  const location = useLocation();
  
  useEffect(() => {
    console.log('🟢 ROUTE CHANGED TO:', location.pathname);
    console.log('🟢 FULL LOCATION:', location);
    console.log('🟢 CURRENT URL:', window.location.href);
  }, [location]);
  
  return null;
}

export default function AppRouter() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  console.log('🟢 AppRouter rendering, user state:', user);
     
  // Function to update user state from localStorage
  const updateUserState = (): void => {
    console.log('🟢 updateUserState called');
    
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      console.log('🟢 Token from localStorage:', token);
      console.log('🟢 User data from localStorage:', userData);
         
      if (token && userData) {
        const parsedUser: User = JSON.parse(userData);
        console.log('🟢 Parsed user:', parsedUser);
        setUser(parsedUser);
        console.log('🟢 User state updated');
      } else {
        console.log('🟢 No token or user data found, setting user to null');
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Error parsing user data:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  useEffect(() => {
    console.log('🟢 AppRouter mounted');
    
    // Initial load
    updateUserState();
    setLoading(false);

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      console.log('🟢 Storage changed:', e.key, e.newValue);
      if (e.key === 'user' || e.key === 'token') {
        updateUserState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      console.log('🟢 AppRouter unmounting');
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Log user state changes
  useEffect(() => {
    console.log('🟢 User state changed to:', user);
  }, [user]);

  const handleLogout = (): void => {
    console.log('🟢 Logout triggered');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  if (loading) {
    console.log('🟢 App is loading...');
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  console.log('🟢 About to render Router with user:', user);

  return (
    <Router>
      <div>
        {/* Debug info - remove this in production */}
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          right: 0, 
          background: 'black', 
          color: 'white', 
          padding: '5px 10px', 
          fontSize: '10px',
          zIndex: 9999 
        }}>
          User: {user ? '✅ Logged In' : '❌ Not Logged In'} | 
          Current: {window.location.pathname}
        </div>
        
        <RouteDebugger />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {console.log('🟢 Rendering Index route')}
                <Index />
              </>
            } 
          />
          
          <Route 
            path="/login" 
            element={
              <>
                {console.log('🟢 Rendering Login route')}
                <Login onLoginSuccess={updateUserState} />
              </>
            } 
          />
          
          <Route
            path="/dashboard"
            element={
              <>
                {console.log('🟢 Dashboard route accessed, user:', user)}
                {user ? (
                  <>
                    {console.log('🟢 User authenticated, rendering Dashboard')}
                    <Dashboard user={user} onLogout={handleLogout} />
                  </>
                ) : (
                  <>
                    {console.log('🟢 User not authenticated, redirecting to login')}
                    <Navigate to="/login" replace />
                  </>
                )}
              </>
            }
          />
          
          <Route 
            path="/chat" 
            element={
              <>
                {console.log('🟢 Rendering Chat route')}
                <Chat />
              </>
            } 
          />
          
          <Route 
            path="*" 
            element={
              <>
                {console.log('🟢 404 route hit for path:', window.location.pathname)}
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
                    <p className="text-gray-600 mb-4">Path: {window.location.pathname}</p>
                    <p className="text-gray-600 mb-4">Available routes: /, /login, /dashboard, /chat</p>
                    <button 
                      onClick={() => window.location.href = '/'}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Go Home
                    </button>
                  </div>
                </div>
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}