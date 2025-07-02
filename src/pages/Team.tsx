import { Linkedin, ChevronDown, Users, Award, Star } from "lucide-react";
import { type ExecomMember, execomMembers } from "@/data/execom";
import { memo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Team years data - easily expandable
const teamYears = [
  {
    year: "2025",
    label: "Current Team",
    isActive: true,
    teams: {
      "Executive Committee": execomMembers,
      "Media Team": {
        nodalOfficers: [],
        iph: [],
        crl: [],
        sl: []
      },
      "Create Team": {
        nodalOfficers: [],
        iph: [],
        crl: [],
        sl: []
      },
      "Orbit Team": {
        nodalOfficers: [],
        iph: [],
        crl: [],
        sl: []
      }
    }
  }
];

/**
 * Enhanced MemberCard Component with improved LinkedIn button placement
 */
const MemberCard = memo(({ member, index }: { member: ExecomMember; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isExternalImage = member.image.startsWith('http');
  const imageSrc = isExternalImage 
    ? `${member.image}${member.image.includes('?') ? '&' : '?'}w=400&q=80&auto=format`
    : member.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -12, scale: 1.03 }}
      className="group relative bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 w-full max-w-[300px]"
    >
      {/* Card content */}
      <div className="relative">
        {/* Image container with improved aspect ratio */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
          )}
          
          <img
            src={imageSrc}
            alt={member.name}
            loading={index < 6 ? "eager" : "lazy"}
            className={cn(
              "object-cover w-full h-full transition-all duration-700 group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            decoding="async"
            fetchPriority={index < 3 ? "high" : "auto"}
          />
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* LinkedIn button - Top right corner, always visible */}
          {member.linkedin && (
            <motion.div
              initial={{ opacity: 0.8, scale: 0.9 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              className="absolute top-4 right-4 z-10"
            >
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect with ${member.name} on LinkedIn`}
                className="flex items-center justify-center w-10 h-10 bg-[#0A66C2] text-white rounded-full shadow-lg hover:bg-[#004182] transition-all duration-300 hover:shadow-xl"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </motion.div>
          )}

          {/* Role badge - Bottom left corner on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="bg-white/95 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {member.role.split(' ').slice(-2).join(' ')} {/* Show last 2 words of role */}
            </div>
          </motion.div>
        </div>

        {/* Member information */}
        <div className="p-6 text-center relative">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-primary to-amber-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <motion.h3 
            className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            {member.name}
          </motion.h3>
          
          <p className="text-primary font-semibold text-sm mb-3 leading-relaxed">
            {member.role}
          </p>

          {/* Mobile LinkedIn button - Bottom of card */}
          {member.linkedin && (
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-4 py-2 rounded-full font-medium hover:bg-[#004182] transition-colors duration-300 shadow-lg text-sm"
              >
                <Linkedin className="w-4 h-4" />
                Connect
              </a>
            </motion.div>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-amber-500/5 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
});

MemberCard.displayName = 'MemberCard';

/**
 * Enhanced MemberGrid Component with better responsive layout
 */
const MemberGrid = memo(({ members }: { members: ExecomMember[] }) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    members.map((_, i) => i < 6) // Show first 6 initially
  );
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Gradually reveal all members with staggered timing
          let delay = 0;
          const interval = setInterval(() => {
            setVisibleItems(prev => {
              const nextVisibility = [...prev];
              const nextIndex = nextVisibility.findIndex(visible => !visible);
              if (nextIndex === -1) {
                clearInterval(interval);
                return nextVisibility;
              }
              nextVisibility[nextIndex] = true;
              return nextVisibility;
            });
            
            delay += 150;
            if (delay > 2000) clearInterval(interval);
          }, 150);
          
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [members.length]);

  return (
    <div ref={gridRef} className="w-full flex justify-center px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl">
        {members.map((member, index) => (
          <div key={member.name} className="flex justify-center">
            {visibleItems[index] ? (
              <MemberCard member={member} index={index} />
            ) : (
              <div 
                className="bg-gray-100 rounded-3xl w-[300px] aspect-[4/5] animate-pulse"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

MemberGrid.displayName = 'MemberGrid';

/**
 * Enhanced ExecomSection Component with better animations
 */
const ExecomSection = memo(({ title, members, priority = 'low' }: { 
  title: string; 
  members: ExecomMember[]; 
  priority?: 'high' | 'medium' | 'low';
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(priority === 'high');
  
  useEffect(() => {
    if (!sectionRef.current || isVisible) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.1 }
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, priority]);

  // Get appropriate icon for section
  const getSectionIcon = () => {
    if (title.includes('Nodal')) return Award;
    if (title.includes('Innovation') || title.includes('Program')) return Star;
    return Users;
  };

  const SectionIcon = getSectionIcon();

  return (
    <motion.section 
      ref={sectionRef} 
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-amber-600 rounded-2xl flex items-center justify-center">
            <SectionIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {title}
          </h2>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-amber-600 rounded-full mx-auto" />
      </motion.div>
      
      {isVisible ? (
        <MemberGrid members={members} />
      ) : (
        <div className="flex justify-center px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: Math.min(members.length, 8) }).map((_, index) => (
              <div 
                key={index}
                className="bg-gray-100 rounded-3xl w-[300px] aspect-[4/5] animate-pulse"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
});

ExecomSection.displayName = 'ExecomSection';

/**
 * Enhanced Team Component with improved year selection
 */
const Team = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Executive Committee": true
  });

  const currentTeamData = teamYears.find(team => team.year === selectedYear);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-accent">
      {/* Enhanced Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-amber-500/5 to-orange-500/5" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary/30 to-amber-500/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
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
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-primary to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <Users className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-800 mb-6">
              Our <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">Team</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Meet the passionate innovators, creative minds, and dedicated leaders driving entrepreneurship and technological advancement at CVV IEDC.
            </p>
          </motion.div>

          {/* Enhanced Year Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            {teamYears.map((team, index) => (
              <motion.button
                key={team.year}
                onClick={() => {
                  setSelectedYear(team.year);
                  setExpandedSections({ "Executive Committee": true });
                }}
                className={cn(
                  "group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 border-2 overflow-hidden",
                  selectedYear === team.year
                    ? "bg-gradient-to-r from-primary to-amber-600 text-white border-transparent shadow-2xl shadow-primary/25"
                    : "bg-white/90 backdrop-blur-lg text-gray-700 border-gray-200 hover:border-primary/40 hover:text-primary hover:shadow-xl"
                )}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                <div className="relative text-center">
                  <div className="text-2xl font-black">{team.year}</div>
                  <div className="text-sm opacity-90 font-medium">{team.label}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Team Content */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {currentTeamData && (
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="space-y-16"
              >
                {Object.entries(currentTeamData.teams).map(([teamName, teamMembers]) => {
                  const allMembers = [
                    ...teamMembers.nodalOfficers,
                    ...teamMembers.iph,
                    ...teamMembers.crl,
                    ...teamMembers.sl
                  ];
                  
                  if (allMembers.length === 0) return null;
                  
                  return (
                    <ExecomSection
                      key={teamName}
                      title={teamName}
                      members={allMembers}
                      priority={teamName === "Executive Committee" ? "high" : "medium"}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Empty State */}
          {currentTeamData && !currentTeamData.isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-gray-200 p-16 max-w-lg mx-auto shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon!</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Team information for {selectedYear} will be updated soon. Stay tuned for exciting announcements!
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default memo(Team);