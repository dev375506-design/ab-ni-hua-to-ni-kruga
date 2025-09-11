import React, { useState, useEffect } from 'react';
import { useI18n } from '@/context/i18n';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Bell, 
  Briefcase, 
  BookOpen, 
  Star, 
  Eye, 
  ChevronRight,
  Search,
  Menu,
  X,
  LogOut
} from "lucide-react";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for dashboard
  const stats = [
    { title: "Applications", value: 12, icon: <Briefcase className="h-5 w-5 text-blue-500" /> },
    { title: "Interviews", value: 3, icon: <User className="h-5 w-5 text-green-500" /> },
    { title: "Saved", value: 8, icon: <Star className="h-5 w-5 text-yellow-500" /> },
    { title: "Profile Views", value: 47, icon: <Eye className="h-5 w-5 text-purple-500" /> }
  ];
  
  const recommendedInternships = [
    {
      id: 1,
      company: "TechCorp",
      position: "Frontend Developer Intern",
      location: "Remote",
      stipend: "₹15,000/month",
      tags: ["React", "TypeScript", "UI/UX"]
    },
    {
      id: 2,
      company: "DesignHub",
      position: "UI/UX Design Intern",
      location: "Mumbai",
      stipend: "₹12,000/month",
      tags: ["Figma", "Adobe XD", "Prototyping"]
    },
    {
      id: 3,
      company: "DataMinds",
      position: "Data Science Intern",
      location: "Bangalore",
      stipend: "₹20,000/month",
      tags: ["Python", "ML", "Data Analysis"]
    },
    {
      id: 4,
      company: "CloudNative",
      position: "DevOps Intern",
      location: "Hybrid",
      stipend: "₹18,000/month",
      tags: ["AWS", "Docker", "CI/CD"]
    }
  ];
  
  // Profile completion percentage
  const profileCompletion = 65;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-medium font-poppins">
                <span className="text-intern-purple">Intern</span>
                <span className="text-intern-red">मित्र</span>
              </span>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-intern-purple"
              >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-10">
              <div className="relative">
                {/* Search bar */}
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    type="text"
                    className="focus:ring-intern-purple focus:border-intern-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search internships..."
                  />
                </div>
              </div>
            </nav>

            {/* User dropdown */}
            <div className="hidden md:ml-4 md:flex md:items-center md:space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-intern-purple">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <div className="relative flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {user?.name || "User"}
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="ml-2 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-intern-purple"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pt-2 pb-3 space-y-1">
                <a
                  href="#"
                  className="block pl-3 pr-4 py-2 border-l-4 border-intern-purple text-base font-medium text-intern-purple bg-intern-purple-50"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Browse Internships
                </a>
                <a
                  href="#"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  My Applications
                </a>
                <a
                  href="#"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Profile
                </a>
                <button
                  onClick={onLogout}
                  className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || "User"}!</h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's an overview of your internship journey
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick actions */}
            <Card className="overflow-hidden shadow-md">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Button className="flex items-center justify-center space-x-2 bg-intern-purple hover:bg-intern-purple-dark">
                  <Briefcase className="h-5 w-5" />
                  <span>Browse Internships</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Update Resume</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>View Progress</span>
                </Button>
              </div>
            </Card>

            {/* Recommended internships */}
            <Card className="overflow-hidden shadow-md">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recommended Internships</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {recommendedInternships.map((internship) => (
                    <Card key={internship.id} className="overflow-hidden border border-gray-200 hover:border-intern-purple transition-colors">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{internship.position}</h4>
                            <p className="text-sm text-gray-500">{internship.company}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">{internship.location}</Badge>
                        </div>
                        <p className="mt-2 text-sm font-medium text-gray-700">{internship.stipend}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {internship.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                        <div className="mt-4">
                          <Button size="sm" className="w-full bg-intern-purple hover:bg-intern-purple-dark">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="link" className="text-intern-purple hover:text-intern-purple-dark inline-flex items-center">
                    View all internships
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Profile progress */}
            <Card className="overflow-hidden shadow-md">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Profile Progress</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{profileCompletion}% Complete</span>
                  <span className="text-sm text-gray-500">7/10 sections</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-intern-purple h-2.5 rounded-full" 
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                <div className="mt-4">
                  <Button size="sm" variant="outline" className="w-full">
                    Complete Your Profile
                  </Button>
                </div>
              </div>
            </Card>

            {/* Recent updates */}
            <Card className="overflow-hidden shadow-md">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Updates</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bell className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">Your application for <span className="font-medium">Frontend Developer</span> was viewed</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </li>
                  <li className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">New internship matches your profile</p>
                      <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                    </div>
                  </li>
                  <li className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Star className="h-4 w-4 text-yellow-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">You've been shortlisted for <span className="font-medium">UI/UX Design</span> role</p>
                      <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <Button variant="link" className="text-intern-purple hover:text-intern-purple-dark inline-flex items-center">
                    View all notifications
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  // No longer needed as we're using props
  /*const handleAuthSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  }*/
}