
import { motion } from "framer-motion";

const execomMembers = {
  nodalOfficers: [
    {
      name: "Dr. John Doe",
      role: "Nodal Officer",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
  ],
  studentLeads: [
    {
      name: "Jane Smith",
      role: "Student CEO",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      name: "Mike Johnson",
      role: "Student CTO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    },
  ],
  correspondingLeads: [
    {
      name: "Sarah Wilson",
      role: "Marketing Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
  ],
};

const Execom = () => {
  const renderSection = (title: string, members: typeof execomMembers.nodalOfficers) => (
    <div className="mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-8 text-center"
      >
        {title}
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-primary text-sm">{member.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16 mt-16"
    >
      <div className="container mx-auto px-4">
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

