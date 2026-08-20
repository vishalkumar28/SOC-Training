"use client";

import { useState } from "react";
import { Terminal, CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InvestigationStage {
  id: string;
  title: string;
  alertDetails?: React.ReactNode;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    nextStageId?: string;
  }[];
}

const mockScenario: Record<string, InvestigationStage> = {
  start: {
    id: "start",
    title: "SECURITY ALERT: Multiple Failed Logons",
    alertDetails: (
      <div className="bg-secondary/50 p-4 rounded-md font-mono text-sm border border-border">
        <p className="text-destructive font-bold mb-2">CRITICAL ALERT DETECTED</p>
        <p>Event: 15 Failed Logons (Event ID 4625)</p>
        <p>User: jsmith</p>
        <p>Source IP: 203.0.113.45</p>
        <p>Time: 09:23 UTC</p>
      </div>
    ),
    question: "As an L1 SOC Analyst, what should you investigate first to understand the scope of this attack?",
    options: [
      {
        id: "opt1",
        text: "Block the IP address 203.0.113.45 immediately in the firewall.",
        isCorrect: false,
        feedback: "Incorrect. While blocking might be necessary later, your first job is to investigate. Blocking without context could disrupt legitimate services or tip off the attacker."
      },
      {
        id: "opt2",
        text: "Check if there was a successful logon (Event 4624) from this IP or user shortly after the failures.",
        isCorrect: true,
        feedback: "Correct! If a brute force attempt is followed by a successful login, the attacker may have gained access.",
        nextStageId: "stage2"
      }
    ]
  },
  stage2: {
    id: "stage2",
    title: "Investigation: Searching for Successful Logins",
    alertDetails: (
      <div className="bg-secondary/50 p-4 rounded-md font-mono text-sm border border-border">
        <p className="text-primary font-bold mb-2">QUERY RESULTS</p>
        <p>09:23:01 - 09:28:14 - Event 4625 (Failed Logon) x 15</p>
        <p className="text-warning">09:28:15 - Event 4624 (Successful Logon) - jsmith - Logon Type 10 (Remote Interactive)</p>
      </div>
    ),
    question: "You found a successful login! What does this sequence (15 failures + 1 success) strongly indicate?",
    options: [
      {
        id: "opt1",
        text: "The user simply forgot their password and finally remembered it.",
        isCorrect: false,
        feedback: "Unlikely. 15 rapid failures from an external IP is highly suspicious and indicative of automation."
      },
      {
        id: "opt2",
        text: "A successful brute-force or credential stuffing attack.",
        isCorrect: true,
        feedback: "Correct. The attacker successfully guessed or obtained the password and has gained remote access (Logon Type 10).",
        nextStageId: "stage3"
      }
    ]
  },
  stage3: {
    id: "stage3",
    title: "Investigation: Post-Compromise Activity",
    alertDetails: (
      <div className="bg-secondary/50 p-4 rounded-md font-mono text-sm border border-border">
        <p>The attacker now has access to the system as &apos;jsmith&apos;.</p>
        <p>You need to find out what they did next.</p>
      </div>
    ),
    question: "What should you look for next in the telemetry?",
    options: [
      {
        id: "opt1",
        text: "Process execution logs (Event 4688) or PowerShell activity linked to 'jsmith'.",
        isCorrect: true,
        feedback: "Excellent. Checking for executed commands will reveal the attacker's next move.",
        nextStageId: "completed"
      }
    ]
  }
};

export function InvestigationConsole() {
  const [currentStageId, setCurrentStageId] = useState("start");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const stage = mockScenario[currentStageId];
  const stageOrder = ["start", "stage2", "stage3"];
  const stageNumber = stageOrder.indexOf(currentStageId) + 1;

  if (!stage && currentStageId === "completed") {
    return (
      <Card className="bg-success/10 border-success/30">
        <CardContent className="p-8 text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
          <h2 className="text-2xl font-bold text-success-foreground">Investigation Complete</h2>
          <p className="text-muted-foreground">You successfully triaged the brute-force alert and identified a successful compromise.</p>
          <Button onClick={() => { setCurrentStageId("start"); setSelectedOption(null); }}>
            Restart Scenario
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleOptionSelect = (optionId: string) => {
    if (selectedOption) return; // Prevent changing answer
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    const option = stage.options.find(o => o.id === selectedOption);
    if (option && option.isCorrect && option.nextStageId) {
      setCurrentStageId(option.nextStageId);
      setSelectedOption(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="bg-card border-border shadow-xl">
        <CardHeader className="border-b border-border bg-secondary/30 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center text-lg">
            <Terminal className="w-5 h-5 mr-3 text-primary" />
            Investigation Console
          </CardTitle>
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {stageNumber} of {stageOrder.length}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary" aria-label={`Investigation progress: ${stageNumber} of ${stageOrder.length}`}>
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(stageNumber / stageOrder.length) * 100}%` }} />
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">{stage.title}</h3>
            {stage.alertDetails}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg leading-7">{stage.question}</h4>
            
            <div className="space-y-3">
              {stage.options.map((option) => {
                const isSelected = selectedOption === option.id;
                let btnClass = "w-full justify-start text-left h-auto py-4 px-4 sm:px-6 border-border hover:bg-secondary";
                
                if (selectedOption) {
                  if (isSelected) {
                    if (option.isCorrect) {
                      btnClass = "w-full justify-start text-left h-auto py-4 px-4 sm:px-6 border-success bg-success/10 text-success-foreground";
                    } else {
                      btnClass = "w-full justify-start text-left h-auto py-4 px-4 sm:px-6 border-destructive bg-destructive/10 text-destructive-foreground";
                    }
                  } else {
                    if (option.isCorrect) {
                       btnClass = "w-full justify-start text-left h-auto py-4 px-4 sm:px-6 border-success/50 text-foreground opacity-50";
                    } else {
                       btnClass = "w-full justify-start text-left h-auto py-4 px-4 sm:px-6 border-border opacity-50";
                    }
                  }
                }

                return (
                  <Button
                    key={option.id}
                    variant="outline"
                    className={btnClass}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={selectedOption !== null}
                  >
                    <span className="whitespace-normal leading-relaxed">{option.text}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {selectedOption && (
            <div aria-live="polite" className={`p-4 rounded-md border ${
              stage.options.find(o => o.id === selectedOption)?.isCorrect 
                ? "bg-success/10 border-success/30 text-success-foreground" 
                : "bg-destructive/10 border-destructive/30 text-destructive-foreground"
            }`}>
              <p className="font-medium mb-4">
                {stage.options.find(o => o.id === selectedOption)?.feedback}
              </p>
              
              {stage.options.find(o => o.id === selectedOption)?.isCorrect && (
                <Button onClick={handleNext} className="bg-primary text-primary-foreground">
                  Continue Investigation <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              
              {!stage.options.find(o => o.id === selectedOption)?.isCorrect && (
                <Button variant="outline" onClick={() => setSelectedOption(null)}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
