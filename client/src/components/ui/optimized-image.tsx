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

  // Calculate aspect ratio if width and height are provided
  const aspectRatio = width && height ? `${width}/${height}` : undefined;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      style={aspectRatio ? { aspectRatio } : undefined}
      onLoad={handleLoad}
      onError={handleError}
      data-testid="img-optimized"
    />
  );
}