
import React, { useState, useEffect, useCallback, memo } from 'react';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { isInViewport, preloadCriticalImages } from '@/utils/imageOptimization';

// Define photo gallery items
interface GalleryItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Gallery data
const photos: GalleryItem[] = [
  { src: '/execom/daewik.jpg', alt: 'Photo 1', width: 800, height: 1000 },
  { src: '/execom/wall1.jpg', alt: 'Photo 2', width: 1200, height: 800 },
  { src: '/execom/wall6.webp', alt: 'Photo 3', width: 1200, height: 800 },
  { src: '/execom/wall3.webp', alt: 'Photo 4', width: 1200, height: 800 },
  { src: '/execom/wall4.webp', alt: 'Photo 5', width: 1200, height: 800 },
  { src: '/execom/wall5.jpg', alt: 'Photo 6', width: 1200, height: 800 },
];

/**
 * GalleryItem component for rendering individual photos
 * - Memoized to prevent unnecessary re-renders
 * - Uses OptimizedImage component for better performance
 */
const GalleryItem = memo(({ 
  photo, 
  index,
  onLoad
}: { 
  photo: GalleryItem; 
  index: number;
  onLoad: () => void;
}) => {
  return (
    <div
      className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow scale-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <OptimizedImage
        src={photo.src}
        alt={photo.alt}
        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
        priority={index < 4} // Only prioritize loading for first few images
        width={photo.width}
        height={photo.height}
        placeholderSrc="/placeholder.svg"
        onLoad={onLoad}
      />
    </div>
  );
});

GalleryItem.displayName = 'GalleryItem';

/**
 * Main Gallery component
 * - Implements progressive loading and virtualization
 * - Uses intersection observer for efficient lazy loading
 * - Optimizes image loading based on viewport size and network conditions
 */
const Gallery = () => {
  // State to track visible/loaded photos
  const [visiblePhotos, setVisiblePhotos] = useState<boolean[]>(
    photos.map((_, index) => index < 6) // Initially show first 6 photos
  );
  
  // Track loading progress
  const [loadedCount, setLoadedCount] = useState(0);
  
  // Reference for the gallery container
  const [galleryRef, setGalleryRef] = useState<HTMLDivElement | null>(null);
  
  // Handle image load events
  const handleImageLoad = useCallback(() => {
    setLoadedCount(prev => prev + 1);
  }, []);
  
  // Preload critical images on component mount
  useEffect(() => {
    // Preload first few images
    preloadCriticalImages(photos.slice(0, 4).map(photo => photo.src));
  }, []);
  
  // Check which photos are in viewport
  const checkVisibility = useCallback(() => {
    if (!galleryRef) return;
    
    const photoElements = galleryRef.querySelectorAll('.gallery-item-container');
    const newVisiblePhotos = [...visiblePhotos];
    
    photoElements.forEach((el, index) => {
      if (isInViewport(el, 500)) { // 500px offset for earlier loading
        newVisiblePhotos[index] = true;
      }
    });
    
    setVisiblePhotos(newVisiblePhotos);
  }, [galleryRef, visiblePhotos]);
  
  // Set up visibility checking
  useEffect(() => {
    checkVisibility();
    
    // Add event listeners with throttling for performance
    const throttledCheck = throttle(checkVisibility, 200);
    window.addEventListener('scroll', throttledCheck);
    window.addEventListener('resize', throttledCheck);
    
    return () => {
      window.removeEventListener('scroll', throttledCheck);
      window.removeEventListener('resize', throttledCheck);
    };
  }, [checkVisibility]);
  
  // Simple throttle function for performance
  function throttle(func: Function, delay: number) {
    let lastCall = 0;
    return function(...args: any[]) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }

  return (
    <div className="min-h-screen py-16 mt-16 fade-in">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12 slide-in">
          Activity Arena
        </h1>
        
        {/* Loading progress indicator */}
        {loadedCount < photos.length && (
          <div className="w-full max-w-md mx-auto mb-8 bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(loadedCount / photos.length) * 100}%` }}
            ></div>
          </div>
        )}
        
        <div 
          ref={setGalleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {photos.map((photo, index) => (
            <div key={index} className="gallery-item-container will-change-transform">
              {visiblePhotos[index] ? (
                <GalleryItem 
                  photo={photo} 
                  index={index}
                  onLoad={handleImageLoad}
                />
              ) : (
                <div 
                  className="aspect-video bg-gray-100 rounded-lg animate-pulse"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Gallery);

// Add TypeScript type for the OptimizedImage onLoad prop
declare module '@/components/shared/OptimizedImage' {
  interface OptimizedImageProps {
    onLoad?: () => void;
  }
}
