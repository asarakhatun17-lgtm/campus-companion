import { GuideEntry } from "./types";

const STORAGE_KEY = "campus-guide-entries-v3";
const LEGACY_KEY = "campus-guide-entries-v2";

const now = () => new Date().toISOString();

const defaultEntries: GuideEntry[] = [
  {
    id: "1",
    title: "Main Library – 24/7 Access",
    category: "Library",
    tag: "LIBRARY",
    description:
      "The central library offers round-the-clock access during exam season. Bring your student ID for entry after 10 PM. Floor 3 has the quiet study zone.",
    createdAt: now(),
  },
  {
    id: "4",
    title: "First Semester Syllabus",
    category: "Syllabus",
    tag: "SYLLABUS",
    description:
      "Download your department-specific syllabus from the university portal. Key subjects include Mathematics, English Communication, and your core department intro course.",
    createdAt: now(),
  },
  {
    id: "5",
    title: "PYQ & Resource Hub",
    category: "Syllabus",
    tag: "LEARNING",
    description:
      "Question Paper PDFs and Study Notes: Access a central repository for previous year question papers and collaborative study notes, curated by seniors.",
    createdAt: now(),
  },
  {
    id: "2",
    title: "Join the Coding Club",
    category: "Clubs",
    tag: "CLUBS",
    description:
      "Weekly meetups every Wednesday at 5 PM in Room 204, CS Block. Open to all years. Hackathons, workshops, and mentorship programs available.",
    createdAt: now(),
  },
  {
    id: "6",
    title: "Interactive Event Calendar",
    category: "Events",
    tag: "EVENTS/CLUBS",
    description:
      "Upcoming Hackathons, Sports Meets, and Cultural Fests: View and subscribe to campus events. Features RSVP, reminder setting, and club-specific notifications.",
    createdAt: now(),
  },
  {
    id: "7",
    title: "Senior Connect Directory",
    category: "Clubs",
    tag: "MENTORSHIP",
    description:
      "Searchable Senior Network: Connect with seniors for guidance, mentorship, and project collaboration. Direct messaging and profile search.",
    createdAt: now(),
  },
  {
    id: "8",
    title: "Skill-Exchange Forum",
    category: "Clubs",
    tag: "TECH/PEER-LEARNING",
    description:
      "Collaborative Peer-to-Peer Debugging and Mentorship: A forum to post technical doubts, logic-building challenges (e.g. Python/C++ code debugging), and get direct help from senior mentors.",
    createdAt: now(),
  },
  {
    id: "9",
    title: "Career & Placement Hub",
    category: "Syllabus",
    tag: "CAREERS",
    description:
      "Interview Experiences and Company Profiles: Preparation guides, direct logs of previous year interview experiences, and company-specific resources to help with placements and internships.",
    createdAt: now(),
  },
  {
    id: "3",
    title: "Campus Shuttle Schedule",
    category: "Transport",
    tag: "TRANSPORT",
    description:
      "Shuttles run every 30 minutes from the main gate to hostels between 7 AM and 10 PM. Weekend service is hourly. Check the notice board for route changes.",
    createdAt: now(),
  },
  {
    id: "10",
    title: "Food & Canteen",
    category: "Food & Canteen",
    tag: "LOGISTICS/FOOD",
    description:
      "Where and when to eat on campus: the main canteen (7 AM–9 PM), the night cafe near Hostel B, and department kiosks. Card and UPI payments accepted everywhere.",
    createdAt: now(),
  },
  {
    id: "11",
    title: "Live Canteen Menu",
    category: "Food & Canteen",
    tag: "LIVE MENU",
    live: true,
    description:
      "Real-Time Tracking and Token Pre-Booking: Check daily food menu items and their availability. Features pre-booking to save time and avoid long queues.",
    createdAt: now(),
  },
  {
    id: "12",
    title: "Campus Thrift Store",
    category: "Hostel Life",
    tag: "PRACTICAL/LOGISTICS",
    description:
      "Student Buy & Sell Marketplace: Peer-to-peer forum for buying and selling old books, tech, and other items.",
    createdAt: now(),
  },
  {
    id: "13",
    title: "Lost & Found Board",
    category: "Hostel Life",
    tag: "PRACTICAL",
    description:
      "Peer-to-Peer Posting Board: Quickly post and search for lost or found items across campus. Simple, direct interface.",
    createdAt: now(),
  },
  {
    id: "14",
    title: "Campus Health Centre",
    category: "Health",
    tag: "HEALTH",
    description:
      "The health centre near the sports complex is open 8 AM–8 PM, with a 24/7 emergency line. Free basic consultation and first aid for all students with a valid ID.",
    createdAt: now(),
  },
  {
    id: "15",
    title: "Emergency & SOS",
    category: "Emergency",
    tag: "EMERGENCY",
    description:
      "Quick tap-to-call buttons for Campus Security, Anti-Ragging Helpline, and 24/7 Medical Emergency. Stay safe!",
    createdAt: now(),
  },
  {
    id: "16",
    title: "Official Notice Board",
    category: "Notices",
    tag: "NOTICES",
    description:
      "Live updates and deadlines. Check the latest official college announcements, exam form deadlines, and fee submission dates.",
    createdAt: now(),
  },
  {
    id: "17",
    title: "Room Finder & Micro-Navigation",
    category: "Map",
    tag: "MAP/NAVIGATION",
    description:
      "Never get lost. Search for specific classrooms (e.g., 'CS Lab 3' or 'Room 204') to get exact block and floor details instantly.",
    createdAt: now(),
  },
  {
    id: "18",
    title: "Student Innovation Showcase",
    category: "Projects",
    tag: "PROJECTS",
    description:
      "Explore campus talent. A gallery section where students can link their tech projects, hackathon prototypes, GitHub repos, and research papers.",
    createdAt: now(),
  },
];

export function getEntries(): GuideEntry[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const legacy = localStorage.getItem(LEGACY_KEY);
    let entries = defaultEntries;
    if (legacy) {
      try {
        const parsed = JSON.parse(legacy) as GuideEntry[];
        const existingTitles = new Set(parsed.map((e) => e.title));
        const missing = defaultEntries.filter((e) => !existingTitles.has(e.title));
        entries = [...parsed, ...missing];
      } catch {
        // fall back to defaults
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return entries;
  }
  try {
    return JSON.parse(stored) as GuideEntry[];
  } catch {
    return defaultEntries;
  }
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

export function updateEntry(id: string, data: Partial<Omit<GuideEntry, "id" | "createdAt">>): void {
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
