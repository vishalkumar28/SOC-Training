"use client";

import { useState } from "react";
import { Search, Book } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import glossaryData from "@/data/glossary.json";

export default function GlossaryPage() {
  const [query, setQuery] = useState("");

  const filteredTerms = glossaryData.filter((item) => 
    item.term.toLowerCase().includes(query.toLowerCase()) || 
    item.definition.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center">
          <Book className="w-8 h-8 mr-3 text-primary" /> SOC & CTI Glossary
        </h1>
        <p className="text-xl text-muted-foreground">
          Quick reference for cybersecurity terminology used throughout the academy.
        </p>
      </div>

      <div className="relative max-w-xl mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search for a term..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 bg-secondary border-border text-base"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerms.map((item, idx) => (
          <Card key={idx} className="bg-card border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-primary mb-2">{item.term}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.definition}</p>
            </CardContent>
          </Card>
        ))}
        {filteredTerms.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No terms found matching "{query}".
          </div>
        )}
      </div>
    </div>
  );
}
