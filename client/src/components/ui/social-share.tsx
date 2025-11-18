import { Button } from '@/components/ui/button';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Share2 } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const shareDesc = description ? encodeURIComponent(description) : '';

  const shares = [
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      testId: 'button-share-twitter'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      testId: 'button-share-facebook'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      testId: 'button-share-linkedin'
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="flex items-center gap-3" data-testid="social-share">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      
      {/* Social Share Buttons */}
      <div className="flex gap-2">
        {shares.map((share) => {
          const Icon = share.icon;
          return (
            <a
              key={share.name}
              href={share.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${share.name}`}
              data-testid={share.testId}
            >
              <Button
                size="icon"
                variant="outline"
              >
                <Icon className="w-4 h-4" />
              </Button>
            </a>
          );
        })}

        {/* Native Share (Mobile) */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <Button
            size="icon"
            variant="outline"
            onClick={handleNativeShare}
            aria-label="Share via native share menu"
            data-testid="button-share-native"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
