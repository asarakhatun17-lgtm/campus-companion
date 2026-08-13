import { useState } from "react";
import { GuideEntry } from "@/lib/types";
import { getEntryIcon } from "@/lib/categoryIcons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { format } from "date-fns";

interface Props {
  entry: GuideEntry;
  index: number;
}

const LiveDot = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
    </span>
    Live
  </span>
);

const GuideCard = ({ entry, index }: Props) => {
  const Icon = getEntryIcon(entry.title, entry.category);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        className="guide-card group relative flex h-full cursor-pointer flex-col overflow-hidden border-border/70 bg-gradient-to-br from-card via-card to-accent/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-primary/20 animate-fade-in-up"
        style={{ animationDelay: `${index * 80}ms` }}
        onClick={() => setOpen(true)}
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
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                  {entry.tag || entry.category}
                </Badge>
                {entry.live && <LiveDot />}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{entry.description}</p>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-2xl border border-primary/15 bg-primary/10 p-3 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-xl">{entry.title}</DialogTitle>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                    {entry.tag || entry.category}
                  </Badge>
                  {entry.live && <LiveDot />}
                </div>
              </div>
            </div>
          </DialogHeader>
          <DialogDescription className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {entry.description}
          </DialogDescription>
          <p className="text-xs text-muted-foreground/60 mt-2">
            Added {format(new Date(entry.createdAt), "MMM d, yyyy")}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GuideCard;
