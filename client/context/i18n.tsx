import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type LanguageCode = "en" | "hi" | "mr";

type TranslationMap = Record<string, Record<LanguageCode, string>>;

const translations: TranslationMap = {
  // Navigation
  "nav.home": { en: "Home", hi: "होम", mr: "होम" },
  "nav.about": { en: "About", hi: "परिचय", mr: "आमच्याबद्दल" },
  "nav.how": { en: "How it Works", hi: "यह कैसे काम करता है", mr: "हे कसे काम करते" },
  "nav.internships": { en: "Internships", hi: "इंटर्नशिप", mr: "इंटर्नशिप" },
  "nav.signup": { en: "Sign Up", hi: "साइन अप", mr: "साइन अप" },

  // Hero Section
  "hero.tag": { en: "\"DISCOVER INTERNSHIPS MADE FOR YOU\"", hi: "\"आपके लिए बनी इंटर्नशिप खोजें\"", mr: "\"तुमच्यासाठी बनवलेल्या इंटर्नशिप शोधा\"" },
  "hero.title1": { en: "Internमित्र –", hi: "Internमित्र –", mr: "Internमित्र –" },
  "hero.title2": { en: "Your Smart Guide to the", hi: "आपका स्मार्ट मार्गदर्शक", mr: "तुमचा स्मार्ट मार्गदर्शक" },
  "hero.title3": { en: "Right Internship", hi: "सही इंटर्नशिप", mr: "योग्य इंटर्नशिप" },
  "hero.desc": {
    en: "Internमित्र helps you find the perfect internship that matches your skills, interests, and location — in just a few clicks!",
    hi: "Internमित्र आपके कौशल, रुचि और स्थान के अनुसार सही इंटर्नशिप ढूँढने में मदद करता है — बस कुछ क्लिक में!",
    mr: "Internमित्र तुमच्या कौशल्य, आवड आणि स्थानानुसार योग्य इंटर्नशिप शोधण्यात मदत करते — फक्त काही क्लिकमध्ये!"
  },
  "hero.cta": { en: "Find My Internship", hi: "मेरी इंटर्नशिप खोजें", mr: "माझी इंटर्नशिप शोधा" },
  
  // Footer
  "footer.title": { en: "Your Smart Guide to the Right Internship", hi: "सही इंटर्नशिप के लिए आपका स्मार्ट मार्गदर्शक", mr: "योग्य इंटर्नशिपसाठी तुमचा स्मार्ट मार्गदर्शक" },
  "footer.email": { en: "Email: support@internmitra.com", hi: "ईमेल: support@internmitra.com", mr: "ईमेल: support@internmitra.com" },
  "footer.phone": { en: "Phone: +91-XXXXXXXXXX", hi: "फोन: +91-XXXXXXXXXX", mr: "फोन: +91-XXXXXXXXXX" },
  "footer.address": { en: "Address: New Delhi, India", hi: "पता: नई दिल्ली, भारत", mr: "पत्ता: नवी दिल्ली, भारत" },
  "footer.quickLinks": { en: "Quick Links", hi: "त्वरित लिंक", mr: "त्वरित लिंक्स" },
  "footer.resources": { en: "Resources", hi: "संसाधन", mr: "संसाधने" },
  "footer.support": { en: "Support", hi: "सहायता", mr: "सहाय्य" },
  "footer.followUs": { en: "follow us", hi: "हमें फॉलो करें", mr: "आम्हाला फॉलो करा" },
  "footer.copyright": { en: "© 2024 Internमित्र - PM Internship Scheme. All rights reserved.", hi: "© 2024 Internमित्र - पीएम इंटर्नशिप योजना. सर्वाधिकार सुरक्षित।", mr: "© 2024 Internमित्र - पीएम इंटर्नशिप योजना. सर्व हक्क राखीव." },
  "footer.initiative": { en: "An initiative by the Government of India", hi: "भारत सरकार द्वारा एक पहल", mr: "भारत सरकारद्वारे एक उपक्रम" },
  "footer.madeWith": { en: "Made with ❤️ for the youth of India", hi: "भारत के युवाओं के लिए ❤️ से बनाया गया", mr: "भारतातील युवकांसाठी ❤️ ने बनवले" },
  
  // Login/Signup
  "login.title": { en: "Sign In", hi: "साइन इन करें", mr: "साइन इन करा" },
  "login.email": { en: "Email", hi: "ईमेल", mr: "ईमेल" },
  "login.password": { en: "Password", hi: "पासवर्ड", mr: "पासवर्ड" },
  "login.confirmPassword": { en: "Confirm Password", hi: "पासवर्ड की पुष्टि करें", mr: "पासवर्डची पुष्टी करा" },
  "login.rememberMe": { en: "Remember me", hi: "मुझे याद रखें", mr: "मला लक्षात ठेवा" },
  "login.forgotPassword": { en: "Forgot password?", hi: "पासवर्ड भूल गए?", mr: "पासवर्ड विसरलात?" },
  "login.submit": { en: "Sign In", hi: "साइन इन करें", mr: "साइन इन करा" },
  "login.noAccount": { en: "Don't have an account?", hi: "खाता नहीं है?", mr: "खाते नाही?" },
  "login.createAccount": { en: "Sign Up", hi: "साइन अप करें", mr: "साइन अप करा" },
  "login.haveAccount": { en: "Already have an account?", hi: "पहले से ही खाता है?", mr: "आधीपासून खाते आहे?" },
  "login.signIn": { en: "Sign In", hi: "साइन इन करें", mr: "साइन इन करा" },
  "login.orContinueWith": { en: "or continue with", hi: "या इसके साथ जारी रखें", mr: "किंवा यासह सुरू ठेवा" },
  
  // 404 Page
  "notFound.title": { en: "404", hi: "404", mr: "404" },
  "notFound.message": { en: "Oops! Page not found", hi: "उफ़! पेज नहीं मिला", mr: "अरेरे! पेज सापडला नाही" },
  "notFound.returnHome": { en: "Return to Home", hi: "होम पेज पर वापस जाएं", mr: "होम पेजवर परत जा" },
  
  // Chat Page
  "chat.welcome": { en: "Hello! I'm Internमित्र. Tell me your interests and location, I'll find internships for you.", hi: "नमस्ते! मैं Internमित्र हूँ। मुझे अपनी रुचियां और स्थान बताएं, मैं आपके लिए इंटर्नशिप खोजूंगा।", mr: "नमस्कार! मी Internमित्र आहे. मला तुमच्या आवडी आणि स्थान सांगा, मी तुमच्यासाठी इंटर्नशिप शोधेन." },
  "chat.searching": { en: "Searching internships for:", hi: "इंटर्नशिप खोज रहा है:", mr: "यासाठी इंटर्नशिप शोधत आहे:" },
  "chat.speechNotSupported": { en: "Speech recognition is not supported in this browser.", hi: "इस ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है।", mr: "या ब्राउझरमध्ये स्पीच रेकग्निशन समर्थित नाही." }
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


