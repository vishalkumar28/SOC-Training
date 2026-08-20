import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Target, TerminalSquare, Info } from 'lucide-react';
import { InvestigationConsole } from '@/components/interactive/InvestigationConsole';
import { OperationShadowTrace } from '@/components/interactive/OperationShadowTrace';
import { MermaidDiagram } from '@/components/ui/MermaidDiagram';

interface PageProps {
  params: Promise<{
    day: string;
    slug: string;
  }>;
}

const textBlockBoundary = (line: string) =>
  /^(SOC Process|SOC Technology|Technology\t|Stage \d+:|Difficulty$|Step-by-Step Procedure|Expected Output|Key Concepts|Common Mistakes|SOC Analyst Checklist|Interview Questions|Student Task|PRACTICAL LAB \d+:|Lab [A-Z]:|Search for related events|Check if |Document Findings|Create a summary|DAY \d+:|TOPIC \d+:|\d+\.\d+\s)/.test(line);

const metadataLabels = new Set([
  "Lab Title",
  "Objective",
  "Difficulty",
  "Estimated Time",
  "Prerequisites",
]);

const proceduralHeading = /^(Procedure:|Observe the main dashboard:|Analyze the Alert:?|Expand (the )?Investigation:?|Document Findings:?|Identify the Alert|Gather Context|Analyze Patterns|Search for related events by:|Common Search Queries:|Learning Outcomes|Investigation Workflow in Wazuh|Wazuh Dashboard Navigation|Mapping Process|Definitions|Expected Output)$/;
const sectionBoundary = /^(Lab [A-Z]:|Step \d+:|PRACTICAL LAB \d+:|Analyst Decision|Escalation Decision|Final Analyst Note|Interview Questions|DAY \d+:|TOPIC \d+:|\d+\.\d+\s|Field\t|Query\t|Issue\t)/;

function toMarkdownTable(rows: string[]) {
  const cells = rows.map((row) => row.split("\t").map((cell) => cell.trim()));
  const width = Math.max(...cells.map((row) => row.length));
  const padded = cells.map((row) => [...row, ...Array(width - row.length).fill("")]);
  const header = `| ${padded[0].join(" | ")} |`;
  const divider = `| ${padded[0].map(() => "---").join(" | ")} |`;
  const body = padded.slice(1).map((row) => `| ${row.join(" | ")} |`);
  return [header, divider, ...body];
}

