import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Lightbulb, Instagram, Linkedin, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Hero background images/videos - Add new assets to /public/hero/ directory
const heroImages = [
 // "/hero/hero1.png",
 // "/hero/hero2.jpg",
  "/hero/hero4.mp4",
];

const Index = () => {
  // State for current hero media index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Preload images for smooth transitions
    heroImages.forEach(src => {
      if (!src.endsWith(".mp4")) {
        const img = new Image();
        img.src = src;
      }
    });

    // Rotate media every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Simple fade-in animation for main content
  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div {...fadeInAnimation} className="min-h-screen">
      {/* Hero Section with rotating background */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Media */}
        {heroImages[currentImageIndex].endsWith(".mp4") ? (
          <video
            key={heroImages[currentImageIndex]} // Re-render video when source changes
            className="absolute inset-0 w-full h-full object-cover"
            src={heroImages[currentImageIndex]}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${heroImages[currentImageIndex]})`,
            }}
          />
        )}

        {/* Overlay to slightly darken the background */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-7xl font-bold text-white mb-6"
          >
            Meet New Dimensions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-100 mb-10 max-w-2xl mx-auto"
          >
            IEDC @CVV is the hub for innovation, entrepreneurship, and technological advancement.
            We thrive to nurture ideas that shape the future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/about"
              className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-full font-medium group hover:bg-secondary transition-colors"
            >
              Learn More
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Create",
                description:
                  "Turn ideas into reality by exploring new possibilities and building innovative solutions.",
              },
              {
                icon: Users,
                title: "Inspire",
                description:
                  "Ignite creativity, share knowledge and push boundaries to shape the future.",
              },
              {
                icon: Lightbulb,
                title: "Transform",
                description:
                  "Empower change and bring impactful innovations to life through collaboration and technology.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="p-6 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all group"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Connect With Us
          </motion.h2>
          <div className="flex justify-center items-center space-x-8">
            {[
              {
                icon: Instagram,
                label: "Instagram",
                href: "https://instagram.com/cvviedc/",
                color: "hover:text-pink-500",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/cvv-iedc-2024",
                color: "hover:text-blue-600",
              },
              {
                icon: Youtube,
                label: "YouTube",
                href: "https://youtube.com/@CVVIEDC",
                color: "hover:text-red-600",
              },
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full bg-white shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 ${social.color} group`}
              >
                <social.icon className="w-8 h-8 transition-transform group-hover:scale-110" />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;
