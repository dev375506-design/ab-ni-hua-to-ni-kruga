import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Applied() {
  const items = [
    { title: "Frontend Intern @ Acme", status: "Pending", match: 75 },
    { title: "Data Intern @ Quant", status: "Shortlisted", match: 63 },
    { title: "UI Intern @ Pixel", status: "Selected", match: 88 },
  ];

  return (
    <div className="min-h-screen bg-intern-bg px-4 sm:px-6 lg:px-20 py-8">
      <h1 className="text-3xl lg:text-5xl font-bold font-volkhov text-intern-primary mb-6">Applied Internships</h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {items.map((job) => (
          <Card key={job.title} className="rounded-2xl bg-white/70 backdrop-blur border shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-intern-dark font-poppins">{job.title}</p>
                <p className="text-xs text-intern-text font-poppins">Remote • 3 months • ₹10k</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs ${job.status==="Selected"?"bg-green-100 text-green-800":job.status==="Shortlisted"?"bg-blue-100 text-blue-800":"bg-yellow-100 text-yellow-800"}`}>{job.status}</span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1 text-intern-text font-poppins">
                <span>Skill Match</span>
                <span>{job.match}%</span>
              </div>
              <Progress value={job.match} />
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="outline" size="sm">View Details</Button>
              <Button size="sm" className="bg-intern-blue hover:bg-intern-blue/90 text-white">Message Recruiter</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


