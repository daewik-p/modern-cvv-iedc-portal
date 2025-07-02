import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, X, ExternalLink, ArrowRight, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { type Event, upcomingEvents, pastEvents } from "@/data/events";

// Featured events (can be manually curated or auto-selected)
const featuredEvents = [
  ...upcomingEvents.slice(0, 2), // Take first 2 upcoming events
  ...pastEvents.slice(0, 1) // Take 1 recent past event
];

// Event detail modal component
const EventDetailModal = ({ event, isOpen, onClose }: { 
  event: Event | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="relative">
                <div className="aspect-video md:aspect-[21/9] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Event badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-primary text-white">
                    {event.category}
                  </Badge>
                  {isUpcoming && (
                    <Badge className="bg-green-600 text-white">
                      Upcoming
                    </Badge>
                  )}
                </div>

                {/* Date badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 text-center shadow-lg">
                  <div className="text-2xl font-bold text-primary">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">
                    {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
                  >
                    {event.title}
                  </motion.h1>

                  {/* Event details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                  >
                    <div className="flex items-center bg-gray-50 rounded-2xl p-4">
                      <Calendar className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <div className="font-semibold text-gray-800">{event.date}</div>
                        <div className="text-sm text-gray-600">Date</div>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-50 rounded-2xl p-4">
                      <Clock className="w-5 h-5 mr-3 text-amber-600" />
                      <div>
                        <div className="font-semibold text-gray-800">{event.time}</div>
                        <div className="text-sm text-gray-600">Time</div>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-50 rounded-2xl p-4">
                      <MapPin className="w-5 h-5 mr-3 text-orange-600" />
                      <div>
                        <div className="font-semibold text-gray-800">{event.location}</div>
                        <div className="text-sm text-gray-600">Location</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-lg max-w-none mb-8"
                  >
                    {event.description.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>

                  {/* Action button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center"
                  >
                    {isUpcoming && event.registerLink ? (
                      <motion.a
                        href={event.registerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center bg-gradient-to-r from-primary to-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-primary/90 hover:to-amber-600/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Register Now
                        <ExternalLink className="ml-3 w-5 h-5" />
                      </motion.a>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={`/events/${event.id}`}
                          className="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          View Full Details
                          <ArrowRight className="ml-3 w-5 h-5" />
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Featured event card component
const FeaturedEventCard = ({ event, index, onViewDetails }: { 
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
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
    >
      {/* Featured badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center gap-1">
          <Star className="w-3 h-3" />
          Featured
        </Badge>
      </div>

      {/* Event image */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary text-white">
            {event.category}
          </Badge>
        </div>

        {/* Date badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 text-center shadow-lg">
          <div className="text-2xl font-bold text-primary">
            {new Date(event.date).getDate()}
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">
            {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
          </div>
        </div>
      </div>

      {/* Event content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
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

        <p className="text-gray-600 mb-6 line-clamp-3">
          {event.description.substring(0, 150)}...
        </p>

        <div className="flex gap-3">
          <motion.button
            onClick={() => onViewDetails(event)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-primary to-amber-600 text-white px-6 py-3 rounded-full font-medium hover:from-primary/90 hover:to-amber-600/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Details
          </motion.button>
          
          {isUpcoming && event.registerLink && (
            <motion.a
              href={event.registerLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border-2 border-primary text-primary px-6 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-300"
            >
              Register
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Regular event card component
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

      {/* Featured Events Section */}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredEvents.map((event, index) => (
                <FeaturedEventCard
                  key={`featured-${event.id}`}
                  event={event}
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
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

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Events;