
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Linkedin } from "lucide-react";

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
      role: "Student Lead I",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      linkedin: "https://linkedin.com/in/example",
    },
    {
      name: "Rosemary",
      role: "Student Lead II",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      linkedin: "https://linkedin.com/in/example",
    },
  ],
  correspondingLeads: [
    {
      name: "Daewik Prasheen",
      role: "Technology Lead",
      image: "/execom/daewik.jpg",
      linkedin: "https://linkedin.com/in/example",
    },
  ],
};

// Member card component for better code organization and reusability
const MemberCard = ({ member }: { member: ExecomMember }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="group w-full transform-gpu"
  >
    <div className="relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="object-cover w-full h-full transform-gpu group-hover:scale-105 transition-transform duration-300"
        />
        {/* Overlay with LinkedIn button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A66C2] text-white px-4 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-[#004182] transition-colors transform-gpu translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-300"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="text-sm">Connect</span>
            </a>
          )}
        </div>
      </div>
      <div className="p-3 text-center">
        <h3 className="text-base font-semibold mb-0.5 line-clamp-1">{member.name}</h3>
        <p className="text-primary text-sm line-clamp-1">{member.role}</p>
      </div>
    </div>
  </motion.div>
);

const Execom = () => {
  // Memoized section renderer for better performance
  const renderSection = useMemo(() => {
    return (title: string, members: ExecomMember[]) => (
      <section className="mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold mb-6 text-center"
        >
          {title}
        </motion.h2>
        <div className="flex justify-center px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-center"
              >
                <div className="w-full max-w-[240px]">
                  <MemberCard member={member} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 mt-16"
    >
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-10"
        >
          Executive Committee
        </motion.h1>
        {renderSection("Nodal Officers", execomMembers.nodalOfficers)}
        {renderSection("Student Leads", execomMembers.studentLeads)}
        {renderSection("Corresponding Leads", execomMembers.correspondingLeads)}
      </div>
    </motion.div>
  );
};

export default Execom;
