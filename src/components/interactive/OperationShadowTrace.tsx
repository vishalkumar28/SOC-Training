"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Crosshair, Activity, Clock, FileText, CheckCircle2 } from "lucide-react";
import { AttackTimeline } from "@/components/interactive/AttackTimeline";
import { MitreBoard } from "@/components/interactive/MitreBoard";
import { InvestigationConsole } from "@/components/interactive/InvestigationConsole";

const workspaceSections = {
  evidence: ["15 failed logons from 203.0.113.45", "Successful RDP logon for jsmith at 09:28:15", "Encoded PowerShell execution at 09:29:00", "Payload downloaded to the temporary directory"],
  ioc: ["203.0.113.45 — external source IP", "jsmith — compromised account", "payload.exe — downloaded file", "T1059.001 — PowerShell execution"],
  cti: ["Check IP reputation and hosting history", "Search the payload hash across multiple sources", "Compare observed behavior with known campaigns", "Record source, timestamp, confidence, and limitations"],
  darkweb: ["Validate the source reputation", "Compare sample data with known PIET formats", "Avoid treating an unverified claim as confirmed", "Escalate credible exposure for containment"],
  actor: ["Likely objective: credential access and persistence", "Observed access: brute force followed by RDP", "Observed tooling: PowerShell and scheduled task", "Attribution confidence: medium until corroborated"],
  ttp: ["Credential Access — Brute Force (T1110)", "Execution — PowerShell (T1059.001)", "Persistence — Scheduled Task (T1053.005)", "Command and Control — Application Layer Protocol (T1071)"],
  risk: ["Severity: High — confirmed account compromise", "Affected asset: faculty workstation", "Potential impact: student PII and research data", "Confidence: 78% based on correlated telemetry"],
  response: ["Disable or reset the compromised account", "Isolate the affected endpoint", "Block confirmed malicious infrastructure", "Collect evidence and escalate to incident response"],
} as const;

const workspaceTitles: Record<keyof typeof workspaceSections, string> = {
  evidence: "Evidence Review", ioc: "IOC Register", cti: "Threat Intelligence", darkweb: "Dark Web Intelligence",
  actor: "Threat Actor Profile", ttp: "TTP Analysis", risk: "Risk Assessment", response: "Response Plan",
};

