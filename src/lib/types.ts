export interface GuideEntry {
  id: string;
  title: string;
  category: string;
  description: string;
  createdAt: string;
}

export const CATEGORIES = [
  "Campus Map",
  "Clubs",
  "Syllabus",
  "Hostel Life",
  "Library",
  "Events",
  "Food & Canteen",
  "Transport",
] as const;
