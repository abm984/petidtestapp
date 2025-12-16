import HowItWorksStep from "./HowItWorksStep";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Download the App",
      description: "Available on iOS and Android. Create your account in under a minute.",
    },
    {
      title: "Scan Your Pet's Nose",
      description: "Hold your phone camera to your pet's nose. Our AI guides you for the perfect scan.",
    },
    {
      title: "Add Health Records",
      description: "Import existing records or add vaccination history, vet info, and more.",
    },
    {
      title: "Monitor & Protect",
      description: "Start tracking behavior, receive alerts, and keep your pet safe for life.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-teal-light to-accent p-8 shadow-soft">
              {/* Phone mockup */}
              <div className="relative h-full bg-foreground rounded-[2rem] p-2 shadow-lg">
                <div className="h-full bg-background rounded-[1.75rem] overflow-hidden flex flex-col">
                  {/* Screen content */}
                  <div className="flex-1 p-4 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg viewBox="0 0 100 100" className="w-20 h-20 text-primary">
                        <ellipse cx="50" cy="50" rx="28" ry="24" fill="currentColor" />
                        <ellipse cx="38" cy="55" rx="7" ry="9" fill="hsl(var(--background))" />
                        <ellipse cx="62" cy="55" rx="7" ry="9" fill="hsl(var(--background))" />
                        <path d="M50 43 L50 66" stroke="hsl(var(--background))" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground mb-1">Max</div>
                      <div className="text-xs text-muted-foreground">Golden Retriever • 3 years</div>
                    </div>
                    <div className="mt-6 w-full max-w-[200px] h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-hero rounded-full" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">Profile 75% complete</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-secondary rounded-2xl shadow-soft opacity-60" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary rounded-xl shadow-glow opacity-40" />
            </div>
          </div>

          {/* Right - Steps */}
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">How it works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-8">
              Get Started in Minutes
            </h2>

            <div className="space-y-2">
              {steps.map((step, index) => (
                <HowItWorksStep
                  key={step.title}
                  step={index + 1}
                  title={step.title}
                  description={step.description}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
