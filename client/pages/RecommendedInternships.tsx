import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Heart, MapPin, DollarSign, Clock, Star, Filter, Zap, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface RecommendedInternship {
  id: string;
  company: string;
  position: string;
  location: string;
  stipend: string;
  duration: string;
  matchPercentage: number;
  description: string;
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  isUrgent: boolean;
  tags: string[];
  aiReason: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companyRating: number;
  isNew: boolean;
  isHot: boolean;
}

export default function RecommendedInternships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('matchPercentage');
  const [filterBy, setFilterBy] = useState('All');
  const [showOnlyHighMatch, setShowOnlyHighMatch] = useState(false);

  const recommendedInternships: RecommendedInternship[] = [
    {
      id: "1",
      company: "TechCorp Solutions",
      position: "Frontend Developer Intern",
      location: "Mumbai, India",
      stipend: "₹20,000/month",
      duration: "3 months",
      matchPercentage: 95,
      description: "Build modern web applications using React and TypeScript. Work on user-facing features and collaborate with design team.",
      requirements: ["React", "TypeScript", "CSS", "Git", "JavaScript"],
      benefits: ["Mentorship", "Flexible hours", "Learning budget", "Certificate"],
      applicationDeadline: "2024-02-15",
      isUrgent: true,
      tags: ["Frontend", "React", "High Pay"],
      aiReason: "Perfect match for your React and TypeScript skills. Company culture aligns with your preferences.",
      difficulty: 'Medium',
      companyRating: 4.5,
      isNew: true,
      isHot: true
    },
    {
      id: "2",
      company: "DataMinds Analytics",
      position: "Data Science Intern",
      location: "Bangalore, India",
      stipend: "₹25,000/month",
      duration: "6 months",
      matchPercentage: 88,
      description: "Work on machine learning projects and data analysis. Gain hands-on experience with real-world datasets.",
      requirements: ["Python", "Pandas", "NumPy", "Machine Learning", "Statistics"],
      benefits: ["Research opportunities", "Conference attendance", "Publication chances"],
      applicationDeadline: "2024-02-20",
      isUrgent: false,
      tags: ["Data Science", "ML", "Research"],
      aiReason: "Strong match based on your Python skills and interest in data analysis. Great learning opportunity.",
      difficulty: 'Hard',
      companyRating: 4.2,
      isNew: false,
      isHot: true
    },
    {
      id: "3",
      company: "DesignHub Creative",
      position: "UI/UX Design Intern",
      location: "Remote",
      stipend: "₹15,000/month",
      duration: "4 months",
      matchPercentage: 82,
      description: "Create beautiful user interfaces and improve user experience. Work on real client projects.",
      requirements: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Thinking"],
      benefits: ["Portfolio building", "Client exposure", "Design tools access"],
      applicationDeadline: "2024-02-25",
      isUrgent: false,
      tags: ["Design", "UI/UX", "Remote"],
      aiReason: "Good match for your creative skills. Remote work fits your location preferences.",
      difficulty: 'Easy',
      companyRating: 4.0,
      isNew: true,
      isHot: false
    },
    {
      id: "4",
      company: "CloudNative Technologies",
      position: "DevOps Intern",
      location: "Hybrid",
      stipend: "₹18,000/month",
      duration: "5 months",
      matchPercentage: 75,
      description: "Learn cloud infrastructure and CI/CD pipelines. Work with modern DevOps tools and practices.",
      requirements: ["AWS", "Docker", "Linux", "Git", "CI/CD"],
      benefits: ["Cloud certifications", "Hands-on experience", "Mentorship"],
      applicationDeadline: "2024-03-01",
      isUrgent: false,
      tags: ["DevOps", "Cloud", "Infrastructure"],
      aiReason: "Moderate match. Good opportunity to learn cloud technologies and expand your skill set.",
      difficulty: 'Hard',
      companyRating: 3.8,
      isNew: false,
      isHot: false
    },
    {
      id: "5",
      company: "StartupXYZ",
      position: "Full Stack Developer Intern",
      location: "Delhi, India",
      stipend: "₹12,000/month",
      duration: "3 months",
      matchPercentage: 90,
      description: "Build end-to-end applications using modern web technologies. Fast-paced startup environment.",
      requirements: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
      benefits: ["Equity options", "Direct impact", "Fast learning", "Startup experience"],
      applicationDeadline: "2024-02-10",
      isUrgent: true,
      tags: ["Full Stack", "Startup", "Fast-paced"],
      aiReason: "Excellent match! Your full-stack skills align perfectly. Great for gaining startup experience.",
      difficulty: 'Medium',
      companyRating: 4.1,
      isNew: false,
      isHot: true
    },
    {
      id: "6",
      company: "AI Innovations Lab",
      position: "Machine Learning Intern",
      location: "Pune, India",
      stipend: "₹30,000/month",
      duration: "6 months",
      matchPercentage: 85,
      description: "Work on cutting-edge AI projects. Research and develop machine learning models for real-world applications.",
      requirements: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "Research"],
      benefits: ["Research publication", "Conference funding", "Patent opportunities"],
      applicationDeadline: "2024-02-28",
      isUrgent: false,
      tags: ["AI", "Research", "High Pay"],
      aiReason: "Great match for your ML interests. High-paying opportunity with research focus.",
      difficulty: 'Hard',
      companyRating: 4.7,
      isNew: true,
      isHot: true
    }
  ];

  const saveInternship = (id: string) => {
    // In a real app, this would update the backend
    console.log(`Saved internship ${id}`);
    alert("Internship saved to your wishlist!");
  };

  const applyToInternship = (id: string) => {
    // In a real app, this would navigate to application form
    console.log(`Applied to internship ${id}`);
    alert("Application submitted successfully!");
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredInternships = recommendedInternships
    .filter(internship => 
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(internship => {
      if (filterBy === 'All') return true;
      if (filterBy === 'High Match') return internship.matchPercentage >= 85;
      if (filterBy === 'New') return internship.isNew;
      if (filterBy === 'Hot') return internship.isHot;
      if (filterBy === 'Urgent') return internship.isUrgent;
      return true;
    })
    .filter(internship => !showOnlyHighMatch || internship.matchPercentage >= 80)
    .sort((a, b) => {
      switch (sortBy) {
        case 'matchPercentage':
          return b.matchPercentage - a.matchPercentage;
        case 'stipend':
          return parseInt(b.stipend.replace(/[^\d]/g, '')) - parseInt(a.stipend.replace(/[^\d]/g, ''));
        case 'deadline':
          return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
        case 'rating':
          return b.companyRating - a.companyRating;
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
            <h1 className="text-2xl font-bold text-intern-dark font-poppins">🎯 Recommended Internships</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 font-poppins">
            <Zap className="h-4 w-4 text-yellow-500" />
            AI-Powered Recommendations
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8">
        {/* AI Recommendation Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-poppins">AI-Powered Recommendations</h3>
              <p className="text-gray-600 font-poppins">
                These internships are personalized based on your profile, skills, and preferences. 
                Our AI analyzes your background to find the best matches for you.
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-intern-blue">{recommendedInternships.length}</div>
            <div className="text-sm text-gray-600 font-poppins">Total Recommendations</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {recommendedInternships.filter(i => i.matchPercentage >= 85).length}
            </div>
            <div className="text-sm text-gray-600 font-poppins">High Match (85%+)</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {recommendedInternships.filter(i => i.isHot).length}
            </div>
            <div className="text-sm text-gray-600 font-poppins">Hot Opportunities</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {recommendedInternships.filter(i => i.isNew).length}
            </div>
            <div className="text-sm text-gray-600 font-poppins">New This Week</div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by company, position, location, or skills..."
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
                <option value="All">All Recommendations</option>
                <option value="High Match">High Match (85%+)</option>
                <option value="New">New This Week</option>
                <option value="Hot">Hot Opportunities</option>
                <option value="Urgent">Urgent Deadlines</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-intern-blue"
              >
                <option value="matchPercentage">Sort by Match %</option>
                <option value="stipend">Sort by Stipend</option>
                <option value="deadline">Sort by Deadline</option>
                <option value="rating">Sort by Company Rating</option>
              </select>
              <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={showOnlyHighMatch}
                  onChange={(e) => setShowOnlyHighMatch(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-poppins">High Match Only</span>
              </label>
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
              <Card className="p-6 hover:shadow-lg transition-all duration-300 group relative">
                {/* Status Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {internship.isNew && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      NEW
                    </Badge>
                  )}
                  {internship.isHot && (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      🔥 HOT
                    </Badge>
                  )}
                  {internship.isUrgent && (
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      URGENT
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Company Logo */}
                  <div className="w-16 h-16 bg-gradient-to-br from-intern-blue to-intern-purple rounded-lg flex items-center justify-center text-white font-bold text-xl">
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
                          <div className="flex items-center gap-2">
                            <Badge className={`${getMatchColor(internship.matchPercentage)} bg-opacity-20`}>
                              {internship.matchPercentage}% Match
                            </Badge>
                            <Badge className={getDifficultyColor(internship.difficulty)}>
                              {internship.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-medium text-gray-700 font-poppins mb-2">
                          {internship.company}
                          <div className="flex items-center gap-1 ml-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">{internship.companyRating}</span>
                          </div>
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
                        </div>

                        <p className="text-gray-600 font-poppins mb-4">
                          {internship.description}
                        </p>

                        {/* AI Recommendation Reason */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Target className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-blue-800 font-poppins mb-1">Why we recommend this:</h5>
                              <p className="text-sm text-blue-700 font-poppins">{internship.aiReason}</p>
                            </div>
                          </div>
                        </div>

                        {/* Skills Match */}
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
                                internship.matchPercentage >= 90 ? 'bg-green-500' :
                                internship.matchPercentage >= 80 ? 'bg-blue-500' :
                                internship.matchPercentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
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

                        {/* Benefits */}
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 font-poppins mb-2">Benefits:</h5>
                          <div className="flex flex-wrap gap-2">
                            {internship.benefits.map((benefit, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {internship.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 lg:min-w-[200px]">
                        <Button
                          onClick={() => applyToInternship(internship.id)}
                          className="w-full bg-intern-blue hover:bg-intern-blue/90 text-white"
                        >
                          Apply Now
                        </Button>
                        <Button
                          onClick={() => saveInternship(internship.id)}
                          variant="outline"
                          className="w-full"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full text-gray-600"
                        >
                          View Details
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
            <div className="text-gray-400 text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-600 font-poppins mb-2">
              No recommendations found
            </h3>
            <p className="text-gray-500 font-poppins mb-6">
              {searchTerm || filterBy !== 'All' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Complete your profile to get personalized recommendations!'
              }
            </p>
            <Link to="/profile">
              <Button className="bg-intern-blue hover:bg-intern-blue/90 text-white">
                Complete Profile
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
