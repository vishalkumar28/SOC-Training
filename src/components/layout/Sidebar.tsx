"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Terminal, 
  BookOpen, 
  ShieldAlert, 
  FileSearch, 
  LogOut,
  Search,
  ChevronDown,
  ChevronRight,
  Home,
  Mail
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import courseIndex from "@/data/course-index.json";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  children?: {
    title: string;
    href: string;
  }[];
}

const menuItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="w-4 h-4" />
  },
  {
    title: "Reference",
    href: "/reference",
    icon: <BookOpen className="w-4 h-4" />,
    children: [
      { title: "Windows Event IDs", href: "/reference/event-ids" },
      { title: "MITRE ATT&CK", href: "/reference/mitre" },
      { title: "Glossary", href: "/reference/glossary" }
    ]
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <Mail className="w-4 h-4" />
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Day 1: Monitoring", "Day 2: Intelligence", "Reference"]);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="flex h-dvh w-64 min-h-0 shrink-0 flex-col border-r border-border bg-card text-card-foreground">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-card-foreground text-sm leading-tight">SOC Intelligence</h1>
            <p className="text-[10px] text-muted-foreground font-mono">ACADEMY v2.0</p>
          </div>
        </div>
      </div>

      {/* Global Search */}
      <div className="p-4 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search course..."
            className="w-full bg-secondary/50 border border-border rounded-md pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
          />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="min-h-0 flex-1 py-4">
        <div className="px-3 space-y-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <div>
                  <button 
                    onClick={() => toggleExpand(item.title)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md text-card-foreground/80 hover:bg-secondary/50 hover:text-card-foreground transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-medium">{item.title}</span>
                    </div>
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    )}
                  </button>
                  
                  {expandedItems.includes(item.title) && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-border/50 pl-2">
                      {item.children.map((child) => {
                        const isActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-3 py-1.5 text-xs rounded-md transition-colors ${
                              isActive 
                                ? "bg-primary/10 text-primary font-medium" 
                                : "text-muted-foreground hover:text-card-foreground hover:bg-secondary/50"
                            }`}
                          >
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                    pathname === item.href 
                      ? "bg-primary/20 text-primary font-medium" 
                      : "text-card-foreground/80 hover:bg-secondary/50 hover:text-card-foreground"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </Link>
              )}
            </div>
          ))}

          {/* Day 1 Dynamic Section */}
          <div className="mt-6 mb-2 px-3">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center">
              <ShieldAlert className="w-3 h-3 mr-2" /> Day 1: Monitoring
            </h3>
          </div>
          {courseIndex.day1.map((module, idx) => {
            const isActive = pathname === module.path;
            const isCapstone = module.slug.includes("final");
            return (
              <Link
                key={module.slug}
                href={module.path}
                className={`flex items-center gap-3 px-3 py-2 mx-3 text-xs rounded-md transition-colors ${
                  isActive 
                    ? "bg-primary/20 text-primary font-medium border border-primary/20" 
                    : isCapstone 
                      ? "text-accent border border-accent/20 hover:bg-accent/10"
                      : "text-card-foreground/70 hover:bg-secondary hover:text-card-foreground"
                }`}
              >
                <span className="truncate">{idx + 1}. {module.title.replace('SOC ', '')}</span>
              </Link>
            )
          })}

          {/* Day 2 Dynamic Section */}
          <div className="mt-6 mb-2 px-3">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center">
              <FileSearch className="w-3 h-3 mr-2" /> Day 2: Intelligence
            </h3>
          </div>
          {courseIndex.day2.map((module, idx) => {
            const isActive = pathname === module.path;
            const isCapstone = module.slug.includes("operation-shadow-trace");
            return (
              <Link
                key={module.slug}
                href={module.path}
                className={`flex items-center gap-3 px-3 py-2 mx-3 text-xs rounded-md transition-colors ${
                  isActive 
                    ? "bg-primary/20 text-primary font-medium border border-primary/20" 
                    : isCapstone 
                      ? "text-accent border border-accent/20 hover:bg-accent/10 mt-2"
                      : "text-card-foreground/70 hover:bg-secondary hover:text-card-foreground"
                }`}
              >
                <span className="truncate">{idx + 1}. {module.title.replace('CYBER ', '')}</span>
              </Link>
            )
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center justify-between text-muted-foreground">
          <ThemeToggle />
          <button className="flex items-center gap-2 text-xs hover:text-destructive transition-colors">
            <LogOut className="w-4 h-4" />
            Exit
          </button>
        </div>
      </div>
    </aside>
  );
}
