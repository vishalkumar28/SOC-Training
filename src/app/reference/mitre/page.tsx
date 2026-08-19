import { MitreBoard } from "@/components/interactive/MitreBoard";
import { Crosshair } from "lucide-react";

export default function MitrePage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center">
          <Crosshair className="w-8 h-8 mr-3 text-destructive" /> MITRE ATT&CK Matrix
        </h1>
        <p className="text-xl text-muted-foreground">
          Explore the Tactics, Techniques, and Procedures (TTPs) mapped during the PIET [Panipat Institute of Engineering & Technology] incident.
        </p>
      </div>
      
      <MitreBoard />
    </div>
  );
}