function normalizeMarkdown(source: string) {
  const lines = source.split(/\r?\n/);
  const output: string[] = [];
  let index = 0;
  let listMode = false;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    const inlineLab = trimmed.match(/^(Lab [A-Z]:\s+.+?)\s+(Objective|Environment|Scenario|Procedure):\s*(.+)$/);
    if (inlineLab) {
      output.push(`### ${inlineLab[1]}`, `**${inlineLab[2]}:** ${inlineLab[3]}`);
      listMode = inlineLab[2] === "Procedure";
      index += 1;
      continue;
    }

    if (/^(Expected Observations|Reasoning:|Key Concepts|Common Mistakes|SOC Analyst Checklist|What Students Will Learn|Why the Two Subjects Are Connected)$/.test(trimmed)) {
      listMode = true;
    }

    if (listMode && trimmed !== "" && !trimmed.startsWith("#") && sectionBoundary.test(trimmed)) {
      listMode = false;
    }

    if (trimmed === "text") {
      listMode = false;
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length) {
        const next = lines[index];
        const nextTrimmed = next.trim();
        if (nextTrimmed !== "" && textBlockBoundary(nextTrimmed)) break;
        codeLines.push(next);
        index += 1;
      }
      if (codeLines.length > 0) {
        while (codeLines[codeLines.length - 1] === "") codeLines.pop();
        const codeText = codeLines.join("\n");
        if (codeText.includes("SOC MANAGER") && codeText.includes("L1 ANALYST")) {
          output.push("[[SOC_ARCHITECTURE_DIAGRAM]]");
        } else if (codeText.includes("VALIDATION") && codeText.includes("DOCUMENTATION")) {
          output.push("[[SOC_WORKFLOW_DIAGRAM]]");
        } else {
          output.push("```text", ...codeLines, "```");
        }
      }
      continue;
    }

    if (/^\d+\.\d+\s+/.test(trimmed)) {
      listMode = false;
      output.push(`## ${trimmed}`);
      index += 1;
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      listMode = false;
      output.push(`## ${trimmed}`);
      index += 1;
      continue;
    }

    if (/^(SOC People|SOC Process|SOC Technology|Accessing Event Viewer|Important Concepts|Detection Types|Severity, Priority, and Confidence|L1 Analyst \(Tier 1\)|L2 Analyst \(Tier 2\)|L3 Analyst \(Tier 3\)|SOC Manager|Threat Hunter|Incident Responder)$/.test(trimmed)) {
      listMode = false;
      output.push(`### ${trimmed}`);
      index += 1;
      continue;
    }

    if (/^(PRACTICAL LAB \d+: .+|Step-by-Step Procedure|Step \d+: .+|Questions to ask:|Expected Observations|Analyst Decision|Escalation Decision|Final Analyst Note|Key Concepts|Common Mistakes|SOC Analyst Checklist|Interview Questions|Basic:|Intermediate:|Scenario:|Student Task|Instructor Solution|Alert Summary:|Investigation Summary:|Timeline:|IOC Table:|Classification:|Severity:|Confidence:|Scope:|Recommendations:|Final Conclusion:|DAY \d+ SUMMARY|Skills Acquired|Tools Used|Important Event IDs|Day \d+ Assessment|Multiple Choice Questions|Short Answer Questions|Scenario-Based Questions|FINAL COURSE ASSESSMENT|25 Questions|Basic Concepts|SOC Investigation|Windows Logs|SIEM|IOC Investigation|CTI|Threat Hunting|MITRE ATT&CK|Incident Response|Practical Final Assessment|Dataset|Grading Rubric|GLOSSARY|Detection Improvements|Lessons Learned|Final Analyst Conclusion|Containment Recommendations|Eradication Recommendations|Recovery Recommendations)$/.test(trimmed)) {
      if (/^(Analyst Decision|Escalation Decision|Final Analyst Note|Interview Questions|FINAL COURSE ASSESSMENT|25 Questions|Basic Concepts|SOC Investigation|Windows Logs|SIEM|IOC Investigation|CTI|Threat Hunting|MITRE ATT&CK|Incident Response|Practical Final Assessment|Dataset|Grading Rubric|GLOSSARY|Detection Improvements|Lessons Learned|Final Analyst Conclusion|Containment Recommendations|Eradication Recommendations|Recovery Recommendations)$/.test(trimmed)) listMode = /^(Detection Improvements|Lessons Learned|Containment Recommendations|Eradication Recommendations|Recovery Recommendations)$/.test(trimmed);
      output.push(`### ${trimmed}`);
      index += 1;
      continue;
    }

    if (proceduralHeading.test(trimmed)) {
      listMode = /^(Procedure:|Observe the main dashboard:|Expand (the )?Investigation:?|Document Findings:?|Identify the Alert|Gather Context|Analyze Patterns|Search for related events by:|Learning Outcomes)$/.test(trimmed);
      output.push(`### ${trimmed}`);
      index += 1;
      continue;
    }

    if (/^Lab [A-Z]:\s+.+$/.test(trimmed)) {
      output.push(`### ${trimmed}`);
      listMode = false;
      index += 1;
      continue;
    }

    if (metadataLabels.has(trimmed) && index + 1 < lines.length && lines[index + 1].trim() !== "") {
      output.push(`**${trimmed}:** ${lines[index + 1].trim()}`);
      index += 2;
      continue;
    }

    if (trimmed === "Access to this lab document") {
      output.push("- Access to this lab document");
      index += 1;
      continue;
    }

    if (line.includes("\t")) {
      listMode = false;
      const tableRows: string[] = [];
      while (index < lines.length && lines[index].includes("\t")) {
        tableRows.push(lines[index]);
        index += 1;
      }
      if (tableRows.length > 1) {
        output.push(...toMarkdownTable(tableRows));
      } else {
        output.push(...tableRows);
      }
      continue;
    }

    if (index + 1 < lines.length && lines[index + 1].includes("\t") && trimmed !== "" && !trimmed.endsWith("?")) {
      listMode = false;
      output.push(`### ${trimmed}`);
      index += 1;
      continue;
    }

    if (/^(Answer|Expected answer):\s*/.test(trimmed)) {
      output.push(`**Answer:** ${trimmed.replace(/^(Answer|Expected answer):\s*/, "")}`, "");
      index += 1;
      continue;
    }

    if (trimmed.endsWith("?") && !trimmed.startsWith("**")) {
      output.push(`**Question:** ${trimmed}`, "");
      index += 1;
      continue;
    }

    if (listMode && trimmed !== "" && !trimmed.startsWith("-") && !trimmed.startsWith("[") && !trimmed.endsWith(":") && !trimmed.endsWith("?")) {
      output.push(`- ${trimmed}`);
    } else {
      output.push(line);
    }
    index += 1;
  }

  return output.join("\n");
}

