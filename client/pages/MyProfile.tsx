import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Save, Upload, ArrowLeft, Edit, Camera } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    dateOfBirth: string;
    gender: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  professionalInfo: {
    currentRole: string;
    experience: string;
    availability: string;
    expectedStipend: string;
    workPreference: string;
  };
  education: {
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
    gpa: string;
  };
  skills: string[];
  interests: string[];
  bio: string;
  resumeUrl: string;
  profilePicture: string;
}

export default function MyProfile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    personalInfo: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 98765 43210",
      location: "Mumbai, India",
      dateOfBirth: "2000-01-01",
      gender: "Male",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      portfolio: "johndoe.portfolio.com"
    },
    professionalInfo: {
      currentRole: "Computer Science Student",
      experience: "1-2 years",
      availability: "Immediately",
      expectedStipend: "₹15,000 - ₹25,000",
      workPreference: "Remote"
    },
    education: {
      institution: "Mumbai University",
      degree: "Bachelor of Technology",
      field: "Computer Science",
      graduationYear: "2025",
      gpa: "8.5"
    },
    skills: ["React", "TypeScript", "Node.js", "Python", "MongoDB", "Git"],
    interests: ["Web Development", "Machine Learning", "UI/UX Design"],
    bio: "Passionate computer science student with a strong foundation in web development and a keen interest in emerging technologies. I enjoy building innovative solutions and am always eager to learn new skills.",
    resumeUrl: "",
    profilePicture: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    // Load saved profile data from localStorage
    const savedProfile = localStorage.getItem('profileData');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const updatePersonalInfo = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateProfessionalInfo = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        [field]: value
      }
    }));
  };

  const updateEducation = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value
      }
    }));
  };

  const addSkill = () => {
    setProfileData(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const removeSkill = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addInterest = () => {
    setProfileData(prev => ({
      ...prev,
      interests: [...prev.interests, ""]
    }));
  };

  const updateInterest = (index: number, value: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.map((interest, i) => i === index ? value : interest)
    }));
  };

  const removeInterest = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      setProfileData(prev => ({
        ...prev,
        resumeUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      setProfileData(prev => ({
        ...prev,
        profilePicture: URL.createObjectURL(file)
      }));
    }
  };

  const saveProfile = () => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
    setIsEditing(false);
    alert("Profile saved successfully!");
  };

  const initials = profileData.personalInfo.fullName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-intern-bg">
      {/* Header */}
      <header className="w-full py-2 sm:py-3 px-3 sm:px-4 lg:px-20 bg-intern-bg shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="p-2 sm:p-2.5">
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Back to Dashboard</span>
              </Button>
            </Link>
            <h1 className="text-lg sm:text-2xl font-bold text-intern-dark font-poppins truncate">📌 My Profile</h1>
          </div>
          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
            <Button 
              onClick={() => setIsEditing(!isEditing)} 
              variant={isEditing ? "outline" : "default"}
              size="sm"
              className="text-xs sm:text-sm"
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">{isEditing ? "Cancel" : "Edit Profile"}</span>
              <span className="sm:hidden">{isEditing ? "Cancel" : "Edit"}</span>
            </Button>
            {isEditing && (
              <Button onClick={saveProfile} className="bg-intern-blue hover:bg-intern-blue/90 text-white text-xs sm:text-sm" size="sm">
                <Save className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Save Changes</span>
                <span className="sm:hidden">Save</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-20 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="p-4 sm:p-6 sticky top-20 sm:top-24">
              <div className="text-center mb-4 sm:mb-6">
                <div className="relative inline-block">
                  <Avatar className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto mb-3 sm:mb-4">
                    <AvatarImage src={profileData.profilePicture} alt={profileData.personalInfo.fullName} />
                    <AvatarFallback className="text-lg sm:text-xl lg:text-2xl">{initials}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label className="absolute -bottom-1 -right-1 bg-intern-blue text-white rounded-full p-1.5 sm:p-2 cursor-pointer hover:bg-intern-blue/90">
                      <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-intern-dark font-poppins truncate">
                  {profileData.personalInfo.fullName}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 font-poppins truncate">{profileData.professionalInfo.currentRole}</p>
              </div>

              <nav className="space-y-1 sm:space-y-2">
                {[
                  { id: 'personal', label: 'Personal Info', icon: '👤' },
                  { id: 'professional', label: 'Professional', icon: '💼' },
                  { id: 'education', label: 'Education', icon: '🎓' },
                  { id: 'skills', label: 'Skills', icon: '🛠️' },
                  { id: 'interests', label: 'Interests', icon: '❤️' },
                  { id: 'resume', label: 'Resume', icon: '📄' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-2 sm:px-3 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                      activeTab === tab.id 
                        ? 'bg-intern-blue text-white' 
                        : 'hover:bg-gray-100 text-intern-dark'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="p-6">
              {/* Personal Information */}
              {activeTab === 'personal' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-intern-dark font-poppins">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileData.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.personalInfo.dateOfBirth}
                        onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <select
                        id="gender"
                        value={profileData.personalInfo.gender}
                        onChange={(e) => updatePersonalInfo('gender', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-intern-blue"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={profileData.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={profileData.personalInfo.github}
                        onChange={(e) => updatePersonalInfo('github', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="portfolio">Portfolio Website</Label>
                      <Input
                        id="portfolio"
                        value={profileData.personalInfo.portfolio}
                        onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Professional Information */}
              {activeTab === 'professional' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-intern-dark font-poppins">Professional Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentRole">Current Role</Label>
                      <Input
                        id="currentRole"
                        value={profileData.professionalInfo.currentRole}
                        onChange={(e) => updateProfessionalInfo('currentRole', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience Level</Label>
                      <select
                        id="experience"
                        value={profileData.professionalInfo.experience}
                        onChange={(e) => updateProfessionalInfo('experience', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-intern-blue"
                      >
                        <option value="0-1 years">0-1 years</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="2-3 years">2-3 years</option>
                        <option value="3+ years">3+ years</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability</Label>
                      <select
                        id="availability"
                        value={profileData.professionalInfo.availability}
                        onChange={(e) => updateProfessionalInfo('availability', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-intern-blue"
                      >
                        <option value="Immediately">Immediately</option>
                        <option value="1 month">1 month</option>
                        <option value="2-3 months">2-3 months</option>
                        <option value="6+ months">6+ months</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="expectedStipend">Expected Stipend</Label>
                      <select
                        id="expectedStipend"
                        value={profileData.professionalInfo.expectedStipend}
                        onChange={(e) => updateProfessionalInfo('expectedStipend', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-intern-blue"
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                        <option value="₹10,000 - ₹15,000">₹10,000 - ₹15,000</option>
                        <option value="₹15,000 - ₹25,000">₹15,000 - ₹25,000</option>
                        <option value="₹25,000+">₹25,000+</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="workPreference">Work Preference</Label>
                      <select
                        id="workPreference"
                        value={profileData.professionalInfo.workPreference}
                        onChange={(e) => updateProfessionalInfo('workPreference', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-intern-blue"
                      >
                        <option value="Remote">Remote</option>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1 min-h-[120px]"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Education */}
              {activeTab === 'education' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-intern-dark font-poppins">Education</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="institution">Institution</Label>
                      <Input
                        id="institution"
                        value={profileData.education.institution}
                        onChange={(e) => updateEducation('institution', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="degree">Degree</Label>
                      <Input
                        id="degree"
                        value={profileData.education.degree}
                        onChange={(e) => updateEducation('degree', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="field">Field of Study</Label>
                      <Input
                        id="field"
                        value={profileData.education.field}
                        onChange={(e) => updateEducation('field', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="graduationYear">Graduation Year</Label>
                      <Input
                        id="graduationYear"
                        value={profileData.education.graduationYear}
                        onChange={(e) => updateEducation('graduationYear', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gpa">GPA/Percentage</Label>
                      <Input
                        id="gpa"
                        value={profileData.education.gpa}
                        onChange={(e) => updateEducation('gpa', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Skills */}
              {activeTab === 'skills' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-intern-dark font-poppins">Skills</h2>
                    {isEditing && (
                      <Button onClick={addSkill} size="sm">
                        Add Skill
                      </Button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {profileData.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={skill}
                          onChange={(e) => updateSkill(index, e.target.value)}
                          disabled={!isEditing}
                          placeholder="Enter skill"
                        />
                        {isEditing && (
                          <Button
                            onClick={() => removeSkill(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Interests */}
              {activeTab === 'interests' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-intern-dark font-poppins">Interests</h2>
                    {isEditing && (
                      <Button onClick={addInterest} size="sm">
                        Add Interest
                      </Button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {profileData.interests.map((interest, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={interest}
                          onChange={(e) => updateInterest(index, e.target.value)}
                          disabled={!isEditing}
                          placeholder="Enter interest"
                        />
                        {isEditing && (
                          <Button
                            onClick={() => removeInterest(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Resume */}
              {activeTab === 'resume' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-intern-dark font-poppins">Resume</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your resume</h3>
                    <p className="text-gray-500 mb-4">PDF, DOC, or DOCX files only. Max size 10MB.</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      disabled={!isEditing}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-intern-blue hover:bg-intern-blue/90 cursor-pointer ${
                        !isEditing ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </label>
                    {profileData.resumeUrl && (
                      <div className="mt-4">
                        <p className="text-green-600 font-medium">Resume uploaded successfully!</p>
                        <a
                          href={profileData.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-intern-blue hover:underline"
                        >
                          View Resume
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
