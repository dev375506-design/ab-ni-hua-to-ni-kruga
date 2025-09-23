// components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from '../lib/utils';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requiredRole?: string;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/login', 
  requiredRole 
}: ProtectedRouteProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = AuthService.isAuthenticated();
      
      if (!isAuthenticated) {
        setIsAuthorized(false);
        setIsChecking(false);
        return;
      }

      // Check role if required
      if (requiredRole) {
        const user = AuthService.getCurrentUser();
        if (!user || user.role !== requiredRole) {
          setIsAuthorized(false);
          setIsChecking(false);
          return;
        }
      }

      // Try to refresh token if it's close to expiring (optional)
      try {
        await AuthService.refreshToken();
      } catch (error) {
        console.log('Token refresh failed:', error);
        // Continue anyway - the token might still be valid
      }

      setIsAuthorized(true);
      setIsChecking(false);
    };

    checkAuth();
  }, [requiredRole]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authorized
  if (!isAuthorized) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Render protected content
  return <>{children}</>;
}
