// import React from 'react'
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// // Utility function for merging Tailwind classes
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // Authentication types and interfaces
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   provider?: string;
// }

// interface LoginResponse {
//   success: boolean;
//   message?: string;
//   user_info?: User;
//   token?: string;
// }

// interface SignupResponse {
//   success: boolean;
//   message?: string;
//   user_info?: User;
//   token?: string;
// }

// // Backend API configuration
// const API_BASE_URL = "https://hk-proj.onrender.com";

// export class AuthService {
//   // Login function
//   static async login(email: string, password: string): Promise<LoginResponse> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         credentials: 'include',
//         body: JSON.stringify({ 
//           email: email.trim().toLowerCase(), 
//           password 
//         })
//       });
      
//       const data = await response.json();
      
//       if (response.ok && data.success) {
//         // Store authentication data
//         if (data.token) {
//           localStorage.setItem('authToken', data.token);
//         }
//         if (data.user_info) {
//           localStorage.setItem('user', JSON.stringify(data.user_info));
//         }
//       }
      
//       return {
//         success: data.success,
//         message: data.message,
//         user_info: data.user_info,
//         token: data.token
//       };
//     } catch (error) {
//       console.error('Login error:', error);
//       return {
//         success: false,
//         message: 'Network error. Please check your connection and try again.'
//       };
//     }
//   }

//   // Signup function
//   static async signup(name: string, email: string, password: string): Promise<SignupResponse> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify({ 
//           name: name.trim(), 
//           email: email.trim().toLowerCase(), 
//           password 
//         })
//       });
      
//       const data = await response.json();
      
//       if (response.ok && data.success) {
//         // Store authentication data if auto-login is enabled
//         if (data.token) {
//           localStorage.setItem('authToken', data.token);
//         }
//         if (data.user_info) {
//           localStorage.setItem('user', JSON.stringify(data.user_info));
//         }
//       }
      
//       return {
//         success: data.success,
//         message: data.message,
//         user_info: data.user_info,
//         token: data.token
//       };
//     } catch (error) {
//       console.error('Signup error:', error);
//       return {
//         success: false,
//         message: 'Network error. Please check your connection and try again.'
//       };
//     }
//   }

//   // Get current user from localStorage
//   static getCurrentUser(): User | null {
//     try {
//       const userStr = localStorage.getItem('user');
//       if (userStr) {
//         return JSON.parse(userStr) as User;
//       }
//       return null;
//     } catch (error) {
//       console.error('Error getting current user:', error);
//       return null;
//     }
//   }

//   // Get auth token
//   static getAuthToken(): string | null {
//     return localStorage.getItem('authToken');
//   }

//   // Check if user is authenticated
//   static isAuthenticated(): boolean {
//     const token = this.getAuthToken();
//     const user = this.getCurrentUser();
//     return !!(token && user);
//   }

//   // Logout function
//   static async logout(): Promise<void> {
//     try {
//       // Call backend logout endpoint if it exists
//       const token = this.getAuthToken();
//       if (token) {
//         await fetch(`${API_BASE_URL}/logout`, {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           credentials: 'include'
//         });
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       // Clear local storage regardless of backend call success
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('user');
//     }
//   }

//   // Refresh token function (if your backend supports it)
//   static async refreshToken(): Promise<boolean> {
//     try {
//       const token = this.getAuthToken();
//       if (!token) return false;

//       const response = await fetch(`${API_BASE_URL}/refresh`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include'
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success && data.token) {
//           localStorage.setItem('authToken', data.token);
//           return true;
//         }
//       }
      
//       return false;
//     } catch (error) {
//       console.error('Token refresh error:', error);
//       return false;
//     }
//   }

//   // Validate email format
//   static isValidEmail(email: string): boolean {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   // Validate password strength
//   static validatePassword(password: string): { isValid: boolean; message?: string } {
//     if (password.length < 6) {
//       return { isValid: false, message: 'Password must be at least 6 characters long' };
//     }
    
//     // Add more password validation rules as needed
//     // if (!/(?=.*[a-z])/.test(password)) {
//     //   return { isValid: false, message: 'Password must contain at least one lowercase letter' };
//     // }
//     // if (!/(?=.*[A-Z])/.test(password)) {
//     //   return { isValid: false, message: 'Password must contain at least one uppercase letter' };
//     // }
//     // if (!/(?=.*\d)/.test(password)) {
//     //   return { isValid: false, message: 'Password must contain at least one number' };
//     // }
    
//     return { isValid: true };
//   }

//   // Create authenticated request headers
//   static getAuthHeaders(): Record<string, string> {
//     const token = this.getAuthToken();
//     const headers: Record<string, string> = {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     };
    
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }
    
