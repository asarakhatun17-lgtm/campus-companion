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
      className="group border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms`, boxShadow: "var(--card-shadow)" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow)")}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-4 w-4" />
            </div>
            <CardTitle className="text-base leading-tight">{entry.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{entry.description}</p>
        <Badge variant="secondary" className="text-xs font-medium">
          {entry.category}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
