import { Calendar, MapPin, Clock, Filter, Search, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { type Event, upcomingEvents, pastEvents } from "@/data/events";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

// Event categories for filtering
const eventCategories = [
  "All",
  "Ideathon",
  "Workshop",
  "Competition",
  "Talk Session",
  "Celebration",
  "Collaboration",
  "Online"
];

const FeaturedEventCard = ({ event }: { event: Event }) => {
  const isUpcoming = new Date(event.date) > new Date();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 group"
    >
      {/* Featured Badge */}
      <div className="absolute top-6 left-6 z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
        >
          <Star className="w-4 h-4 mr-2" />
          Featured Event
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative aspect-video md:aspect-square overflow-hidden">
          <motion.img
            src={event.image}
            alt={event.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-6 right-6">
            <span className="px-4 py-2 bg-primary text-white text-sm rounded-full font-medium shadow-lg">
              {event.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors">
              {event.title}
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-3 text-amber-600" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-orange-600" />
                <span>{event.location}</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
              {event.description.substring(0, 150)}...
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isUpcoming && event.registerLink ? (
                <a
                  href={event.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-primary to-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-primary/90 hover:to-amber-600/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Register Now
                </a>
              ) : (
                <Link
                  to={`/events/${event.id}`}
                  className="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View Details
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const EventCard = ({ event, index }: { event: Event; index: number }) => {
  const isUpcoming = new Date(event.date) > new Date();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <motion.span 
            className="px-3 py-1 bg-primary text-white text-sm rounded-full font-medium shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            {event.category}
          </motion.span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 left-4">
          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 text-center shadow-lg border border-gray-200"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-lg font-bold text-primary">
              {new Date(event.date).getDate()}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">
              {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors line-clamp-2"
          whileHover={{ x: 5 }}
        >
          {event.title}
        </motion.h3>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-amber-600" />
            <span className="text-sm truncate">{event.location}</span>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isUpcoming && event.registerLink ? (
            <a
              href={event.registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-primary to-amber-600 text-white text-center py-3 rounded-xl font-bold hover:from-primary/90 hover:to-amber-600/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Register Now
            </a>
          ) : (
            <Link
              to={`/events/${event.id}`}
              className="block w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white text-center py-3 rounded-xl font-bold hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Details
            </Link>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const EventGrid = ({ events, searchTerm, selectedCategory }: { 
  events: Event[]; 
  searchTerm: string; 
  selectedCategory: string; 
}) => {
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  // Separate featured event (first upcoming event or first past event)
  const featuredEvent = filteredEvents[0];
  const regularEvents = filteredEvents.slice(1);

  return (
    <div className="space-y-12">
      {/* Featured Event */}
      {featuredEvent && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Featured Event</h3>
          <FeaturedEventCard event={featuredEvent} />
        </motion.div>
      )}

      {/* Regular Events Grid */}
      {regularEvents.length > 0 && (
        <div>
          {featuredEvent && (
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {events === upcomingEvents ? "More Upcoming Events" : "More Past Events"}
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 p-12 max-w-md mx-auto shadow-xl">
            <Calendar className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Events Found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
            <motion.div
              className="inline-flex items-center bg-white/90 backdrop-blur-lg border border-primary/20 rounded-full px-6 py-3 mb-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              <span className="text-primary font-medium">Discover & Participate</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-6">
              Our <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">Events</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join us for exciting workshops, competitions, and networking opportunities that will shape your entrepreneurial journey.
            </p>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 appearance-none cursor-pointer"
                >
                  {eventCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Events Content */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mb-12"
            >
              <TabsList className="grid w-full max-w-[400px] grid-cols-2 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl p-2 shadow-lg">
                <TabsTrigger 
                  value="upcoming" 
                  className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all duration-300"
                >
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger 
                  value="past"
                  className="rounded-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all duration-300"
                >
                  Past Events
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <AnimatePresence mode="wait">
              <TabsContent value="upcoming" className="outline-none">
                <motion.div
                  key="upcoming"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <EventGrid 
                    events={upcomingEvents} 
                    searchTerm={searchTerm}
                    selectedCategory={selectedCategory}
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="past" className="outline-none">
                <motion.div
                  key="past"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <EventGrid 
                    events={pastEvents} 
                    searchTerm={searchTerm}
                    selectedCategory={selectedCategory}
                  />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Events;