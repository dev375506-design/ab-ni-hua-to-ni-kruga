import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Eye, Calendar, MapPin, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface AppliedInternship {
  id: string;
  company: string;
  position: string;
  location: string;
  stipend: string;
  duration: string;
  appliedDate: string;
  status: 'Pending' | 'Shortlisted' | 'Rejected' | 'Selected';
  matchPercentage: number;
  description: string;
  requirements: string[];
  nextStep?: string;
  interviewDate?: string;
  notes?: string;
}

export default function AppliedInternships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('appliedDate');

  const appliedInternships: AppliedInternship[] = [
    {
      id: "1",
      company: "TechCorp Solutions",
      position: "Frontend Developer Intern",
      location: "Mumbai, India",
      stipend: "₹15,000/month",
      duration: "3 months",
      appliedDate: "2024-01-15",
      status: "Shortlisted",
      matchPercentage: 85,
      description: "Work on React-based web applications and contribute to user interface development.",
      requirements: ["React", "TypeScript", "CSS", "Git"],
      nextStep: "Technical Interview scheduled for next week",
      interviewDate: "2024-01-25",
      notes: "Great company culture, looking forward to the interview"
    },
    {
      id: "2",
      company: "DataMinds Analytics",
      position: "Data Science Intern",
      location: "Bangalore, India",
      stipend: "₹20,000/month",
      duration: "6 months",
      appliedDate: "2024-01-10",
      status: "Pending",
      matchPercentage: 72,
      description: "Assist in data analysis projects and machine learning model development.",
      requirements: ["Python", "Pandas", "NumPy", "Machine Learning"],
      nextStep: "Awaiting response from HR",
      notes: "Applied through referral, high hopes"
    },
    {
      id: "3",
      company: "DesignHub Creative",
      position: "UI/UX Design Intern",
      location: "Remote",
      stipend: "₹12,000/month",
      duration: "4 months",
      appliedDate: "2024-01-08",
      status: "Selected",
      matchPercentage: 90,
      description: "Create user interfaces and user experience designs for mobile and web applications.",
      requirements: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      nextStep: "Offer letter received, starting next month",
      notes: "Excited to start! Great learning opportunity"
    },
    {
      id: "4",
      company: "CloudNative Technologies",
      position: "DevOps Intern",
      location: "Hybrid",
      stipend: "₹18,000/month",
      duration: "5 months",
      appliedDate: "2024-01-05",
      status: "Rejected",
      matchPercentage: 45,
      description: "Learn cloud infrastructure management and CI/CD pipeline development.",
      requirements: ["AWS", "Docker", "Kubernetes", "Linux"],
      nextStep: "Application rejected due to insufficient experience",
      notes: "Need to improve DevOps skills before reapplying"
    },
    {
      id: "5",
      company: "StartupXYZ",
      position: "Full Stack Developer Intern",
      location: "Delhi, India",
      stipend: "₹10,000/month",
      duration: "3 months",
      appliedDate: "2024-01-12",
      status: "Pending",
      matchPercentage: 78,
      description: "Develop end-to-end web applications using modern technologies.",
      requirements: ["React", "Node.js", "MongoDB", "Express"],
      nextStep: "Initial screening completed, waiting for technical round",
      notes: "Small team, good learning opportunity"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Shortlisted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Selected':
        return '✅';
      case 'Shortlisted':
        return '📋';
      case 'Pending':
        return '⏳';
      case 'Rejected':
        return '❌';
      default:
        return '📄';
    }
  };

  const filteredInternships = appliedInternships
    .filter(internship => 
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(internship => 
      statusFilter === 'All' || internship.status === statusFilter
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'appliedDate':
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        case 'matchPercentage':
          return b.matchPercentage - a.matchPercentage;
        case 'company':
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

  const statusCounts = appliedInternships.reduce((acc, internship) => {
    acc[internship.status] = (acc[internship.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
            <h1 className="text-2xl font-bold text-intern-dark font-poppins">📋 Applied Internships</h1>
          </div>
          <div className="text-sm text-gray-600 font-poppins">
            Total Applications: {appliedInternships.length}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.Pending || 0}</div>
            <div className="text-sm text-gray-600 font-poppins">Pending</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.Shortlisted || 0}</div>
            <div className="text-sm text-gray-600 font-poppins">Shortlisted</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.Selected || 0}</div>
            <div className="text-sm text-gray-600 font-poppins">Selected</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{statusCounts.Rejected || 0}</div>
            <div className="text-sm text-gray-600 font-poppins">Rejected</div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by company, position, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-intern-blue"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-intern-blue"
              >
                <option value="appliedDate">Sort by Date</option>
                <option value="matchPercentage">Sort by Match %</option>
                <option value="company">Sort by Company</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Internships List */}
        <div className="space-y-6">
          {filteredInternships.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Company Logo Placeholder */}
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-600">
                    {internship.company.charAt(0)}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-intern-dark font-poppins">
                            {internship.position}
                          </h3>
                          <Badge className={`${getStatusColor(internship.status)} border`}>
                            {getStatusIcon(internship.status)} {internship.status}
                          </Badge>
                        </div>
                        
                        <h4 className="text-lg font-medium text-gray-700 font-poppins mb-2">
                          {internship.company}
                        </h4>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-poppins mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {internship.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {internship.stipend}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {internship.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Applied: {new Date(internship.appliedDate).toLocaleDateString()}
                          </div>
                        </div>

                        <p className="text-gray-600 font-poppins mb-4">
                          {internship.description}
                        </p>

                        {/* Skills Match */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600 font-poppins">Skills Match</span>
                            <span className="font-medium text-intern-dark">{internship.matchPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                internship.matchPercentage >= 80 ? 'bg-green-500' :
                                internship.matchPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${internship.matchPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Requirements */}
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 font-poppins mb-2">Required Skills:</h5>
                          <div className="flex flex-wrap gap-2">
                            {internship.requirements.map((req, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Next Step */}
                        {internship.nextStep && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <h5 className="text-sm font-medium text-blue-800 font-poppins mb-1">Next Step:</h5>
                            <p className="text-sm text-blue-700 font-poppins">{internship.nextStep}</p>
                            {internship.interviewDate && (
                              <p className="text-sm text-blue-600 font-poppins mt-1">
                                📅 Interview Date: {new Date(internship.interviewDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Notes */}
                        {internship.notes && (
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <h5 className="text-sm font-medium text-gray-700 font-poppins mb-1">Notes:</h5>
                            <p className="text-sm text-gray-600 font-poppins">{internship.notes}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 lg:min-w-[200px]">
                        <Button className="w-full bg-intern-blue hover:bg-intern-blue/90 text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {internship.status === 'Selected' && (
                          <Button variant="outline" className="w-full text-green-600 border-green-600 hover:bg-green-50">
                            Accept Offer
                          </Button>
                        )}
                        {internship.status === 'Shortlisted' && (
                          <Button variant="outline" className="w-full">
                            Prepare for Interview
                          </Button>
                        )}
                        {internship.status === 'Rejected' && (
                          <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
                            Apply Again
                          </Button>
                        )}
                        <Button variant="ghost" className="w-full text-gray-600">
                          Add Notes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 font-poppins mb-2">
              No applications found
            </h3>
            <p className="text-gray-500 font-poppins mb-6">
              {searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your search or filter criteria.'
                : 'You haven\'t applied to any internships yet.'
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
