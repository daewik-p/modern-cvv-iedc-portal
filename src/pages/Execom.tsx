
import { Linkedin } from "lucide-react";
import { type ExecomMember, execomMembers } from "@/data/execom";
import { memo, useState, useEffect, useRef } from "react";

/**
 * MemberCard Component - Optimized for performance and reduced cache
 * - Uses memo to prevent unnecessary re-renders
 * - Implements proper image loading with native attributes
 * - Uses width/height constraints to prevent layout shifts
 * - Implements proper image loading strategies
 */
const MemberCard = memo(({ member, index }: { member: ExecomMember; index: number }) => {
  // Determine if image is a URL or local path to handle properly
  const isExternalImage = member.image.startsWith('http');
  
  // Apply image optimization query params for external images (like Unsplash)
  // This reduces file size while maintaining quality
  const optimizedImageSrc = isExternalImage 
    ? `${member.image}${member.image.includes('?') ? '&' : '?'}w=300&q=75&auto=format`
    : member.image;

  return (
    <div 
      className="group w-full scale-in"
      style={{ animationDelay: `${Math.min(index * 25, 300)}ms` }}
    >
      <div className="relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="aspect-[4/5] relative overflow-hidden">
          <img
            src={optimizedImageSrc}
            alt={member.name}
            loading={index < 6 ? "eager" : "lazy"} // Only eagerly load first 6 images
            width="240"
            height="300"
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            decoding="async"
            fetchpriority={index < 3 ? "high" : "auto"} // Prioritize first 3 images
          />
          {member.linkedin && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
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
          <h3 className="text-base font-semibold mb-0.5 line-clamp-1">{member.name}</h3>
          <p className="text-primary text-sm line-clamp-1">{member.role}</p>
        </div>
      </div>
    </div>
  );
});

MemberCard.displayName = 'MemberCard';

/**
 * ExecomSection Component - Optimized with virtualization
 * - Only renders items that are likely to be in viewport
 * - Uses IntersectionObserver for efficient detection
 * - Implements progressive loading to reduce initial load time
 */
const ExecomSection = memo(({ title, members }: { title: string; members: ExecomMember[] }) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    members.map((_, i) => i < 6) // Initial render for first 6 items only (reduced from 12)
  );
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Don't run observer for small lists (already fully visible)
    if (members.length <= 6 || !sectionRef.current) return;
    
    const options = {
      root: null,
      rootMargin: '200px', // Reduced from 300px to be more conservative with loading
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Load items progressively in batches to prevent jank
        const loadNextBatch = () => {
          setVisibleItems(prev => {
            const nextBatch = [...prev];
            let updated = false;
            
            // Load next 6 items that aren't already visible
            for (let i = 0, count = 0; i < members.length && count < 6; i++) {
              if (!nextBatch[i]) {
                nextBatch[i] = true;
                updated = true;
                count++;
              }
            }
            
            // If we've loaded all items, disconnect the observer
            if (!nextBatch.includes(false)) {
              observer.disconnect();
            } else if (updated) {
              // Schedule next batch after a short delay
              setTimeout(loadNextBatch, 300);
            }
            
            return nextBatch;
          });
        };
        
        loadNextBatch();
      }
    }, options);
    
    observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, [members.length]);

  return (
    <section className="mb-12" ref={sectionRef}>
      <h2 className="text-2xl font-semibold mb-6 text-center slide-in">
        {title}
      </h2>
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl">
          {members.map((member, index) => (
            <div key={member.name} className="flex justify-center">
              <div className="w-full max-w-[240px]">
                {visibleItems[index] ? (
                  <MemberCard member={member} index={index} />
                ) : (
                  // Improved placeholder with fixed dimensions to prevent layout shifts
                  <div 
                    className="w-full aspect-[4/5] bg-gray-100 rounded-lg animate-pulse"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ExecomSection.displayName = 'ExecomSection';

/**
 * Main Execom Component
 * - Uses destructured data to avoid reference issues
 * - Implements proper animation schedule to avoid frame drops
 * - Uses content-visibility to improve rendering performance
 */
const Execom = () => {
  const { nodalOfficers, studentLeads, correspondingLeads } = execomMembers;
  
  return (
    <div className="min-h-screen py-12 mt-16 fade-in will-change-opacity">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 slide-in">
          Executive Committee
        </h1>
        
        {/* Render sections with content-visibility to improve performance */}
        <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
          <ExecomSection title="Nodal Officers" members={nodalOfficers} />
        </div>
        
        <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1000px' }}>
          <ExecomSection title="Student Leads" members={studentLeads} />
        </div>
        
        <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
          <ExecomSection title="Corresponding Leads" members={correspondingLeads} />
        </div>
      </div>
    </div>
  );
};

export default memo(Execom);
