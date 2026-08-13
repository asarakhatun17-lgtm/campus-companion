import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getEntries } from "@/lib/storage";
import { GuideEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "bot";
  text: string;
}

/** Hinglish / shorthand terms mapped to searchable keywords. */
const SYNONYMS: Record<string, string> = {
  kitne: "time hours",
  kitna: "time hours",
  kab: "time hours",
  baje: "time hours",
  base: "time hours",
  bje: "time hours",
  band: "close closing",
  khula: "open",
  khulta: "open",
  hota: "",
  hai: "",
  h: "",
  kaha: "where location",
  kahan: "where location",
  khana: "food canteen",
  kitab: "book library",
  bus: "shuttle transport",
  doctor: "health centre",
  tabiyat: "health",
  paisa: "buy sell thrift",
};

const STOP = new Set(["the", "a", "an", "is", "of", "to", "in", "on", "for", "me", "my", "i", "what", "when", "how", "does", "do"]);

function normalize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .flatMap((w) => (w in SYNONYMS ? SYNONYMS[w].split(" ") : [w]))
    .filter((w) => w.length > 1 && !STOP.has(w));
}

function score(entry: GuideEntry, tokens: string[]): number {
  const title = entry.title.toLowerCase();
  const body = entry.description.toLowerCase();
  const meta = `${entry.category} ${entry.tag ?? ""}`.toLowerCase();
  let s = 0;
  for (const t of tokens) {
    if (title.includes(t)) s += 4;
    if (meta.includes(t)) s += 2;
    if (body.includes(t)) s += 1;
  }
  return s;
}

function answer(question: string): string {
  const tokens = normalize(question);
  if (!tokens.length) return "Ask me anything about Astra University — library timings, clubs, shuttles, canteen, placements and more.";

  const entries = getEntries();
  const ranked = entries
    .map((e) => ({ e, s: score(e, tokens) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s);

  if (!ranked.length) {
    return "I couldn't find that in the campus guide yet. Try asking about the library, syllabus, clubs, events, canteen, shuttle, health centre, or placements.";
  }

  const top = ranked[0].e;
  const others = ranked.slice(1, 3).map((r) => r.e.title);
  const extra = others.length ? `\n\nAlso related: ${others.join(", ")}.` : "";
  return `${top.title} (${top.category})\n\n${top.description}${extra}`;
}

const SUGGESTIONS = [
  "Library kitne baje tak khula hota h",
  "How do I join the coding club?",
  "Shuttle timings?",
];

const CampusAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! I'm the Astra Campus Assistant. Ask me anything about campus life." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }, { role: "bot", text: answer(q) }]);
    setInput("");
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[26rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl animate-fade-in-up">
          <div className="flex items-center justify-between border-b border-border/60 bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" /> AI Campus Assistant
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant" className="opacity-80 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-1.5 px-3 pb-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border/70 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border/60 p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about campus..."
              className="h-9"
            />
            <Button type="submit" size="icon" className="h-9 w-9 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI Campus Assistant"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
    </>
  );
};

export default CampusAssistant;
