// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { AuthService } from "../lib/utils"; // Changed to named import

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   provider?: string;
// }

// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: (userData: User) => void;
// }

// interface FormData {
//   email: string;
//   password: string;
//   confirmPassword: string;
//   name: string;
// }

// export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
//   const navigate = useNavigate();
//   const [response, setResponse] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [oauthLoading, setOauthLoading] = useState<string | null>(null);
//   const [formData, setFormData] = useState<FormData>({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   if (!isOpen) return null;

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//     // Clear response when user types
//     if (response) {
//       setResponse('');
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};
    
//     if (isSignUp) {
//       // Name validation for signup
//       if (!formData.name.trim()) {
//         newErrors.name = 'Name is required';
//       } else if (formData.name.trim().length < 2) {
//         newErrors.name = 'Name must be at least 2 characters';
//       }
      
//       // Password confirmation for signup
//       if (!formData.confirmPassword) {
//         newErrors.confirmPassword = 'Please confirm your password';
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = 'Passwords do not match';
//       }
//     }
    
//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!AuthService.isValidEmail(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
    
//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (isSignUp) {
//       const passwordValidation = AuthService.validatePassword(formData.password);
//       if (!passwordValidation.isValid) {
//         newErrors.password = passwordValidation.message!;
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setResponse('');
//     setErrors({});
    
//     // Validate form first
//     if (!validateForm()) {
//       setIsLoading(false);
//       return;
//     }
    
//     const { name, email, password } = formData;
    
//     if (isSignUp) {
//       // Handle Signup
//       try {
//         const result = await AuthService.signup(name, email, password);
        
//         if (result.success) {
//           // Check if backend provides auto-login after signup
//           if (result.user_info && result.token) {
//             // Auto-login after successful signup
//             onSuccess(result.user_info);
//             onClose();
//           } else {
//             // Show success message and switch to login
//             setResponse('Account created successfully! You can now sign in.');
//             setTimeout(() => {
//               setIsSignUp(false);
//               setResponse('');
//               setFormData({
//                 email: email, // Keep the email
//                 password: '',
//                 confirmPassword: '',
//                 name: '',
//               });
//               setErrors({});
//             }, 2000);
//           }
//         } else {
//           // Handle signup errors based on the message
//           if (result.message && result.message.includes('email')) {
//             setErrors({ email: result.message });
//           } else {
//             setResponse(result.message || 'Signup failed. Please try again.');
//           }
//         }
//       } catch (error) {
//         console.error('Signup error:', error);
//         setResponse('An unexpected error occurred. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       // Handle Login
//       try {
//         const result = await AuthService.login(email, password);
        
//         if (result.success && result.user_info) {
//           console.log("Login successful:", result.user_info);
//           onSuccess(result.user_info);
//           onClose();
//         } else {
//           setResponse(result.message || 'Login failed. Please try again.');
//         }
//       } catch (error) {
//         console.error('Login error:', error);
//         setResponse('An unexpected error occurred. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // OAuth handlers - simplified for backend integration
//   const handleOAuthLogin = async (provider: string) => {
//     setOauthLoading(provider.toLowerCase());
//     setResponse(`${provider} authentication is not available yet. Please use email login.`);
//     setTimeout(() => {
//       setOauthLoading(null);
//     }, 2000);
//   };

//   const switchMode = () => {
//     setIsSignUp(!isSignUp);
//     setResponse('');
//     setErrors({});
//     // Clear form data when switching modes
//     setFormData({
//       email: "",
//       password: "",
//       confirmPassword: "",
//       name: "",
//     });
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div
//         className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           aria-label="Close"
//           className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors z-10"
//         >
//           ×
//         </button>

//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             {isSignUp ? "Create Account" : "Welcome Back"}
//           </h2>
//           <p className="text-gray-600">
//             {isSignUp 
//               ? "Join our community and start your journey" 
//               : "Sign in to your account to continue"
//             }
//           </p>
//         </div>

//         {/* OAuth Buttons */}
//         <div className="space-y-3 mb-6">
//           <button
//             type="button"
//             className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50"
//             onClick={() => handleOAuthLogin('Google')}
//             disabled={oauthLoading === 'google' || isLoading}
//           >
//             {oauthLoading === 'google' ? (
//               <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//             ) : (
//               <svg className="w-5 h-5" viewBox="0 0 24 24">
//                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
//                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//               </svg>
//             )}
//             Continue with Google
//           </button>

//           <button
//             type="button"
//             className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50"
//             onClick={() => handleOAuthLogin('Facebook')}
//             disabled={oauthLoading === 'facebook' || isLoading}
//           >
//             {oauthLoading === 'facebook' ? (
//               <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//             ) : (
//               <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H7.9V12h2.6V9.8c0-2.57 1.53-3.99 3.87-3.99 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.79-1.68 1.6V12h2.86l-.46 2.88h-2.4v6.99A10 10 0 0 0 22 12z" />
//               </svg>
//             )}
//             Continue with Facebook
//           </button>

