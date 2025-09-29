import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ===== ADVERTISEMENT CONFIGURATION =====
// This is your central control hub for all advertisements
// Edit these settings to control ads across the entire website

const ADS_CONFIG = {
  enabled: false, // Set to false to hide all ads across the entire website
  showPlaceholder: false, // Show placeholder in development/when ads are disabled
  slots: {
    sidebar: {
      enabled: true,
      width: "w-full",
      height: "h-64", // h-48, h-64, h-80, etc.
      spacing: "mb-6",
      adSlot: "your-adsense-slot-id-here",
      format: "rectangle" as const
    },
    inline: {
      enabled: true, 
      width: "w-full",
      height: "h-32",
      spacing: "my-8",
      adSlot: "your-inline-slot-id-here",
      format: "horizontal" as const
    }
  }
};

// ===== ADVERTISEMENT COMPONENTS =====

interface AdPlaceholderProps {
  width: string;
  height: string;
  className?: string;
}

function AdPlaceholder({ width, height, className }: AdPlaceholderProps) {
  if (!ADS_CONFIG.showPlaceholder) return null;
  
  return (
    <Card className={cn("border-dashed border-2", width, height, className)}>
      <CardContent className="h-full flex flex-col items-center justify-center p-6 bg-muted/30">
        <div className="text-center space-y-2">
          <div className="text-2xl">📢</div>
          <div className="text-sm font-medium text-muted-foreground">Advertisement Space</div>
          <div className="text-xs text-muted-foreground opacity-70">
            Your ads will appear here
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface AdUnitProps {
  type: 'sidebar' | 'inline';
  className?: string;
}

export function AdUnit({ type, className }: AdUnitProps) {
  const config = ADS_CONFIG.slots[type];
  
  // If ads are globally disabled or this specific slot is disabled
  if (!ADS_CONFIG.enabled || !config.enabled) {
    return null;
  }

  const baseClasses = cn(
    config.width,
    config.height,
    config.spacing,
    className
  );

  // In development or when showing placeholder
  if (process.env.NODE_ENV === 'development' || ADS_CONFIG.showPlaceholder) {
    return <AdPlaceholder width={config.width} height={config.height} className={baseClasses} />;
  }

  // Production AdSense unit (uncomment when ready to use real ads)
  /*
  return (
    <div className={baseClasses}>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense ID
        data-ad-slot={config.adSlot}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
    </div>
  );
  */

  return <AdPlaceholder width={config.width} height={config.height} className={baseClasses} />;
}

// Quick access components for specific ad positions
export const SidebarAd = ({ className }: { className?: string }) => (
  <AdUnit type="sidebar" className={className} />
);

export const InlineAd = ({ className }: { className?: string }) => (
  <AdUnit type="inline" className={className} />
);

export default { AdUnit, SidebarAd, InlineAd };