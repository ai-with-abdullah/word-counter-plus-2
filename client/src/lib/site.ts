// Site configuration for multi-domain support
// Main domain serves Word Counter, subdomain serves Text Case Converter

export const MAIN_HOST = import.meta.env.VITE_MAIN_HOST || 'wordcounterplusapp.com';
export const CASE_HOST = import.meta.env.VITE_CASE_HOST || 'textcase.wordcounterplusapp.com';

export const MAIN_ORIGIN = `https://${MAIN_HOST}`;
export const CASE_ORIGIN = `https://${CASE_HOST}`;

// Host detection helpers
export const getCurrentHost = (): string => {
  if (typeof window === 'undefined') return MAIN_HOST;
  return window.location.host;
};

export const getCurrentOrigin = (): string => {
  if (typeof window === 'undefined') return MAIN_ORIGIN;
  const protocol = window.location.protocol;
  const host = window.location.host;
  // Always return HTTPS for SEO purposes (canonical tags, etc.)
  return `https://${host}`;
};

// Development mode detection
export const isDevelopment = (): boolean => {
  const host = getCurrentHost();
  return host.includes('localhost') || host.includes('127.0.0.1') || host.includes('replit') || host.includes('.dev') || host.includes('vercel.app') || host.includes('netlify.app');
};

// Check for development mode case testing via URL path
export const isDevelopmentCaseMode = (): boolean => {
  if (!isDevelopment()) return false;
  if (typeof window === 'undefined') return false;
  return window.location.pathname.startsWith('/text-case-convert');
};

export const isMainHost = (): boolean => {
  const host = getCurrentHost();
  // In development, always treat as main host since we use paths for routing
  if (isDevelopment()) {
    return true;
  }
  return host === MAIN_HOST;
};

export const isCaseHost = (): boolean => {
  const host = getCurrentHost();
  // In development, never treat as case host since we use paths for routing
  if (isDevelopment()) {
    return false;
  }
  return host === CASE_HOST;
};

export const getOtherOrigin = (): string => {
  // Use URL paths for navigation on main domain for both development and production
  const currentOrigin = getCurrentOrigin();
  if (isDevelopment()) {
    // In development, check current path to determine other origin
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    return currentPath.startsWith('/text-case-convert') ? currentOrigin : `${currentOrigin}/text-case-convert`;
  }
  // In production, always target main domain path for consistency
  return isMainHost() ? `${MAIN_ORIGIN}/text-case-convert` : MAIN_ORIGIN;
};

export const getDomainUrl = (domain: 'main' | 'case'): string => {
  // Use URL paths on main domain for both development and production
  const currentOrigin = getCurrentOrigin();
  if (isDevelopment()) {
    return domain === 'main' ? currentOrigin : `${currentOrigin}/text-case-convert`;
  }
  // In production, use paths on the main domain
  return domain === 'main' ? MAIN_ORIGIN : `${MAIN_ORIGIN}/text-case-convert`;
};

// Tool-specific configurations
export const getToolConfig = () => {
  const isMain = isMainHost();
  const currentOrigin = getCurrentOrigin();
  
  return {
    isMainDomain: isMain,
    isCaseDomain: !isMain,
    currentOrigin: currentOrigin,
    mainOrigin: isDevelopment() ? currentOrigin : MAIN_ORIGIN,
    caseOrigin: isDevelopment() ? `${currentOrigin}/text-case-convert` : `${MAIN_ORIGIN}/text-case-convert`,
    wordCounterUrl: isDevelopment() ? `${currentOrigin}/` : `${MAIN_ORIGIN}/`,
    textCaseUrl: isDevelopment() ? `${currentOrigin}/text-case-convert` : `${MAIN_ORIGIN}/text-case-convert`,
  };
};

// Brand configuration (shared across both tools)
export const BRAND_CONFIG = {
  name: 'Word Counter Plus',
  logo: {
    text: 'Word Counter Plus',
    icon: 'FaPenNib' // Reference to the icon component
  },
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981'
  }
};