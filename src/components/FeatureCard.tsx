import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: "primary" | "secondary" | "accent";
}

const FeatureCard = ({ icon, title, description, color = "primary" }: FeatureCardProps) => {
  const colorClasses = {
    primary: "bg-teal-light text-primary",
    secondary: "bg-coral-light text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  return (
    <div className="group relative p-6 rounded-3xl bg-card shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
      <div className={`w-14 h-14 rounded-2xl ${colorClasses[color]} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