//     return headers;
//   }

//   // Make authenticated API request
//   static async authenticatedRequest(
//     endpoint: string, 
//     options: RequestInit = {}
//   ): Promise<Response> {
//     const url = `${API_BASE_URL}${endpoint}`;
//     const authHeaders = this.getAuthHeaders();
    
//     return fetch(url, {
//       ...options,
//       headers: {
//         ...authHeaders,
//         ...options.headers
//       },
//       credentials: 'include'
//     });
//   }

//   // Check if backend is reachable
//   static async checkBackendHealth(): Promise<boolean> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/health`, {
//         method: 'GET',
//         timeout: 5000
//       } as any);
//       return response.ok;
//     } catch (error) {
//       console.error('Backend health check failed:', error);
//       return false;
//     }
//   }
// }

// // Hook for React components to use authentication
// export const useAuth = () => {
//   const [user, setUser] = React.useState<User | null>(AuthService.getCurrentUser());
//   const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(AuthService.isAuthenticated());

//   const login = async (email: string, password: string) => {
//     const result = await AuthService.login(email, password);
//     if (result.success && result.user_info) {
//       setUser(result.user_info);
//       setIsAuthenticated(true);
//     }
//     return result;
//   };

//   const signup = async (name: string, email: string, password: string) => {
//     const result = await AuthService.signup(name, email, password);
//     if (result.success && result.user_info) {
//       setUser(result.user_info);
//       setIsAuthenticated(true);
//     }
//     return result;
//   };

//   const logout = async () => {
//     await AuthService.logout();
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   const updateUser = (userData: User) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   return {
//     user,
//     isAuthenticated,
//     login,
//     signup,
//     logout,
//     updateUser
//   };
// };

// export default AuthService;

import React from 'react'
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Authentication types and interfaces
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  provider?: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  user_info?: User;
  token?: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
  user_info?: User;
  token?: string;
}

// Backend API configuration
const API_BASE_URL = "https://hk-proj.onrender.com";

export class AuthService {
  // Local fallback storage helpers for offline/dev usage
  private static LOCAL_USERS_KEY = 'localUsers';

  private static getLocalUsers(): User[] {
    try {
      const raw = localStorage.getItem(this.LOCAL_USERS_KEY);
      return raw ? (JSON.parse(raw) as User[]) : [];
    } catch {
      return [];
    }
  }

  private static saveLocalUsers(users: User[]): void {
    localStorage.setItem(this.LOCAL_USERS_KEY, JSON.stringify(users));
  }

  private static findLocalUserByEmail(email: string): User | undefined {
    const users = this.getLocalUsers();
    return users.find(u => u.email?.toLowerCase() === email.toLowerCase());
  }

