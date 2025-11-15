import { FaUpload } from "@/components/common/Icons";
import { cn } from "@/lib/utils";

interface UploadButtonProps {
  onClick: () => void;
  isLoading: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  fullText?: string;
  shortText?: string;
}

export function UploadButton({
  onClick,
  isLoading,
  className,
  size = "md",
  variant = "primary",
  fullText = "Upload",
  shortText = "Upload"
}: UploadButtonProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const spinnerSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "flex-1 sm:flex-none rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      data-testid="button-upload-text"
      aria-label="Upload text file"
    >
      {isLoading ? (
        <>
          {/* Loading Spinner Animation */}
          <div className={cn("relative", spinnerSizes[size])}>
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-current opacity-20"></div>
            {/* Spinning arc */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-current animate-spin"></div>
          </div>
          <span className="hidden sm:inline">Uploading...</span>
          <span className="sm:hidden">Uploading...</span>
        </>
      ) : (
        <>
          <FaUpload aria-hidden="true" />
          <span className="hidden sm:inline">{fullText}</span>
          <span className="sm:hidden">{shortText}</span>
        </>
      )}
    </button>
  );
}
