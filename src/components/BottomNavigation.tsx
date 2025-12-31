import { useLocation, useNavigate } from "react-router-dom";
import { Home, PawPrint, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: typeof Home;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: PawPrint, label: "My Pets", path: "/dashboard" },
  { icon: MessageCircle, label: "AI Chat", path: "/dashboard?chat=true" },
  { icon: User, label: "Profile", path: "/dashboard" },
];

interface BottomNavigationProps {
  onChatClick?: () => void;
}

const BottomNavigation = ({ onChatClick }: BottomNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (item: NavItem) => {
    if (item.label === "AI Chat" && onChatClick) {
      onChatClick();
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path: string) => {
    if (path.includes("?")) {
      return false;
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 pb-safe">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full min-h-[48px] min-w-[48px] transition-colors touch-manipulation",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground active:text-primary"
              )}
            >
              <item.icon
                className={cn(
                  "w-6 h-6 mb-1 transition-transform",
                  active && "scale-110"
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
