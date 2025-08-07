import { motion } from "framer-motion";
import type { Skill } from "@/utils/About/About.types";

interface BackgroundElementsProps {
  backgroundY: any;
  skills: Skill[];
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ backgroundY, skills }) => {
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-3, 3, -3],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          variants={glowVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          variants={glowVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 rounded-full blur-3xl"
          variants={glowVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
      </motion.div>
      {/* Floating Elements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + (i * 8) % 80}%`,
            top: `${15 + (i * 12) % 70}%`,
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: i * 0.2 }}
        >
          <div className={`w-3 h-3 bg-gradient-to-r ${skills[i % skills.length]?.color || 'from-blue-500 to-purple-500'} rounded-full opacity-20 blur-sm`} />
        </motion.div>
      ))}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 dark:bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)]" />
    </div>
  );
};
export default BackgroundElements;