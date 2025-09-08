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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real auth/signup logic
    console.log(isSignUp ? "Sign Up:" : "Sign In:", formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold">
            {isSignUp ? t("login.createAccount") : t("login.title")}
          </h2>
          <p className="text-sm text-gray-600">
            {isSignUp ? t("login.noAccount") : t("login.haveAccount")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("login.email")}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border px-3 py-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("login.password")}
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border px-3 py-2"
              placeholder="••••••••"
            />
          </div>

          {isSignUp && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                {t("login.confirmPassword")}
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border px-3 py-2"
                placeholder="••••••••"
              />
            </div>
          )}

          {!isSignUp && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>{t("login.rememberMe")}</span>
              </label>
              <button type="button" className="text-blue-600 hover:underline">
                {t("login.forgotPassword")}
              </button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium"
          >
            {isSignUp ? t("login.createAccount") : t("login.signIn")}
          </Button>

          <div className="relative flex items-center justify-center mt-6 mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{t("login.orContinueWith")}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-2">
            <button
              type="button"
              className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
              onClick={() => console.log('Google login')}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>

            <button
              type="button"
              className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
              onClick={() => console.log('Facebook login')}
            >
              <svg className="h-5 w-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H7.9V12h2.6V9.8c0-2.57 1.53-3.99 3.87-3.99 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.79-1.68 1.6V12h2.86l-.46 2.88h-2.4v6.99A10 10 0 0 0 22 12z" />
              </svg>
            </button>

            <button
              type="button"
              className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
              onClick={() => console.log('Apple login')}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.5 3.51 7.7 8.42 7.32c1.74-.12 2.93.82 3.97.82 1.03 0 2.97-1.01 5.01-.86 2.53.19 3.97 1.45 4.85 3.08-4.89 2.93-4.13 8.39.8 9.92-.8 1.78-1.79 3.48-3.99 4.6-1.09.54-1.89.24-3.01-.6zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.27 2.18-1.66 4.19-3.74 4.25z" />
              </svg>
            </button>
          </div>
        </form>

        <div className="text-center text-sm mt-4">
          {isSignUp ? t("login.haveAccount") : t("login.noAccount")}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp((s) => !s)}
            className="text-blue-600 font-medium hover:underline"
          >
            {isSignUp ? t("login.signIn") : t("login.createAccount")}
          </button>
        </div>
      </div>
    </div>
  );
}