import {
  BookOpen, Map, Users, GraduationCap, Building, CalendarDays, UtensilsCrossed, Bus,
  MapPin, HeartPulse, FolderOpen, CalendarCheck, Network, Cog, Briefcase,
  ShoppingBag, SearchCheck, Soup, Siren, Megaphone, MapPinned, Trophy,
} from "lucide-react";

const titleIcons: Record<string, React.ElementType> = {
  "PYQ & Resource Hub": FolderOpen,
  "Interactive Event Calendar": CalendarCheck,
  "Senior Connect Directory": Network,
  "Skill-Exchange Forum": Cog,
  "Career & Placement Hub": Briefcase,
  "Campus Thrift Store": ShoppingBag,
  "Lost & Found Board": SearchCheck,
  "Live Canteen Menu": Soup,
  "Emergency & SOS": Siren,
  "Official Notice Board": Megaphone,
  "Room Finder & Micro-Navigation": MapPinned,
  "Student Innovation Showcase": Trophy,
};

const categoryIcons: Record<string, React.ElementType> = {
  "Campus Map": Map,
  Clubs: Users,
  Syllabus: GraduationCap,
  "Hostel Life": Building,
  Library: BookOpen,
  Events: CalendarDays,
  "Food & Canteen": UtensilsCrossed,
  Transport: Bus,
  Map: MapPin,
  Health: HeartPulse,
  Notices: Megaphone,
  Emergency: Siren,
  Projects: Trophy,
};

export function getEntryIcon(title: string, category: string): React.ElementType {
  return titleIcons[title] || categoryIcons[category] || BookOpen;
}
