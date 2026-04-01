import { useState } from "react";
import { GuideEntry, CATEGORIES } from "@/lib/types";
import { updateEntry, deleteEntry } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BookOpen, Map, Users, GraduationCap, Building, CalendarDays, UtensilsCrossed, Bus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const categoryIcons: Record<string, React.ElementType> = {
  "Campus Map": Map, Clubs: Users, Syllabus: GraduationCap, "Hostel Life": Building,
  Library: BookOpen, Events: CalendarDays, "Food & Canteen": UtensilsCrossed, Transport: Bus,
};

interface Props {
  entry: GuideEntry;
  index: number;
  onChanged: () => void;
}

const AdminGuideCard = ({ entry, index, onChanged }: Props) => {
  const Icon = categoryIcons[entry.category] || BookOpen;
  const [editOpen, setEditOpen] = useState(false);
  const [title, setTitle] = useState(entry.title);
  const [category, setCategory] = useState(entry.category);
  const [description, setDescription] = useState(entry.description);

  const handleSave = () => {
    if (!title.trim() || !category || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    updateEntry(entry.id, { title: title.trim(), category, description: description.trim() });
    toast.success("Entry updated!");
    setEditOpen(false);
    onChanged();
  };

  const handleDelete = () => {
    deleteEntry(entry.id);
    toast.success("Entry deleted");
    onChanged();
  };

  return (
    <>
      <Card
        className="guide-card group relative flex h-full flex-col overflow-hidden border-border/70 bg-gradient-to-br from-card via-card to-accent/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/20 animate-fade-in-up"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-2xl border border-primary/15 bg-primary/10 p-2.5 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-2">
              <CardTitle className="text-base leading-snug">{entry.title}</CardTitle>
              <Badge variant="secondary" className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                {entry.category}
              </Badge>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => setEditOpen(true)}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete entry?</AlertDialogTitle>
                    <AlertDialogDescription>This will permanently remove "{entry.title}". This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{entry.description}</p>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} maxLength={500} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminGuideCard;
