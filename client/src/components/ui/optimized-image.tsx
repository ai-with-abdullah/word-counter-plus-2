interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  onLoad,
  onError
}: OptimizedImageProps) {
  const handleLoad = () => {
    onLoad?.();
  };

  const handleError = () => {
    onError?.();
  };

  // Generate WebP source path for production builds
  const getWebPSource = (originalSrc: string): string | null => {
    // Only try WebP in production where images are optimized
    if (process.env.NODE_ENV === 'production' && originalSrc.match(/\.(png|jpe?g)$/i)) {
      return originalSrc.replace(/\.(png|jpe?g)$/i, '.webp');
    }
    return null;
  };

  const webpSrc = getWebPSource(src);

  // Use picture element with WebP source for better compression in production
  if (webpSrc) {
    return (
      <picture className={className}>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          loading={loading}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          data-testid="img-optimized"
        />
      </picture>
    );
  }

  // Fallback to regular img tag for development or non-optimizable images
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      onLoad={handleLoad}
      onError={handleError}
      data-testid="img-optimized"
    />
  );
}