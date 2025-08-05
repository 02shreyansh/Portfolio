import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const PageLoader = () => {
  const [loadingText, setLoadingText] = useState("Initializing");
  const [progress, setProgress] = useState(0);

  const loadingTexts = useMemo(() => [
    "Initializing",
    "Loading assets", 
    "Preparing experience",
    "Almost ready",
    "Welcome"
  ], []);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingTexts.length;
      setLoadingText(loadingTexts[currentIndex]);
    }, 1000); 

    return () => clearInterval(interval);
  }, [loadingTexts]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        const increment = Math.random() * 8 + 2; 
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  const particles = useMemo(() => 
    [...Array(12)].map((_, i) => ({ 
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
    })), []
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #1e1b4b 100%)"
        }}
        animate={{
          background: [
            "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #1e1b4b 100%)",
            "linear-gradient(225deg, #1e1b4b 0%, #7c3aed 50%, #0f172a 100%)",
            "linear-gradient(315deg, #581c87 0%, #3730a3 50%, #0f172a 100%)",
            "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #1e1b4b 100%)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{ x: particle.x, y: particle.y, opacity: 0 }}
            animate={{
              x: [particle.x, particle.x + 100, particle.x - 50, particle.x],
              y: [particle.y, particle.y - 100, particle.y + 80, particle.y],
              opacity: [0, 0.8, 0.4, 0]
            }}
            transition={{
              duration: 15 + particle.id * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      <div className="relative flex h-full items-center justify-center p-4">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        >
          <motion.div className="mb-10">
            <motion.div
              className="relative mx-auto w-20 h-20 mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400/40"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute inset-2 rounded-full border border-blue-400/60"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                className="absolute inset-6 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600"
                animate={{ 
                  scale: [1, 1.1, 1],
                  filter: [
                    "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))",
                    "drop-shadow(0 0 20px rgba(59, 130, 246, 0.7))",
                    "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Portfolio
            </motion.h1>
          </motion.div>
          <div className="relative mx-auto mb-8 h-24 w-24">
            <motion.svg
              className="absolute inset-0"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="3"
                strokeDasharray="140 60"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </motion.svg>
            
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
          <div className="mb-8 w-72 mx-auto">
            <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ width: "30%" }}
              />
            </div>
            
            <motion.div
              className="mt-2 text-right text-xs text-purple-300/80 font-mono tabular-nums"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.round(Math.min(progress, 100))}%
            </motion.div>
          </div>
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.h2
                key={loadingText}
                className="text-xl md:text-2xl font-semibold text-white tracking-wide"
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {loadingText}
              </motion.h2>
            </AnimatePresence>
            
            <motion.div
              className="flex justify-center space-x-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            <motion.p
              className="text-sm text-purple-200/70 max-w-xs mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Crafting an exceptional experience designed to inspire and engage.
            </motion.p>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="text-xs text-purple-300/50 font-light tracking-widest"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          CRAFTED WITH PRECISION
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PageLoader;