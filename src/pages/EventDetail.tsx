
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Combine all events for easy lookup
const allEvents = [
  {
    id: "innovation-workshop-2024",
    title: "Innovation Workshop",
    date: "March 15, 2024",
    time: "10:00 AM",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Workshop",
    description: "Join us for an intensive workshop on innovation and entrepreneurship. Learn from industry experts about the latest trends and techniques in innovation. This full-day workshop will cover topics including design thinking, rapid prototyping, and lean startup methodologies.\n\nWhat you'll learn:\n- Innovation fundamentals\n- Design thinking principles\n- Rapid prototyping techniques\n- Lean startup methodology\n\nThis workshop is perfect for students, entrepreneurs, and professionals looking to enhance their innovation skills.",
  },
  {
    id: "entrepreneurship-summit-2023",
    title: "Entrepreneurship Summit 2023",
    date: "December 10, 2023",
    time: "9:00 AM",
    location: "Conference Hall",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Summit",
    description: "The Entrepreneurship Summit 2023 brought together leading entrepreneurs, innovators, and industry experts for a day of learning, networking, and inspiration. The summit featured keynote speeches, panel discussions, and interactive sessions focused on the future of entrepreneurship and innovation.\n\nHighlights included:\n- Keynote speeches from successful entrepreneurs\n- Panel discussions on emerging trends\n- Networking opportunities\n- Startup showcase\n\nThe event was a great success, with over 200 participants learning from and connecting with industry leaders.",
  },
];

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = allEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Button onClick={() => navigate('/events')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const isUpcoming = new Date(event.date) > new Date();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16 mt-16"
    >
      <article className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/events')}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>

        <div className="relative rounded-xl overflow-hidden mb-8">
          <img
            src={event.image}
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

          {isUpcoming && (
            <Button className="w-full md:w-auto">
              Register Now
            </Button>
          )}

          <div className="prose prose-lg max-w-none">
            {event.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </motion.div>
  );
};

export default EventDetail;
