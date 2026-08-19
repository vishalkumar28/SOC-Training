"use client";

import { useState } from "react";
import { Clock, ShieldAlert, CheckCircle2, ChevronDown, ChevronUp, TerminalSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: "recon" | "attack" | "compromise" | "post-compromise";
  ioc?: string;
  mitre?: string;
}

const defaultEvents: TimelineEvent[] = [
  {
    id: "e1",
    time: "09:22:00",
    title: "Port Scan",
    description: "External IP scanning multiple ports.",
    type: "recon"
  },
  {
    id: "e2",
    time: "09:23:01",
    title: "4625 Failed Login",
    description: "15 failed logins detected for user jsmith.",
    type: "attack",
    ioc: "203.0.113.45"
  },
  {
    id: "e3",
    time: "09:28:15",
    title: "4624 Successful Login",
    description: "Successful Logon (Type 10) from the attacker IP.",
    type: "compromise"
  },
  {
    id: "e4",
    time: "09:29:00",
    title: "PowerShell Execution",
    description: "Suspicious encoded PowerShell command executed.",
    type: "post-compromise",
    mitre: "T1059.001"
  },
  {
    id: "e5",
    time: "09:29:15",
    title: "Payload Download",
    description: "payload.exe downloaded to temp directory.",
    type: "post-compromise"
  },
  {
    id: "e6",
    time: "09:30:00",
    title: "Scheduled Task Created",
    description: "Task established for persistence.",
    type: "post-compromise",
    mitre: "T1053.005"
  }
];

export function AttackTimeline() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const getTypeColor = (type: string) => {
    switch(type) {
      case "recon": return "border-blue-500/50 bg-blue-500/10 text-blue-500";
      case "attack": return "border-warning/50 bg-warning/10 text-warning";
      case "compromise": return "border-destructive/50 bg-destructive/10 text-destructive";
      case "post-compromise": return "border-purple-500/50 bg-purple-500/10 text-purple-500";
      default: return "border-muted";
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case "recon": return <SearchIcon />;
      case "attack": return <ShieldAlert className="w-4 h-4" />;
      case "compromise": return <AlertTriangleIcon />;
      case "post-compromise": return <TerminalSquare className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        
        {defaultEvents.map((event, index) => (
          <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Icon */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 ${getTypeColor(event.type).split(' ')[0]} ${getTypeColor(event.type).split(' ')[2]}`}>
              {getIcon(event.type)}
            </div>
            
            {/* Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-border bg-card shadow-sm transition-all hover:border-primary/50 cursor-pointer" onClick={() => setExpanded(expanded === event.id ? null : event.id)}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs text-muted-foreground">{event.time}</span>
                <Badge variant="outline" className={`text-[10px] ${getTypeColor(event.type)} border-0`}>
                  {event.type.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
              <h3 className="font-bold text-foreground text-sm">{event.title}</h3>
              
              {expanded === event.id && (
                <div className="mt-3 pt-3 border-t border-border space-y-2 animate-in slide-in-from-top-2">
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="flex gap-2 mt-2">
                    {event.ioc && (
                      <Badge variant="secondary" className="text-xs bg-secondary/80">IOC: {event.ioc}</Badge>
                    )}
                    {event.mitre && (
                      <Badge variant="secondary" className="text-xs bg-secondary/80">{event.mitre}</Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

// Minimal icons inline to save imports
function SearchIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
}
function AlertTriangleIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
}
