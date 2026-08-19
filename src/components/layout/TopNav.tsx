"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function TopNav() {
  const pathname = usePathname();
  
  // Create breadcrumbs from pathname
  const segments = pathname.split('/').filter(Boolean);
  
  return (
    <header className="sticky top-0 z-20 flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="min-w-0 flex-1 overflow-hidden">
        <div className="flex items-center truncate text-sm text-muted-foreground">
        <Link href="/" className="shrink-0 font-semibold text-foreground transition-colors hover:text-primary">Academy</Link>
        {segments.map((segment, index) => (
          <span key={`${segment}-${index}`} className="flex min-w-0 items-center">
            <span className="mx-2 text-border">/</span>
            <span className={`truncate capitalize ${index === segments.length - 1 ? "font-medium text-foreground" : "transition-colors hover:text-foreground"}`}>
              {segment.replace(/-/g, ' ')}
            </span>
          </span>
        ))}
        </div>
      </nav>
      
      <div className="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-6">
        <div className="relative hidden w-56 lg:block xl:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search topics, Event IDs, Labs..." 
            className="pl-9 h-9 bg-secondary/50 border-border text-sm rounded-full focus-visible:ring-primary"
          />
        </div>
        
        <div className="flex items-center gap-3 border-l border-border pl-3 sm:gap-4 sm:pl-5">
          <ThemeToggle compact />
          <button aria-label="Notifications" className="relative text-muted-foreground transition-colors hover:text-foreground">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <div aria-label="User profile" className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
