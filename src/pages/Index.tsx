import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import GuideCard from "@/components/GuideCard";
import { getEntries } from "@/lib/storage";
import { CATEGORIES } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, GraduationCap, ShieldCheck } from "lucide-react";

const Index = () => {
  const entries = getEntries();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = !activeCategory || e.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [entries, search, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_70%)]" />
        <div className="container mx-auto relative z-10 py-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
            <GraduationCap className="h-4 w-4" /> Welcome, Fresher!
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
            Astra University Campus Guide
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80 text-sm sm:text-base">
            Everything you need to know about your new college – from clubs and maps to syllabus tips, curated by seniors.
          </p>
          <div className="mx-auto mt-6 flex max-w-md items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search guides..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-primary-foreground pl-9 shadow-sm border-0"
              />
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/admin"><ShieldCheck className="mr-1 h-4 w-4" /> Admin</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Filters & Cards */}
      <main className="container mx-auto py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge
            variant={activeCategory === null ? "default" : "secondary"}
            className="cursor-pointer transition-colors"
            onClick={() => setActiveCategory(null)}
          >
            All
          </Badge>
          {CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? "default" : "secondary"}
              className="cursor-pointer transition-colors"
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg font-medium">No guides found</p>
            <p className="text-sm mt-1">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((entry, i) => (
              <GuideCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