export default async function CoursePage(props: PageProps) {
  const params = await props.params;
  const { day, slug } = params;

  if (day !== 'day1' && day !== 'day2') {
    notFound();
  }

  const filePath = path.join(process.cwd(), 'src', 'data', 'content', day, `${slug}.md`);

  let content = '';
  try {
    content = await fs.readFile(filePath, 'utf-8');
  } catch {
    notFound();
  }

  const titleMatch = content.match(/^# (.*)$/m);
  const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ');
  const markdownBody = normalizeMarkdown(content.replace(/^# .*$/m, '').trim());

  // Handle specific interactive pages
  if (slug === 'final-practical-end-to-end-soc-investigation') {
    return (
      <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Day 1 Capstone</h2>
          <h1 className="text-4xl font-bold text-foreground mb-4">Investigation: PIET [Panipat Institute of Engineering & Technology]</h1>
          <p className="text-xl text-muted-foreground">
            Apply everything you&apos;ve learned today about SOC triage, Windows Event Logs, and Correlation to solve this incident.
          </p>
        </div>
        <InvestigationConsole />
        <section className="course-content mt-12 rounded-xl border border-border bg-card/40 px-4 py-8 sm:px-8 sm:py-10">
          <div className="mb-8 border-b border-border pb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">Reference material</p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Complete Final Assessment Details</h2>
            <p className="mt-2 text-muted-foreground">Use the dataset, investigation objectives, instructor solution, timeline, IOC register, and answer key to complete and review the exercise.</p>
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownBody}</ReactMarkdown>
        </section>
      </article>
    );
  }

  if (slug === 'operation-shadow-trace-final-investigation') {
    return (
      <div className="min-h-full">
        <OperationShadowTrace />
        <article className="course-content mx-auto w-full max-w-6xl border-t border-border px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl border-b border-border pb-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Section 12 reference notes</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Operation Shadow Trace — Complete Investigation Guide</h1>
            <p className="mt-3 text-muted-foreground">Use this reference section to review the case evidence, investigation procedure, intelligence assessment, response recommendations, and final questions.</p>
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownBody}</ReactMarkdown>
        </article>
      </div>
    );
  }

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-10 border-b border-border pb-8">
        <div className="flex items-center text-primary mb-4">
          <BookOpen className="w-5 h-5 mr-2" />
          <span className="font-semibold uppercase tracking-wider text-sm">
            {day === 'day1' ? 'Day 1: SOC & Security Monitoring' : 'Day 2: Threat Intelligence'}
          </span>
        </div>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h1>
      </div>

      <div className="course-content prose prose-invert max-w-none text-[1.05rem] leading-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-10 mb-6 text-foreground border-b border-border pb-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-8 mb-3 text-foreground flex items-center"><Target className="w-5 h-5 mr-2 text-primary" />{props.children}</h2>,
            h3: ({node, ...props}) => <h3 className="text-xl font-medium mt-6 mb-3 text-foreground" {...props} />,
            p: ({node, ...props}) => {
              // Check if it's a "Hinglish" or "Layer" block to style differently
              const text = String(props.children);
              if (text.trim() === "[[SOC_ARCHITECTURE_DIAGRAM]]") {
                return <SocArchitectureDiagram />;
              }
              if (text.trim() === "[[SOC_WORKFLOW_DIAGRAM]]") {
                return <SocWorkflowDiagram />;
              }
              const field = text.match(/^(Primary responsibility|Typical tasks|Key skills|Decision):\s*([\s\S]*)$/);
              if (field) {
                return (
                  <div className="my-3 grid gap-1 rounded-lg border border-border/70 bg-secondary/20 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{field[1]}</span>
                    <span className="leading-7 text-muted-foreground">{field[2]}</span>
                  </div>
                );
              }
              if (text.trim().endsWith("?") && !text.startsWith("Hinglish:")) {
                return (
                  <div className="my-3 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                    <span className="shrink-0 rounded-md bg-primary/15 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary">Question</span>
                    <span className="leading-7 text-muted-foreground">{props.children}</span>
                  </div>
                );
              }
              if (text.startsWith('Hinglish:')) {
                return (
                  <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg my-6 flex items-start">
                    <Info className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                    <p className="m-0 text-foreground">{text.replace('Hinglish:', '').trim()}</p>
                  </div>
                );
              }
              if (text.startsWith('Layer 1:') || text.startsWith('Layer 2:') || text.startsWith('Layer 3:')) {
                return (
                  <Card className="my-6 bg-secondary/30 border-border">
                    <CardContent className="p-5">
                      <p className="m-0 text-foreground font-medium">{text}</p>
                    </CardContent>
                  </Card>
                );
              }
              return <p className="mb-3 leading-7 text-muted-foreground" {...props} />
            },
            ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-muted-foreground" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-muted-foreground" {...props} />,
            li: ({node, ...props}) => <li className="pl-2" {...props} />,
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-warning/50 bg-warning/10 text-warning-foreground py-2 px-4 rounded-r-lg my-6" {...props} />
            ),
            code: ({node, className, ...props}) => {
              const match = /language-(\w+)/.exec(className || '');
              const isInline = !match && !String(props.children).includes('\n');
              
              if (match && match[1] === 'mermaid') {
                return <MermaidDiagram chart={String(props.children)} />
              }
              
              if (isInline) {
                return <code className="bg-secondary px-1.5 py-0.5 rounded-md text-sm font-mono text-primary" {...props} />
              }
              return (
                <div className="relative my-6 rounded-lg overflow-hidden border border-border">
                  <div className="bg-secondary/80 px-4 py-2 border-b border-border flex items-center">
                    <TerminalSquare className="w-4 h-4 text-muted-foreground mr-2" />
                    <span className="text-xs text-muted-foreground font-mono uppercase">{match ? match[1] : 'Log/Command'}</span>
                  </div>
                  <pre className="p-4 bg-background overflow-x-auto">
                    <code className="text-sm font-mono text-muted-foreground" {...props} />
                  </pre>
                </div>
              )
            },
            pre: ({children}) => <>{children}</>,
            table: ({node, ...props}) => (
              <div className="overflow-x-auto my-8 border border-border rounded-lg">
                <table className="w-full text-sm text-left border-collapse" {...props} />
              </div>
            ),
            thead: ({node, ...props}) => <thead className="bg-secondary/50 text-foreground uppercase text-xs" {...props} />,
            th: ({node, ...props}) => <th className="px-6 py-4 font-semibold border-b border-border" {...props} />,
            td: ({node, ...props}) => <td className="px-6 py-4 border-b border-border text-muted-foreground" {...props} />,
            tr: ({node, ...props}) => <tr className="hover:bg-secondary/20 transition-colors" {...props} />,
            a: ({node, ...props}) => <a className="text-primary hover:underline hover:text-primary/80 transition-colors font-medium" {...props} />,
          }}
        >
          {markdownBody}
        </ReactMarkdown>
      </div>
    </article>
  );
}

