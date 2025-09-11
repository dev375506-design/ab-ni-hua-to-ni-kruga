// import React, { useState } from "react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useI18n } from "@/context/i18n";

// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
//   const { t } = useI18n();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   if (!isOpen) return null;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // TODO: replace with real auth/signup logic
//     console.log(isSignUp ? "Sign Up:" : "Sign In:", formData);
//     onClose();
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div
//         className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-lg"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           aria-label="Close"
//           className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
//         >
//           ✕
//         </button>

//         <div className="text-center mb-4">
//           <h2 className="text-2xl font-semibold">
//             {isSignUp ? t("login.createAccount") : t("login.title")}
//           </h2>
//           <p className="text-sm text-gray-600">
//             {isSignUp ? t("login.noAccount") : t("login.haveAccount")}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               {t("login.email")}
//             </label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border px-3 py-2"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               {t("login.password")}
//             </label>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border px-3 py-2"
//               placeholder="••••••••"
//             />
//           </div>

//           {isSignUp && (
//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 {t("login.confirmPassword")}
//               </label>
//               <Input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border px-3 py-2"
//                 placeholder="••••••••"
//               />
//             </div>
//           )}

//           {!isSignUp && (
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" className="rounded" />
//                 <span>{t("login.rememberMe")}</span>
//               </label>
//               <button type="button" className="text-blue-600 hover:underline">
//                 {t("login.forgotPassword")}
//               </button>
//             </div>
//           )}

//           <Button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md font-medium"
//           >
//             {isSignUp ? t("login.createAccount") : t("login.signIn")}
//           </Button>

//           <div className="relative flex items-center justify-center mt-6 mb-4">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">{t("login.orContinueWith")}</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-3 mt-2">
//             <button
//               type="button"
//               className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
//               onClick={() => console.log('Google login')}
//             >
//               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
//                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//               </svg>
//             </button>

//             <button
//               type="button"
//               className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
//               onClick={() => console.log('Facebook login')}
//             >
//               <svg className="h-5 w-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H7.9V12h2.6V9.8c0-2.57 1.53-3.99 3.87-3.99 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.79-1.68 1.6V12h2.86l-.46 2.88h-2.4v6.99A10 10 0 0 0 22 12z" />
//               </svg>
//             </button>

//             <button
//               type="button"
//               className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
//               onClick={() => console.log('Apple login')}
//             >
//               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.5 3.51 7.7 8.42 7.32c1.74-.12 2.93.82 3.97.82 1.03 0 2.97-1.01 5.01-.86 2.53.19 3.97 1.45 4.85 3.08-4.89 2.93-4.13 8.39.8 9.92-.8 1.78-1.79 3.48-3.99 4.6-1.09.54-1.89.24-3.01-.6zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.27 2.18-1.66 4.19-3.74 4.25z" />
//               </svg>
//             </button>
//           </div>
//         </form>

//         <div className="text-center text-sm mt-4">
//           {isSignUp ? t("login.haveAccount") : t("login.noAccount")}{" "}
//           <button
//             type="button"
//             onClick={() => setIsSignUp((s) => !s)}
//             className="text-blue-600 font-medium hover:underline"
//           >
//             {isSignUp ? t("login.signIn") : t("login.createAccount")}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/context/i18n";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useI18n();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/signin';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store JWT token
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setOauthLoading('google');
    try {
      // Initialize Google OAuth
      if (typeof window !== 'undefined' && window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: async (response: any) => {
            try {
              const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential: response.credential }),
              });
              const data = await res.json();
              if (data.success) {
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard';
              }
            } catch (error) {
              console.error('Google login error:', error);
              alert('Google login failed');
            }
          }
        });
        window.google.accounts.id.prompt();
      } else {
        // Fallback to popup method
        window.open(
          `https://accounts.google.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${window.location.origin}/api/auth/google/callback&response_type=code&scope=openid email profile`,
          'google-login',
          'width=500,height=600'
        );
      }
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Google login failed');
    } finally {
      setOauthLoading(null);
    }
  };

  const handleFacebookLogin = async () => {
    setOauthLoading('facebook');
    try {
      // Initialize Facebook SDK if not already done
      if (typeof window !== 'undefined' && !window.FB) {
        await loadFacebookSDK();
      }
      
      window.FB.login(async (response: any) => {
        if (response.authResponse) {
          try {
            const res = await fetch('/api/auth/facebook', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                accessToken: response.authResponse.accessToken,
                userID: response.authResponse.userID 
              }),
            });
            const data = await res.json();
            if (data.success) {
              localStorage.setItem('token', data.token);
              window.location.href = '/dashboard';
            }
          } catch (error) {
            console.error('Facebook login error:', error);
            alert('Facebook login failed');
          }
        } else {
          alert('Facebook login cancelled');
        }
        setOauthLoading(null);
      }, { scope: 'email,public_profile' });
    } catch (error) {
      console.error('Facebook login failed:', error);
      alert('Facebook login failed');
      setOauthLoading(null);
    }
  };

  const handleAppleLogin = async () => {
    setOauthLoading('apple');
    try {
      if (typeof window !== 'undefined' && window.AppleID) {
        const response = await window.AppleID.auth.signIn();
        if (response.authorization) {
          const res = await fetch('/api/auth/apple', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              identityToken: response.authorization.id_token,
              authorizationCode: response.authorization.code,
            }),
          });
          const data = await res.json();
          if (data.success) {
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
          }
        }
      } else {
        alert('Apple Sign In not available');
      }
    } catch (error) {
      console.error('Apple login failed:', error);
      alert('Apple login failed');
    } finally {
      setOauthLoading(null);
    }
  };

  const loadFacebookSDK = () => {
    return new Promise((resolve) => {
      if (document.getElementById('facebook-jssdk')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.onload = () => {
        window.FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
        resolve(true);
      };
      document.head.appendChild(script);
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
        className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors"
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
            onClick={handleGoogleLogin}
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
            onClick={handleFacebookLogin}
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
            onClick={handleAppleLogin}
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

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">or continue with email</span>
          </div>
        </div>

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
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Enter your full name"
              />
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
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Enter your password"
            />
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
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Confirm your password"
              />
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
            disabled={isLoading}
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
            onClick={() => setIsSignUp((s) => !s)}
            className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
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

// Extend window type for TypeScript
declare global {
  interface Window {
    google: any;
    FB: any;
    AppleID: any;
  }
}