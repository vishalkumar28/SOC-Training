"use client";

import { useState } from "react";
import { Search, ShieldAlert, Crosshair, Server, Activity, ArrowRight, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MitreTechnique {
  id: string;
  name: string;
  tactic: string;
  evidence: string;
  confidence: "Low" | "Medium" | "High";
  status?: "Observed" | "Not observed";
}

const tactics = [
  "Initial Access",
  "Execution",
  "Persistence",
  "Privilege Escalation",
  "Defense Evasion",
  "Credential Access",
  "Discovery",
  "Lateral Movement",
  "Collection",
  "Command and Control",
  "Exfiltration",
  "Impact"
];

const mappedEvidence: MitreTechnique[] = [
  {
    id: "T1078",
    name: "Valid Accounts",
    tactic: "Initial Access",
    evidence: "Successful remote login for jsmith followed the failed-login sequence.",
    confidence: "High"
  },
  {
    id: "T1110",
    name: "Brute Force",
    tactic: "Credential Access",
    evidence: "15 failed logins via Event ID 4625 followed by success",
    confidence: "High"
  },
  {
    id: "T1059.001",
    name: "PowerShell",
    tactic: "Execution",
    evidence: "Encoded PowerShell command executed after login",
    confidence: "High"
  },
  {
    id: "T1053.005",
    name: "Scheduled Task",
    tactic: "Persistence",
    evidence: "Schtasks.exe created a persistence mechanism",
    confidence: "High"
  },
  {
    id: "T1098",
    name: "Account Manipulation",
    tactic: "Privilege Escalation",
    evidence: "The support_admin account was created and added to Domain Admins.",
    confidence: "High"
  },
  {
    id: "T1027",
    name: "Obfuscated Files or Information",
    tactic: "Defense Evasion",
    evidence: "The PowerShell command used an encoded payload.",
    confidence: "High"
  },
  {
    id: "T1046",
    name: "Network Service Scanning",
    tactic: "Discovery",
    evidence: "A port scan against WS-FINANCE-01 was recorded before the authentication attack.",
    confidence: "Medium"
  },
  {
    id: "T1021.001",
    name: "Remote Services: RDP",
    tactic: "Lateral Movement",
    evidence: "The successful Event ID 4624 used Logon Type 10 (Remote Interactive).",
    confidence: "Medium"
  },
  {
    id: "T1071.001",
    name: "Web Protocols",
    tactic: "Command and Control",
    evidence: "The compromised host initiated an outbound connection to suspicious infrastructure on port 4444.",
    confidence: "Medium"
  },
  {
    id: "COLLECTION-GAP",
    name: "No direct collection evidence",
    tactic: "Collection",
    evidence: "The current dataset does not show files being staged, archived, or collected. Review file-access and archive logs before closing this assessment.",
    confidence: "Low",
    status: "Not observed"
  },
  {
    id: "EXFILTRATION-GAP",
    name: "No direct exfiltration evidence",
    tactic: "Exfiltration",
    evidence: "No confirmed data transfer or exfiltration event is present in the supplied telemetry. Review proxy, DNS, and egress logs.",
    confidence: "Low",
    status: "Not observed"
  },
  {
    id: "IMPACT-GAP",
    name: "No direct impact evidence",
    tactic: "Impact",
    evidence: "The dataset shows compromise and privilege escalation, but no destructive action, encryption, or service disruption.",
    confidence: "Low",
    status: "Not observed"
  },
  {
    id: "T1071",
    name: "Application Layer Protocol",
    tactic: "Command and Control",
    evidence: "HTTPS connection to unknown Russian IP",
    confidence: "Medium"
  }
];

export function MitreBoard() {
  const [activeTactic, setActiveTactic] = useState<string | null>(null);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-blue-500 text-white";
      default: return "bg-secondary text-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Tactics Sidebar */}
        <div className="xl:col-span-1 space-y-2 bg-card border border-border rounded-lg p-4 h-[600px] overflow-y-auto">
          <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">Tactics</h3>
          {tactics.map(tactic => {
            const hasMapping = mappedEvidence.some(e => e.tactic === tactic);
            return (
              <button
                key={tactic}
                onClick={() => setActiveTactic(tactic === activeTactic ? null : tactic)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-between
                  ${activeTactic === tactic ? 'bg-primary/20 text-primary' : 'hover:bg-secondary text-foreground'}
                  ${hasMapping && activeTactic !== tactic ? 'border-l-2 border-primary pl-2' : ''}
                `}
              >
                {tactic}
                {hasMapping && <Check className="w-3 h-3 text-primary" />}
              </button>
            )
          })}
        </div>

        {/* Evidence Board */}
        <div className="xl:col-span-3 bg-secondary/30 border border-border rounded-lg p-6 min-h-[600px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {activeTactic ? `${activeTactic} Techniques` : "All Mapped Evidence"}
            </h2>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {activeTactic ? mappedEvidence.filter(e => e.tactic === activeTactic).length : mappedEvidence.length} Assessed
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mappedEvidence
              .filter(e => activeTactic ? e.tactic === activeTactic : true)
              .map((technique) => (
              <Card key={technique.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold flex items-center">
                        {technique.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1 font-mono">{technique.id}</p>
                    </div>
                    <Badge className={technique.status === "Not observed" ? "bg-secondary text-muted-foreground" : getConfidenceColor(technique.confidence)}>
                      {technique.status ?? `${technique.confidence} Confidence`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 p-3 bg-secondary/50 rounded-md border border-border/50 text-sm">
                    <span className="text-xs text-muted-foreground uppercase block mb-1">Evidence</span>
                    {technique.evidence}
                  </div>
                  {!activeTactic && (
                    <div className="mt-3 text-xs text-primary font-medium flex items-center">
                      <ArrowRight className="w-3 h-3 mr-1" /> {technique.tactic}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {activeTactic && mappedEvidence.filter(e => e.tactic === activeTactic).length === 0 && (
              <div className="col-span-2 text-center py-16 text-muted-foreground bg-card/50 rounded-lg border border-dashed border-border">
                <Crosshair className="w-8 h-8 mx-auto mb-3 opacity-20" />
                <p>No evidence mapped to {activeTactic} yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
