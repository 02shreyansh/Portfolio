import { motion, useScroll, useTransform,  useSpring } from "framer-motion";
import { useEffect } from "react";

interface AnimatedBackgroundProps {
  mouseX: any;
  mouseY: any;
  setMousePosition: (pos: { x: number; y: number }) => void;
}
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  mouseX,
  mouseY,
  setMousePosition
}) => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200]);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX - 16);
      mouseY.set(clientY - 16);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, setMousePosition]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Main gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 100%)",
          y: parallaxY
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(251, 146, 60, 0.3) 50%, transparent 100%)",
          y: parallaxY
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Additional floating elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30"
          style={{
            left: `${20 + (i * 10) % 80}%`,
            top: `${20 + (i * 15) % 60}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
      
      {/* Interactive cursor follower */}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 pointer-events-none z-50 blur-sm"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
        }}
      />
    </div>
  );
};
export default AnimatedBackground;