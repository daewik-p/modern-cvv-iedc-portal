import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Pre-define navigation links to avoid recreation on each render
const navigationLinks = [
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
];

const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-300/20"
            : "bg-white/80 backdrop-blur-md border-b border-gray-100"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" className="flex items-center group">
                <img 
                  src="/website-02.svg" 
                  alt="CVV IEDC Logo" 
                  width={96}
                  height={52}
                  className="h-12 w-auto transform-gpu group-hover:brightness-110 transition-all duration-300"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "relative px-6 py-3 text-sm font-bold tracking-wide transition-all duration-300 group",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Hover background effect */}
                    <motion.div
                      className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId="navbar-hover"
                    />
                    
                    {/* Active/Hover underline */}
                    <motion.div
                      className={cn(
                        "absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-primary to-amber-600 rounded-full transition-all duration-300",
                        location.pathname === link.href
                          ? "w-8 opacity-100"
                          : "w-0 group-hover:w-8 opacity-0 group-hover:opacity-100"
                      )}
                      style={{ transform: "translateX(-50%)" }}
                    />
                    
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-lg blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                      initial={false}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={toggleMobileMenu}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl border-l border-gray-200 z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <img 
                    src="/website-02.svg" 
                    alt="CVV IEDC Logo" 
                    className="h-10 w-auto"
                  />
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                  >
                    <X className="w-5 h-5 text-primary" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <div className="space-y-2">
                    {navigationLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          to={link.href}
                          onClick={toggleMobileMenu}
                          className={cn(
                            "flex items-center px-4 py-4 rounded-xl font-bold text-lg transition-all duration-300 group",
                            location.pathname === link.href
                              ? "bg-primary text-white shadow-lg"
                              : "text-gray-700 hover:bg-primary/10 hover:text-primary"
                          )}
                        >
                          <span className="relative">
                            {link.label}
                            {location.pathname === link.href && (
                              <motion.div
                                layoutId="mobile-active"
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
                              />
                            )}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Innovation & Entrepreneurship Hub
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;