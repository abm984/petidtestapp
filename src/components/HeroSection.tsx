import { Button } from "@/components/ui/button";
import { ArrowRight, Scan } from "lucide-react";
import NoseScanAnimation from "./NoseScanAnimation";
import TrustBadge from "./TrustBadge";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Biometric Pet Identity
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Create Your Pet's
              <span className="text-gradient block">Digital Identity</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 mx-auto lg:mx-0">
              Simple, fast, and secure. Scan your pet's unique nose print to create their digital identity in seconds. Track health, behavior, and connect with vets worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button variant="hero" size="xl" className="group">
                <Scan className="w-5 h-5" />
                Scan Nose Print
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl">
                Watch Demo
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <TrustBadge type="secure" />
              <TrustBadge type="verified" />
              <TrustBadge type="privacy" />
            </div>
          </div>

          {/* Right - Animation */}
          <div className="relative flex items-center justify-center">
            <div className="animate-float">
              <NoseScanAnimation />
            </div>

            {/* Floating stats cards */}
            <div className="absolute -top-4 -right-4 lg:right-8 p-4 rounded-2xl bg-card shadow-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-2xl font-bold text-foreground">99.7%</div>
              <div className="text-xs text-muted-foreground">Accuracy Rate</div>
            </div>

            <div className="absolute -bottom-4 -left-4 lg:left-8 p-4 rounded-2xl bg-card shadow-card animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="text-2xl font-bold text-foreground">2M+</div>
              <div className="text-xs text-muted-foreground">Pets Registered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
