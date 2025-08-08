import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Monitor, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const EnhancedThemeToggle = () => {
  const { theme, setTheme, actualTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const themes = [
    { key: "light", icon: Sun, label: "Light", color: "#f59e0b", bgGradient: "from-amber-400 to-orange-500" },
    { key: "dark", icon: Moon, label: "Dark", color: "#6366f1", bgGradient: "from-indigo-500 to-purple-600" },
    { key: "system", icon: Monitor, label: "System", color: "#10b981", bgGradient: "from-emerald-500 to-teal-600" }
  ] as const;

  const currentThemeIndex = themes.findIndex(t => t.key === theme);
  const nextTheme = themes[(currentThemeIndex + 1) % themes.length];
  const currentThemeData = themes[currentThemeIndex];

  const handleToggle = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    setTheme(nextTheme.key);
  };

  const getCurrentIcon = () => {
    if (theme === "system") {
      return actualTheme === "dark" ? Moon : Sun;
    }
    return themes.find(t => t.key === theme)?.icon || Sun;
  };

  const getCurrentColor = () => {
    if (theme === "system") {
      return actualTheme === "dark" ? themes[1].color : themes[0].color;
    }
    return currentThemeData?.color || themes[0].color;
  };

  const getCurrentGradient = () => {
    if (theme === "system") {
      return actualTheme === "dark" ? themes[1].bgGradient : themes[0].bgGradient;
    }
    return currentThemeData?.bgGradient || themes[0].bgGradient;
  };

  const CurrentIcon = getCurrentIcon();

  return (
    <div className="relative">
      <motion.div
        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${getCurrentGradient()} opacity-0 blur-lg`}
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.button
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-12 h-12 
                   rounded-xl border border-white/20 
                   bg-white/10 backdrop-blur-md
                   hover:bg-white/20 hover:border-white/30
                   transition-all duration-300 ease-out
                   focus:outline-none focus:ring-2 focus:ring-white/50
                   group shadow-lg hover:shadow-xl
                   dark:bg-black/10 dark:border-white/10
                   dark:hover:bg-black/20 dark:hover:border-white/20"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        animate={{
          boxShadow: isPressed 
            ? `0 0 20px ${getCurrentColor()}40`
            : isHovered 
            ? `0 8px 32px ${getCurrentColor()}20`
            : "0 4px 16px rgba(0,0,0,0.1)"
        }}
        title={`Switch to ${nextTheme.label} theme`}
        style={{
          background: isHovered 
            ? `linear-gradient(135deg, ${getCurrentColor()}20, ${getCurrentColor()}10)`
            : undefined
        }}
      >
        <motion.div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${getCurrentGradient()} opacity-0`}
          animate={{
            opacity: isPressed ? 0.2 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="relative w-6 h-6 z-10"
          initial={false}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme + actualTheme}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.4, 0, 0.2, 1],
                rotate: { duration: 0.6 }
              }}
            >
              <CurrentIcon 
                className="w-5 h-5 text-gray-700 dark:text-gray-200
                           group-hover:text-gray-900 dark:group-hover:text-white
                           transition-colors duration-300"
                style={{ color: isHovered ? getCurrentColor() : undefined }}
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute -top-1 -right-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="w-3 h-3 text-yellow-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {theme === "system" && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 
                       bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full
                       shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.div
              className="w-full h-full rounded-full bg-white/30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
        <AnimatePresence>
          {isPressed && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-white/50"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </motion.button>
      <motion.div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2
                   px-3 py-2 text-sm font-medium
                   bg-black/80 text-white
                   dark:bg-white/90 dark:text-black
                   border border-white/20 rounded-lg
                   backdrop-blur-sm shadow-xl
                   pointer-events-none z-20"
        initial={{ opacity: 0, y: -10, scale: 0.9 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : -10,
          scale: isHovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: getCurrentColor() }}
          />
          {theme === "system" ? `${theme} (${actualTheme})` : theme}
        </div>
        
        {/* Tooltip arrow */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 
                        w-2 h-2 bg-black/80 dark:bg-white/90
                        border-l border-t border-white/20 
                        rotate-45 backdrop-blur-sm" />
      </motion.div>

      <AnimatePresence>
        {isPressed && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: getCurrentColor(),
                  left: "50%",
                  top: "50%"
                }}
                initial={{ 
                  opacity: 1, 
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{ 
                  opacity: 0, 
                  scale: 1,
                  x: (Math.cos((i * 60) * Math.PI / 180) * 30),
                  y: (Math.sin((i * 60) * Math.PI / 180) * 30)
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedThemeToggle;