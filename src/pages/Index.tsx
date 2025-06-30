import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Users, Target, Lightbulb, Instagram, Linkedin, Youtube, Calendar, MapPin, Clock, ExternalLink, Sparkles, Zap, Rocket } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { upcomingEvents } from "@/data/events";

// Hero background images/videos
const heroImages = [
  "/hero/hero4.mp4",
];

// Animated background particles component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-primary/40 to-amber-500/40 rounded-full opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Floating action button component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-20 right-10 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-10 w-12 h-12 bg-gradient-to-br from-primary/60 to-amber-500/60 rounded-full opacity-25"
        animate={{
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Event card component with enhanced animations
const EventCard = ({ event, index }: { event: any; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

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
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
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
          <motion.span 
            className="px-4 py-2 bg-gradient-to-r from-primary to-amber-600 text-white text-sm rounded-full font-medium shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            {event.category}
          </motion.span>
        </div>
        <div className="absolute top-4 left-4">
          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 text-center shadow-lg border border-gray-200"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-primary">
              {new Date(event.date).getDate()}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">
              {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Event content */}
      <div className="p-6 relative z-10">
        <motion.h3 
          className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors"
          whileHover={{ x: 5 }}
        >
          {event.title}
        </motion.h3>
        
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

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {event.registerLink ? (
            <a
              href={event.registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-primary to-amber-600 text-white px-6 py-3 rounded-full font-medium hover:from-primary/90 hover:to-amber-600/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
            >
              Register Now
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          ) : (
            <Link
              to={`/events/${event.id}`}
              className="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-full font-medium hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Details
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const eventsRef = useRef(null);
  
  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    heroImages.forEach(src => {
      if (!src.endsWith(".mp4")) {
        const img = new Image();
        img.src = src;
      }
    });

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-accent">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video/Image */}
        {heroImages[currentImageIndex].endsWith(".mp4") ? (
          <video
            key={heroImages[currentImageIndex]}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            src={heroImages[currentImageIndex]}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{
              backgroundImage: `url(${heroImages[currentImageIndex]})`,
            }}
          />
        )}

        {/* Animated background elements */}
        <AnimatedBackground />
        <FloatingElements />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-amber-500/10 to-orange-500/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
          >
            {/* Animated badge */}
            <motion.div
              variants={textVariants}
              className="inline-flex items-center bg-white/90 backdrop-blur-lg border border-primary/20 rounded-full px-6 py-3 mb-8 shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2 text-amber-500" />
              <span className="text-primary font-medium">Innovation & Entrepreneurship Hub</span>
            </motion.div>

            {/* Main heading with gradient text */}
            <motion.h1
              variants={textVariants}
              className="text-5xl md:text-8xl font-black mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-primary via-amber-600 to-orange-600 bg-clip-text text-transparent">
                Meet New
              </span>
              <br />
              <span className="text-gray-800">Dimensions</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={textVariants}
              className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              IEDC @CVV is the hub for innovation, entrepreneurship, and technological advancement.
              We thrive to nurture ideas that shape the future.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={textVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center bg-gradient-to-r from-primary to-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg group hover:from-primary/90 hover:to-amber-600/90 transition-all duration-300 shadow-2xl hover:shadow-primary/25"
                >
                  Explore Our Journey
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/events"
                  className="inline-flex items-center bg-white/90 backdrop-blur-lg border border-primary/30 text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:border-primary/50 transition-all duration-300 shadow-lg"
                >
                  <Calendar className="mr-3" />
                  View Events
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary/70 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Upcoming Events Section */}
      <section ref={eventsRef} className="py-20 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-amber-500/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center bg-gradient-to-r from-primary/10 to-amber-500/10 backdrop-blur-lg border border-primary/20 rounded-full px-6 py-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="w-5 h-5 mr-2 text-primary" />
              <span className="text-primary font-medium">What's Coming Next</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black text-gray-800 mb-6">
              Upcoming <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us for exciting workshops, competitions, and networking opportunities that will shape your entrepreneurial journey.
            </p>
          </motion.div>

          {/* Events Grid */}
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-primary/20 p-12 max-w-md mx-auto shadow-xl">
                <Calendar className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Stay Tuned!</h3>
                <p className="text-gray-600">
                  Exciting events are being planned. Follow our social media for updates!
                </p>
              </div>
            </motion.div>
          )}

          {/* View All Events Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/events"
                className="inline-flex items-center bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-amber-500 hover:to-orange-500 transition-all duration-300 shadow-2xl hover:shadow-amber-500/25"
              >
                View All Events
                <ArrowRight className="ml-3" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative bg-gradient-to-br from-muted to-accent">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-gray-800 mb-6">
              Our <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Mission</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Create",
                description: "Turn ideas into reality by exploring new possibilities and building innovative solutions.",
                gradient: "from-primary to-primary/80",
                delay: 0
              },
              {
                icon: Users,
                title: "Inspire",
                description: "Ignite creativity, share knowledge and push boundaries to shape the future.",
                gradient: "from-amber-600 to-amber-500",
                delay: 0.2
              },
              {
                icon: Lightbulb,
                title: "Transform",
                description: "Empower change and bring impactful innovations to life through collaboration and technology.",
                gradient: "from-orange-600 to-orange-500",
                delay: 0.4
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 hover:border-primary/30 p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full">
                  {/* Icon with gradient background */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center bg-gradient-to-r from-primary/10 to-amber-500/10 backdrop-blur-lg border border-primary/20 rounded-full px-6 py-3 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-5 h-5 mr-2 text-amber-600" />
              <span className="text-primary font-medium">Stay Connected</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black text-gray-800 mb-6">
              Connect <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">With Us</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Follow our journey and stay updated with the latest innovations, events, and opportunities.
            </p>
            
            <div className="flex justify-center items-center space-x-8">
              {[
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "https://instagram.com/cvviedc/",
                  gradient: "from-pink-500 to-purple-500",
                  hoverColor: "hover:shadow-pink-500/25"
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/cvv-iedc-2024",
                  gradient: "from-primary to-primary/80",
                  hoverColor: "hover:shadow-primary/25"
                },
                {
                  icon: Youtube,
                  label: "YouTube",
                  href: "https://youtube.com/@CVVIEDC",
                  gradient: "from-red-500 to-red-600",
                  hoverColor: "hover:shadow-red-500/25"
                },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-6 bg-gradient-to-br ${social.gradient} rounded-2xl hover:scale-110 transition-all duration-300 shadow-2xl ${social.hoverColor}`}
                  whileHover={{ 
                    y: -5,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  <span className="sr-only">{social.label}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {social.label}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;