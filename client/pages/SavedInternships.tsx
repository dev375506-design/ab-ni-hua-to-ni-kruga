import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Heart, MapPin, DollarSign, Clock, Calendar, Star, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface SavedInternship {
  id: string;
  company: string;
  position: string;
  location: string;
  stipend: string;
  duration: string;
  savedDate: string;
  matchPercentage: number;
  description: string;
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  isUrgent: boolean;
  tags: string[];
}

export default function SavedInternships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('savedDate');
  const [filterBy, setFilterBy] = useState('All');

  const savedInternships: SavedInternship[] = [
    {
      id: "1",
      company: "Google India",
      position: "Software Engineering Intern",
      location: "Bangalore, India",
      stipend: "₹50,000/month",
      duration: "6 months",
      savedDate: "2024-01-20",
      matchPercentage: 92,
      description: "Work on cutting-edge projects in machine learning and cloud computing. Collaborate with world-class engineers on products used by billions.",
      requirements: ["Python", "Machine Learning", "Cloud Computing", "Data Structures"],
      benefits: ["Free meals", "Transportation", "Health insurance", "Learning budget"],
      applicationDeadline: "2024-02-15",
      isUrgent: true,
      tags: ["FAANG", "High Pay", "Prestigious"]
    },
    {
      id: "2",
      company: "Microsoft",
      position: "Product Management Intern",
      location: "Hyderabad, India",
      stipend: "₹35,000/month",
      duration: "4 months",
      savedDate: "2024-01-18",
      matchPercentage: 78,
      description: "Learn product strategy and work on real products. Gain experience in user research, data analysis, and cross-functional collaboration.",
      requirements: ["Analytics", "User Research", "Communication", "Strategic Thinking"],
      benefits: ["Mentorship", "Networking", "Career development"],
      applicationDeadline: "2024-02-20",
      isUrgent: false,
      tags: ["Product", "Strategy", "Leadership"]
    },
    {
      id: "3",
      company: "StartupXYZ",
      position: "Full Stack Developer Intern",
      location: "Remote",
      stipend: "₹15,000/month",
      duration: "3 months",
      savedDate: "2024-01-15",
      matchPercentage: 85,
      description: "Build end-to-end web applications using modern technologies. Work in a fast-paced startup environment with direct impact.",
      requirements: ["React", "Node.js", "MongoDB", "Git"],
      benefits: ["Equity options", "Flexible hours", "Direct mentorship"],
      applicationDeadline: "2024-02-10",
      isUrgent: true,
      tags: ["Startup", "Full Stack", "Remote"]
    },
    {
      id: "4",
      company: "DesignStudio Pro",
      position: "UI/UX Design Intern",
      location: "Mumbai, India",
      stipend: "₹18,000/month",
      duration: "5 months",
      savedDate: "2024-01-12",
      matchPercentage: 88,
      description: "Create beautiful and functional user interfaces. Work on real client projects and learn from experienced designers.",
      requirements: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      benefits: ["Portfolio building", "Client exposure", "Design tools access"],
      applicationDeadline: "2024-02-25",
      isUrgent: false,
      tags: ["Design", "Creative", "Portfolio"]
    },
    {
      id: "5",
      company: "DataCorp Analytics",
      position: "Data Science Intern",
      location: "Pune, India",
      stipend: "₹25,000/month",
      duration: "6 months",
      savedDate: "2024-01-10",
      matchPercentage: 75,
      description: "Work on real-world data science problems. Build machine learning models and analyze large datasets.",
      requirements: ["Python", "R", "SQL", "Statistics", "Machine Learning"],
      benefits: ["Research opportunities", "Conference attendance", "Publication chances"],
      applicationDeadline: "2024-02-28",
      isUrgent: false,
      tags: ["Data Science", "Research", "Analytics"]
    }
  ];

  const removeFromSaved = (id: string) => {
    // In a real app, this would update the backend
    console.log(`Removed internship ${id} from saved list`);
    alert("Internship removed from saved list!");
  };

  const applyToInternship = (id: string) => {
    // In a real app, this would navigate to application form
    console.log(`Applied to internship ${id}`);
    alert("Application submitted successfully!");
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getUrgencyColor = (isUrgent: boolean, deadline: string) => {
    if (!isUrgent) return 'text-gray-600';
    const daysLeft = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 3) return 'text-red-600';
    if (daysLeft <= 7) return 'text-orange-600';
    return 'text-yellow-600';
  };

  const filteredInternships = savedInternships
    .filter(internship => 
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(internship => {
      if (filterBy === 'All') return true;
      if (filterBy === 'Urgent') return internship.isUrgent;
      if (filterBy === 'High Match') return internship.matchPercentage >= 85;
      if (filterBy === 'Deadline Soon') {
        const daysLeft = Math.ceil((new Date(internship.applicationDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return daysLeft <= 7;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'savedDate':
          return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
        case 'matchPercentage':
          return b.matchPercentage - a.matchPercentage;
        case 'deadline':
          return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
        case 'stipend':
          return parseInt(b.stipend.replace(/[^\d]/g, '')) - parseInt(a.stipend.replace(/[^\d]/g, ''));
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-intern-bg">
      {/* Header */}
      <header className="w-full py-3 px-4 sm:px-6 lg:px-20 bg-intern-bg shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-intern-dark font-poppins">🔖 Saved Internships</h1>
          </div>
          <div className="text-sm text-gray-600 font-poppins">
            {savedInternships.length} Saved Internships
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-intern-blue">{savedInternships.length}</div>
            <div className="text-sm text-gray-600 font-poppins">Total Saved</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {savedInternships.filter(i => i.isUrgent).length}
            </div>
            <div className="text-sm text-gray-600 font-poppins">Urgent</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {savedInternships.filter(i => i.matchPercentage >= 85).length}
            </div>
            <div className="text-sm text-gray-600 font-poppins">High Match</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {savedInternships.filter(i => {
                const daysLeft = Math.ceil((new Date(i.applicationDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return daysLeft <= 7;
              }).length}
            </div>
            <div className="text-sm text-gray-600 font-poppins">Deadline Soon</div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by company, position, location, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-intern-blue"
              >
                <option value="All">All Internships</option>
                <option value="Urgent">Urgent Only</option>
                <option value="High Match">High Match (85%+)</option>
                <option value="Deadline Soon">Deadline Soon (7 days)</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-intern-blue"
              >
                <option value="savedDate">Sort by Saved Date</option>
                <option value="matchPercentage">Sort by Match %</option>
                <option value="deadline">Sort by Deadline</option>
                <option value="stipend">Sort by Stipend</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Internships Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 group relative">
                {/* Urgent Badge */}
                {internship.isUrgent && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    URGENT
                  </div>
                )}

                {/* Company Logo */}
                <div className="w-12 h-12 bg-gradient-to-br from-intern-blue to-intern-purple rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">
                  {internship.company.charAt(0)}
                </div>

                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-intern-dark font-poppins mb-1">
                      {internship.position}
                    </h3>
                    <h4 className="text-base font-medium text-gray-700 font-poppins">
                      {internship.company}
                    </h4>
                  </div>
                  <Button
                    onClick={() => removeFromSaved(internship.id)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 font-poppins">
                    <MapPin className="h-4 w-4 mr-2" />
                    {internship.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 font-poppins">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {internship.stipend}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 font-poppins">
                    <Clock className="h-4 w-4 mr-2" />
                    {internship.duration}
                  </div>
                  <div className={`flex items-center text-sm font-poppins ${getUrgencyColor(internship.isUrgent, internship.applicationDeadline)}`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Deadline: {new Date(internship.applicationDeadline).toLocaleDateString()}
                  </div>
                </div>

                {/* Match Percentage */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 font-poppins">Skills Match</span>
                    <span className={`font-medium ${getMatchColor(internship.matchPercentage)}`}>
                      {internship.matchPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        internship.matchPercentage >= 85 ? 'bg-green-500' :
                        internship.matchPercentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${internship.matchPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {internship.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 font-poppins mb-4 line-clamp-3">
                  {internship.description}
                </p>

                {/* Requirements */}
                <div className="mb-4">
                  <h5 className="text-xs font-medium text-gray-700 font-poppins mb-2">Key Requirements:</h5>
                  <div className="flex flex-wrap gap-1">
                    {internship.requirements.slice(0, 3).map((req, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                    {internship.requirements.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{internship.requirements.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => applyToInternship(internship.id)}
                    className="flex-1 bg-intern-blue hover:bg-intern-blue/90 text-white"
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                {/* Saved Date */}
                <div className="text-xs text-gray-400 font-poppins mt-3 text-center">
                  Saved on {new Date(internship.savedDate).toLocaleDateString()}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🔖</div>
            <h3 className="text-xl font-semibold text-gray-600 font-poppins mb-2">
              No saved internships found
            </h3>
            <p className="text-gray-500 font-poppins mb-6">
              {searchTerm || filterBy !== 'All' 
                ? 'Try adjusting your search or filter criteria.'
                : 'You haven\'t saved any internships yet. Start exploring!'
              }
            </p>
            <Link to="/recommended">
              <Button className="bg-intern-blue hover:bg-intern-blue/90 text-white">
                Browse Internships
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
