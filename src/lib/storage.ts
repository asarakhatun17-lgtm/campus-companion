import { GuideEntry } from "./types";

const STORAGE_KEY = "campus-guide-entries";

const defaultEntries: GuideEntry[] = [
  {
    id: "1",
    title: "Main Library – 24/7 Access",
    category: "Library",
    description: "The central library offers round-the-clock access during exam season. Bring your student ID for entry after 10 PM. Floor 3 has the quiet study zone.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Join the Coding Club",
    category: "Clubs",
    description: "Weekly meetups every Wednesday at 5 PM in Room 204, CS Block. Open to all years. Hackathons, workshops, and mentorship programs available.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Campus Shuttle Schedule",
    category: "Transport",
    description: "Shuttles run every 30 minutes from the main gate to hostels between 7 AM and 10 PM. Weekend service is hourly. Check the notice board for route changes.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "First Semester Syllabus",
    category: "Syllabus",
    description: "Download your department-specific syllabus from the university portal. Key subjects include Mathematics, English Communication, and your core department intro course.",
    createdAt: new Date().toISOString(),
  },
];

export function getEntries(): GuideEntry[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEntries));
    return defaultEntries;
  }
  return JSON.parse(stored);
}

export function addEntry(entry: Omit<GuideEntry, "id" | "createdAt">): GuideEntry {
  const entries = getEntries();
  const newEntry: GuideEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  entries.unshift(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return newEntry;
}

export function updateEntry(id: string, data: Omit<GuideEntry, "id" | "createdAt">): void {
  const entries = getEntries();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx !== -1) {
    entries[idx] = { ...entries[idx], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }
}

export function deleteEntry(id: string): void {
  const entries = getEntries().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}
  const entries = getEntries();
  const newEntry: GuideEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  entries.unshift(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return newEntry;
}
