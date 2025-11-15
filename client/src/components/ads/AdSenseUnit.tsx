/* 
 * ADS SECTION COMMENTED OUT
 * AdSense component has been disabled as requested
 */

/*
import { useEffect, useRef } from 'react';

interface AdSenseUnitProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
  adTest?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSenseUnit = ({ 
  adSlot, 
  adFormat = 'auto', 
  style = {}, 
  className = '',
  adTest = false 
}: AdSenseUnitProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const hasBeenPushed = useRef(false);

  useEffect(() => {
    // Only push if the ad hasn't been pushed yet and we're not in test mode during development
    if (!hasBeenPushed.current && adRef.current) {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          window.adsbygoogle.push({});
          hasBeenPushed.current = true;
        }
      } catch (error) {
        console.warn('AdSense push failed:', error);
      }
    }
  }, []);

  // Development fallback - show placeholder
  if (process.env.NODE_ENV === 'development' || adTest) {
    return (
      <div 
        className={`bg-muted border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground text-sm ${className}`}
        style={{ 
          minHeight: '100px',
          ...style 
        }}
      >
        <div className="text-center p-4">
          <div className="mb-2">📢 AdSense Placeholder</div>
          <div className="text-xs opacity-70">Slot: {adSlot}</div>
          <div className="text-xs opacity-70">Format: {adFormat}</div>
        </div>
      </div>
    );
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ 
        display: 'block',
        ...style 
      }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense ID
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
};
*/

// AdSense component is disabled - returns null
const AdSenseUnit = () => null;

export default AdSenseUnit;