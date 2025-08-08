import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Skill } from "@/utils/About/About.types";

interface BackgroundElementsProps {
  backgroundY: any;
  skills: Skill[];
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ backgroundY, skills }) => {
  const floatingVariants = useMemo(() => ({
    animate: {
      y: [-10, 10, -10],
      rotate: [-3, 3, -3],
      transition: {
        duration: 6,
        repeat: Infinity, 
      }
    }
  }), []);

  const glowVariants = useMemo(() => ({
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
      }
    }
  }), []);

  const floatingElements = useMemo(() => 
    [...Array(8)].map((_, i) => ({ 
      id: i,
      left: `${10 + (i * 10) % 80}%`,
      top: `${15 + (i * 15) % 70}%`,
      delay: i * 0.3,
      colorClass: skills[i % skills.length]?.color || 'from-blue-500 to-purple-500'
    })), [skills]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl will-change-transform"
          variants={glowVariants}
          animate="animate"
          style={{ transform: "translate3d(0,0,0)" }} 
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-3xl will-change-transform"
          variants={glowVariants}
          animate="animate"
          initial={false} 
          style={{ transform: "translate3d(0,0,0)" }}
          transition={{ delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 rounded-full blur-3xl will-change-transform"
          variants={glowVariants}
          animate="animate"
          initial={false}
          style={{ 
            transform: "translate3d(-50%, -50%, 0)",
            left: "50%",
            top: "50%"
          }}
          transition={{ delay: 1 }}
        />
      </motion.div>

      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute will-change-transform"
          style={{
            left: element.left,
            top: element.top,
            transform: "translate3d(0,0,0)" 
          }}
          variants={floatingVariants}
          animate="animate"
          initial={false} 
          transition={{ delay: element.delay }}
        >
          <div 
            className={`w-3 h-3 bg-gradient-to-r ${element.colorClass} rounded-full opacity-20 blur-sm`}
            style={{ backfaceVisibility: "hidden" }} 
          />
        </motion.div>
      ))}

      <div 
        className="absolute inset-0 opacity-20 dark:opacity-10 will-change-auto"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          backfaceVisibility: "hidden"
        }}
      />
    </div>
  );
};

export default BackgroundElements;