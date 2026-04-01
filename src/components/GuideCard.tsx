import { GuideEntry } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Map, Users, GraduationCap, Building, CalendarDays, UtensilsCrossed, Bus } from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  "Campus Map": Map,
  Clubs: Users,
  Syllabus: GraduationCap,
  "Hostel Life": Building,
  Library: BookOpen,
  Events: CalendarDays,
  "Food & Canteen": UtensilsCrossed,
  Transport: Bus,
};

interface Props {
  entry: GuideEntry;
  index: number;
}

const GuideCard = ({ entry, index }: Props) => {
  const Icon = categoryIcons[entry.category] || BookOpen;

  return (
    <Card
      className="guide-card group relative flex h-full flex-col overflow-hidden border-border/70 bg-gradient-to-br from-card via-card to-accent/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-primary/20 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-2xl border border-primary/15 bg-primary/10 p-2.5 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-4 w-4" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-lg leading-snug transition-colors duration-300 group-hover:text-primary">
              {entry.title}
            </CardTitle>
            <Badge variant="secondary" className="w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
              {entry.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
