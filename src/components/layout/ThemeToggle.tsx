"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_EVENT = "soc-academy-theme-change";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("soc-academy-theme");
    const dark = stored ? stored === "dark" : true;
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
    setIsDark(dark);

    const handleThemeChange = (event: Event) => {
      setIsDark((event as CustomEvent<boolean>).detail);
    };
    window.addEventListener(THEME_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_EVENT, handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    document.documentElement.classList.toggle("light", !nextIsDark);
    window.localStorage.setItem("soc-academy-theme", nextIsDark ? "dark" : "light");
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: nextIsDark }));
    setIsDark(nextIsDark);
  };

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className={compact ? "text-muted-foreground transition-colors hover:text-foreground" : "flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {!compact && <span>{isDark ? "Light theme" : "Dark theme"}</span>}
    </button>
  );
}
