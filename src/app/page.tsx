"use client";

import Link from "next/link";
import { ArrowRight, Activity, ChevronRight, Layers, ShieldAlert, ShieldCheck, Target, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const journeyStages = [
  ["SOC Fundamentals", Layers], ["Windows Logs", Terminal], ["Authentication", ShieldCheck], ["SIEM", Activity],
  ["IOC Investigation", Target], ["Correlation", Activity], ["Timeline", Activity], ["Triage", ShieldAlert],
] as const;

const stats = [
  ["2 Days", "Duration"], ["23", "Learning objectives"], ["8+", "Practical investigations"],
  ["Windows + Wazuh", "Core stack"], ["CTI + Dark Web", "Intelligence"], ["MITRE ATT&CK", "Framework"],
];

export default function Dashboard() {
  return (
    <div className="min-h-full">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-secondary/35 px-4 py-14 sm:px-8 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(hsl(var(--border)/.35)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/.35)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/15 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent/15 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary sm:text-sm"><span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary" />System online · Academy path ready</div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">Become <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">investigation ready.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Learn how SOC analysts turn logs and alerts into evidence, intelligence, and response decisions through a practical two-day investigation path.</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/course/day1/soc-fundamentals-l1-analyst-workflow"><Button size="lg" className="h-12 w-full px-7 font-bold shadow-[0_0_20px_rgba(20,184,166,0.3)] sm:w-auto">Start Day 1 <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
            <Link href="#course-overview"><Button size="lg" variant="outline" className="h-12 w-full border-border bg-card/50 px-7 sm:w-auto">Explore the course</Button></Link>
          </div>
        </div>
      </section>

      <section id="course-overview" className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Course overview</p><h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Build the analyst foundation</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">A guided path from first alert triage to threat intelligence and final incident reporting.</p></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TrackCard day="DAY 1" title="SOC & Security Monitoring" description="Work with Windows logs, Wazuh alerts, authentication attacks, IOCs, correlation, timelines, and response." href="/course/day1/soc-fundamentals-l1-analyst-workflow" icon={<ShieldCheck className="h-5 w-5" />} tone="primary" />
          <TrackCard day="DAY 2" title="Threat Intelligence" description="Enrich indicators, analyze malware and dark-web intelligence, profile actors, map TTPs, and assess risk." href="/course/day2/cyber-threat-intelligence-fundamentals" icon={<Target className="h-5 w-5" />} tone="accent" />
          <TrackCard day="CAPSTONE" title="Final investigations" description="Apply the full workflow in the ACME University practical and Operation Shadow Trace investigations." href="/course/day1/final-practical-end-to-end-soc-investigation" icon={<ShieldAlert className="h-5 w-5" />} tone="warning" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-border px-4 py-12 sm:px-8 sm:py-16"><p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Course snapshot</p><div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">{stats.map(([value, label]) => <Card key={label} className="border-border bg-secondary/40"><CardContent className="flex min-h-28 flex-col justify-center p-4"><span className="text-xl font-bold text-foreground">{value}</span><span className="mt-2 text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span></CardContent></Card>)}</div></section>

      <section className="mx-auto max-w-7xl border-t border-border px-4 py-12 sm:px-8 sm:py-16"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Learning path</p><h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">The investigation pipeline</h2><p className="mt-2 text-muted-foreground">Follow the path from raw telemetry to actionable intelligence.</p></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">{journeyStages.map(([name, Icon], index) => <div key={name} className="group relative rounded-xl border border-border bg-card/60 p-4 text-center transition-colors hover:border-primary/50 hover:bg-secondary/50"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary"><Icon className="h-4 w-4" /></div><span className="mt-3 block text-xs font-semibold leading-5 text-muted-foreground group-hover:text-foreground">{String(index + 1).padStart(2, "0")} · {name}</span></div>)}</div></section>
    </div>
  );
}

function TrackCard({ day, title, description, href, icon, tone }: { day: string; title: string; description: string; href: string; icon: React.ReactNode; tone: "primary" | "accent" | "warning" }) {
  const colors = { primary: "border-primary/30 bg-primary/5 text-primary", accent: "border-accent/30 bg-accent/5 text-accent", warning: "border-warning/30 bg-warning/5 text-warning" };
  return <Link href={href} className="group block h-full"><Card className="h-full border-border bg-card transition-all group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-lg"><CardContent className="flex h-full flex-col p-5"><div className="flex items-center justify-between"><span className={`rounded-md border px-2 py-1 text-[0.65rem] font-bold tracking-wider ${colors[tone]}`}>{day}</span><span className="text-muted-foreground transition-transform group-hover:translate-x-1"><ChevronRight className="h-5 w-5" /></span></div><div className="mt-5 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">{icon}</div><h3 className="mt-4 text-lg font-bold text-foreground">{title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{description}</p><span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">Open track <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></span></CardContent></Card></Link>;
}
