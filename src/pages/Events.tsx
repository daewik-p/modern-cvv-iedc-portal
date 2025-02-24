
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

// Event data structure
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  description: string;
}

// Sample event data
const upcomingEvents: Event[] = [
  {
    id: "innovation-workshop-2024",
    title: "Innovation Workshop",
    date: "March 15, 2024",
    time: "10:00 AM",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Workshop",
    description: "Join us for an intensive workshop on innovation and entrepreneurship.",
  },
];

const pastEvents: Event[] = [
  {
    id: "entrepreneurship-summit-2023",
    title: "Entrepreneurship Summit 2023",
    date: "December 10, 2023",
    time: "9:00 AM",
    location: "Conference Hall",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Summit",
    description: "A gathering of entrepreneurs and innovators discussing the future of business.",
  },
];

// Motion variants for smoother animations
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const EventCard = ({ event }: { event: Event }) => (
  <div className="group">
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
            {event.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        <Link
          to={`/events/${event.id}`}
          className="block w-full bg-primary text-white text-center py-2 rounded-lg hover:bg-secondary transition-colors duration-300"
        >
          {new Date(event.date) > new Date() ? "Register Now" : "View Details"}
        </Link>
      </div>
    </div>
  </div>
);

const Events = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Events
        </motion.h1>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;
