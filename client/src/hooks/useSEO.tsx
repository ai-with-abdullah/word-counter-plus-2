import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  ogSiteName?: string;     // ✅ New prop
  twitterCard?: string;    // ✅ New prop
  noindex?: boolean;
}

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://textcountplus.com/og-image.jpg",
  ogType = "website",
  ogSiteName = "Word Counter Plus",      // ✅ Default brand name
  twitterCard = "summary_large_image",   // ✅ Default better Twitter card
  noindex = false
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attributeName = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attributeName}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attributeName, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Primary meta tags
    updateMetaTag('description', description);
    updateMetaTag('title', title);
    
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', ogSiteName, true);   // ✅ Added site_name
    
    if (canonical) {
      updateMetaTag('og:url', canonical, true);
    }

    // Twitter
    updateMetaTag('twitter:card', twitterCard, true);  // ✅ Added Twitter card
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);

    // Canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      
      canonicalLink.href = canonical;
    }
  }, [title, description, keywords, canonical, ogImage, ogType, ogSiteName, twitterCard, noindex]);
};

export default useSEO;
