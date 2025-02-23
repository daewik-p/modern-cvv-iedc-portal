
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Linkedin } from "lucide-react";

// Define member types with LinkedIn profile
interface ExecomMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string; // Optional LinkedIn profile URL
}

interface ExecomMembers {
  nodalOfficers: ExecomMember[];
  studentLeads: ExecomMember[];
  correspondingLeads: ExecomMember[];
}

// Sample member data with LinkedIn profiles
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

const Execom = () => {
  // Memoized section renderer for better performance
  const renderSection = useMemo(() => {
    return (title: string, members: ExecomMember[]) => (
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold mb-8 text-center"
        >
          {title}
        </motion.h2>
        {/* Center-aligned container using flex and max-width */}
        <div className="flex justify-center px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  damping: 15 
                }}
                className="group mx-auto w-full max-w-sm"
              >
                <div className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay with LinkedIn button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center pb-16">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0A66C2] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#004182] transition-colors duration-300 mb-4 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span>Connect</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16 mt-16"
    >
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12"
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
