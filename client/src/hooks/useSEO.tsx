import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  ogSiteName?: string;
  twitterCard?: string;
  noindex?: boolean;
  author?: string;
  siteName?: string;
}

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = "/og-image.png",
  ogType = "website",
  ogSiteName = "Word Counter Plus",
  twitterCard = "summary_large_image",
  noindex = false,
  author,
  siteName
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
    updateMetaTag('og:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', title, true);
    updateMetaTag('og:site_name', siteName || ogSiteName, true);
    
    if (canonical) {
      updateMetaTag('og:url', canonical, true);
    }
    
    if (author) {
      updateMetaTag('article:author', author, true);
    }

    // Twitter
    updateMetaTag('twitter:card', twitterCard, true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`, true);
    updateMetaTag('twitter:site', '@wordcounterplusapp', true);
    updateMetaTag('twitter:creator', '@wordcounterplusapp', true);

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
  }, [title, description, keywords, canonical, ogImage, ogType, ogSiteName, twitterCard, noindex, author, siteName]);
};

export default useSEO;
