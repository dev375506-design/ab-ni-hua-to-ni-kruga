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
    { label: "Home / Dashboard", href: "/dashboard" },
    { label: "Applied Internships", href: "#applied" },
    { label: "Saved / Wishlist", href: "#saved" },
    { label: "Recommended Internships", href: "#recommended" },
    { label: "Messages / Notifications", href: "#messages" },
    { label: "Settings", href: "#settings" },
    { label: "Internship Search", href: "#search" },
    { label: "Resume Builder", href: "#resume" },
    { label: "Progress Tracker", href: "#progress" },
    { label: "Help / Support", href: "#help" },
    { label: "Achievements / Certificates", href: "#achievements" },
  ];

  return (
    <div className="min-h-screen bg-intern-bg">
      {/* Navbar */}
      <header className="w-full py-3 px-4 sm:px-6 lg:px-20 bg-intern-bg shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
          {/* Left: Logo */}
          <div className="text-2xl sm:text-3xl font-medium font-poppins">
            <span className="text-intern-purple">Intern</span>
            <span className="text-intern-red">मित्र</span>
          </div>

          {/* Center: Hamburger (opens drawer) */}
          <div className="flex justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-intern-dark">
                  <span className="sr-only">Open Menu</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[360px] bg-intern-bg">
                <SheetHeader>
                  <SheetTitle className="font-poppins">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 grid gap-2">
                  {menuItems.map((item) => (
                    <a key={item.label} href={item.href} className="px-3 py-2 rounded-lg hover:bg-gray-100 text-intern-dark font-poppins">
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-6">
                  <Button asChild className="w-full bg-intern-blue hover:bg-intern-blue/90 text-white">
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
                <button className="rounded-full focus:outline-none">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "User"} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "User"} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold leading-tight">{user?.name || "Demo User"}</p>
                      <p className="text-xs text-gray-500">{user?.email || "demo@example.com"}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="#profile" className="cursor-pointer">My Profile</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl lg:text-5xl font-bold font-volkhov text-intern-primary mb-6"
        >
          Dashboard
        </motion.h1>

        {/* Overview grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="rounded-2xl bg-white/70 backdrop-blur border shadow p-6">
            <h2 className="text-lg font-semibold text-intern-dark font-poppins mb-2">Latest updates</h2>
            <ul className="text-intern-text font-poppins text-sm space-y-2">
              <li>2 new recommended internships</li>
              <li>Interview scheduled: Monday, 3 PM</li>
              <li>Application status updated</li>
            </ul>
          </Card>
          <Card className="rounded-2xl bg-white/70 backdrop-blur border shadow p-6">
            <h2 className="text-lg font-semibold text-intern-dark font-poppins mb-4">Stats</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-intern-blue">12</p>
                <p className="text-sm text-intern-text font-poppins">Applied</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-intern-orange">3</p>
                <p className="text-sm text-intern-text font-poppins">Interviews</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-intern-success">1</p>
                <p className="text-sm text-intern-text font-poppins">Selected</p>
              </div>
            </div>
          </Card>
          <Card id="recommended" className="rounded-2xl bg-white/70 backdrop-blur border shadow p-6">
            <h2 className="text-lg font-semibold text-intern-dark font-poppins mb-2">Recommended</h2>
            <div className="space-y-3">
              {["Frontend Intern", "Data Analyst Intern", "Marketing Intern"].map((role) => (
                <div key={role} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-intern-dark font-poppins">{role}</p>
                    <p className="text-xs text-intern-text font-poppins">Remote • 3 months • ₹10k</p>
                  </div>
                  <Button size="sm" className="bg-intern-blue hover:bg-intern-blue/90 text-white">View</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Progress Tracker in the middle */}
        <Card className="rounded-2xl bg-white/70 backdrop-blur border shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-intern-dark font-poppins mb-4">Your Application Progress</h2>
          <div className="space-y-6">
            <ProgressTracker currentStage={2} showAs="stepper" />
            <ProgressTracker currentStage={2} showAs="bar" />
          </div>
        </Card>

        {/* Secondary grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl bg-white/70 backdrop-blur border shadow p-6" id="applied">
            <h3 className="text-lg font-semibold text-intern-dark font-poppins mb-4">Applied Internships</h3>
            <div className="grid gap-4">
              {[{title:"React Intern @ Acme",status:"Pending",match:78},{title:"Data Intern @ Quant",status:"Shortlisted",match:64},{title:"UI Intern @ Pixel",status:"Selected",match:88}].map((job)=> (
                <div key={job.title} className="rounded-xl border bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-intern-dark font-poppins">{job.title}</p>
                      <p className="text-xs text-intern-text font-poppins">Remote • 3 months • ₹10k</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs ${job.status==="Selected"?"bg-green-100 text-green-800":job.status==="Shortlisted"?"bg-blue-100 text-blue-800":"bg-yellow-100 text-yellow-800"}`}>{job.status}</span>
                  </div>
                  <div className="mt-3">
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
          <Card className="rounded-2xl bg-white/70 backdrop-blur border shadow p-6" id="saved">
            <h3 className="text-lg font-semibold text-intern-dark font-poppins mb-4">Saved / Wishlist Internships</h3>
            <div className="grid gap-4">
              {[{title:"UI/UX Intern • Pune",match:72},{title:"ML Intern • Remote",match:61}].map((job)=> (
                <div key={job.title} className="rounded-xl border bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-intern-dark font-poppins">{job.title}</p>
                    <Button size="sm" variant="outline">Apply</Button>
                  </div>
                  <div className="mt-3">
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


