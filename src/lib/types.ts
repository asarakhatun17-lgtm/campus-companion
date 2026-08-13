export interface GuideEntry {
  id: string;
  title: string;
  category: string;
  description: string;
  createdAt: string;
  /** Short uppercase tag shown on the card, e.g. "LEARNING" */
  tag?: string;
  /** Shows a green pulsing LIVE indicator on the card */
  live?: boolean;
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
  "Map",
  "Health",
  "Notices",
  "Emergency",
  "Projects",
] as const;