//           <button
//             type="button"
//             className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50"
//             onClick={() => handleOAuthLogin('Apple')}
//             disabled={oauthLoading === 'apple' || isLoading}
//           >
//             {oauthLoading === 'apple' ? (
//               <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
//             ) : (
//               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.5 3.51 7.7 8.42 7.32c1.74-.12 2.93.82 3.97.82 1.03 0 2.97-1.01 5.01-.86 2.53.19 3.97 1.45 4.85 3.08-4.89 2.93-4.13 8.39.8 9.92-.8 1.78-1.79 3.48-3.99 4.6-1.09.54-1.89.24-3.01-.6zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.27 2.18-1.66 4.19-3.74 4.25z" />
//               </svg>
//             )}
//             Continue with Apple
//           </button>
//         </div>

//         <div className="relative flex items-center justify-center my-6">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-4 bg-white text-gray-500 font-medium">or continue with email</span>
//           </div>
//         </div>

//         {response && (
//           <div className={`text-sm text-center p-3 rounded-lg mb-4 border ${
//             response.includes('successfully') 
//               ? 'bg-green-100 text-green-700 border-green-200' 
//               : 'bg-red-100 text-red-700 border-red-200'
//           }`}>
//             {response}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {isSignUp && (
//             <div>
//               <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className={`w-full px-4 py-3 rounded-xl border ${
//                   errors.name ? 'border-red-500' : 'border-gray-300'
//                 } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
//                 placeholder="Enter your full name"
//                 disabled={isLoading}
//               />
//               {errors.name && (
//                 <p className="text-red-600 text-xs mt-1">{errors.name}</p>
//               )}
//             </div>
//           )}

//           <div>
//             <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//               Email Address
//             </label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               required
//               value={formData.email}
//               onChange={handleInputChange}
//               className={`w-full px-4 py-3 rounded-xl border ${
//                 errors.email ? 'border-red-500' : 'border-gray-300'
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
//               placeholder="Enter your email"
//               disabled={isLoading}
//             />
//             {errors.email && (
//               <p className="text-red-600 text-xs mt-1">{errors.email}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
//               Password
//             </label>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               required
//               value={formData.password}
//               onChange={handleInputChange}
//               className={`w-full px-4 py-3 rounded-xl border ${
//                 errors.password ? 'border-red-500' : 'border-gray-300'
//               } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
//               placeholder="Enter your password"
//               disabled={isLoading}
//             />
//             {errors.password && (
//               <p className="text-red-600 text-xs mt-1">{errors.password}</p>
//             )}
//           </div>

//           {isSignUp && (
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Confirm Password
//               </label>
//               <Input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 className={`w-full px-4 py-3 rounded-xl border ${
//                   errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                 } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
//                 placeholder="Confirm your password"
//                 disabled={isLoading}
//               />

//               {errors.confirmPassword && (
//                 <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
//               )}
//             </div>
//           )}

//           {!isSignUp && (
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2 text-gray-600">
//                 <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
//                 <span>Remember me</span>
//               </label>
//               <button type="button" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
//                 Forgot password?
//               </button>
//             </div>
//           )}

//           <Button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 {isSignUp ? 'Creating Account...' : 'Signing In...'}
//               </div>
//             ) : (
//               isSignUp ? 'Create Account' : 'Sign In'
//             )}
//           </Button>
//         </form>

//         <div className="text-center text-sm mt-6 text-gray-600">
//           {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
//           <button
//             type="button"
//             onClick={switchMode}
//             className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
//             disabled={isLoading}
//           >
//             {isSignUp ? "Sign In" : "Create Account"}
//           </button>
//         </div>

