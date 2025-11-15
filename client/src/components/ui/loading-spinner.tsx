import { cn } from "@/lib/utils";
import { FaPenNib } from "@/components/common/Icons";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const logoSizeClasses = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-xl",
    xl: "text-3xl",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        
        {/* Animated arc */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
        
        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FaPenNib className={cn("text-primary", logoSizeClasses[size])} />
        </div>
      </div>
      
      {text && (
        <p className={cn("text-muted-foreground font-medium animate-pulse", textSizeClasses[size])}>
          {text}
        </p>
      )}
    </div>
  );
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
    </div>
  );
}

export function LoadingBar({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-1 bg-muted rounded-full overflow-hidden", className)}>
      <div className="h-full bg-primary animate-loading-bar"></div>
    </div>
  );
}

export function LoadingPulse({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="w-3 h-3 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
    </div>
  );
}

export function LoadingPage({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner size="xl" text={text} />
    </div>
  );
}
