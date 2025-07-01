import { motion, useInView } from "framer-motion";
import { CalendarDays, Trophy, Users, Sparkles, HeartHandshake, PartyPopper, Lightbulb, Target, Rocket } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// Timeline data structure - easily editable JSON structure
interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: JSX.Element;
  category: "milestone" | "event" | "achievement" | "collaboration";
}

// Editable timeline data - can be moved to a separate JSON file
const timelineEvents: TimelineEvent[] = [
  {
    date: "March 19, 2024",
    title: "IEDC Establishment",
    description: "Foundation of Innovation and Entrepreneurship Development Centre at Chinmaya Vishwa Vidhyapeeth, marking the beginning of our innovation journey.",
    icon: <Sparkles className="w-6 h-6" />,
    category: "milestone",
  },
  {
    date: "November 10, 2024",
    title: "Catalyst 2024",
    description: "Our first idea pitching competition in collaboration with IIC, bringing together innovative minds and fostering entrepreneurial spirit.",
    icon: <Trophy className="w-6 h-6" />,
    category: "event",
  },
  {
    date: "January 31, 2025",
    title: "Executive Committee 2k25",
    description: "Formation of new leadership team with fresh perspectives and renewed commitment to innovation and excellence.",
    icon: <Users className="w-6 h-6" />,
    category: "milestone",
  },
  {
    date: "February 19, 2025",
    title: "RSET IEDC x CVV IEDC",
    description: "Strategic collaboration with Rajagiri School of Engineering and Technology, expanding our network and sharing best practices.",
    icon: <HeartHandshake className="w-6 h-6" />,
    category: "collaboration",
  },
  {
    date: "March 07, 2025",
    title: "Aarohi : Ascending Beyond Limits",
    description: "International Women's Day celebration empowering women in technology and entrepreneurship with inspiring talks and competitions.",
    icon: <PartyPopper className="w-6 h-6" />,
    category: "event",
  }
];

// Logo data for the organization partners
const partnerLogos = [
  {
    alt: "IEDC KSUM",
    src: "/IEDC_KSUM_original.png",
    name: "IEDC KSUM"
  },
  {
    alt: "IEDC CVV",
    src: "/IEDC LOGO FINAL.svg",
    name: "IEDC CVV"
  },  
  {
    alt: "Kerala StartUp Mission",
    src: "/KSUM.svg",
    name: "Kerala StartUp Mission"
  }
];

// Mission values data
const missionValues = [
  {
    icon: Target,
    title: "Innovation",
    description: "Fostering creative thinking and breakthrough solutions that address real-world challenges.",
    gradient: "from-primary to-primary/80",
  },
  {
    icon: Lightbulb,
    title: "Entrepreneurship",
    description: "Nurturing business acumen and startup culture among students and faculty.",
    gradient: "from-amber-600 to-amber-500",
  },
  {
    icon: Rocket,
    title: "Excellence",
    description: "Striving for the highest standards in all our initiatives and collaborations.",
    gradient: "from-orange-600 to-orange-500",
  },
];

// Timeline item component
const TimelineItem = ({ event, index, isLast }: { event: TimelineEvent; index: number; isLast: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "milestone": return "from-primary to-primary/80";
      case "event": return "from-amber-600 to-amber-500";
      case "achievement": return "from-green-600 to-green-500";
      case "collaboration": return "from-orange-600 to-orange-500";
      default: return "from-gray-600 to-gray-500";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex items-center mb-16 last:mb-0"
    >
      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full items-center">
        {/* Left Content (for even indices) */}
        <div className={cn("w-5/12", isEven ? "text-right pr-8" : "order-3 pl-8")}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r",
                getCategoryColor(event.category)
              )}>
                {event.category}
              </span>
              <span className="text-sm font-semibold text-primary">{event.date}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </motion.div>
        </div>

        {/* Center Timeline */}
        <div className="w-2/12 flex flex-col items-center order-2">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg z-10 bg-gradient-to-br",
              getCategoryColor(event.category)
            )}
          >
            {event.icon}
          </motion.div>
          {!isLast && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
              className="w-1 h-24 bg-gradient-to-b from-primary/60 to-amber-500/60 mt-4 origin-top"
            />
          )}
        </div>

        {/* Right Content (for odd indices) */}
        <div className={cn("w-5/12", !isEven ? "pl-8" : "order-1 pr-8")}>
          {isEven && <div />} {/* Empty space for even indices */}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex lg:hidden w-full">
        <div className="flex flex-col items-center mr-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg z-10 bg-gradient-to-br",
              getCategoryColor(event.category)
            )}
          >
            {event.icon}
          </motion.div>
          {!isLast && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
              className="w-0.5 h-20 bg-gradient-to-b from-primary/60 to-amber-500/60 mt-4 origin-top"
            />
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
          className="flex-1 bg-white/90 backdrop-blur-lg rounded-2xl border border-gray-200 p-4 shadow-lg"
        >
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r",
              getCategoryColor(event.category)
            )}>
              {event.category}
            </span>
            <span className="text-sm font-semibold text-primary">{event.date}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const missionRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });

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
            <motion.div
              className="inline-flex items-center bg-white/90 backdrop-blur-lg border border-primary/20 rounded-full px-6 py-3 mb-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-5 h-5 mr-2 text-amber-600" />
              <span className="text-primary font-medium">Our Story</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-6">
              About <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">IEDC CVV</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The Innovation and Entrepreneurship Development Cell (IEDC) at CVV, established in April 2024, 
              is a vibrant platform fostering creativity, innovation, and entrepreneurial spirit among students.
            </p>
          </motion.div>

          {/* Partner Logos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-12 mb-16"
          >
            {partnerLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="w-auto h-16 object-contain" 
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 p-8 shadow-xl"
          >
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              Guided by a vision to empower young minds, we organize workshops, contests, and hands-on activities 
              to inspire innovation and sustainable solutions. With a collaborative team, we aim to bridge the gap 
              between academics and real-world challenges, nurturing future leaders and changemakers.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center bg-gradient-to-r from-primary/10 to-amber-500/10 backdrop-blur-lg border border-primary/20 rounded-full px-6 py-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <CalendarDays className="w-5 h-5 mr-2 text-primary" />
              <span className="text-primary font-medium">Our Journey</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
              Milestones & <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the key moments that have shaped our innovation journey and community impact.
            </p>
          </motion.div>

          {/* Animated Timeline */}
          <div className="max-w-6xl mx-auto">
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={event.date}
                event={event}
                index={index}
                isLast={index === timelineEvents.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Values Section */}
      <section ref={missionRef} className="py-20 relative bg-gradient-to-br from-muted to-accent">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
              Our <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our mission to foster innovation and entrepreneurship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {missionValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={missionInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <motion.div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br",
                    value.gradient
                  )}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;