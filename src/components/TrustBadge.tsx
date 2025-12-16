import { Shield, Lock, CheckCircle } from "lucide-react";

interface TrustBadgeProps {
  type: "secure" | "verified" | "privacy";
}

const badges = {
  secure: {
    icon: Shield,
    label: "Bank-level Security",
    color: "text-primary",
  },
  verified: {
    icon: CheckCircle,
    label: "Vet Verified",
    color: "text-primary",
  },
  privacy: {
    icon: Lock,
    label: "Privacy First",
    color: "text-primary",
  },
};

const TrustBadge = ({ type }: TrustBadgeProps) => {
  const badge = badges[type];
  const Icon = badge.icon;

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-card">
      <Icon className={`w-4 h-4 ${badge.color}`} />
      <span className="text-sm font-medium text-foreground">{badge.label}</span>
    </div>
  );
};

export default TrustBadge;
