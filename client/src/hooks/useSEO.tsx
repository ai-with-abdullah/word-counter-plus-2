import { useEffect } from 'react';
import { getCurrentOrigin, BRAND_CONFIG, isMainHost, isCaseHost } from '@/lib/site';

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
  baseUrl?: string; // Override for origin-specific URLs
  structuredData?: any; // JSON-LD structured data
  hreflang?: { [lang: string]: string }; // International SEO
  breadcrumbs?: Array<{ name: string; url: string }>;
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
  siteName,
  baseUrl,
  structuredData,
  hreflang,
  breadcrumbs
}: SEOProps) => {
  useEffect(() => {
    // Get current origin for origin-aware URLs
    const currentOrigin = baseUrl || getCurrentOrigin();
    
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
    updateMetaTag('og:image', ogImage.startsWith('http') ? ogImage : `${currentOrigin}${ogImage}`, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', title, true);
    updateMetaTag('og:site_name', siteName || ogSiteName, true);
    updateMetaTag('og:url', canonical || `${currentOrigin}${window.location.pathname}`, true);
    
    if (author) {
      updateMetaTag('article:author', author, true);
    }

    // Twitter Cards (use name attribute, not property)
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage.startsWith('http') ? ogImage : `${currentOrigin}${ogImage}`);
    updateMetaTag('twitter:image:alt', title);
    updateMetaTag('twitter:site', '@wordcounterplusapp');
    updateMetaTag('twitter:creator', '@wordcounterplusapp');

    // Canonical URL - default to current origin + path if not provided
    const finalCanonical = canonical || `${currentOrigin}${window.location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    
    canonicalLink.href = finalCanonical;

    // Additional SEO meta tags for enhanced optimization
    updateMetaTag('article:modified_time', new Date().toISOString(), true);
    updateMetaTag('theme-color', '#2563eb');
    updateMetaTag('msapplication-TileColor', '#2563eb');
    
    // Language and alternate versions (hreflang)
    updateMetaTag('language', 'en-US');
    updateMetaTag('content-language', 'en');
    
    // Geo-targeting for high RPM countries (US, UK, Canada, Australia)
    updateMetaTag('geo.region', 'US-CA');
    updateMetaTag('geo.placename', 'United States');
    updateMetaTag('coverage', 'Worldwide');
    updateMetaTag('distribution', 'Global');
    updateMetaTag('target', 'all');
    
    // Enhanced crawling directives
    updateMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('bingbot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    
    // Remove existing hreflang links
    document.querySelectorAll('link[hreflang]').forEach(link => link.remove());
    
    if (hreflang) {
      Object.entries(hreflang).forEach(([lang, url]) => {
        const hreflangLink = document.createElement('link');
        hreflangLink.rel = 'alternate';
        hreflangLink.hreflang = lang;
        hreflangLink.href = url;
        document.head.appendChild(hreflangLink);
      });
    }

    // Structured Data (JSON-LD)
    let existingStructuredData = document.querySelector('script[data-seo-structured]');
    if (existingStructuredData) {
      existingStructuredData.remove();
    }
    
    if (structuredData) {
      const structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.setAttribute('data-seo-structured', 'true');
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Breadcrumbs structured data
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      };
      
      let existingBreadcrumbData = document.querySelector('script[data-breadcrumb-structured]');
      if (existingBreadcrumbData) {
        existingBreadcrumbData.remove();
      }
      
      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.setAttribute('data-breadcrumb-structured', 'true');
      breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(breadcrumbScript);
    }
  }, [title, description, keywords, canonical, ogImage, ogType, ogSiteName, twitterCard, noindex, author, siteName, baseUrl, structuredData, hreflang, breadcrumbs]);
};

export default useSEO;
