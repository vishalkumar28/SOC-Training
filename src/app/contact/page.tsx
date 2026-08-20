import { Mail, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Connect</h2>
        <h1 className="text-4xl font-bold text-foreground mb-4">Contact Instructor</h1>
        <p className="text-xl text-muted-foreground">
          Thank you for completing the Professional 2-Day SOC & Advanced Threat Intelligence Training!
        </p>
      </div>

      <div className="mt-12 rounded-xl border border-border bg-card/40 px-6 py-12 sm:px-12 text-center">
        <p className="text-lg text-foreground mb-8">
          If you have any questions, feedback, or would like to connect for professional opportunities, please feel free to reach out.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="mailto:vishalkumar280404@gmail.com"
            className="flex items-center gap-3 rounded-lg border border-border bg-background px-6 py-4 hover:border-primary/50 hover:bg-secondary transition-colors"
          >
            <Mail className="h-6 w-6 text-primary" />
            <span className="font-medium text-foreground">vishalkumar280404@gmail.com</span>
          </a>

          <a
            href="https://www.linkedin.com/in/vishal-kumar28/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border bg-background px-6 py-4 hover:border-[#0A66C2]/50 hover:bg-secondary transition-colors"
          >
            <ExternalLink className="h-6 w-6 text-[#0A66C2]" />
            <span className="font-medium text-foreground">LinkedIn Profile</span>
          </a>
        </div>
      </div>
    </article>
  );
}
