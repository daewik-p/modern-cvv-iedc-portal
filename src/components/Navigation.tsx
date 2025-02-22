
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const links = [
    { href: "/", label: "About" },
    { href: "/execom", label: "Execom" },
    { href: "/events", label: "Events" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-semibold text-primary">
            CVV IEDC
          </Link>
          <div className="flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "relative px-1 py-2 text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="underline"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
