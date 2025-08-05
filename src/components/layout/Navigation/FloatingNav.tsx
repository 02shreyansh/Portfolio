import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { Home, User, Briefcase, MessageSquare, FileText, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../../ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  external?: boolean;
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FloatingNavProps {
  className?: string;
  currentPath?: string;
  onNavigate?: (href: string) => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ 
  className,
  currentPath = "",
  onNavigate
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();

  // Memoized navigation items to prevent re-renders
  const navItems: NavItem[] = useMemo(() => [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/projects", label: "Projects", icon: Briefcase, badge: "5" },
    { href: "/blog", label: "Blog", icon: FileText, badge: "New" },
    { href: "/contact", label: "Contact", icon: MessageSquare }
  ], []);

  // Memoized social links
  const socialLinks: SocialLink[] = useMemo(() => [
    { href: "https://github.com", label: "GitHub", icon: Github },
    { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
    { href: "mailto:hello@example.com", label: "Email", icon: Mail }
  ], []);

  // Handle scroll visibility with useEffect and useCallback
  const updateScrollState = useCallback((latest: number) => {
    const scrollThreshold = 150;
    const scrollTopThreshold = 300;
    
    // Update scroll direction visibility
    if (latest > lastScrollY && latest > scrollThreshold && !isHovered) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    // Update blur effect
    setIsScrolled(latest > 50);
    
    // Show scroll to top button
    setShowScrollTop(latest > scrollTopThreshold);
    
    setLastScrollY(latest);
  }, [lastScrollY, isHovered]);

  // Listen to scroll changes
  useMotionValueEvent(scrollY, "change", updateScrollState);

  // Keep nav visible when hovered
  useEffect(() => {
    if (isHovered) {
      setIsVisible(true);
    }
  }, [isHovered]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(prev => !prev);
      }
      
      // Number key navigation (1-5 for nav items)
      const numKey = parseInt(event.key);
      if (numKey >= 1 && numKey <= navItems.length && event.altKey) {
        event.preventDefault();
        handleNavigation(navItems[numKey - 1].href);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navItems]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Reset visibility on resize to ensure mobile compatibility
      setIsVisible(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handler with callback
  const handleNavigation = useCallback((href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate?.(href);
      // Fallback navigation
      window.location.href = href;
    }
  }, [onNavigate]);

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Active state checker
  const isActive = useCallback((href: string) => {
    if (href === '/') {
      return currentPath === href;
    }
    return currentPath.startsWith(href);
  }, [currentPath]);

  // Motion variants - properly typed
  const navVariants: Variants = {
    hidden: {
      y: 100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: { 
      scale: 1.1,
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const containerVariants: Variants = {
    hidden: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.nav
            className={`
              fixed bottom-6 left-1/2 -translate-x-1/2 z-50
              flex items-center gap-2 p-2
              bg-background/80 backdrop-blur-xl
              border border-border/50 rounded-2xl
              shadow-lg shadow-black/5
              transition-all duration-300
              ${isScrolled ? 'bg-background/95 border-border shadow-xl' : ''}
              ${isHovered ? 'scale-105' : ''}
              ${className}
            `}
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            layout
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Navigation Items */}
            <motion.div 
              className="flex items-center gap-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <motion.div
                        variants={itemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        custom={index}
                      >
                        <Button
                          variant={active ? "default" : "ghost"}
                          size="icon"
                          onClick={() => handleNavigation(item.href)}
                          className={`
                            relative h-11 w-11 rounded-xl
                            transition-all duration-200
                            focus-visible:ring-2 focus-visible:ring-primary/50
                            ${active 
                              ? 'bg-primary text-primary-foreground shadow-md' 
                              : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                            }
                          `}
                        >
                          <Icon className="h-5 w-5" />
                          
                          {/* Badge */}
                          {item.badge && (
                            <motion.div
                              className="absolute -top-1 -right-1"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ 
                                delay: 0.2 + index * 0.05,
                                type: "spring",
                                stiffness: 500,
                                damping: 30
                              }}
                            >
                              <Badge
                                variant="destructive"
                                className="h-5 min-w-5 px-1 text-xs font-medium
                                         flex items-center justify-center
                                         shadow-sm animate-pulse"
                              >
                                {item.badge}
                              </Badge>
                            </motion.div>
                          )}

                          {/* Active indicator */}
                          {active && (
                            <motion.div
                              className="absolute -bottom-1 left-1/2 -translate-x-1/2
                                         w-1 h-1 bg-primary-foreground rounded-full"
                              layoutId="activeIndicator"
                              transition={{ 
                                duration: 0.2,
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                              }}
                            />
                          )}
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="px-3 py-2 text-sm font-medium"
                      sideOffset={8}
                    >
                      <div className="flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <Badge variant="outline" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </motion.div>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Theme Toggle */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              transition={{ delay: navItems.length * 0.05 }}
            >
              <ThemeToggle />
            </motion.div>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Social Links */}
            <motion.div 
              className="flex items-center gap-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                
                return (
                  <Tooltip key={social.href}>
                    <TooltipTrigger asChild>
                      <motion.div
                        variants={itemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        custom={navItems.length + 1 + index}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleNavigation(social.href, true)}
                          className="h-9 w-9 rounded-lg
                                   text-muted-foreground hover:text-foreground
                                   hover:bg-accent/50
                                   transition-all duration-200
                                   focus-visible:ring-2 focus-visible:ring-primary/50"
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="px-3 py-2 text-sm font-medium"
                      sideOffset={8}
                    >
                      {social.label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </motion.div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
              {showScrollTop && (
                <>
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={scrollToTop}
                          className="h-9 w-9 rounded-lg
                                   text-muted-foreground hover:text-foreground
                                   hover:bg-accent/50
                                   transition-all duration-200"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" sideOffset={8}>
                        Scroll to Top
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default FloatingNav;