function SocArchitectureDiagram() {
  return (
    <div className="my-8 rounded-xl border border-border bg-secondary/20 p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">SOC operating model</p><h3 className="mt-1 text-lg font-bold text-foreground">People and escalation structure</h3></div><span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">Roles</span></div>
      <div className="mx-auto max-w-3xl space-y-3">
        <DiagramNode title="SOC Manager" description="Strategy, reporting, and team management" tone="primary" />
        <div className="mx-auto h-5 w-px bg-border" />
        <div className="grid gap-3 md:grid-cols-3"><DiagramNode title="L3 Analyst" description="Advanced investigation" tone="accent" /><DiagramNode title="Threat Hunter" description="Proactive detection" tone="accent" /><DiagramNode title="Incident Responder" description="Containment and recovery" tone="accent" /></div>
        <div className="mx-auto h-5 w-px bg-border" />
        <DiagramNode title="L2 Analyst" description="Deep investigation and validation" tone="warning" />
        <div className="mx-auto h-5 w-px bg-border" />
        <DiagramNode title="L1 Analyst" description="Alert triage and escalation" tone="success" />
      </div>
    </div>
  );
}

function SocWorkflowDiagram() {
  const steps = ["Alert", "Validation", "Triage", "Context gathering", "Investigation", "Severity assessment", "Escalation", "Documentation"];
  return <div className="my-8 rounded-xl border border-border bg-secondary/20 p-4 sm:p-6"><div className="mb-5"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Analyst workflow</p><h3 className="mt-1 text-lg font-bold text-foreground">From alert to documented decision</h3></div><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, index) => <div key={step} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{index + 1}</span><span className="text-sm font-medium capitalize text-foreground">{step}</span></div>)}</div></div>;
}

function DiagramNode({ title, description, tone }: { title: string; description: string; tone: "primary" | "accent" | "warning" | "success" }) {
  const tones = { primary: "border-primary/40 bg-primary/10", accent: "border-accent/35 bg-accent/10", warning: "border-warning/35 bg-warning/10", success: "border-success/35 bg-success/10" };
  return <div className={`rounded-lg border p-4 text-center ${tones[tone]}`}><p className="font-bold text-foreground">{title}</p><p className="mt-1 text-xs text-muted-foreground">{description}</p></div>;
}
