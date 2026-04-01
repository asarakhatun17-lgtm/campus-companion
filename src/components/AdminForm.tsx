import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/types";
import { addEntry } from "@/lib/storage";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface Props {
  onAdded: () => void;
}

const AdminForm = ({ onAdded }: Props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    addEntry({ title: title.trim(), category, description: description.trim() });
    setTitle("");
    setCategory("");
    setDescription("");
    toast.success("Entry added successfully!");
    onAdded();
  };

  return (
    <Card className="border-border/60" style={{ boxShadow: "var(--card-shadow)" }}>
      <CardHeader>
        <CardTitle className="text-lg">Submit Campus Info</CardTitle>
        <CardDescription>Help freshers navigate campus life by sharing useful info.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="e.g. Best study spots on campus" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Share details, tips, or directions..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4} maxLength={500} />
          </div>
          <Button type="submit" className="w-full gap-2">
            <Send className="h-4 w-4" /> Submit Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminForm;
