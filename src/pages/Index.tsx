
import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Lightbulb } from "lucide-react";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Innovation Starts Here
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            CVV IEDC is a hub for innovation, entrepreneurship, and technological advancement.
            We nurture ideas that shape the future.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-primary text-white px-8 py-3 rounded-full font-medium inline-flex items-center group hover:bg-secondary transition-colors"
          >
            Join Us
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Community",
                description:
                  "Join a vibrant community of innovators, creators, and entrepreneurs.",
              },
              {
                icon: Target,
                title: "Mission",
                description:
                  "Fostering innovation and entrepreneurship through practical learning.",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description:
                  "Transform ideas into reality with our state-of-the-art facilities.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="p-6 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all group"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;
