import { useState } from "react";
import { Link } from "react-router-dom";
import AdminForm from "@/components/AdminForm";
import GuideCard from "@/components/GuideCard";
import { getEntries } from "@/lib/storage";
import { GuideEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const Admin = () => {
  const [entries, setEntries] = useState<GuideEntry[]>(getEntries());

  const refresh = () => setEntries(getEntries());

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Senior / Admin Panel
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> Fresher View</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 grid gap-8 lg:grid-cols-[380px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AdminForm onAdded={refresh} />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">All Entries ({entries.length})</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {entries.map((entry, i) => (
              <GuideCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
