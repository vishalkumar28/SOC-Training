"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

const THEME_EVENT = "soc-academy-theme-change";

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    // Initial theme setup
    const stored = window.localStorage.getItem("soc-academy-theme");
    const dark = stored ? stored === "dark" : true;
    setIsDark(dark);

    const handleThemeChange = (event: Event) => {
      setIsDark((event as CustomEvent<boolean>).detail);
    };
    
    window.addEventListener(THEME_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_EVENT, handleThemeChange);
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const renderDiagram = async () => {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "default",
        fontFamily: "inherit",
      });
      
      try {
        // Remove trailing newlines or artifacts
        const cleanChart = chart.trim();
        const id = `mermaid-${Math.random().toString(36).substring(7)}`;
        const { svg } = await mermaid.render(id, cleanChart);
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (e) {
        console.error("Mermaid render error", e);
        if (isMounted) {
          setSvgContent(`<div class="text-warning text-sm p-4 border border-warning/30 bg-warning/10 rounded-md">Error rendering diagram. Check console for details.</div>`);
        }
      }
    };
    
    if (chart) {
      renderDiagram();
    }
    
    return () => {
      isMounted = false;
    };
  }, [chart, isDark]);

  return (
    <div 
      ref={ref} 
      className="mermaid-diagram my-8 flex justify-center overflow-x-auto rounded-xl border border-border bg-card/40 p-6 shadow-sm" 
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
