import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, Play, Pause } from "lucide-react";

// Define the type for gallery items
interface GalleryItem {
  src: string;
  alt: string;
  category?: string;
}

// Define event sections with their images
interface EventSection {
  id: string;
  title: string;
  featuredImage: string;
  description: string;
  date: string;
  images: GalleryItem[];
}

// Import all images from the "public/Gallery" folder and its subfolders
const images = import.meta.glob("/public/Gallery/*/*.{jpg,jpeg,png,webp,gif,JPG,HEIC}");

// Lightbox component
const Lightbox = ({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious 
}: {
  images: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen || !images[currentIndex]) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Main image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Image carousel component for each event section
const ImageCarousel = ({ 
  images, 
  onImageClick 
}: { 
  images: GalleryItem[]; 
  onImageClick: (index: number) => void; 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesPerSlide, setImagesPerSlide] = useState(3);

  // Responsive images per slide
  useEffect(() => {
    const updateImagesPerSlide = () => {
      if (window.innerWidth < 640) {
        setImagesPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setImagesPerSlide(2);
      } else {
        setImagesPerSlide(3);
      }
    };

    updateImagesPerSlide();
    window.addEventListener('resize', updateImagesPerSlide);
    return () => window.removeEventListener('resize', updateImagesPerSlide);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying || images.length <= imagesPerSlide) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, images.length - imagesPerSlide);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length, imagesPerSlide]);

  const maxIndex = Math.max(0, images.length - imagesPerSlide);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (images.length === 0) return null;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel container */}
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / imagesPerSlide)}%)` }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 px-2`}
              style={{ width: `${100 / imagesPerSlide}%` }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
                onClick={() => onImageClick(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation controls */}
      {images.length > imagesPerSlide && (
        <>
          {/* Navigation arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </motion.button>

          {/* Auto-play toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute bottom-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4 text-gray-700" />
            ) : (
              <Play className="w-4 h-4 text-gray-700" />
            )}
          </motion.button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Event section component
const EventSection = ({ 
  event, 
  index, 
  onImageClick 
}: { 
  event: EventSection; 
  index: number; 
  onImageClick: (eventIndex: number, imageIndex: number) => void; 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="mb-20 last:mb-0"
    >
      {/* Featured image with title overlay */}
      <div className="relative aspect-[21/9] md:aspect-[21/6] overflow-hidden rounded-3xl mb-8">
        <img
          src={event.featuredImage}
          alt={event.title}
          className="w-full h-full object-cover"
          loading={index < 2 ? "eager" : "lazy"}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        
        {/* Title and description overlay */}
        <div className="absolute inset-0 w-full h-full flex items-end">
          <div className="w-full px-3 sm:px-6 pb-4 sm:pb-8">
            <div className="w-full max-w-full">
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-3xl md:text-5xl font-black text-white mb-2 sm:mb-4 leading-tight break-words"
              >
                {event.title}
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-4"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2">
                  <span className="text-white font-medium text-xs sm:text-base">{event.date}</span>
                </div>
                <div className="bg-primary/80 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2">
                  <span className="text-white font-medium text-xs sm:text-base">{event.images.length} Photos</span>
                </div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/90 text-sm sm:text-base leading-relaxed break-words"
              >
                {event.description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Image carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <ImageCarousel
          images={event.images}
          onImageClick={(imageIndex) => onImageClick(index, imageIndex)}
        />
      </motion.div>
    </motion.section>
  );
};

const Gallery = () => {
  const [eventSections, setEventSections] = useState<EventSection[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const imagesByFolder: Record<string, GalleryItem[]> = {};
      
      // Group images by folder
      Object.keys(images).forEach((path) => {
        const parts = path.split("/");
        const filename = parts.pop() || "image";
        const folderName = parts.pop() || "General";

        if (!imagesByFolder[folderName]) {
          imagesByFolder[folderName] = [];
        }

        imagesByFolder[folderName].push({
          src: path.replace("/public", ""),
          alt: filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, "").replace(/[-_]/g, " "),
          category: folderName,
        });
      });

      // Create event sections with featured images and descriptions
      const sections: EventSection[] = Object.entries(imagesByFolder).map(([folderName, folderImages]) => {
        // Sort images to get the best featured image (you can customize this logic)
        const sortedImages = folderImages.sort((a, b) => a.src.localeCompare(b.src));
        
        return {
          id: folderName.toLowerCase().replace(/\s+/g, '-'),
          title: folderName,
          featuredImage: sortedImages[0]?.src || '/placeholder.svg',
          description: getEventDescription(folderName),
          date: getEventDate(folderName),
          images: sortedImages,
        };
      });

      // Sort sections by date (most recent first)
      sections.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setEventSections(sections);
    };

    loadImages();
  }, []);

  // Helper function to get event descriptions (you can customize this)
  const getEventDescription = (eventName: string): string => {
    const descriptions: Record<string, string> = {
      "Aarohi": "A celebration of women's achievements and empowerment, featuring inspiring talks, competitions, and cultural performances that highlighted the spirit of innovation and leadership.",
      "Catalyst 2k24": "An exciting ideathon that brought together innovative minds to pitch creative startup ideas, fostering entrepreneurial thinking and collaboration among students.",
      "Women in Tech": "An inspiring session focused on empowering women in technology, featuring industry leaders sharing their experiences and insights on breaking barriers in tech.",
      "Sheleads": "A powerful talk session on women in business, exploring themes of leadership, financial independence, and the transformative impact of women-led initiatives.",
      "empowHer": "A dynamic problem-solving competition where participants addressed real-world challenges faced by women through innovative, tech-enabled solutions.",
      "Exit or Extinct": "An thrilling escape room challenge that tested participants' problem-solving skills, logical reasoning, and teamwork under pressure.",
      "Battle of Brains": "An engaging quiz competition celebrating women's achievements, innovations, and contributions to society while fostering knowledge and awareness.",
      "Brand You_ LinkedIn Mastery": "A comprehensive workshop on building a professional digital identity, helping students optimize their LinkedIn profiles for career success.",
    };
    
    return descriptions[eventName] || `Explore the highlights and memorable moments from ${eventName}, showcasing innovation, collaboration, and the spirit of entrepreneurship.`;
  };

  // Helper function to get event dates (you can customize this)
  const getEventDate = (eventName: string): string => {
    const dates: Record<string, string> = {
      "Aarohi": "March 7, 2025",
      "Catalyst 2k24": "November 8, 2024",
      "Women in Tech": "March 7, 2025",
      "Sheleads": "March 7, 2025",
      "empowHer": "March 7, 2025",
      "Exit or Extinct": "March 7, 2025",
      "Battle of Brains": "March 7, 2025",
      "Brand You_ LinkedIn Mastery": "February 10, 2025",
    };
    
    return dates[eventName] || "2024";
  };

  const openLightbox = (eventIndex: number, imageIndex: number) => {
    setCurrentEventIndex(eventIndex);
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNextImage = () => {
    const currentEvent = eventSections[currentEventIndex];
    if (!currentEvent) return;
    
    setCurrentImageIndex((prev) => 
      prev >= currentEvent.images.length - 1 ? 0 : prev + 1
    );
  };

  const goToPreviousImage = () => {
    const currentEvent = eventSections[currentEventIndex];
    if (!currentEvent) return;
    
    setCurrentImageIndex((prev) => 
      prev <= 0 ? currentEvent.images.length - 1 : prev - 1
    );
  };

  const currentLightboxImages = eventSections[currentEventIndex]?.images || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-accent">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-amber-500/5 to-orange-500/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-gray-800 mb-6">
              Event <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-600 max-w-xs sm:max-w-3xl mx-auto leading-relaxed">
              Relive the moments of innovation, collaboration, and inspiration through our comprehensive event gallery showcasing the journey of CVV IEDC.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Event Sections */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-4">
          {eventSections.length > 0 ? (
            eventSections.map((event, index) => (
              <EventSection
                key={event.id}
                event={event}
                index={index}
                onImageClick={openLightbox}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 p-6 sm:p-10 md:p-16 max-w-xs sm:max-w-md md:max-w-lg mx-auto shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Loading Gallery...</h3>
                <p className="text-gray-600">
                  Please wait while we load the event galleries for you.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={currentLightboxImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNextImage}
        onPrevious={goToPreviousImage}
      />
    </div>
  );
};

export default Gallery;