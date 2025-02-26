import React, { useState, useEffect, useRef } from "react";

// Define the type for gallery items
interface GalleryItem {
  src: string;
  alt: string;
  category?: string;
}

// Import all images from the "public/Gallery" folder and its subfolders
const images = import.meta.glob("/public/Gallery/*/*.{jpg,jpeg,png,webp,gif}"); // Includes subfolders

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = Object.keys(images).map((path) => {
        const parts = path.split("/"); // Split path by '/'
        const filename = parts.pop() || "image"; // Get the file name
        const category = parts.pop() || "General"; // Get the subfolder name

        return {
          src: path.replace("/public", ""), // Adjust path to match public assets
          alt: filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, "").replace(/[-_]/g, " "), // Extract name as alt
          category, // Use subfolder name as category
        };
      });

      setGalleryItems(loadedImages);
      setVisibleItems(new Array(loadedImages.length).fill(false).map((_, i) => i < 4)); // Show first 4 initially
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!galleryRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setVisibleItems(galleryItems.map(() => true));
          }, 100);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.1 }
    );

    observer.observe(galleryRef.current);

    return () => observer.disconnect();
  }, [galleryItems]);

  return (
    <div className="min-h-screen py-16 mt-16 fade-in">
      <div className="container mx-auto px-4" ref={galleryRef}>
        <h1 className="text-3xl font-bold text-center mb-12 slide-in">
          Activity Arena
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 content-visibility-auto">
          {galleryItems.map((item, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow scale-in">
              <div className="aspect-square overflow-hidden">
                {visibleItems[index] ? (
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
                ) : (
                  <div className="relative overflow-hidden rounded-lg bg-gray-100 shadow-md aspect-square animate-pulse" />
                )}
                {item.category && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-white text-sm font-medium">{item.category}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
