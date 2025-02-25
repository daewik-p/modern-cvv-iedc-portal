import { Linkedin } from "lucide-react";
import { type ExecomMember, execomMembers } from "@/data/execom";

interface ExecomMembers {
  nodalOfficers: ExecomMember[];
  studentLeads: ExecomMember[];
  correspondingLeads: ExecomMember[];
}

// Implement image lazy loading and optimization
const MemberCard = ({ member, index }: { member: ExecomMember; index: number }) => (
  <div 
    className="group w-full scale-in"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className="relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          width="240"
          height="300"
          fetchPriority={index < 4 ? "high" : "low"}
          decoding="async"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
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

// Implement virtualization for large lists
const ExecomSection = ({ title, members }: { title: string; members: ExecomMember[] }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-6 text-center slide-in">
      {title}
    </h2>
    <div className="flex justify-center px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl">
        {members.map((member, index) => (
          <div key={member.name} className="flex justify-center">
            <div className="w-full max-w-[240px]">
              <MemberCard member={member} index={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Implement code splitting and memoization
const Execom = () => {
  const { nodalOfficers, studentLeads, correspondingLeads } = execomMembers;
  
  return (
    <div className="min-h-screen py-12 mt-16 fade-in">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 slide-in">
          Executive Committee
        </h1>
        <ExecomSection title="Nodal Officers" members={nodalOfficers} />
        <ExecomSection title="Student Leads" members={studentLeads} />
        <ExecomSection title="Corresponding Leads" members={correspondingLeads} />
      </div>
    </div>
  );
};

export default Execom;