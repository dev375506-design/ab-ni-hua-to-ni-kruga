import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type LanguageCode = "en" | "hi";

type TranslationMap = Record<string, Record<LanguageCode, string>>;

const translations: TranslationMap = {
  "nav.home": { en: "Home", hi: "होम" },
  "nav.about": { en: "About", hi: "परिचय" },
  "nav.how": { en: "How it Works", hi: "यह कैसे काम करता है" },
  "nav.internships": { en: "Internships", hi: "इंटर्नशिप" },
  "nav.signup": { en: "Sign Up", hi: "साइन अप" },

  "hero.tag": { en: "\"DISCOVER INTERNSHIPS MADE FOR YOU\"", hi: "\"आपके लिए बनी इंटर्नशिप खोजें\"" },
  "hero.title1": { en: "Internमित्र –", hi: "Internमित्र –" },
  "hero.title2": { en: "Your Smart Guide to the", hi: "आपका स्मार्ट मार्गदर्शक" },
  "hero.title3": { en: "Right Internship", hi: "सही इंटर्नशिप" },
  "hero.desc": {
    en: "Internमित्र helps you find the perfect internship that matches your skills, interests, and location — in just a few clicks!",
    hi: "Internमित्र आपके कौशल, रुचि और स्थान के अनुसार सही इंटर्नशिप ढूँढने में मदद करता है — बस कुछ क्लिक में!",
  },
  "hero.cta": { en: "Find My Internship", hi: "मेरी इंटर्नशिप खोजें" },
};

type I18nContextValue = {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    return (stored as LanguageCode) || "en";
  });

  const setLang = useCallback((next: LanguageCode) => {
    setLangState(next);
    try {
      window.localStorage.setItem("lang", next);
    } catch {}
  }, []);

  useEffect(() => {
    // keep document lang attribute updated
    try {
      document.documentElement.lang = lang;
    } catch {}
  }, [lang]);

  const t = useCallback((key: string) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] ?? entry.en;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
};


