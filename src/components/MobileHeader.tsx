import { PawPrint, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  title?: string;
  showLogo?: boolean;
  onSignOut?: () => void;
}

const MobileHeader = ({ title, showLogo = true, onSignOut }: MobileHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border safe-area-top">
      <div className="flex items-center justify-between h-14 px-4 pt-safe">
        {showLogo ? (
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
              <PawPrint className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">PetID</span>
          </a>
        ) : (
          <h1 className="font-bold text-lg text-foreground">{title}</h1>
        )}

        {onSignOut && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onSignOut}
            className="min-h-[44px] min-w-[44px]"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;
