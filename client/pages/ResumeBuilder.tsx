import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Download, Save, Edit, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    year: string;
    gpa: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string;
  }>;
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 98765 43210",
      location: "Mumbai, India",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe"
    },
    summary: "Passionate software developer with 2+ years of experience in React and Node.js. Looking for internship opportunities to enhance my skills and contribute to innovative projects.",
    experience: [
      {
        id: "1",
        company: "TechCorp",
        position: "Frontend Developer Intern",
        duration: "Jun 2023 - Aug 2023",
        description: "Developed responsive web applications using React and TypeScript. Collaborated with team to implement new features and improve user experience."
      }
    ],
    education: [
      {
        id: "1",
        institution: "Mumbai University",
        degree: "Bachelor of Technology in Computer Science",
        year: "2021 - 2025",
        gpa: "8.5/10"
      }
    ],
    skills: ["React", "TypeScript", "Node.js", "Python", "MongoDB", "Git"],
    projects: [
      {
        id: "1",
        title: "E-commerce Platform",
        description: "Built a full-stack e-commerce application with React frontend and Node.js backend",
        technologies: "React, Node.js, MongoDB, Stripe API"
      }
    ]
  });

  const [activeSection, setActiveSection] = useState('personal');

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: "",
      position: "",
      duration: "",
      description: ""
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      year: "",
      gpa: ""
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: ""
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }));
  };

  const removeItem = (type: 'experience' | 'education' | 'projects' | 'skills', id: string) => {
    setResumeData(prev => ({
      ...prev,
      [type]: prev[type].filter((item: any) => item.id !== id)
    }));
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateItem = (type: 'experience' | 'education' | 'projects', id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      [type]: prev[type].map((item: any) => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const downloadPDF = () => {
    // This would integrate with a PDF generation library like jsPDF
    alert("PDF download functionality would be implemented here with jsPDF or similar library");
  };

  const saveResume = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    alert("Resume saved successfully!");
  };

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
            <h1 className="text-2xl font-bold text-intern-dark font-poppins">📄 Resume Builder</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={saveResume} variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={downloadPDF} className="bg-intern-blue hover:bg-intern-blue/90 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-intern-dark font-poppins mb-4">Resume Sections</h3>
              <nav className="space-y-2">
                {[
                  { id: 'personal', label: 'Personal Info', icon: '👤' },
                  { id: 'summary', label: 'Summary', icon: '📝' },
                  { id: 'experience', label: 'Experience', icon: '💼' },
                  { id: 'education', label: 'Education', icon: '🎓' },
                  { id: 'skills', label: 'Skills', icon: '🛠️' },
                  { id: 'projects', label: 'Projects', icon: '🚀' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeSection === section.id 
                        ? 'bg-intern-blue text-white' 
                        : 'hover:bg-gray-100 text-intern-dark'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              {/* Personal Information */}
              {activeSection === 'personal' && (
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
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={resumeData.personalInfo.github}
                        onChange={(e) => updatePersonalInfo('github', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Summary */}
              {activeSection === 'summary' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-intern-dark font-poppins">Professional Summary</h2>
                  <div>
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      value={resumeData.summary}
                      onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                      className="mt-1 min-h-[120px]"
                      placeholder="Write a brief summary of your professional background and career objectives..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Experience */}
              {activeSection === 'experience' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-intern-dark font-poppins">Work Experience</h2>
                    <Button onClick={addExperience} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                  {resumeData.experience.map((exp, index) => (
                    <Card key={exp.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-intern-dark">Experience #{index + 1}</h3>
                        <Button
                          onClick={() => removeItem('experience', exp.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Position</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => updateItem('experience', exp.id, 'position', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <Input
                            value={exp.duration}
                            onChange={(e) => updateItem('experience', exp.id, 'duration', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)}
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </motion.div>
              )}

              {/* Education */}
              {activeSection === 'education' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-intern-dark font-poppins">Education</h2>
                    <Button onClick={addEducation} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                  {resumeData.education.map((edu, index) => (
                    <Card key={edu.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-intern-dark">Education #{index + 1}</h3>
                        <Button
                          onClick={() => removeItem('education', edu.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateItem('education', edu.id, 'institution', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Year</Label>
                          <Input
                            value={edu.year}
                            onChange={(e) => updateItem('education', edu.id, 'year', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>GPA</Label>
                          <Input
                            value={edu.gpa}
                            onChange={(e) => updateItem('education', edu.id, 'gpa', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </motion.div>
              )}

              {/* Skills */}
              {activeSection === 'skills' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-intern-dark font-poppins">Skills</h2>
                    <Button onClick={addSkill} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={skill}
                          onChange={(e) => updateSkill(index, e.target.value)}
                          placeholder="Enter skill"
                        />
                        <Button
                          onClick={() => {
                            const newSkills = resumeData.skills.filter((_, i) => i !== index);
                            setResumeData(prev => ({ ...prev, skills: newSkills }));
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Projects */}
              {activeSection === 'projects' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-intern-dark font-poppins">Projects</h2>
                    <Button onClick={addProject} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                  {resumeData.projects.map((project, index) => (
                    <Card key={project.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-intern-dark">Project #{index + 1}</h3>
                        <Button
                          onClick={() => removeItem('projects', project.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Project Title</Label>
                          <Input
                            value={project.title}
                            onChange={(e) => updateItem('projects', project.id, 'title', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={project.description}
                            onChange={(e) => updateItem('projects', project.id, 'description', e.target.value)}
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Technologies Used</Label>
                          <Input
                            value={project.technologies}
                            onChange={(e) => updateItem('projects', project.id, 'technologies', e.target.value)}
                            className="mt-1"
                            placeholder="React, Node.js, MongoDB"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </motion.div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
