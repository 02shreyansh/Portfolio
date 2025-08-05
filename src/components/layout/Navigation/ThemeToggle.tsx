import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme, actualTheme } = useTheme();

  const themes = [
    { key: "light", icon: Sun, label: "Light" },
    { key: "dark", icon: Moon, label: "Dark" },
    { key: "system", icon: Monitor, label: "System" }
  ] as const;

  const currentThemeIndex = themes.findIndex(t => t.key === theme);
  const nextTheme = themes[(currentThemeIndex + 1) % themes.length];

  const handleToggle = () => {
    setTheme(nextTheme.key);
  };

  const getCurrentIcon = () => {
    if (theme === "system") {
      return actualTheme === "dark" ? Moon : Sun;
    }
    return themes.find(t => t.key === theme)?.icon || Sun;
  };

  const CurrentIcon = getCurrentIcon();

  return (
    <motion.button
      onClick={handleToggle}
      className="relative flex items-center justify-center w-10 h-10 
                 rounded-lg border border-border/50 
                 bg-background/80 backdrop-blur-sm
                 hover:bg-accent hover:border-accent-foreground/20
                 transition-all duration-200 ease-in-out
                 focus:outline-none focus:ring-2 focus:ring-primary/50
                 group"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      title={`Switch to ${nextTheme.label} theme`}
    >
      <motion.div
        className="relative w-5 h-5"
        initial={false}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme + actualTheme}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <CurrentIcon 
              className="w-4 h-4 text-foreground/80 
                         group-hover:text-foreground
                         transition-colors duration-200" 
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {theme === "system" && (
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 
                     bg-primary rounded-full
                     opacity-60"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2
                   px-2 py-1 text-xs font-medium
                   bg-popover text-popover-foreground
                   border border-border rounded-md
                   opacity-0 pointer-events-none
                   group-hover:opacity-100
                   transition-opacity duration-200"
        initial={{ opacity: 0, y: -5 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        {theme === "system" ? `${theme} (${actualTheme})` : theme}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 
                        w-2 h-2 bg-popover border-l border-t border-border 
                        rotate-45" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;