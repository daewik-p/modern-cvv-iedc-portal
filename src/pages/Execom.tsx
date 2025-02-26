
import { Linkedin } from "lucide-react";
import { type ExecomMember, execomMembers } from "@/data/execom";
import { memo, useState, useEffect, useRef } from "react";

/**
 * MemberCard Component - Displays a single execom member
 */
const MemberCard = memo(({ member, index }: { member: ExecomMember; index: number }) => {
  // Determine if image is a URL or local path
  const isExternalImage = member.image.startsWith('http');
  
  // Optimize external images
  const imageSrc = isExternalImage 
    ? `${member.image}${member.image.includes('?') ? '&' : '?'}w=300&q=75&auto=format`
    : member.image;

  return (
    <div 
      className="animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
    >
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden w-full max-w-[240px]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={imageSrc}
            alt={member.name}
            loading={index < 6 ? "eager" : "lazy"}
            width="240"
            height="300"
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            decoding="async"
            fetchPriority={index < 3 ? "high" : "auto"}
          />
          {member.linkedin && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Connect with ${member.name} on LinkedIn`}
                className="bg-[#0A66C2] text-white px-4 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-[#004182] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span className="text-sm">Connect</span>
              </a>
            </div>
          )}
        </div>
        <div className="p-3 text-center">
          <h3 className="text-base font-semibold mb-0.5 truncate">{member.name}</h3>
          <p className="text-primary text-sm truncate">{member.role}</p>
        </div>
      </div>
    </div>
  );
});

MemberCard.displayName = 'MemberCard';

/**
 * MemberGrid Component - Handles the layout of member cards
 */
const MemberGrid = memo(({ members }: { members: ExecomMember[] }) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    members.map((_, i) => i < 4) // Only show first 4 initially
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
              
              // Find next invisible item
              const nextIndex = nextVisibility.findIndex(visible => !visible);
              if (nextIndex === -1) {
                clearInterval(interval);
                return nextVisibility;
              }
              
              nextVisibility[nextIndex] = true;
              return nextVisibility;
            });
            
            delay += 100;
            if (delay > 1000) clearInterval(interval); // Safety timeout
          }, 100);
          
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [members.length]);

  // Calculate how many columns to use based on member count
  const getColumnCount = () => {
    const count = members.length;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count <= 4) return count;
    return undefined; // Let CSS handle responsive behavior
  };

  return (
    <div ref={gridRef} className="w-full flex justify-center px-4">
      <div 
        className="flex flex-wrap justify-center gap-6"
        style={{ 
          maxWidth: getColumnCount() 
            ? `${getColumnCount() * 240 + (getColumnCount() - 1) * 24}px` 
            : '1200px'
        }}
      >
        {members.map((member, index) => (
          <div key={member.name} className="flex items-center justify-center">
            {visibleItems[index] ? (
              <MemberCard member={member} index={index} />
            ) : (
              <div 
                className="bg-gray-100 rounded-lg w-[240px] aspect-[4/5] animate-pulse"
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
 * ExecomSection Component - A section with title and member grid
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

  return (
    <section 
      ref={sectionRef} 
      className="mb-16 opacity-0 animate-fade-in" 
      style={{ 
        animationFillMode: 'forwards',
        animationPlayState: isVisible ? 'running' : 'paused' 
      }}
    >
      <h2 className="text-2xl font-semibold mb-8 text-center animate-fade-in">
        {title}
      </h2>
      
      {isVisible ? (
        <MemberGrid members={members} />
      ) : (
        <div className="flex justify-center px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {Array.from({ length: Math.min(members.length, 4) }).map((_, index) => (
              <div 
                key={index}
                className="bg-gray-100 rounded-lg w-[240px] aspect-[4/5] animate-pulse"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
});

ExecomSection.displayName = 'ExecomSection';

/**
 * Main Execom Component - Renders the full execom page with all sections
 */
const Execom = () => {
  const { 
    nodalOfficers, cio, epl, qo, finance, hiad, ht, si, hd, rc, bm, we, hc, ipr, itd 
  } = execomMembers;
  
  // Section configuration for easy management
  const sections = [
    { id: 'nodal-officers', title: 'Nodal Officers', members: nodalOfficers, priority: 'high' as const },
    { id: 'cio', title: 'Chief Innovation Officer', members: cio },
    { id: 'epl', title: 'Executive Program Lead', members: epl },
    { id: 'qo', title: 'Quality & Operations', members: qo },
    { id: 'finance', title: 'Finance And Strategy', members: finance },
    { id: 'hiad', title: 'Innovation & Development', members: hiad },
    { id: 'ht', title: 'Technology', members: ht },
    { id: 'si', title: 'Startup and Incubation', members: si },
    { id: 'hd', title: 'Documentation and Institutional Records', members: hd },
    { id: 'rc', title: 'Research & Collaboration', members: rc },
    { id: 'bm', title: 'Branding & Marketing', members: bm },
    { id: 'we', title: 'Women Entrepreneurship', members: we },
    { id: 'hc', title: 'Community and Collaboration', members: hc },
    { id: 'ipr', title: 'Intellectual Property Right', members: ipr },
    { id: 'itd', title: 'Internship & Talent Development', members: itd },
  ];

  return (
    <div className="min-h-screen py-16 mt-16">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-16 animate-fade-in">
          Executive Committee 2025
        </h1>
        
        {sections.map((section) => (
          section.members.length > 0 && (
            <div 
              key={section.id}
              style={{ 
                contentVisibility: 'auto', 
                containIntrinsicSize: '0 400px' 
              }}
            >
              <ExecomSection 
                title={section.title} 
                members={section.members} 
                priority={section.priority} 
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default memo(Execom);
