interface HowItWorksStepProps {
  step: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const HowItWorksStep = ({ step, title, description, isLast = false }: HowItWorksStepProps) => {
  return (
    <div className="flex gap-4">
      {/* Step indicator and line */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center font-bold text-sm shadow-glow">
          {step}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full min-h-[60px] bg-gradient-to-b from-primary to-primary/20 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="pb-8">
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorksStep;
