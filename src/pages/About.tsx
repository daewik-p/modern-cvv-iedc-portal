
import { motion } from "framer-motion";
import { CalendarDays, Trophy, Users, Sparkles } from "lucide-react";

// Timeline data structure
interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

// Sample timeline data - replace with actual events
const timelineEvents: TimelineEvent[] = [
  {
    date: "2020",
    title: "IEDC Establishment",
    description: "Foundation of Innovation and Entrepreneurship Development Centre at our institution",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    date: "2021",
    title: "First Innovation Challenge",
    description: "Successfully conducted our first innovation challenge with 100+ participants",
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    date: "2022",
    title: "Community Growth",
    description: "Expanded our community to 500+ active members",
    icon: <Users className="w-6 h-6" />,
  },
  {
    date: "2023",
    title: "Major Events",
    description: "Organized 10+ successful workshops and hackathons",
    icon: <CalendarDays className="w-6 h-6" />,
  },
];

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16 mt-16"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12"
        >
          About Us
        </motion.h1>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            The Innovation and Entrepreneurship Development Centre (IEDC) is a flagship initiative 
            to promote innovation and entrepreneurship among the student community. We aim to foster 
            innovative thinking and develop entrepreneurial skills among students.
          </p>
        </div>

        {/* Timeline Section */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-center mb-12"
        >
          Our Journey
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.date}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center mb-8"
            >
              <div className="w-1/3 text-right pr-8">
                <span className="text-lg font-semibold text-primary">{event.date}</span>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                  {event.icon}
                </div>
                {index !== timelineEvents.length - 1 && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-200" />
                )}
              </div>
              <div className="w-2/3 pl-8">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
