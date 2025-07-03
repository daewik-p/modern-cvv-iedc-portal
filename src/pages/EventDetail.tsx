import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { upcomingEvents, pastEvents } from "@/data/events"; // Import event data
import type { Event } from "@/data/events";

const allEvents = [...upcomingEvents, ...pastEvents];

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Combine all events from both upcoming and past events
  const allEvents = [...upcomingEvents, ...pastEvents];
  const event = allEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Button onClick={() => navigate("/events")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const isUpcoming = Date.parse(event.date) > Date.now();

  // Fix duplicate "/Events/Events/" issue
  const getImagePath = () => {
    return `/Events/${event.image.replace(/^Events\//, '')}`; // Ensure "/Events/" is only once
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16 mt-16"
    >
      <article className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/events")} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>

        <div className="relative rounded-xl overflow-hidden mb-8">
          <img
            src={getImagePath()} // Corrected image path
            alt={event.title}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="px-4 py-2 bg-primary text-white rounded-full">
              {event.category}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{event.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>

          {isUpcoming && event.registerLink && (
            <a href={event.registerLink} target="_blank" rel="noopener noreferrer">
              <Button className="w-full md:w-auto">Register Now</Button>
          </a>
          )}

          <div className="prose prose-lg max-w-none">
            {event.description.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </motion.div>
  );
};

export default EventDetail;
