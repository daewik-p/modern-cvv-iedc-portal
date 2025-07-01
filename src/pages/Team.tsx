import { Linkedin, ChevronDown } from "lucide-react";
import { type ExecomMember, execomMembers } from "@/data/execom";
import { memo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Team years data - easily expandable
const teamYears = [
  {
    year: "2025-2026",
    label: "Current Team",
    isActive: true,
    teams: {
      "Executive Committee": execomMembers,
      "Media Team": {
        nodalOfficers: [],
        iph: [],
        crl: [
          {
            name: "Aarcha Praveen",
            role: "Head of Branding & Marketing",
            image: "execom/aarcha.jpg",
            linkedin: "http://www.linkedin.com/in/aarchapraveen012"
          },
          {
            name: "Anjana Prakash",
            role: "Head of Research & Collaboration",
            image: "execom/anjana.jpg",
            linkedin: "https://www.linkedin.com/in/anjanaprakash017"
          }
        ],
        sl: []
      },
      "Tech Team": {
        nodalOfficers: [],
        iph: [],
        crl: [
          {
            name: "Daewik Prasheen",
            role: "Head of Technology",
            image: "execom/daewik.jpg",
            linkedin: "https://www.linkedin.com/in/daewik"
          }
        ],
        sl: []
      },
      "Innovation Team": {
        nodalOfficers: [],
        iph: [],
        crl: [
          {
            name: "Anuja S Nair",
            role: "Head of Innovation & Development",
            image: "execom/anuja.jpg",
            linkedin: "https://www.linkedin.com/in/anuja-s-nair-777315322"
          },
          {
            name: "Niranjana Uday",
            role: "Head of Startup Incubation",
            image: "execom/niranjanau.jpg",
            linkedin: "https://www.linkedin.com/in/niranjana-uday/"
          }
        ],
        sl: []
      }
    }
  },
  {
    year: "2024-2025",
    label: "Previous Team",
    isActive: false,
    teams: {
      "Executive Committee": {
        nodalOfficers: [],
        iph: [],
        crl: [],
        sl: []
      }
    }
  },
  {
    year: "2023-2024",
    label: "Founding Team",
    isActive: false,
    teams: {
      "Executive Committee": {
        nodalOfficers: [],
        iph: [],
        crl: [],
        sl: []
      }
    }
  }
];

/**
 * MemberCard Component - Displays a single team member
 */
const MemberCard = memo(({ member, index }: { member: ExecomMember; index: number }) => {
  const isExternalImage = member.image.startsWith('http');
  const imageSrc = isExternalImage 
    ? `${member.image}${member.image.includes('?') ? '&' : '?'}w=300&q=75&auto=format`
    : member.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 w-full max-w-[280px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={imageSrc}
          alt={member.name}
          loading={index < 6 ? "eager" : "lazy"}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          decoding="async"
          fetchPriority={index < 3 ? "high" : "auto"}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* LinkedIn button */}
        {member.linkedin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#0A66C2] text-white px-4 py-2 rounded-full font-medium hover:bg-[#004182] transition-colors duration-300 shadow-lg"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              Connect
            </a>
          </motion.div>
        )}
      </div>
      
      <div className="p-6 text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-primary font-medium text-sm">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
});

MemberCard.displayName = 'MemberCard';

/**
 * TeamSection Component - Displays a team section with members
 */
const TeamSection = memo(({ title, members, isExpanded, onToggle }: { 
  title: string; 
  members: any; 
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const allMembers = [
    ...members.nodalOfficers,
    ...members.iph,
    ...members.crl,
    ...members.sl
  ];

  if (allMembers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <motion.button
        onClick={onToggle}
        className="w-full flex items-center justify-between bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6">
              {/* Nodal Officers */}
              {members.nodalOfficers.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                    Nodal Officers
                  </h4>
                  <div className="flex flex-wrap justify-center gap-6">
                    {members.nodalOfficers.map((member: ExecomMember, index: number) => (
                      <MemberCard key={member.name} member={member} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* Innovation & Program Heads */}
              {members.iph.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                    Innovation & Program Heads
                  </h4>
                  <div className="flex flex-wrap justify-center gap-6">
                    {members.iph.map((member: ExecomMember, index: number) => (
                      <MemberCard key={member.name} member={member} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* Corresponding Leads */}
              {members.crl.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                    {title === "Executive Committee" ? "Corresponding Leads" : "Team Members"}
                  </h4>
                  <div className="flex flex-wrap justify-center gap-6">
                    {members.crl.map((member: ExecomMember, index: number) => (
                      <MemberCard key={member.name} member={member} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Leads */}
              {members.sl.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                    Sub-Leads
                  </h4>
                  <div className="flex flex-wrap justify-center gap-6">
                    {members.sl.map((member: ExecomMember, index: number) => (
                      <MemberCard key={member.name} member={member} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

TeamSection.displayName = 'TeamSection';

/**
 * Main Team Component
 */
const Team = () => {
  const [selectedYear, setSelectedYear] = useState("2025-2026");
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
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-amber-500/5 to-orange-500/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center bg-white/90 backdrop-blur-lg border border-primary/20 rounded-full px-6 py-3 mb-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-primary font-medium">Meet Our Team</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-6">
              Our <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">Team</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the passionate individuals driving innovation and entrepreneurship at CVV IEDC.
            </p>
          </motion.div>

          {/* Year Selection Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {teamYears.map((team, index) => (
              <motion.button
                key={team.year}
                onClick={() => {
                  setSelectedYear(team.year);
                  setExpandedSections({ "Executive Committee": true });
                }}
                className={cn(
                  "px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 border-2",
                  selectedYear === team.year
                    ? "bg-gradient-to-r from-primary to-amber-600 text-white border-transparent shadow-lg"
                    : "bg-white/90 backdrop-blur-lg text-gray-700 border-gray-200 hover:border-primary/30 hover:text-primary"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              >
                <div className="text-center">
                  <div className="font-bold">{team.year}</div>
                  <div className="text-sm opacity-80">{team.label}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Team Content */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {currentTeamData && (
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {Object.entries(currentTeamData.teams).map(([teamName, teamMembers]) => (
                  <TeamSection
                    key={teamName}
                    title={teamName}
                    members={teamMembers}
                    isExpanded={expandedSections[teamName] || false}
                    onToggle={() => toggleSection(teamName)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State for inactive years */}
          {currentTeamData && !currentTeamData.isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 p-12 max-w-md mx-auto shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon!</h3>
                <p className="text-gray-600">
                  Team information for {selectedYear} will be updated soon.
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