import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  provider?: string;
}

interface FormData {
  email: string;
  password: string;
}

// Define types for better TypeScript support

interface LoginProps {
  onLoginSuccess?: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // For demo purposes, simulate a successful login
      setTimeout(() => {
        // Create mock user data
        const mockUser: User = {
          id: '123456',
          name: 'Demo User',
          email: formData.email,
          role: 'student'
        };
        
        // Store user data and token
        localStorage.setItem('token', 'demo-jwt-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Call callback if provided (for state management)
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        
        // Use window.location.href for immediate navigation with state refresh
        window.location.href = '/dashboard';
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    setOauthLoading(provider);
    
    // For demo purposes, simulate a successful OAuth login
    setTimeout(() => {
      try {
        // Create mock user data based on provider
        const mockUser: User = {
          id: `${provider}-123456`,
          name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
          email: `${provider}.user@example.com`,
          role: 'student',
          provider: provider
        };
        
        // Store user data and token
        localStorage.setItem('token', `${provider}-demo-jwt-token`);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Call callback if provided
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        
        // Use window.location.href for immediate navigation
        window.location.href = '/dashboard';
      } catch (error) {
        console.error(`${provider} login failed:`, error);
        alert(`${provider} login failed`);
      } finally {
        setOauthLoading(null);
      }
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Login to Your Account
            </h2>
            <p className="text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50"
              onClick={() => handleOAuthLogin('google')}
              disabled={oauthLoading === 'google'}
            >
              {oauthLoading === 'google' ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              Continue with Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50"
              onClick={() => handleOAuthLogin('facebook')}
              disabled={oauthLoading === 'facebook'}
            >
              {oauthLoading === 'facebook' ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H7.9V12h2.6V9.8c0-2.57 1.53-3.99 3.87-3.99 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.79-1.68 1.6V12h2.86l-.46 2.88h-2.4v6.99A10 10 0 0 0 22 12z" />
                </svg>
              )}
              Continue with Facebook
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50"
              onClick={() => handleOAuthLogin('apple')}
              disabled={oauthLoading === 'apple'}
            >
              {oauthLoading === 'apple' ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.5 3.51 7.7 8.42 7.32c1.74-.12 2.93.82 3.97.82 1.03 0 2.97-1.01 5.01-.86 2.53.19 3.97 1.45 4.85 3.08-4.89 2.93-4.13 8.39.8 9.92-.8 1.78-1.79 3.48-3.99 4.6-1.09.54-1.89.24-3.01-.6zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.27 2.18-1.66 4.19-3.74 4.25z" />
                </svg>
              )}
              Continue with Apple
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Forgot Password?
              </button>
            </div>

            {errors.submit && (
              <div className="text-red-600 text-sm text-center">
                {errors.submit}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          <div className="text-center text-sm mt-6 text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}