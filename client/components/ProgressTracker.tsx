import React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

type ProgressTrackerProps = {
  currentStage: number; // 0-5
  showAs?: "stepper" | "bar";
  className?: string;
};

const STAGES = [
  { key: "applied", label: "Applied", icon: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M3 3h18v2H3zM5 7h14v2H5zM3 11h18v2H3zM5 15h14v2H5zM3 19h18v2H3z"/></svg>
  )},
  { key: "shortlisted", label: "Shortlisted", icon: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M9 12l2 2 4-4 1.5 1.5L11 17 7.5 13.5z"/></svg>
  )},
  { key: "interview", label: "Interview", icon: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-9 9v-1a7 7 0 0114 0v1H3z"/></svg>
  )},
  { key: "offer", label: "Offer", icon: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7z"/></svg>
  )},
  { key: "inprogress", label: "In Progress", icon: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2a10 10 0 1010 10h-2A8 8 0 1112 4V2z"/></svg>
  )},
  { key: "completed", label: "Completed", icon: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M9 16.17l-3.88-3.88L3.71 13.7 9 19l12-12-1.41-1.41z"/></svg>
  )},
];

export default function ProgressTracker({ currentStage, showAs = "stepper", className }: ProgressTrackerProps) {
  const stage = Math.max(0, Math.min(STAGES.length - 1, currentStage));
  const percent = (stage / (STAGES.length - 1)) * 100;

  if (showAs === "bar") {
    return (
      <div className={cn("w-full", className)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-intern-dark font-poppins">{STAGES[stage].label}</span>
          <span className="text-xs text-intern-text font-poppins">{Math.round(percent)}%</span>
        </div>
        <Progress value={percent} className="h-3 bg-white/60" />
        <div className="mt-2 flex justify-between text-[11px] text-intern-text font-poppins">
          {STAGES.map((s, i) => (
            <span key={s.key} className={cn("truncate", i === stage && "text-intern-blue font-medium")}>{s.label}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex items-center justify-between">
        {/* Line */}
        <div className="absolute left-0 right-0 h-1 bg-white/60 top-1/2 -translate-y-1/2" />
        <div className="absolute left-0 h-1 bg-intern-blue top-1/2 -translate-y-1/2 transition-all" style={{ width: `${percent}%` }} />

        {/* Steps */}
        {STAGES.map((s, i) => {
          const isDone = i < stage;
          const isActive = i === stage;
          return (
            <div key={s.key} className="flex flex-col items-center gap-2 z-10 w-[16%]">
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border bg-white shadow",
                isDone && "bg-intern-success/20 border-intern-success text-intern-success",
                isActive && "bg-intern-blue text-white border-intern-blue",
                !isDone && !isActive && "border-gray-300 text-intern-text"
              )}>
                {s.icon}
              </div>
              <span className={cn("text-[11px] text-center font-poppins", isActive ? "text-intern-blue font-medium" : "text-intern-text")}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


