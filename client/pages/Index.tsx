import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ImgWithFallback from "@/components/ImgWithFallback";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/context/i18n";
import LoginModal from "@/components/LoginModal";
import PageTransition from "@/components/PageTransition";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedText from "@/components/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";

export default function Index() {
  const { t, lang, setLang } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setIsLoading(false);
  }, []);

  const handleSubscribe = () => {
    if (!email || email.trim() === "") {
      alert("Please enter your email address");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
    }, 1500);
  };

  const resetSubscription = () => {
    setIsSubscribed(false);
    setEmail("");
  };

  const handleAuthSuccess = (user: any) => {
    console.log("Authentication successful", user);
    // Store user data in localStorage to persist through page navigation
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token || 'demo-token');
    // Navigate to dashboard using proper routing
    window.location.href = "/dashboard";
  };

  // Handle sign up button clicks
  
  const handleSignUpClick = () => {
  setIsLoginOpen(true);
};

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      try {
        const newHash = `#${id}`;
        if (window.location.hash !== newHash) {
          window.history.replaceState(null, "", newHash);
        }
      } catch {}
    } else if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      try { window.history.replaceState(null, "", "/"); } catch {}
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-intern-bg">
        {/* Navigation */}
        <motion.nav 
          className="w-full py-4 px-6 lg:px-20 bg-intern-bg shadow fixed top-0 left-0 right-0 z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="bg-intern-bg px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-lg">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-medium font-poppins">
                  <span className="text-intern-purple">Intern</span>
                  <span className="text-intern-red">मित्र</span>
                </span>
              </div>
            </motion.div>

            {/* Hamburger button (only on mobile) */}
            <motion.button
              className="lg:hidden text-intern-text text-2xl px-2 py-1 absolute left-1/2 -translate-x-1/2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
              animate={{ 
                rotateZ: menuOpen ? 45 : 0,
                scale: menuOpen ? 0.9 : 1}}
                transition={{ duration: 0.3 }}
                >
                  {menuOpen ? "✕" : "☰"}
                  </motion.span>
            </motion.button>

            {/* Desktop Menu */}
            <motion.div
              className="hidden lg:flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.button 
                onClick={() => scrollToSection("hero")} 
                className="text-intern-text hover:text-intern-dark"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {t("nav.home")}
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection("categories")} 
                className="text-intern-text hover:text-intern-dark"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {t("nav.internships")}
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection("how-it-works")} 
                className="text-intern-text hover:text-intern-dark"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                {t("nav.how")}
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection("about")} 
                className="text-intern-text hover:text-intern-dark"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {t("nav.about")}
              </motion.button>
              <motion.button
                onClick={handleSignUpClick}
                className="text-intern-text hover:text-intern-dark transition-colors font-poppins"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Sign Up
              </motion.button>
              <Link to="/login">
                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-poppins"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Login
                </motion.button>
              </Link>
              {/* Language Dropdown */}
              <div className="relative">
                <motion.button
                  type="button"
                  className="flex items-center gap-1 text-intern-text hover:text-intern-dark transition-colors font-poppins focus:outline-none"
                  onClick={() => setLangOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {lang.toUpperCase()}
                  <motion.svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    animate={{ rotate: langOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </motion.button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.ul
                      className="absolute right-0 mt-2 w-32 bg-intern-bg border rounded shadow-lg z-50"
                      role="listbox"
                      tabIndex={-1}
                      onMouseLeave={() => setLangOpen(false)}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.li
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.2 }}
                      >
                        <motion.button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 font-poppins"
                          onClick={() => { setLang("en"); setLangOpen(false); }}
                          whileHover={{ x: 2 }}
                        >
                          English (EN)
                        </motion.button>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                      >
                        <motion.button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 font-poppins"
                          onClick={() => { setLang("hi"); setLangOpen(false); }}
                          whileHover={{ x: 2 }}
                        >
                          हिंदी (HI)
                        </motion.button>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.2 }}
                      >
                        <motion.button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 font-poppins"
                          onClick={() => setLangOpen(false)}
                          whileHover={{ x: 2 }}
                        >
                          मराठी (MR)
                        </motion.button>
                      </motion.li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Mobile right actions - Only Login button */}
            <motion.div 
              className="lg:hidden flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Link to="/login">
                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-lg font-poppins"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Login
                </motion.button>
              </Link>
              <div className="relative">
                <motion.button
                  type="button"
                  className="flex items-center gap-1 text-intern-text hover:text-intern-dark transition-colors font-poppins focus:outline-none"
                  onClick={() => setLangOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {lang.toUpperCase()}
                  <motion.svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    animate={{ rotate: langOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </motion.button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.ul
                      className="absolute right-0 mt-2 w-32 bg-intern-bg border rounded shadow-lg z-50"
                      role="listbox"
                      tabIndex={-1}
                      onMouseLeave={() => setLangOpen(false)}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.li
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.2 }}
                      >
                        <motion.button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 font-poppins"
                          onClick={() => { setLang("en"); setLangOpen(false); }}
                          whileHover={{ x: 2 }}
                        >
                          English (EN)
                        </motion.button>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                      >
                        <motion.button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 font-poppins"
                          onClick={() => { setLang("hi"); setLangOpen(false); }}
                          whileHover={{ x: 2 }}
                        >
                          हिंदी (HI)
                        </motion.button>
                      </motion.li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Mobile Menu (hamburger content) - Sign Up is here */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div 
                className="lg:hidden fixed inset-x-0 top-[60px] z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.1 }}
              >
                <motion.div 
                  className="mx-4 mt-3 flex flex-col gap-3 px-6 py-4 bg-intern-bg rounded shadow"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.button 
                    className="text-intern-text text-left" 
                    onClick={() => { setMenuOpen(false); scrollToSection("hero"); }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    whileHover={{ x: 5 }}
                  >
                    {t("nav.home")}
                  </motion.button>
                  <motion.button 
                    className="text-intern-text text-left" 
                    onClick={() => { setMenuOpen(false); scrollToSection("about"); }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                    whileHover={{ x: 5 }}
                  >
                    {t("nav.about")}
                  </motion.button>
                  <motion.button 
                    className="text-intern-text text-left" 
                    onClick={() => { setMenuOpen(false); scrollToSection("how-it-works"); }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                    whileHover={{ x: 5 }}
                  >
                    {t("nav.how")}
                  </motion.button>
                  <motion.button 
                    className="text-intern-text text-left" 
                    onClick={() => { setMenuOpen(false); scrollToSection("categories"); }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.2 }}
                    whileHover={{ x: 5 }}
                  >
                    {t("nav.internships")}
                  </motion.button>
                  {/* Sign Up in mobile hamburger menu */}
                  <motion.button
                    className="text-intern-text text-left font-medium"
                    onClick={() => { 
                      setMenuOpen(false); 
                      handleSignUpClick(); 
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.2 }}
                    whileHover={{ x: 5 }}
                  >
                    Sign Up
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
        {/* Hero Section */}
        <section id="hero" className="relative pt-24 pb-16 px-6 lg:px-20 mt-10">
          {/* Background image behind hero */}
          <div className="absolute top-0 right-0 z-0 w-[62vw] md:w-[58vw] h-[68vh] md:h-[72vh] lg:h-[76vh] rounded-l-[220px] rounded-bl-[300px] overflow-hidden bg-[#f2e6da] pointer-events-none" aria-hidden>
            <ImgWithFallback
              src="/placeholder.svg"
              alt=""
              width={500}
              height={300}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-10"
            />
          </div>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Badge className="bg-transparent border-none p-0 text-lg lg:text-xl font-bold text-orange-600 uppercase">
                    {t("hero.tag")}
                  </Badge>
                </motion.div>
                <div>
                  <AnimatedText
                    text={t("hero.title1")}
                    tag="h1"
                    delay={0.3}
                    className="text-3xl lg:text-6xl xl:text-7xl font-bold font-volkhov leading-tight text-intern-primary"
                  />
                  <AnimatedText
                    text={t("hero.title2")}
                    tag="h1"
                    delay={0.4}
                    className="text-3xl lg:text-6xl xl:text-7xl font-bold font-volkhov leading-tight text-intern-primary"
                  />
                  <AnimatedText
                    text={t("hero.title3")}
                    tag="h1"
                    delay={0.5}
                    className="text-3xl lg:text-6xl xl:text-7xl font-bold font-volkhov leading-tight text-intern-primary"
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  className="text-lg lg:text-xl text-intern-text font-poppins max-w-md leading-relaxed"
                >
                  {t("hero.desc")}
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button
                  asChild
                  className="bg-intern-orange hover:bg-intern-orange/90 text-white px-8 py-6 text-lg rounded-lg font-poppins"
                >
                  <Link to="/chat" className="inline-flex items-center gap-3">
                    <span>{t("hero.cta")}</span>
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21L16.7 16.7" />
                    </svg>
                  </Link>
                </Button>
              </motion.div>
            </div>
            <div className="relative" />
          </div>
          {/* Trust Indicators */}
          <AnimatedSection delay={0.7} className="mt-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              <AnimatedSection delay={0.8} className="space-y-2">
                  <div className="w-20 h-20 mx-auto bg-intern-green rounded-full flex items-center justify-center transition-transform hover:scale-105">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 text-intern-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-blue-600 font-poppins font-medium">
                    500+ Companies
                    <br />
                    Trusted Partners
                  </h3>
                </AnimatedSection>
                <AnimatedSection delay={0.9} className="space-y-2">
                  <div className="w-20 h-20 mx-auto bg-intern-green rounded-full flex items-center justify-center transition-transform hover:scale-105">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 text-intern-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M8 6a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6h1" />
                      <path d="M16 6a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6h-1" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <path d="M8 22v-2M16 22v-2" />
                    </svg>
                  </div>
                  <h3 className="text-blue-400 font-poppins font-medium">
                    AI-Powered
                    <br />
                    Smart Matching
                  </h3>
                </AnimatedSection>
                <AnimatedSection delay={1.0} className="space-y-2">
                  <div className="w-20 h-20 mx-auto bg-intern-green rounded-full flex items-center justify-center transition-transform hover:scale-105">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 text-intern-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M8 21l4-8 4 8" />
                    <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
                    <path d="M9.5 7.5l2.5-1 2.5 1-1.5 1.5.5 2.5-2-1-2 1 .5-2.5z" />
                  </svg>
                  </div>
                  <h3 className="text-blue-300 font-poppins font-medium">
                    10,000+
                    <br />
                    Success Stories
                  </h3>
                </AnimatedSection>
              {/* Step 4 */}
          </div>
        </AnimatedSection>
      </section>

      {/* How It Works Section */} 
      <section id="how-it-works" className="py-16 px-6 lg:px-20 bg-intern-bg scroll-mt-24">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <AnimatedSection direction="up" className="space-y-4">
            <h2 className="text-lg font-bold text-intern-text uppercase font-poppins tracking-wide">
              CATEGORY
            </h2>
            <AnimatedText
              text={`How Internमित्र Works`}
              tag="h3"
              className="text-4xl lg:text-5xl font-bold font-volkhov text-intern-dark"
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            {/* Step 1 */}
            <AnimatedSection delay={0.1} className="text-center space-y-6 group">
              <div className="relative mx-auto w-48 h-48 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl shadow-xl transition group-hover:shadow-2xl"></div>
                <div className="relative p-8 flex flex-col items-center justify-center h-full">
                  <svg viewBox="0 0 24 24" className="w-16 h-16 text-intern-dark mb-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
                  </svg>
                  <div className="space-y-2 text-center">
                    <p className="text-intern-text font-poppins text-sm leading-relaxed">
                      Tell us about your education, skills, and interests in
                      just 2 minutes
                    </p>
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-intern-dark font-poppins">
                Create Your Profile
              </h4>
            </AnimatedSection>
            {/* Step 2 */}
          <AnimatedSection delay={0.2} className="text-center space-y-6 group">
                <div className="relative mx-auto w-48 h-48 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl shadow-xl transition group-hover:shadow-2xl"></div>
                  <div className="relative p-8 flex flex-col items-center justify-center h-full">
                    <svg viewBox="0 0 24 24" className="w-16 h-16 text-intern-dark mb-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="3" y="8" width="18" height="12" rx="2" ry="2" />
                      <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                      <line x1="12" y1="12" x2="12" y2="16" />
                      <line x1="10" y1="14" x2="14" y2="14" />
                    </svg>
                    <div className="space-y-2 text-center">
                      <p className="text-intern-text font-poppins text-sm leading-relaxed">
                        Begin your career with confidence and grow with
                        experienced mentors
                      </p>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-intern-dark font-poppins">
                  Start Your Journey
                </h4>
          </AnimatedSection>
            <AnimatedSection delay={0.3} className="text-center space-y-6 group">
              <div className="relative mx-auto w-48 h-48 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl shadow-xl transition group-hover:shadow-2xl"></div>
                <div className="relative p-8 flex flex-col items-center justify-center h-full">
                  <svg viewBox="0 0 24 24" className="w-16 h-16 text-intern-dark mb-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 .553-.894L9 2" />
                    <path d="M15 4l5.447 2.724A1 1 0 0 1 21 7.618v10.764a1 1 0 0 1-.553.894L15 22" />
                    <path d="M9 12V2" />
                    <path d="M15 12V2" />
                    <path d="M9 12a3 3 0 0 0 6 0" />
                  </svg>
                  <div className="space-y-2 text-center">
                    <p className="text-intern-text font-poppins text-sm leading-relaxed">
                      Get personalized recommendations and apply to internships
                      that match your profile
                    </p>
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-intern-dark font-poppins">
                AI Finds Matches
              </h4>
            </AnimatedSection>
            {/* Step 3 */}
            <AnimatedSection delay={0.4} className="text-center space-y-6 group">
              <div className="relative mx-auto w-48 h-48 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl shadow-xl transition group-hover:shadow-2xl"></div>
                <div className="relative p-8 flex flex-col items-center justify-center h-full">
                  <svg viewBox="0 0 24 24" className="w-16 h-16 text-intern-dark mb-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h.01" />
                    <path d="M12 12h.01" />
                    <path d="M16 12h.01" />
                  </svg>
                  <div className="space-y-2 text-center">
                    <p className="text-intern-text font-poppins text-sm leading-relaxed">
                      Get personalized recommendations and apply to internships
                      that match your profile
                    </p>
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-intern-dark font-poppins">
                Review & Apply
              </h4>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="categories" className="py-16 px-6 lg:px-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold font-volkhov text-intern-dark">
              Why Choose Intern<span className="text-intern-orange">मित्र</span>
              ?
            </h3>
            <p className="text-lg text-brown-700 font-carter max-w-4xl mx-auto">
              We're not just a platform - we're your trusted partner in building
              a successful career. Here's what makes us different.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-intern-blue text-white p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-intern-success">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-intern-green rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-intern-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M8 6a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6h1" />
                    <path d="M16 6a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6h-1" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M8 22v-2M16 22v-2" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-intern-success font-poppins">
                  AI Powered Matching
                </h4>
                <p className="text-white/90 font-poppins">
                  Smart recommendations tailored to your skills & interests.
                </p>
              </div>
            </Card>
            {/* Feature 2 */}
            <Card className="bg-intern-blue text-white p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-intern-success">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-intern-green rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-intern-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-intern-success font-poppins">
                  Verified Internships
                </h4>
                <p className="text-white/90 font-poppins">
                  All opportunities come from trusted companies — safe &
                  authentic.
                </p>
              </div>
            </Card>
            {/* Feature 3 */}
            <Card className="bg-intern-blue text-white p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-intern-success">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-intern-green rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-intern-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M8 21v-2a4 4 0 0 0-4-4H2a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                </div>
                <h4 className="text-xl font-bold text-intern-success font-poppins">
                  Instant Updates
                </h4>
                <p className="text-white/90 font-poppins">
                  Get notified about new internships & application status in
                  real-time.
                </p>
              </div>
            </Card>
            {/* Feature 4 */}
            <Card className="bg-intern-blue text-white p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-intern-success">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-intern-green rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-intern-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-intern-success font-poppins">
                  Inclusive Support
                </h4>
                <p className="text-white/90 font-poppins">
                  Built for first-gen learners with multilingual guidance.
                </p>
              </div>
            </Card>
            {/* Feature 5 */}
            <Card className="bg-intern-blue text-white p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-intern-success">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-intern-green rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-intern-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a7 7 0 0 1 0 20" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-intern-success font-poppins">
                  Pan-India Access
                </h4>
                <p className="text-white/90 font-poppins">
                  From rural villages to big cities — opportunities everywhere.
                </p>
              </div>
            </Card>
            {/* Feature 6 */}
            <Card className="bg-intern-blue text-white p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-intern-success">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-intern-green rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-intern-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                    <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
                    <path d="M5 9a3 3 0 0 1-3-3V4h5" />
                    <path d="M19 9a3 3 0 0 0 3-3V4h-5" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-intern-success font-poppins">
                  Success Tracking
                </h4>
                <p className="text-white/90 font-poppins">
                  Monitor applications, progress & celebrate achievements
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-green-200 rounded-2xl px-8 py-4 inline-flex items-center gap-3 justify-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-green-700"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="currentColor"
                opacity="0.15"
              />
              <path
                fill="currentColor"
                d="M12 3l2.1 4.26 4.7.68-3.4 3.31.8 4.75L12 13.9 7.8 16l.8-4.75L5.2 7.94l4.7-.68L12 3z"
              />
            </svg>
            <p className="text-green-800 font-bold text-xl font-poppins">
              Trusted by 50,000+ students nationwide
            </p>
          </div>
        </div>
      </section>

      {/* Internship Categories */}
      <section id="about" className="py-16 px-6 lg:px-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold font-poppins text-black">
              Explore Internship Categories
            </h3>
            <p className="text-2xl text-intern-gray font-bold font-poppins max-w-4xl mx-auto">
              Discover opportunities across diverse sectors. From technology to
              healthcare, find internships that align with your passion and
              career goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Technology & IT */}
            <Card className="bg-white/40 p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-black font-poppins">
                  Technology & IT
                </h4>
                <p className="text-black font-poppins">
                  Software development, web design, data analysis
                </p>
                <Button className="bg-gray-300 text-black hover:bg-gray-400 font-poppins font-semibold">
                  Explore Opportunities
                </Button>
              </div>
            </Card>
            {/* Business & Finance */}
            <Card className="bg-white/40 p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-black font-poppins">
                  Business & Finance
                </h4>
                <p className="text-black font-poppins">
                  Marketing, sales, accounting, business operations
                </p>
                <Button className="bg-gray-300 text-black hover:bg-gray-400 font-poppins font-semibold">
                  Explore Opportunities
                </Button>
              </div>
            </Card>
            {/* Healthcare */}
            <Card className="bg-white/40 p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-black font-poppins">
                  Healthcare
                </h4>
                <p className="text-black font-poppins">
                  Medical assistance, healthcare administration
                </p>
                <Button className="bg-gray-300 text-black hover:bg-gray-400 font-poppins font-semibold">
                  Explore Opportunities
                </Button>
              </div>
            </Card>
            {/* Creative & Design */}
            <Card className="bg-white/40 p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-black font-poppins">
                  Creative & Design
                </h4>
                <p className="text-black font-poppins">
                  Graphic design, content creation, multimedia
                </p>
                <Button className="bg-gray-300 text-black hover:bg-gray-400 font-poppins font-semibold">
                  Explore Opportunities
                </Button>
              </div>
            </Card>
            {/* Engineering */}
            <Card className="bg-white/40 p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-black font-poppins">
                  Engineering
                </h4>
                <p className="text-black font-poppins">
                  Mechanical, civil, electrical engineering
                </p>
                <Button className="bg-gray-300 text-black hover:bg-gray-400 font-poppins font-semibold">
                  Explore Opportunities
                </Button>
              </div>
            </Card>
            {/* Media & Communications */}
            <Card className="bg-white/40 p-8 rounded-2xl border-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-black font-poppins">
                  Media & Communications
                </h4>
                <p className="text-black font-poppins">
                  Journalism, PR, social media management
                </p>
                <Button className="bg-gray-300 text-black hover:bg-gray-400 font-poppins font-semibold">
                  Explore Opportunities
                </Button>
              </div>
            </Card>
            {/* View All */}
            <div className="md:col-span-2 lg:col-span-3 flex justify-center">
              <Button className="bg-gray-700 text-white hover:bg-gray-800 px-12 py-4 text-lg font-poppins font-semibold">
                View All Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold font-poppins text-black">
              Success Stories from Every Corner of India
            </h3>
            <p className="text-xl text-black font-poppins">
              Real stories from real students who transformed their careers
              through Internमित्र. Your success story could be next!
            </p>
          </div>
          {/* Testimonials */}
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <Card className="bg-white p-8 rounded-2xl shadow-lg border transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="space-y-3">
                    <p className="text-intern-text font-poppins">
                      "मैं पहली पीढ़ी का छात्र हूँ। Internमित्र ने न केवल मुझे
                      इंटर्नशिप दिलाई बल्कि मेरे आत्मविश्वास को भी बढ़ाया। The
                      platform is so easy to use!"
                    </p>
                    <div>
                      <h5 className="font-bold text-intern-text font-poppins">
                        Rajesh Kumar
                      </h5>
                      <p className="text-sm text-intern-text font-poppins">
                        Tribal area, Jharkhand
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              {/* Testimonial 2 */}
              <Card className="bg-white p-8 rounded-2xl shadow-lg border transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="space-y-3">
                    <p className="text-intern-text font-poppins">
                      "Internमित्र changed my life completely! Being from a
                      small village, I never thought I could work with a tech
                      company in Bangalore. The AI recommendations were perfect
                      for my skills."
                    </p>
                    <div>
                      <h5 className="font-bold text-intern-text font-poppins">
                        Priya Sharma
                      </h5>
                      <p className="text-sm text-intern-text font-poppins">
                        Delhi, India
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="text-center">
              <p className="text-black font-poppins">
                Join thousands of students who found their perfect internship
                match
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="py-16 bg-intern-primary">
        <div className="max-w-7xl mx-auto text-center px-6 lg:px-20">
          <div className="space-y-8">
            <h3 className="text-4xl lg:text-6xl font-bold font-poppins text-white">
              Your Dream Internship is Just One Click Away
            </h3>
            <p className="text-xl text-white font-bold font-poppins max-w-3xl mx-auto">
              Don't let opportunities pass by. Join thousands of students who
              have already transformed their careers with Internमित्र. Your
              future starts today!
            </p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <Button
                aria-label="Start New Journey"
                className="group bg-white text-intern-blue hover:bg-gray-100 px-12 py-6 text-2xl font-medium font-poppins"
              >
                <span>Start New Journey</span>
                <svg
                  aria-hidden="true"
                  className="w-30 h-100 ml-4 transition-transform duration-300 group-hover:translate-x-2"
                  viewBox="0 0 84 71"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M66.1394 28.8033C67.2869 27.7677 67.2869 26.0858 66.1394 25.0501L51.4511 11.7938C50.3036 10.7582 48.4401 10.7582 47.2925 11.7938C46.145 12.8295 46.145 14.5114 47.2925 15.547L56.9684 24.2796H22.9376C21.3128 24.2796 20 25.4644 20 26.9309C20 28.3974 21.3128 29.5821 22.9376 29.5821H56.9684L47.2925 38.3147C46.145 39.3504 46.145 41.0323 47.2925 42.0679C48.4401 43.1036 50.3036 43.1036 51.4511 42.0679L66.1394 28.8116V28.8033Z" />
                </svg>
              </Button>
              <p className="text-white font-bold font-poppins text-xl">
                ✓ 100% Free to Use • ✓ No Hidden Charges • ✓ Instant Access
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <Card className="bg-blue-400 text-white p-8 rounded-2xl border-none">
                <h4 className="text-3xl font-bold font-poppins">
                  🤖 Smart Matching
                </h4>
              </Card>
              <Card className="bg-blue-400 text-white p-8 rounded-2xl border-none">
                <h4 className="text-3xl font-bold font-poppins">
                  🎯 Easy to Use
                </h4>
              </Card>
              <Card className="bg-blue-400 text-white p-8 rounded-2xl border-none">
                <h4 className="text-3xl font-bold font-poppins">
                  🌍 Free & Accessible
                </h4>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 md:px-14 py-12 shadow-xl">
          <div className="space-y-6 text-center">
            {!isSubscribed ? (
              <>
                <h3 className="text-3xl lg:text-4xl font-bold font-poppins text-white">
                  Stay Updated with Latest Opportunities
                </h3>
                <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto">
                  Get weekly updates about new internships, career tips, and 
                  success stories directly in your inbox
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:gap-4 max-w-xl mx-auto w-full">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 text-base sm:text-lg rounded-lg text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    disabled={isLoading}
                  />
                  <button 
                    onClick={handleSubscribe}
                    disabled={isLoading || !email.trim()}
                    className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-4 text-base sm:text-lg font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>

                        Subscribe
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-blue-200 text-sm">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="text-4xl font-bold text-white mb-4">
                  Congratulations! You're Subscribed!
                </h3>
                <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                  Welcome to our community! We'll send you amazing internship opportunities and career insights.
                </p>
                <div className="bg-white/10 rounded-lg p-6 mb-8 max-w-md mx-auto">
                  <p className="text-white font-medium text-lg">
                    📧 Confirmation sent to: <br />
                    <span className="font-bold text-xl">{email}</span>
                  </p>
                </div>
                <button 
                  onClick={resetSubscription}
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Subscribe Another Email
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-intern-bg py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="text-3xl font-medium font-poppins">
                <span className="text-intern-dark">Intern</span>
                <span className="text-yellow-600">मित्र</span>
              </div>
              <p className="text-intern-text font-poppins text-sm">
                {t("footer.title")}
              </p>
              <div className="space-y-2 text-intern-text font-poppins text-sm">
                <p>📧 {t("footer.email")}</p>
                <p>📞 {t("footer.phone")}</p>
                <p>📍 {t("footer.address")}</p>
              </div>
            </div>
            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-black font-poppins">{t("footer.quickLinks")}</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  🏠 Home
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  ℹ️ About Us
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  ⚙️ How It Works
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  💼 Internships
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  ✍️ Sign Up / Login
                </a>
              </div>
            </div>
            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-bold text-black font-poppins">{t("footer.support")}</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  Contact Support
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  FAQs
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  Video Tutorials
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  User Guide
                </a>
              </div>
            </div>
            {/* Resources */}
            <div className="space-y-4">
              <h4 className="font-bold text-black font-poppins">{t("footer.resources")}</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  Career Guidance
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  Resume Builder
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  Interview Tips
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  Skill Development
                </a>
                <a
                  href="#"
                  className="block text-intern-text hover:text-intern-dark underline font-poppins"
                >
                  Industry Insights
                </a>
              </div>
            </div>
          </div>
          <hr className="border-black mb-8" />
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-sm text-black font-poppins">
              <p>
                {t("footer.copyright")}
              </p>
              <p>{t("footer.initiative")}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-black font-poppins">{t("footer.followUs")}</span>
              <div className="flex gap-3 text-intern-dark">
                <a href="#" aria-label="Visit our Instagram page" className="hover:opacity-80">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="#" aria-label="Visit our Facebook page" className="hover:opacity-80">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H7.9V12h2.6V9.8c0-2.57 1.53-3.99 3.87-3.99 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.79-1.68 1.6V12h2.86l-.46 2.88h-2.4v6.99A10 10 0 0 0 22 12z" />
                  </svg>
                </a>
                <a href="#" aria-label="Visit our LinkedIn page" className="hover:opacity-80">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4zM8.5 8.5h3.8v1.98h.05c.53-1 1.82-2.06 3.75-2.06 4.01 0 4.75 2.64 4.75 6.07V23h-4v-5.59c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.15 1.45-2.15 2.95V23h-4z" />
                  </svg>
                </a>
                <a href="#" aria-label="Visit our X (Twitter) page" className="hover:opacity-80">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M18.9 2H21l-6.62 7.56L22 22h-6.98l-4.58-5.95L4.2 22H2l7.07-8.07L2 2h7.06l4.13 5.52L18.9 2zm-2.43 18h1.29L7.57 4H6.2l10.27 16z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <hr className="border-black mb-8 mt-8" />
          <div className="text-center mt-8">
            <p className="text-sm text-black font-poppins">
                {t("footer.madeWith")}
              </p>
          </div>
        </div>
      </footer>
      <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          onSuccess={handleAuthSuccess} 
        />
      </main>
    </PageTransition>
  );
}