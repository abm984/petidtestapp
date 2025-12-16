import { Button } from "@/components/ui/button";
import { ArrowRight, PawPrint } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-16">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl" />
          
          {/* Floating paw prints */}
          <PawPrint className="absolute top-8 right-8 w-8 h-8 text-primary-foreground/20" />
          <PawPrint className="absolute bottom-8 left-8 w-6 h-6 text-primary-foreground/20 rotate-12" />
          <PawPrint className="absolute top-1/2 right-1/4 w-5 h-5 text-primary-foreground/10 -rotate-12" />

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Your Pet's Identity, Protected Forever
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join millions of pet owners who trust PetID to keep their furry family members safe and healthy. Start your free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="xl" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Talk to Sales
              </Button>
            </div>

            <p className="text-primary-foreground/60 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
