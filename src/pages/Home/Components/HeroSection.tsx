import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useInView, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown, Mouse, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.8]);
  const isHeroInView = useInView(heroRef, { once: true });

  const words = useMemo(() => [
    "Developer",
    "Designer", 
    "Creator",
    "Innovator",
    "Problem Solver",
    "Digital Artist"
  ], []);

  useEffect(() => {
    if (!isTyping) return;
    const currentWord = words[currentWordIndex];
    const timeoutId = setTimeout(() => {
      setTypedText(prev => {
        if (prev.length < currentWord.length) {
          return currentWord.slice(0, prev.length + 1);
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setTypedText("");
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
            setIsTyping(true);
          }, 1500);
          return prev;
        }
      });
    }, 80);
    return () => clearTimeout(timeoutId);
  }, [typedText, currentWordIndex, isTyping, words]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  const floatVariants: Variants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center px-6"
      style={{ opacity: heroOpacity, scale: heroScale }}
    >
      <motion.div
        className="text-center max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
        >
          <Sparkles className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Crafting Digital Excellence Since 2021
          </span>
        </motion.div>
        
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
            Shreyansh
          </span>
        </motion.h1>
        
        <motion.div
          className="text-3xl md:text-5xl lg:text-6xl font-light mb-10 h-20 flex items-center justify-center"
          variants={itemVariants}
        >
          <span className="text-muted-foreground mr-4">Creative</span>
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium min-w-[280px] text-left">
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-blue-500"
            >
              |
            </motion.span>
          </span>
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
          variants={itemVariants}
        >
          Transforming ambitious ideas into exceptional digital experiences through innovative web development,
          stunning design, and cutting-edge technology solutions that drive real business results.
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="px-10 py-5 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 rounded-full"
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              Explore My Work
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-5 text-lg font-semibold border-2 border-primary/30 hover:bg-primary/10 rounded-full"
              onClick={() => window.location.href = 'mailto:hello@shreyansh.dev'}
            >
              Let's Talk
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Stats Preview */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-16"
        >
          {[
            { number: "50+", label: "Projects Delivered" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "3+", label: "Years Experience" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          variants={floatVariants}
          animate="animate"
        >
          <Mouse className="w-6 h-6 text-muted-foreground" />
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">Scroll to Explore</span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
export default HeroSection;
