// Helper functions for generating structured data schemas

interface SoftwareApplicationConfig {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  price?: string;
  priceCurrency?: string;
  ratingValue?: string;
  ratingCount?: string;
  featureList?: string[];
}

export function createSoftwareApplicationSchema(config: SoftwareApplicationConfig) {
  const {
    name,
    description,
    url,
    applicationCategory = 'UtilityApplication',
    price = '0',
    priceCurrency = 'USD',
    ratingValue = '4.8',
    ratingCount = '1250',
    featureList
  } = config;

  // Extract base origin from URL (handles paths correctly)
  const baseUrl = new URL(url).origin;

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: 'Web Browser',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount,
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: 'https://schema.org/InStock'
    },
    author: {
      '@type': 'Organization',
      name: 'Word Counter Plus',
      url: baseUrl
    }
  };

  if (featureList && featureList.length > 0) {
    schema.featureList = featureList;
  }

  return schema;
}
