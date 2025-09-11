import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Saved() {
  const items = [
    { title: "UI/UX Intern • Pune", match: 72 },
    { title: "ML Intern • Remote", match: 61 },
    { title: "Backend Intern • Delhi", match: 69 },
  ];

  return (
    <div className="min-h-screen bg-intern-bg px-4 sm:px-6 lg:px-20 py-8">
      <h1 className="text-3xl lg:text-5xl font-bold font-volkhov text-intern-primary mb-6">Saved / Wishlist</h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {items.map((job) => (
          <Card key={job.title} className="rounded-2xl bg-white/70 backdrop-blur border shadow p-6">
            <div className="flex items-center justify-between">
              <p className="font-medium text-intern-dark font-poppins">{job.title}</p>
              <Button size="sm" variant="outline">Apply</Button>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1 text-intern-text font-poppins">
                <span>Skill Match</span>
                <span>{job.match}%</span>
              </div>
              <Progress value={job.match} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


