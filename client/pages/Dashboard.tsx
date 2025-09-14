import React, { useMemo } from "react";
import { useI18n } from "@/context/i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import ProgressTracker from "@/components/ProgressTracker";
import { Link } from "react-router-dom";

type StoredUser = {
  name?: string;
  email?: string;
  avatarUrl?: string;
};

export default function Dashboard() {
  const { t } = useI18n();

  const user: StoredUser = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {} as StoredUser;
    }
  }, []);

  const initials = (user?.name || "User")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const menuItems = [
    { 
      label: "Home / Dashboard", 
      href: "/dashboard",
      icon: "🏠",
      description: "Main dashboard overview"
    },
    { 
      label: "📌 My Profile", 
      href: "/profile",
      icon: "📌",
      description: "Open editable profile page where user can update personal details, skills, and upload resume"
    },
    { 
      label: "📋 Applied Internships", 
      href: "/applied",
      icon: "📋",
      description: "Show list of applied internships with status (Pending, Shortlisted, Rejected, Selected)"
    },
    { 
      label: "🔖 Saved Internships", 
      href: "/saved",
      icon: "🔖",
      description: "Display internships user has bookmarked with option to apply or remove"
    },
    { 
      label: "🎯 Recommended Internships", 
      href: "/recommended",
      icon: "🎯",
      description: "Suggest internships based on profile & skills with quick apply/save option"
    },
    { 
      label: "📄 Resume Builder", 
      href: "/resume-builder",
      icon: "📄",
      description: "Provide editable resume templates with option to fill details and download as PDF"
    },
    { 
      label: "Messages / Notifications", 
      href: "#messages",
      icon: "💬",
      description: "View messages and notifications"
    },
    { 
      label: "Settings", 
      href: "#settings",
      icon: "⚙️",
      description: "Account and application settings"
    },
    { 
      label: "Internship Search", 
      href: "#search",
      icon: "🔍",
      description: "Search for internships"
    },
    { 
      label: "Progress Tracker", 
      href: "#progress",
      icon: "📊",
      description: "Track your application progress"
    },
    { 
      label: "Help / Support", 
      href: "#help",
      icon: "❓",
      description: "Get help and support"
    },
    { 
      label: "Achievements / Certificates", 
      href: "#achievements",
      icon: "🏆",
      description: "View your achievements and certificates"
    },
  ];

  return (
    <div className="min-h-screen bg-intern-bg">
      {/* Navbar */}
      <header className="w-full py-2 sm:py-3 px-3 sm:px-4 lg:px-20 bg-intern-bg shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-medium font-poppins">
            <span className="text-intern-purple">Intern</span>
            <span className="text-intern-red">मित्र</span>
          </div>

          {/* Center: Hamburger (opens drawer) - Always Visible */}
          <div className="flex justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-intern-dark p-2">
                  <span className="sr-only">Open Menu</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[90vw] sm:w-[85vw] lg:w-[400px] bg-intern-bg">
                <SheetHeader>
                  <SheetTitle className="font-poppins text-lg">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 grid gap-1">
                  {menuItems.map((item, index) => (
                    <Link 
                      key={item.label} 
                      to={item.href} 
                      className="group px-3 py-2.5 rounded-lg hover:bg-gray-100 text-intern-dark font-poppins transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm"
                      title={item.description}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{item.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </nav>
                <div className="mt-6">
                  <Button asChild className="w-full bg-intern-blue hover:bg-intern-blue/90 text-white text-sm">
                    <a href="/chat">Find Internship with AI</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Right: Avatar with dropdown */}
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full focus:outline-none hover:ring-2 hover:ring-intern-blue transition-all duration-200">
                  <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                    <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "User"} />
                    <AvatarFallback className="text-xs sm:text-sm">{initials}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 sm:w-64" align="end">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "User"} />
                      <AvatarFallback className="text-xs sm:text-sm">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold leading-tight text-sm sm:text-base truncate">{user?.name || "Demo User"}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || "demo@example.com"}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer text-sm">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-700 cursor-pointer text-sm"
                  onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    window.location.href = '/';
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-20 py-4 sm:py-6 lg:py-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-3xl lg:text-5xl font-bold font-volkhov text-intern-primary mb-4 sm:mb-6"
        >
          Dashboard
        </motion.h1>

        {/* Overview grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="rounded-2xl bg-white/70 backdrop-blur border shadow p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-intern-dark font-poppins mb-2">Latest updates</h2>
            <ul className="text-intern-text font-poppins text-xs sm:text-sm space-y-1.5 sm:space-y-2">
              <li>2 new recommended internships</li>
              <li>Interview scheduled: Monday, 3 PM</li>
              <li>Application status updated</li>
            </ul>
          </Card>
          <Card className="rounded-2xl bg-white/70 backdrop-blur border shadow p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-intern-dark font-poppins mb-3 sm:mb-4">Stats</h2>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-intern-blue">12</p>
                <p className="text-xs sm:text-sm text-intern-text font-poppins">Applied</p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-intern-orange">3</p>
                <p className="text-xs sm:text-sm text-intern-text font-poppins">Interviews</p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-intern-success">1</p>
                <p className="text-xs sm:text-sm text-intern-text font-poppins">Selected</p>
              </div>
            </div>
          </Card>
          <Card id="recommended" className="rounded-2xl bg-white/70 backdrop-blur border shadow p-4 sm:p-6 md:col-span-2 lg:col-span-1">
            <h2 className="text-base sm:text-lg font-semibold text-intern-dark font-poppins mb-2">Recommended</h2>
            <div className="space-y-2 sm:space-y-3">
              {["Frontend Intern", "Data Analyst Intern", "Marketing Intern"].map((role) => (
                <div key={role} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-intern-dark font-poppins text-sm sm:text-base truncate">{role}</p>
                    <p className="text-xs text-intern-text font-poppins">Remote • 3 months • ₹10k</p>
                  </div>
                  <Button size="sm" className="bg-intern-blue hover:bg-intern-blue/90 text-white text-xs ml-2 flex-shrink-0">View</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Progress Tracker in the middle */}
        <Card className="rounded-2xl bg-white/70 backdrop-blur border shadow p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-intern-dark font-poppins mb-3 sm:mb-4">Your Application Progress</h2>
          <div className="space-y-4 sm:space-y-6">
            <ProgressTracker currentStage={2} showAs="stepper" />
            <ProgressTracker currentStage={2} showAs="bar" />
          </div>
        </Card>

        {/* Secondary grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="rounded-2xl bg-white/70 backdrop-blur border shadow p-4 sm:p-6" id="applied">
            <h3 className="text-base sm:text-lg font-semibold text-intern-dark font-poppins mb-3 sm:mb-4">Applied Internships</h3>
            <div className="grid gap-3 sm:gap-4">
              {[{title:"React Intern @ Acme",status:"Pending",match:78},{title:"Data Intern @ Quant",status:"Shortlisted",match:64},{title:"UI Intern @ Pixel",status:"Selected",match:88}].map((job)=> (
                <div key={job.title} className="rounded-xl border bg-white p-3 sm:p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-intern-dark font-poppins text-sm sm:text-base truncate">{job.title}</p>
                      <p className="text-xs text-intern-text font-poppins">Remote • 3 months • ₹10k</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs flex-shrink-0 ${job.status==="Selected"?"bg-green-100 text-green-800":job.status==="Shortlisted"?"bg-blue-100 text-blue-800":"bg-yellow-100 text-yellow-800"}`}>{job.status}</span>
                  </div>
                  <div className="mt-2 sm:mt-3">
                    <div className="flex items-center justify-between text-xs mb-1 text-intern-text font-poppins">
                      <span>Skill Match</span>
                      <span>{job.match}%</span>
                    </div>
                    <Progress value={job.match} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="rounded-2xl bg-white/70 backdrop-blur border shadow p-4 sm:p-6" id="saved">
            <h3 className="text-base sm:text-lg font-semibold text-intern-dark font-poppins mb-3 sm:mb-4">Saved / Wishlist Internships</h3>
            <div className="grid gap-3 sm:gap-4">
              {[{title:"UI/UX Intern • Pune",match:72},{title:"ML Intern • Remote",match:61}].map((job)=> (
                <div key={job.title} className="rounded-xl border bg-white p-3 sm:p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-intern-dark font-poppins text-sm sm:text-base flex-1 min-w-0 truncate">{job.title}</p>
                    <Button size="sm" variant="outline" className="text-xs flex-shrink-0">Apply</Button>
                  </div>
                  <div className="mt-2 sm:mt-3">
                    <div className="flex items-center justify-between text-xs mb-1 text-intern-text font-poppins">
                      <span>Skill Match</span>
                      <span>{job.match}%</span>
                    </div>
                    <Progress value={job.match} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}