//         {isSignUp && (
//           <p className="text-xs text-gray-500 text-center mt-4">
//             By creating an account, you agree to our{" "}
//             <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>{" "}
//             and{" "}
//             <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthService } from "../lib/utils"; // Make sure this matches your import path

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  provider?: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: User) => void;
  defaultSignUp?: boolean;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export default function LoginModal({ isOpen, onClose, onSuccess, defaultSignUp = false }: LoginModalProps) {
  const navigate = useNavigate();
  const [response, setResponse] = useState('');
  const [showSignupCTA, setShowSignupCTA] = useState(false);
  const [isSignUp, setIsSignUp] = useState(defaultSignUp);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  React.useEffect(() => {
    if (isOpen) {
      setIsSignUp(defaultSignUp);
    }
  }, [isOpen, defaultSignUp]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Clear response when user types
    if (response) {
      setResponse('');
      setShowSignupCTA(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (isSignUp) {
      // Name validation for signup
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
      
      // Password confirmation for signup
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!AuthService.isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (isSignUp) {
      const passwordValidation = AuthService.validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message!;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse('');
    setShowSignupCTA(false);
    setErrors({});
    
    // Validate form first
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    
    const { name, email, password } = formData;
    
    if (isSignUp) {
      // Handle Signup
      try {
        const result = await AuthService.signup(name, email, password);
        
        if (result.success) {
          if (result.user_info && result.token) {
            // Auto-login after successful signup (immediate redirect)
            setResponse('Account created successfully! Redirecting...');
            setTimeout(() => {
              onSuccess(result.user_info);
              onClose();
            }, 1000);
          } else {
            // Show success message and switch to login
            setResponse('Account created successfully! You can now sign in.');
            setShowSignupCTA(false);
            setTimeout(() => {
              setIsSignUp(false);
              setResponse('');
              setFormData({
                email: email, // Keep the email
                password: '',
                confirmPassword: '',
                name: '',
              });
              setErrors({});
            }, 2000);
          }
        } else {
          // Handle signup errors based on the message
          if (result.message && result.message.includes('email')) {
            setErrors({ email: result.message });
          } else {
            setResponse(result.message || 'Signup failed. Please try again.');
            setShowSignupCTA(false);
          }
        }
      } catch (error) {
        console.error('Signup error:', error);
        setResponse('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Handle Login
      try {
        const result = await AuthService.login(email, password);
        
        if (result.success && result.user_info) {
          setResponse('Login successful! Redirecting...');
          setShowSignupCTA(false);
          setTimeout(() => {
            onSuccess(result.user_info);
            onClose();
          }, 1000);
        } else {
          const msg = (result.message || 'Login failed. Please try again.');
          const isUnregistered = /not\s*registered|no\s*account|user\s*not\s*found|does\s*not\s*exist/i.test(msg);
          if (isUnregistered) {
            setResponse('You are not a registered candidate, sign up first');
            setShowSignupCTA(true);
          } else {
            setResponse(msg);
            setShowSignupCTA(false);
          }
        }
      } catch (error) {
        console.error('Login error:', error);
        setResponse('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // OAuth handlers with actual functionality
  const handleOAuthLogin = async (provider: string) => {
    setOauthLoading(provider.toLowerCase());
    setResponse('');
    setErrors({});
    setShowSignupCTA(false);
    
    try {
      if (provider.toLowerCase() === 'apple') {
        setResponse('Apple login is not available right now. Please use Google or Facebook.');
        return;
      }
      const result = await AuthService.oauthLogin(provider);
      
      if (result.success && result.user_info) {
        setResponse(`${provider} login successful! Redirecting...`);
        setShowSignupCTA(false);
        setTimeout(() => {
          onSuccess(result.user_info);
          onClose();
        }, 1000);
      } else {
        setResponse(result.message || `${provider} login failed. Please try again.`);
        setShowSignupCTA(false);
      }
    } catch (error) {
      console.error(`${provider} OAuth error:`, error);
      setResponse(`${provider} authentication failed. Please try again.`);
      setShowSignupCTA(false);
    } finally {
      setTimeout(() => {
        setOauthLoading(null);
      }, 1000);
    }
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setResponse('');
    setShowSignupCTA(false);
    setErrors({});
    // Clear form data when switching modes
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors z-10"
        >
          ×
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-600">
            {isSignUp 
              ? "Join our community and start your journey" 
              : "Sign in to your account to continue"
            }
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50"
            onClick={() => handleOAuthLogin('Google')}
            disabled={oauthLoading !== null || isLoading}
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
            onClick={() => handleOAuthLogin('Facebook')}
            disabled={oauthLoading !== null || isLoading}
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
            onClick={() => handleOAuthLogin('Apple')}
            disabled={oauthLoading !== null || isLoading}
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

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">or continue with email</span>
          </div>
        </div>

        {response && (
          <div className={`text-sm text-center p-3 rounded-lg mb-4 border ${
            response.includes('successfully') || response.includes('successful') 
              ? 'bg-green-100 text-green-700 border-green-200' 
              : 'bg-red-100 text-red-700 border-red-200'
          }`}>
            {response}
          </div>
        )}

        {!isSignUp && showSignupCTA && (
          <div className="text-center -mt-3 mb-4">
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              disabled={isLoading || oauthLoading !== null}
            >
              Create Account / Sign Up
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

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
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
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
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                placeholder="Confirm your password"
                disabled={isLoading}
              />

              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {!isSignUp && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || oauthLoading !== null}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </Button>
        </form>

        <div className="text-center text-sm mt-6 text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={switchMode}
            className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
            disabled={isLoading || oauthLoading !== null}
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </div>

        {isSignUp && (
          <p className="text-xs text-gray-500 text-center mt-4">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        )}
      </div>
    </div>
  );
}