import { EventIdExplorer } from "@/components/interactive/EventIdExplorer";

export default function EventIdsPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-4">Windows Event ID Explorer</h1>
        <p className="text-xl text-muted-foreground">
          Quickly search and understand critical Windows Security Event IDs for incident investigation.
        </p>
      </div>
      
      <EventIdExplorer />
    </div>
  );
}
