import { useEffect, useState } from "react";

const NoseScanAnimation = () => {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Outer ring pulse */}
      <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse-ring" />
      
      {/* Main circle */}
      <div className="absolute inset-4 rounded-full bg-card shadow-card overflow-hidden">
        {/* Nose illustration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-32 h-32 text-foreground/80"
          >
            {/* Stylized dog nose */}
            <ellipse cx="50" cy="55" rx="35" ry="30" fill="hsl(var(--foreground))" opacity="0.15" />
            <ellipse cx="50" cy="50" rx="28" ry="24" fill="hsl(var(--foreground))" opacity="0.9" />
            {/* Nostrils */}
            <ellipse cx="38" cy="55" rx="8" ry="10" fill="hsl(var(--background))" />
            <ellipse cx="62" cy="55" rx="8" ry="10" fill="hsl(var(--background))" />
            {/* Center line */}
            <path d="M50 42 L50 68" stroke="hsl(var(--background))" strokeWidth="3" strokeLinecap="round" />
            {/* Texture dots */}
            <circle cx="35" cy="45" r="1.5" fill="hsl(var(--muted-foreground))" opacity="0.3" />
            <circle cx="42" cy="40" r="1" fill="hsl(var(--muted-foreground))" opacity="0.3" />
            <circle cx="58" cy="42" r="1.5" fill="hsl(var(--muted-foreground))" opacity="0.3" />
            <circle cx="65" cy="46" r="1" fill="hsl(var(--muted-foreground))" opacity="0.3" />
            <circle cx="45" cy="65" r="1" fill="hsl(var(--muted-foreground))" opacity="0.3" />
            <circle cx="55" cy="63" r="1.5" fill="hsl(var(--muted-foreground))" opacity="0.3" />
          </svg>
        </div>

        {/* Scan line */}
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
        )}

        {/* Corner brackets */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <path
            d="M25 10 L10 10 L10 25"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M75 10 L90 10 L90 25"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M25 90 L10 90 L10 75"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M75 90 L90 90 L90 75"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Status indicator */}
      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
        isScanning 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-accent text-accent-foreground'
      }`}>
        {isScanning ? 'Scanning...' : 'Ready to scan'}
      </div>
    </div>
  );
};

export default NoseScanAnimation;
