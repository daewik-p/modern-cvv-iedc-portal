
import { Calendar, MapPin, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { type Event, upcomingEvents, pastEvents } from "@/data/events";

const EventCard = ({ event }: { event: Event }) => {
  const isUpcoming = new Date(event.date) > new Date();
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
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
          to={isUpcoming ? `/register/${event.id}` : `/events/${event.id}`}
          className="block w-full bg-primary text-white text-center py-2 rounded-lg hover:bg-secondary transition-colors duration-300"
        >
          {isUpcoming ? "Register Now" : "View Details"}
        </Link>
      </div>
    </div>
  );
};

const EventGrid = ({ events }: { events: Event[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {events.map((event) => (
      <EventCard key={event.id} event={event} />
    ))}
  </div>
);

const Events = () => {
  return (
    <div className="min-h-screen py-16 fade-in">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Events
        </h1>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="outline-none">
            <EventGrid events={upcomingEvents} />
          </TabsContent>

          <TabsContent value="past" className="outline-none">
            <EventGrid events={pastEvents} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;
