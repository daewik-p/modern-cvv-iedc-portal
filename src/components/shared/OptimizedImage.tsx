
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderSrc?: string;
  priority?: boolean;
  onLoad?: () => void;
}

/**
 * OptimizedImage component for efficient image loading
 * - Uses native lazy loading for offscreen images
 * - Implements a blurhash-like loading effect
 * - Supports modern image formats
 * - Handles loading states
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  placeholderSrc = '/placeholder.svg',
  priority = false,
  onLoad
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);

  useEffect(() => {
    // Reset states when src changes
    setLoaded(false);
    setError(false);
    setCurrentSrc(placeholderSrc);

    // Only preload if priority is true
    if (priority) {
      const img = new Image();
      img.src = src;
    }
  }, [src, placeholderSrc, priority]);

  // Determine if the image should use native lazy loading
  const shouldLazyLoad = !priority;

  // Handle successful image load
  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  // Handle image loading error
  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  // Detect WebP support
  const supportsWebp = () => {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };

  // Use WebP if supported and not already a WebP image
  const getOptimalSrc = () => {
    if (supportsWebp() && !src.endsWith('.webp') && !src.startsWith('data:')) {
      const baseSrc = src.split('?')[0];
      const queryParams = src.includes('?') ? src.split('?')[1] : '';
      const webpSrc = baseSrc.substring(0, baseSrc.lastIndexOf('.')) + '.webp';
      return queryParams ? `${webpSrc}?${queryParams}` : webpSrc;
    }
    return src;
  };

  return (
    <div 
      className={cn(
        "overflow-hidden relative",
        className
      )}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto'
      }}
    >
      {/* Placeholder that's shown while the main image loads */}
      {!loaded && (
        <img
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: loaded ? 0 : 0.5 }}
          aria-hidden="true"
        />
      )}

      {/* Main image with lazy loading */}
      <img
        src={getOptimalSrc()}
        alt={alt}
        loading={shouldLazyLoad ? "lazy" : "eager"}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        width={width}
        height={height}
        fetchPriority={priority ? "high" : "auto"}
      />

      {/* Show error fallback if needed */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
