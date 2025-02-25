
import { Linkedin } from "lucide-react";
import { memo, useState, useEffect, useCallback } from "react";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { isInViewport } from "@/utils/imageOptimization";

// Define member types with LinkedIn profile
interface ExecomMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

interface ExecomMembers {
  nodalOfficers: ExecomMember[];
  studentLeads: ExecomMember[];
  correspondingLeads: ExecomMember[];
}

// Sample member data
const execomMembers: ExecomMembers = {
  nodalOfficers: [
    {
      name: "Mrs. Anupama Jims",
      role: "Nodal Officer",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      linkedin: "https://linkedin.com/in/example",
    },
  ],
  studentLeads: [
    {
      name: "Krishna K",
      role: "Chief Innovation Officer",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      linkedin: "https://www.linkedin.com/in/krishnak535",
    },
    {
      name: "Rosemary Tomy",
      role: "Executive Program Lead",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      linkedin: "https://linkedin.com/in/rosemarytomy1212",
    },
    {
      name: "Daewik Prasheen",
      role: "Head of Technology",
      image: "/execom/daewik.jpg",
      linkedin: "https://linkedin.com/in/daewik",
    },  
    {
      name: "Gopika V K",
      role: "Head of Quality & Operations",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      linkedin: "https://linkedin.com/in/rosemarytomy1212",
    },
    {
      name: "Mathews Varghese",
      role: "Head of Finance",
      image: "file",
      linkedin: "https://www.linkedin.com/in/mathews-varghese"
    },
    {
      name: "Anuja S Nair",
      role: "Head of Innovation & Development",
      image: "file",
      linkedin: "https://www.linkedin.com/in/anuja-s-nair-777315322"
    },
    {
      name: "Niranjana Uday",
      role: "Head of Startup Incubation",
      image: "file",
      linkedin: "https://www.linkedin.com/in/niranjana-uday/"
    },
    {
      name: "Bharathi Devi",
      role: "Head of Documentation",
      image: "file",
      linkedin: "https://www.linkedin.com/in/bharathi47"
    },
    {
      name: "Anjana Prakash",
      role: "Head of Research & Collaboration",
      image: "file",
      linkedin: "https://www.linkedin.com/in/anjanaprakash017"
    },
    {
      name: "Aarcha Praveen",
      role: "Head of Branding & Marketing",
      image: "file",
      linkedin: "http://www.linkedin.com/in/aarchapraveen012"
    },
    {
      name: "Anagha Suresh",
      role: "Head of Women Entrepreneurship",
      image: "file",
      linkedin: "http://www.linkedin.com/in/anaghasuresh04"
    },
    {
      name: "Nayana Anna Biju",
      role: "Head of Community",
      image: "file",
      linkedin: "https://www.linkedin.com/in/nayana-anna-biju-454903255"
    },
    {
      name: "Gowri Gopika",
      role: "Head of IPR",
      image: "file",
      linkedin: "https://www.linkedin.com/in/gowri-gopika-"
    },
    {
      name: "Niranjana Gireesh",
      role: "Head of Internship & Talent Development",
      image: "file",
      linkedin: "https://www.linkedin.com/in/niranjanagireesh0410"
    },  
  ],
  correspondingLeads: [
    {
      name: "Nakshathra S Nair",
      role: "Quality & Operations",
      image: "file",
      linkedin: "https://www.linkedin.com/in/nakshathranaksh"
    },
    {
      name: "Sona Monichen",
      role: "Women Entrepreneurship",
      image: "file",
      linkedin: "https://www.linkedin.com/in/sona-monichen-23a830313/"
    },
    {
      name: "Akshara U",
      role: "Internship & Talent Development",
      image: "file",
      linkedin: ""
    },
    {
      name: "Potla Akhil",
      role: "Branding & Marketing",
      image: "file",
      linkedin: "http://www.linkedin.com/in/akhil0719"
    },
    {
      name: "M Rudra Varma",
      role: "Branding & Marketing",
      image: "file",
      linkedin: "https://www.linkedin.com/in/mrudravarmaa"
    },
  ],
};

/**
 * MemberCard component for displaying team member information
 * - Memoized to prevent unnecessary re-renders
 * - Uses OptimizedImage for better performance
 */
const MemberCard = memo(({ member, index }: { member: ExecomMember; index: number }) => (
  <div 
    className="group w-full scale-in"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className="relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-[4/5] relative overflow-hidden">
        <OptimizedImage
          src={member.image}
          alt={member.name}
          className="w-full h-full"
          priority={index < 3} // Only prioritize loading for the first few images
        />
        {member.linkedin && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
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
));

MemberCard.displayName = 'MemberCard';

/**
 * ExecomSection component for displaying a group of team members
 * - Uses virtualization for performance with many members
 * - Only renders members that are visible or close to viewport
 */
const ExecomSection = memo(({ title, members }: { title: string; members: ExecomMember[] }) => {
  // State to track which members are in view
  const [visibleMembers, setVisibleMembers] = useState<boolean[]>(
    members.map((_, index) => index < 12) // Initially show first 12 members
  );
  
  // Reference for the section element
  const [sectionRef, setSectionRef] = useState<HTMLDivElement | null>(null);
  
  // Check which members are in viewport
  const checkVisibility = useCallback(() => {
    if (!sectionRef) return;
    
    const memberElements = sectionRef.querySelectorAll('.member-card-container');
    const newVisibleMembers = [...visibleMembers];
    
    memberElements.forEach((el, index) => {
      if (isInViewport(el, 300)) { // 300px offset
        newVisibleMembers[index] = true;
      }
    });
    
    setVisibleMembers(newVisibleMembers);
  }, [sectionRef, visibleMembers]);
  
  // Set up visibility checking
  useEffect(() => {
    checkVisibility();
    
    // Add event listeners
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [checkVisibility]);

  return (
    <section className="mb-12" ref={setSectionRef}>
      <h2 className="text-2xl font-semibold mb-6 text-center slide-in">
        {title}
      </h2>
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl">
          {members.map((member, index) => (
            <div key={member.name} className="flex justify-center member-card-container">
              <div className="w-full max-w-[240px]">
                {/* Only render component if it's visible or close to viewport */}
                {visibleMembers[index] ? (
                  <MemberCard member={member} index={index} />
                ) : (
                  <div 
                    className="aspect-[4/5] bg-gray-100 rounded-lg"
                    style={{ width: '100%' }}
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
 * Main Execom component
 * - Uses React.memo and code splitting for performance
 * - Implements progressive loading of team sections
 */
const Execom = () => {
  return (
    <div className="min-h-screen py-12 mt-16 fade-in">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 slide-in">
          Executive Committee
        </h1>
        <ExecomSection title="Nodal Officers" members={execomMembers.nodalOfficers} />
        <ExecomSection title="Student Leads" members={execomMembers.studentLeads} />
        <ExecomSection title="Corresponding Leads" members={execomMembers.correspondingLeads} />
      </div>
    </div>
  );
};

export default memo(Execom);
