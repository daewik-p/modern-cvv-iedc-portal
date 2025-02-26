
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
    date: "April 15, 2024",
    title: "IEDC Establishment",
    description: "Foundation of Innovation and Entrepreneurship Development Centre at Chinmaya Vishwa Vidhyapeeth",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    date: "November 10, 2024",
    title: "Catalyst 2024",
    description: "Our first idea pitching competition in collaboration with IIC",
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    date: "January 31, 2025",
    title: "Executive Committee 2k25",
    description: "New Lead selection and team formation",
    icon: <Users className="w-6 h-6" />,
  },
  {
    date: "February 19, 2025",
    title: "RSET IEDC x CVV IEDC",
    description: "Collaboration with Rajagiri School of Engineering and Technology",
    icon: <Users className="w-6 h-6" />,
  }
];

// Logo data for the placeholders
const logos = [
  {
    alt: "IEDC KSUM",
    src: "/IEDC_KSUM_original.png",
  },
  {
    alt: "IEDC CVV",
    src: "/IEDC LOGO FINAL.svg",
  },  
  {
    alt: "Kerala StartUp Mission",
    src: "/KSUM.svg",
  }

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

        {/* Logo Section - 3 large logos */}
        <div className="flex flex-wrap justify-center gap-10 mb-16">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center justify-center p-4"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="w-auto h-20 object-contain" 
              />
            </motion.div>
          ))}
        </div>

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
          {/* Responsive timeline that works well on mobile */}
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.date}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col md:flex-row md:items-center mb-12 relative"
            >
              {/* Mobile layout (stacked) */}
              <div className="flex items-center md:hidden mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white z-10">
                  {event.icon}
                </div>
                <div className="ml-4">
                  <span className="text-lg font-semibold text-primary">{event.date}</span>
                </div>
              </div>
              
              {/* Desktop layout (horizontal) */}
              <div className="hidden md:block md:w-1/3 md:text-right md:pr-8">
                <span className="text-lg font-semibold text-primary">{event.date}</span>
              </div>
              
              <div className="hidden md:relative md:flex md:items-center md:justify-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white z-10">
                  {event.icon}
                </div>
                {index !== timelineEvents.length - 1 && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-primary" />
                )}
              </div>
              
              {/* Content - same for both layouts */}
              <div className="pl-12 md:pl-8 md:w-2/3 relative">
                {/* Vertical line for mobile */}
                {index !== timelineEvents.length - 1 && (
                  <div className="absolute top-0 left-6 transform -translate-x-1/2 w-0.5 h-full bg-primary md:hidden" />
                )}
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
