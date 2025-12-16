import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PawPrint, Plus, MessageCircle, LogOut, Activity, Syringe, Stethoscope } from "lucide-react";
import AddPetDialog from "@/components/AddPetDialog";
import PetCard from "@/components/PetCard";
import AIChatDialog from "@/components/AIChatDialog";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  date_of_birth: string | null;
  profile_image_url: string | null;
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [showAddPet, setShowAddPet] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchPets();
    }
  }, [user]);

  const fetchPets = async () => {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPets(data || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoadingPets(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const openAIChatForPet = (pet: Pet) => {
    setSelectedPet(pet);
    setShowAIChat(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
              <PawPrint className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">PetID</span>
          </a>

          <div className="flex items-center gap-4">
            <Button
              variant="soft"
              size="sm"
              onClick={() => {
                setSelectedPet(null);
                setShowAIChat(true);
              }}
            >
              <MessageCircle className="w-4 h-4" />
              AI Assistant
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-light flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{pets.length}</div>
                <div className="text-sm text-muted-foreground">Registered Pets</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coral-light flex items-center justify-center">
                <Activity className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">0</div>
                <div className="text-sm text-muted-foreground">Behavior Logs</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Syringe className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">0</div>
                <div className="text-sm text-muted-foreground">Vaccinations</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-light flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">0</div>
                <div className="text-sm text-muted-foreground">Vet Visits</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pets section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Pets</h2>
          <Button variant="hero" onClick={() => setShowAddPet(true)}>
            <Plus className="w-4 h-4" />
            Add Pet
          </Button>
        </div>

        {loadingPets ? (
          <div className="text-center py-12 text-muted-foreground">Loading pets...</div>
        ) : pets.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-3xl shadow-card">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <PawPrint className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No pets yet</h3>
            <p className="text-muted-foreground mb-6">Add your first pet to get started with PetID</p>
            <Button variant="hero" onClick={() => setShowAddPet(true)}>
              <Plus className="w-4 h-4" />
              Add Your First Pet
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onChatClick={() => openAIChatForPet(pet)} onRefresh={fetchPets} />
            ))}
          </div>
        )}
      </main>

      {/* Dialogs */}
      <AddPetDialog open={showAddPet} onOpenChange={setShowAddPet} onSuccess={fetchPets} />
      <AIChatDialog open={showAIChat} onOpenChange={setShowAIChat} pet={selectedPet} />
    </div>
  );
};

export default Dashboard;
