
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

const events = [
  {
    title: "Innovation Workshop",
    date: "March 15, 2024",
    time: "10:00 AM",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Workshop",
  },
  // Add more events as needed
];

const Events = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Upcoming Events
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                  <div className="space-y-2">
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
                  <button className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Events;
