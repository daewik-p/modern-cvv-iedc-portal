
import { motion } from "framer-motion";

const execomMembers = [
  {
    name: "Dr. John Doe",
    role: "Nodal Officer",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    name: "Jane Smith",
    role: "Student CEO",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  // Add more members as needed
];

const Execom = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Executive Committee
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {execomMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Execom;