  // Login function
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(), 
          password 
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Store authentication data
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        if (data.user_info) {
          localStorage.setItem('user', JSON.stringify(data.user_info));
        }
      }
      
      return {
        success: data.success,
        message: data.message,
        user_info: data.user_info,
        token: data.token
      };
    } catch (error) {
      console.error('Login error:', error);
      // Offline/dev fallback: use locally stored users if present
      const localUser = this.findLocalUserByEmail(email);
      if (localUser) {
        const demoToken = `demo-token-local-${Date.now()}`;
        localStorage.setItem('authToken', demoToken);
        localStorage.setItem('user', JSON.stringify(localUser));
        return { success: true, message: 'Login successful (offline)', user_info: localUser, token: demoToken };
      }
      return { success: false, message: 'You are not a registered candidate, sign up first' };
    }
  }

  // OAuth login simulation/helper
  static async oauthLogin(provider: string): Promise<LoginResponse> {
    try {
      // If your backend has real OAuth endpoints, replace this with a real call
      // Example: await fetch(`${API_BASE_URL}/auth/${provider.toLowerCase()}`)
      const normalized = provider.toLowerCase();
      const demoUser: User = {
        id: `${normalized}-user-1`,
        name: normalized === 'google' ? 'Google User' : normalized === 'facebook' ? 'Facebook User' : 'OAuth User',
        email: normalized === 'google' ? 'google.user@example.com' : normalized === 'facebook' ? 'fb.user@example.com' : 'oauth.user@example.com',
        role: 'candidate',
        provider: provider
      };

      const demoToken = `demo-token-${normalized}-${Date.now()}`;

      localStorage.setItem('authToken', demoToken);
      localStorage.setItem('user', JSON.stringify(demoUser));

      return {
        success: true,
        message: `${provider} login successful` ,
        user_info: demoUser,
        token: demoToken
      };
    } catch (error) {
      console.error('OAuth login error:', error);
      return {
        success: false,
        message: `${provider} login failed. Please try again.`
      };
    }
  }

  // Signup function
  static async signup(name: string, email: string, password: string): Promise<SignupResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ 
          name: name.trim(), 
          email: email.trim().toLowerCase(), 
          password 
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Store authentication data if auto-login is enabled
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        if (data.user_info) {
          localStorage.setItem('user', JSON.stringify(data.user_info));
        }
      }
      
      return {
        success: data.success,
        message: data.message,
        user_info: data.user_info,
        token: data.token
      };
    } catch (error) {
      console.error('Signup error:', error);
      // Offline/dev fallback: create a local user record
      const existing = this.findLocalUserByEmail(email);
      if (existing) {
        return { success: false, message: 'Email already registered' };
      }
      const newUser: User = {
        id: `local-${Date.now()}`,
        name: name.trim() || 'User',
        email: email.trim().toLowerCase(),
        role: 'candidate',
        provider: 'local'
      };
      const users = this.getLocalUsers();
      users.push(newUser);
      this.saveLocalUsers(users);
      return { success: true, message: 'Account created successfully (offline)', user_info: newUser };
    }
  }

  // Get current user from localStorage
  static getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr) as User;
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Get auth token
  static getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = this.getAuthToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Logout function
  static async logout(): Promise<void> {
    try {
      // Call backend logout endpoint if it exists
      const token = this.getAuthToken();
      if (token) {
        await fetch(`${API_BASE_URL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of backend call success
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  // Refresh token function (if your backend supports it)
  static async refreshToken(): Promise<boolean> {
    try {
      const token = this.getAuthToken();
      if (!token) return false;

      const response = await fetch(`${API_BASE_URL}/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.token) {
          localStorage.setItem('authToken', data.token);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  static validatePassword(password: string): { isValid: boolean; message?: string } {
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    
    return { isValid: true };
  }

  // Create authenticated request headers
  static getAuthHeaders(): Record<string, string> {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Make authenticated API request
  static async authenticatedRequest(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<Response> {
    const url = `${API_BASE_URL}${endpoint}`;
    const authHeaders = this.getAuthHeaders();
    
    return fetch(url, {
      ...options,
      headers: {
        ...authHeaders,
        ...options.headers
      },
      credentials: 'include'
    });
  }

  // Check if backend is reachable
  static async checkBackendHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      return response.ok;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }
}

// Hook for React components to use authentication
export const useAuth = () => {
  const [user, setUser] = React.useState<User | null>(AuthService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(AuthService.isAuthenticated());

  const login = async (email: string, password: string) => {
    const result = await AuthService.login(email, password);
    if (result.success && result.user_info) {
      setUser(result.user_info);
      setIsAuthenticated(true);
    }
    return result;
  };

  const signup = async (name: string, email: string, password: string) => {
    const result = await AuthService.signup(name, email, password);
    if (result.success && result.user_info) {
      setUser(result.user_info);
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser
  };
};

// Default export for backwards compatibility
export default AuthService;