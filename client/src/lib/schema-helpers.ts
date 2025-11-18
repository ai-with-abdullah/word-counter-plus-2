// Helper functions for generating structured data schemas

interface SoftwareApplicationConfig {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  price?: string;
  priceCurrency?: string;
}

export function createSoftwareApplicationSchema(config: SoftwareApplicationConfig) {
  const {
    name,
    description,
    url,
    applicationCategory = 'UtilityApplication',
    price = '0',
    priceCurrency = 'USD'
  } = config;

  // Extract base origin from URL (handles paths correctly)
  const baseUrl = new URL(url).origin;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory,
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency
    },
    description,
    url,
    author: {
      '@type': 'Organization',
      name: 'Word Counter Plus',
      url: baseUrl
    }
  };
}
