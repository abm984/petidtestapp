import { Fingerprint, Activity, Heart, MapPin, Shield, Bell } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Fingerprint className="w-6 h-6" />,
      title: "Unique Biometric ID",
      description: "Just like human fingerprints, every pet's nose print is unique. Our AI captures and stores this for lifetime identification.",
      color: "primary" as const,
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Behavior Analysis",
      description: "Continuous monitoring of activity, sleep patterns, appetite, and gait using advanced computer vision.",
      color: "secondary" as const,
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health Records",
      description: "Complete vaccination history, vet visits, diet plans, and medication tracking all in one secure place.",
      color: "accent" as const,
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location Intelligence",
      description: "Seasonal disease risk alerts based on geography. Know what's affecting pets in your area.",
      color: "primary" as const,
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Lost Pet Recovery",
      description: "If your pet goes missing, shelters and vets can instantly verify identity and contact you.",
      color: "secondary" as const,
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Alerts",
      description: "Get notified about behavioral changes that might indicate health issues—before they become serious.",
      color: "accent" as const,
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Everything Your Pet Needs
          </h2>
          <p className="text-muted-foreground">
            From identification to health monitoring, we've built the complete digital companion for your furry family member.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
