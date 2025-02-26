import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

// Pre-define navigation links to avoid recreation on each render
const navigationLinks = [
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/execom", label: "Execom" },
  { href: "/about", label: "About" },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img 
              src="/IEDC LOGO FINAL.svg" 
              alt="CVV IEDC Logo" 
              width={96}
              height={52}
              className="h-8 w-auto transform-gpu hover:brightness-110 transition-all duration-300"
              style={{ filter: 'invert(0.8) sepia(0.9) saturate(1.5) hue-rotate(190deg) brightness(0.5)' }}
            />
          </Link>
          <div className="flex space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "relative px-1 py-2 text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:transition-transform after:duration-200"
                    : "text-gray-600 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