export function OperationShadowTrace() {
  const [reportGenerated, setReportGenerated] = useState(false);
  return (
    <div className="flex min-h-full flex-col bg-background">
      
      {/* Capstone Header */}
      <div className="border-b border-border bg-card/70 p-4 shadow-sm sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h1 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <Crosshair className="mr-3 h-7 w-7 shrink-0 text-destructive sm:h-8 sm:w-8" />
                OPERATION SHADOW TRACE
              </h1>
              <p className="text-muted-foreground mt-1">Final Capstone Investigation - PIET [Panipat Institute of Engineering & Technology]</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
              <div className="bg-secondary p-3 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Threat Level</div>
                <div className="text-destructive font-bold flex items-center">
                  <ShieldAlert className="w-4 h-4 mr-1" /> HIGH
                </div>
              </div>
              <div className="bg-secondary p-3 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Confidence</div>
                <div className="text-primary font-bold">78%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <Tabs defaultValue="case" className="w-full">
            <TabsList className="mb-8 flex h-auto w-full flex-wrap justify-start gap-2 overflow-visible bg-transparent p-0">
              {[['case', 'Case Brief'], ['evidence', 'Evidence'], ['ioc', 'IOC'], ['cti', 'Threat Intel'], ['darkweb', 'Dark Web'], ['actor', 'Threat Actor'], ['ttp', 'TTP'], ['mitre', 'MITRE'], ['timeline', 'Timeline'], ['risk', 'Risk'], ['response', 'Response'], ['report', 'Final Report']].map(([value, label]) => (
                <TabsTrigger key={value} value={value} className="flex-none border border-transparent px-3 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/20 data-[state=active]:text-primary">{label}</TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="case" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-card border-border">
                    <CardContent className="p-8 space-y-6">
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-2 flex items-center">
                          <Activity className="w-5 h-5 mr-2 text-primary" /> Incident Overview
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          At 09:23 UTC, the SOC received a high-severity alert from the SIEM indicating multiple failed authentications targeting the account <code className="bg-secondary px-1 py-0.5 rounded text-foreground">jsmith</code>. Subsequent telemetry revealed a successful login from the same external IP address, followed by encoded PowerShell execution and the downloading of an unknown payload.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                        <h3 className="font-semibold text-foreground mb-2">Investigation Objectives</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start"><Check className="w-4 h-4 text-primary mr-2 mt-0.5" /> <strong>WHO:</strong> Identify the threat actor or group responsible.</li>
                          <li className="flex items-start"><Check className="w-4 h-4 text-primary mr-2 mt-0.5" /> <strong>WHAT:</strong> Determine exactly what data or systems were compromised.</li>
                          <li className="flex items-start"><Check className="w-4 h-4 text-primary mr-2 mt-0.5" /> <strong>WHEN:</strong> Reconstruct a precise timeline of the attack.</li>
                          <li className="flex items-start"><Check className="w-4 h-4 text-primary mr-2 mt-0.5" /> <strong>HOW:</strong> Map the attacker&apos;s TTPs to the MITRE ATT&CK framework.</li>
                          <li className="flex items-start"><Check className="w-4 h-4 text-primary mr-2 mt-0.5" /> <strong>WHY:</strong> Assess the motivation (financial, espionage, etc.).</li>
                          <li className="flex items-start"><Check className="w-4 h-4 text-primary mr-2 mt-0.5" /> <strong>RESPONSE:</strong> Provide actionable remediation steps.</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <InvestigationConsole />
                </div>
                
                <div className="space-y-6">
                  <Card className="bg-secondary/30 border-border">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-foreground mb-4">Target Profile</h3>
                      <div className="space-y-4 text-sm">
                        <div>
                          <span className="text-muted-foreground block mb-1">Organization</span>
                          <span className="font-medium">PIET [Panipat Institute of Engineering & Technology]</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block mb-1">Sector</span>
                          <span className="font-medium">Higher Education</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block mb-1">Affected User</span>
                          <span className="font-medium text-warning">jsmith (Faculty)</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block mb-1">Crown Jewels Risk</span>
                          <span className="font-medium text-destructive">Student PII, Research Data</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-0">
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="text-center mb-8 max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold text-foreground flex items-center justify-center">
                    <Clock className="w-6 h-6 mr-3 text-primary" /> Event Timeline
                  </h2>
                  <p className="text-muted-foreground mt-2">Reconstructed sequence of events based on correlated SIEM logs and endpoint telemetry.</p>
                </div>
                <AttackTimeline />
              </div>
            </TabsContent>

            <TabsContent value="mitre" className="mt-0">
               <MitreBoard />
            </TabsContent>
            
            <TabsContent value="report" className="mt-0">
              <Card className="bg-card border-border max-w-4xl mx-auto shadow-2xl">
                <CardContent className="p-12 text-center space-y-6">
                  {reportGenerated ? <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-success" /> : <FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-50" />}
                  <h2 className="text-3xl font-bold text-foreground">{reportGenerated ? "Report Ready" : "Generate Final Report"}</h2>
                  <p className="mx-auto max-w-lg text-muted-foreground">{reportGenerated ? "Your evidence, timeline, IOC register, risk assessment, and response plan have been compiled into a final investigation summary." : "Compile the current findings, IOCs, timeline, and MITRE mappings into a professional investigation summary."}</p>
                  <Button onClick={() => setReportGenerated(true)} className="mt-8 bg-primary px-8 py-4 font-bold text-primary-foreground shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:bg-primary/90">{reportGenerated ? "REPORT GENERATED" : "GENERATE INVESTIGATION REPORT"}</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {Object.entries(workspaceSections).map(([tab, items]) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <Card className="mx-auto max-w-4xl border-border bg-card">
                  <CardContent className="p-5 sm:p-8">
                    <div className="mb-6 border-b border-border pb-5"><h2 className="text-2xl font-bold text-foreground">{workspaceTitles[tab as keyof typeof workspaceSections]}</h2><p className="mt-2 text-muted-foreground">Review and document this part of the investigation before moving to the final report.</p></div>
                    <div className="grid gap-3 md:grid-cols-2">{items.map((item) => <div key={item} className="flex items-start gap-3 rounded-lg border border-border/70 bg-secondary/30 p-4 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</div>)}</div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

          </Tabs>
        </div>
      </div>
    </div>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  );
}
