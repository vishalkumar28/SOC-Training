"use client";

import { useState } from "react";
import { Search, Shield, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import eventIdsData from "@/data/event-ids.json";
import { EventID } from "@/data/types";

export function EventIdExplorer() {
  const [query, setQuery] = useState("");
  const events = eventIdsData as EventID[];

  const filteredEvents = events.filter((e) => 
    e.id.includes(query) || 
    e.name.toLowerCase().includes(query.toLowerCase()) ||
    e.meaning.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search Event ID (e.g., 4625) or keyword..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 bg-secondary border-border text-base"
        />
      </div>

      <div className="space-y-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="bg-card border-border overflow-hidden">
            <div className="bg-secondary/50 px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-lg px-3 py-1">
                  ID {event.id}
                </Badge>
                <h3 className="text-xl font-bold text-foreground">{event.name}</h3>
              </div>
            </div>
            
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    <Info className="w-4 h-4 mr-2" /> What it means
                  </h4>
                  <p className="text-foreground">{event.meaning}</p>
                </div>
                
                <div>
                  <h4 className="flex items-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    <Shield className="w-4 h-4 mr-2" /> SOC Use Case
                  </h4>
                  <p className="text-foreground">{event.socUseCase}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Important Fields
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.importantFields.map((field) => (
                      <Badge key={field} variant="secondary" className="bg-secondary/80">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/10">
                  <h4 className="flex items-center text-sm font-semibold text-destructive uppercase tracking-wider mb-2">
                    <AlertTriangle className="w-4 h-4 mr-2" /> Suspicious Example
                  </h4>
                  <p className="text-foreground text-sm">{event.suspiciousExample}</p>
                </div>

                <div className="bg-success/5 rounded-lg p-4 border border-success/10">
                  <h4 className="flex items-center text-sm font-semibold text-success uppercase tracking-wider mb-2">
                    <CheckCircle className="w-4 h-4 mr-2" /> Benign Example
                  </h4>
                  <p className="text-foreground text-sm">{event.benignExample}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Investigation Questions
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                    {event.investigationQuestions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No Event IDs found matching &quot;{query}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}
