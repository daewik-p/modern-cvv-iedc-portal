
import React, { useState, useEffect, useRef } from 'react';

// Define a proper type for gallery items
interface GalleryItem {
  src: string;
  alt: string;
  category?: string;
}

// Organized photo gallery with categories
const galleryItems: GalleryItem[] = [
  { src: '/execom/daewik.jpg', alt: 'Team member', category: 'Team' },
  { src: '/execom/wall1.jpg', alt: 'Event photo', category: 'Events' },
  { src: '/execom/wall6.webp', alt: 'Workshop session', category: 'Workshops' },
  { src: '/execom/wall3.webp', alt: 'Campus activity', category: 'Activities' },
  { src: '/execom/wall4.webp', alt: 'Innovation lab', category: 'Innovation' },
  { src: '/execom/wall5.jpg', alt: 'Student project', category: 'Projects' },
];

const Gallery = () => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    galleryItems.map((_, i) => i < 4) // Only load first 4 items initially
  );
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current) return;
    
    const options = {
      root: null,
      rootMargin: '100px', // Conservative loading margin
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Use setTimeout to stagger loading and reduce CPU spikes
        setTimeout(() => {
          setVisibleItems(galleryItems.map(() => true));
        }, 100);
        observer.disconnect();
      }
    }, options);
    
    observer.observe(galleryRef.current);
    
    return () => observer.disconnect();
  }, []);

  // Optimize image rendering with proper attributes
  const renderGalleryItem = (item: GalleryItem, index: number) => {
    // For images that aren't loaded yet, return a placeholder
    if (!visibleItems[index]) {
      return (
        <div 
          key={`placeholder-${index}`}
          className="relative overflow-hidden rounded-lg bg-gray-100 shadow-md aspect-square animate-pulse"
          aria-hidden="true"
        />
      );
    }

    return (
      <div
        key={index}
        className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow scale-in"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={item.src}
            alt={item.alt}
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            width="400"
            height="400"
            fetchPriority={index === 0 ? "high" : "auto"}
          />
          {item.category && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <span className="text-white text-sm font-medium">{item.category}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-16 mt-16 fade-in">
      <div className="container mx-auto px-4" ref={galleryRef}>
        <h1 className="text-3xl font-bold text-center mb-12 slide-in">
          Activity Arena
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 content-visibility-auto">
          {galleryItems.map((item, index) => renderGalleryItem(item, index))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
