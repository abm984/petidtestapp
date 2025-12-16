import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PawPrint } from "lucide-react";

interface AddPetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AddPetDialog = ({ open, onOpenChange, onSuccess }: AddPetDialogProps) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<string>("dog");
  const [breed, setBreed] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("pets").insert({
        user_id: user.id,
        name,
        species: species as "dog" | "cat" | "livestock" | "other",
        breed: breed || null,
        date_of_birth: dateOfBirth || null,
      });

      if (error) throw error;

      toast({ title: "Pet added!", description: `${name} has been registered.` });
      onSuccess();
      onOpenChange(false);
      resetForm();
    } catch (error: any) {
      console.error("Error adding pet:", error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setSpecies("dog");
    setBreed("");
    setDateOfBirth("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <PawPrint className="w-4 h-4 text-primary-foreground" />
            </div>
            Add New Pet
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="petName">Pet Name *</Label>
            <Input
              id="petName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Max"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="species">Species *</Label>
            <Select value={species} onValueChange={setSpecies}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="livestock">Livestock</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="breed">Breed</Label>
            <Input
              id="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder="e.g., Golden Retriever"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="hero" disabled={loading} className="flex-1">
              {loading ? "Adding..." : "Add Pet"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPetDialog;
