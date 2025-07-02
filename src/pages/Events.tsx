import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, X, ExternalLink, ArrowRight, Star, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { type Event, upcomingEvents, pastEvents } from "@/data/events";

// Featured events (can be manually curated or auto-selected)
const featuredEvents = [
  ...upcomingEvents.slice(0, 3), // Take first 3 upcoming events
  ...pastEvents.slice(0, 2) // Take 2 recent past events
];

// Event detail slide-in panel component
const EventDetailPanel = ({ event, isOpen, onClose }: { 
  event: Event | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!event) return null;

  const isUpcoming = new Date(event.date) > new Date();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          
          {/* Slide-in Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isClosing ? "100%" : 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300,
              duration: isClosing ? 0.3 : 0.5
            }}
            className="fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white shadow-2xl z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Header with image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </motion.button>

                {/* Event badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-primary text-white w-fit">
                    {event.category}
                  </Badge>
                  {isUpcoming && (
                    <Badge className="bg-green-600 text-white w-fit">
                      Upcoming
                    </Badge>
                  )}
                </div>

                {/* Date badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 text-center shadow-lg">
                  <div className="text-xl font-bold text-primary">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">
                    {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                  </div>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight"
                  >
                    {event.title}
                  </motion.h1>

                  {/* Event details grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center bg-gray-50 rounded-xl p-3">
                      <Calendar className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-800 truncate">{event.date}</div>
                        <div className="text-sm text-gray-600">Date</div>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-50 rounded-xl p-3">
                      <Clock className="w-5 h-5 mr-3 text-amber-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-800 truncate">{event.time}</div>
                        <div className="text-sm text-gray-600">Time</div>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-50 rounded-xl p-3">
                      <MapPin className="w-5 h-5 mr-3 text-orange-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-800 truncate">{event.location}</div>
                        <div className="text-sm text-gray-600">Location</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">About This Event</h3>
                    <div className="prose prose-sm max-w-none">
                      {event.description.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Fixed bottom action area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="border-t border-gray-200 p-6 bg-white"
              >
                <div className="space-y-3">
                  {isUpcoming && event.registerLink ? (
                    <motion.a
                      href={event.registerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center bg-gradient-to-r from-primary to-amber-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-primary/90 hover:to-amber-600/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Register Now
                      <ExternalLink className="ml-2 w-5 h-5" />
                    </motion.a>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={`/events/${event.id}`}
                        className="w-full inline-flex items-center justify-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        View Full Details
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </motion.div>
                  )}
                  
                  <motion.button
                    onClick={handleClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Carousel component for featured events
const FeaturedEventsCarousel = ({ events, onViewDetails }: { 
  events: Event[]; 
  onViewDetails: (event: Event) => void; 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying || events.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (events.length === 0) return null;

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel container */}
      <div className="relative overflow-hidden rounded-3xl">
        <motion.div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {events.map((event, index) => (
            <FeaturedEventCard
              key={event.id}
              event={event}
              index={index}
              onViewDetails={onViewDetails}
              isActive={index === currentIndex}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation arrows */}
      {events.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </motion.button>
        </>
      )}

      {/* Dots indicator */}
      {events.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {events.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Featured event card component (updated for carousel)
const FeaturedEventCard = ({ event, index, onViewDetails, isActive }: { 
  event: Event; 
  index: number; 
  onViewDetails: (event: Event) => void;
  isActive?: boolean;
}) => {
  const isUpcoming = new Date(event.date) > new Date();

  return (
    <div className="w-full flex-shrink-0 relative">
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        {/* Background image */}
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-2xl">
              {/* Featured badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center gap-1 w-fit">
                  <Star className="w-3 h-3" />
                  Featured Event
                </Badge>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"
              >
                {event.title}
              </motion.h2>

              {/* Event details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-6 text-white/90"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{event.location}</span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-lg mb-8 line-clamp-3 leading-relaxed"
              >
                {event.description.substring(0, 200)}...
              </motion.p>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  onClick={() => onViewDetails(event)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View Details
                </motion.button>
                
                {isUpcoming && event.registerLink && (
                  <motion.a
                    href={event.registerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-primary to-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-primary/90 hover:to-amber-600/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    Register Now
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-6 right-6">
          <Badge className="bg-primary text-white">
            {event.category}
          </Badge>
        </div>
      </div>
    </div>
  );
};

// Regular event card component (unchanged)
const EventCard = ({ event, index, onViewDetails }: { 
  event: Event; 
  index: number; 
  onViewDetails: (event: Event) => void; 
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isUpcoming = new Date(event.date) > new Date();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
    >
      {/* Event image */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary text-white">
            {event.category}
          </Badge>
        </div>
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 text-center shadow-lg">
          <div className="text-xl font-bold text-primary">
            {new Date(event.date).getDate()}
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">
            {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
          </div>
        </div>
      </div>

      {/* Event content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-amber-600" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>

        <motion.button
          onClick={() => onViewDetails(event)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary to-amber-600 text-white px-6 py-3 rounded-full font-medium hover:from-primary/90 hover:to-amber-600/90 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

const Events = () => {
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  const currentEvents = activeFilter === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-accent">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-amber-500/5 to-orange-500/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-6">
              Our <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">Events</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover innovation, connect with like-minded individuals, and be part of transformative experiences that shape the future.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Events Carousel */}
      {featuredEvents.length > 0 && (
        <section className="py-16 relative bg-white">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-amber-500/5" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Featured <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Events</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't miss these highlighted events that showcase the best of innovation and entrepreneurship.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FeaturedEventsCarousel 
                events={featuredEvents} 
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Events Filter Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-gray-200 p-2 shadow-lg">
              {(['upcoming', 'past'] as const).map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-primary to-amber-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    {filter === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Events Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {currentEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentEvents.map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-16"
                >
                  <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 p-12 max-w-md mx-auto shadow-xl">
                    <Calendar className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {activeFilter === 'upcoming' ? 'No Upcoming Events' : 'No Past Events'}
                    </h3>
                    <p className="text-gray-600">
                      {activeFilter === 'upcoming' 
                        ? 'Stay tuned for exciting events coming soon!' 
                        : 'Check back later for past event highlights.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Event Detail Panel */}
      <EventDetailPanel
        event={selectedEvent}
        isOpen={isPanelOpen}
        onClose={closePanel}
      />
    </div>
  );
};

export default Events;