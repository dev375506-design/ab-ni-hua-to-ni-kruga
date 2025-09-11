import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Recommended() {
  const items = [
    { title: "Frontend Intern • Remote", match: 84 },
    { title: "Data Analyst Intern • Mumbai", match: 77 },
    { title: "Marketing Intern • Pune", match: 66 },
    { title: "DevOps Intern • Remote", match: 59 },
  ];

  return (
    <div className="min-h-screen bg-intern-bg px-4 sm:px-6 lg:px-20 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl lg:text-5xl font-bold font-volkhov text-intern-primary">Recommended</h1>
          <Button asChild className="bg-intern-blue hover:bg-intern-blue/90 text-white">
            <a href="/chat">Find more with AI</a>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((job) => (
            <Card key={job.title} className="rounded-2xl bg-white/70 backdrop-blur border shadow p-6">
              <p className="font-medium text-intern-dark font-poppins">{job.title}</p>
              <p className="text-xs text-intern-text font-poppins">Stipend • Duration • Mode</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1 text-intern-text font-poppins">
                  <span>Skill Match</span>
                  <span>{job.match}%</span>
                </div>
                <Progress value={job.match} />
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" size="sm">Details</Button>
                <Button size="sm" className="bg-intern-blue hover:bg-intern-blue/90 text-white">Apply</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


