import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  date_of_birth: string | null;
  profile_image_url: string | null;
}

interface PetCardProps {
  pet: Pet;
  onChatClick: () => void;
  onRefresh: () => void;
}

const speciesIcons: Record<string, string> = {
  dog: "🐕",
  cat: "🐱",
  livestock: "🐄",
  other: "🐾",
};

const PetCard = ({ pet, onChatClick, onRefresh }: PetCardProps) => {
  const { toast } = useToast();

  const calculateAge = (dob: string | null) => {
    if (!dob) return "Unknown age";
    const birth = new Date(dob);
    const now = new Date();
    const years = now.getFullYear() - birth.getFullYear();
    const months = now.getMonth() - birth.getMonth();
    
    if (years === 0) {
      return `${months} month${months !== 1 ? "s" : ""} old`;
    }
    return `${years} year${years !== 1 ? "s" : ""} old`;
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to remove ${pet.name}?`)) return;

    try {
      const { error } = await supabase.from("pets").delete().eq("id", pet.id);
      if (error) throw error;
      toast({ title: "Pet removed", description: `${pet.name} has been removed.` });
      onRefresh();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="bg-card rounded-3xl p-6 shadow-card hover:shadow-soft transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl">
          {speciesIcons[pet.species] || "🐾"}
        </div>
        <button
          onClick={handleDelete}
          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-1">{pet.name}</h3>
      <p className="text-sm text-muted-foreground mb-1">
        {pet.breed || pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}
      </p>
      
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <Calendar className="w-3.5 h-3.5" />
        {calculateAge(pet.date_of_birth)}
      </div>

      <Button variant="soft" size="sm" onClick={onChatClick} className="w-full">
        <MessageCircle className="w-4 h-4" />
        Ask AI About {pet.name}
      </Button>
    </div>
  );
};

export default PetCard;
