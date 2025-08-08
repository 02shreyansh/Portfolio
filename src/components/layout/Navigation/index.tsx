import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  Home, 
  User, 
  Briefcase, 
  Clock, 
  BarChart3, 
  BookOpen, 
  Code, 
  MessageSquare, 
  Calendar,
  Trophy,
  FileText,
  AlertTriangle,
  ChevronUp
} from "lucide-react";
import MobileDrawer from "./MobileDrawer";
import FloatingNav from "./FloatingNav";
import BreadcrumbNav from "./BreadcrumbNav";
import ThemeToggle from "./ThemeToggle";

interface NavigationItem {
  href: string;
  label: string;
  description?: string;
  badge?: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  category?: 'main' | 'secondary' | 'utility';
}

interface BreadcrumbItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  external?: boolean;
  disabled?: boolean;
}

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [, setLastScrollY] = useState(0);
  
  const { scrollY } = useScroll();
  const navigationRef = useRef<HTMLDivElement>(null);

  const navigationItems: NavigationItem[] = useMemo(() => [
    { 
      href: "/", 
      label: "Home", 
      description: "Welcome & Introduction",
      icon: Home,
      category: 'main'
    },
    { 
      href: "/about", 
      label: "About", 
      description: "My story & skills",
      icon: User,
      category: 'main'
    },
    { 
      href: "/projects", 
      label: "Projects", 
      description: "My recent work", 
      badge: "12",
      icon: Briefcase,
      category: 'main'
    },
    { 
      href: "/experience", 
      label: "Experience", 
      description: "Work history & timeline",
      icon: Clock,
      category: 'main'
    },
    { 
      href: "/data-stories", 
      label: "Data Stories", 
      description: "Analytics & insights",
      badge: "New",
      icon: BarChart3,
      category: 'secondary'
    },
    { 
      href: "/blog", 
      label: "Blog", 
      description: "Thoughts & tutorials",
      icon: BookOpen,
      category: 'secondary'
    },
    { 
      href: "/playground", 
      label: "Playground", 
      description: "Interactive demos",
      badge: "Live",
      icon: Code,
      category: 'secondary'
    },
    { 
      href: "/contact", 
      label: "Contact", 
      description: "Get in touch",
      icon: MessageSquare,
      category: 'main'
    },
    { 
      href: "/now", 
      label: "Now", 
      description: "What I'm up to",
      icon: Calendar,
      category: 'utility'
    },
    { 
      href: "/achievements", 
      label: "Achievements", 
      description: "Awards & recognition",
      icon: Trophy,
      category: 'utility'
    },
    { 
      href: "/resume", 
      label: "Resume", 
      description: "Download CV",
      badge: "PDF",
      icon: FileText,
      category: 'utility'
    }
  ], []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = latest - previous;
    
    setIsScrolled(latest > 20);
    setShowScrollToTop(latest > 300);
    
    if (diff > 5) {
      setIsScrollingDown(true);
    } else if (diff < -5) {
      setIsScrollingDown(false);
    }
    
    setLastScrollY(latest);
  });

  useEffect(() => {
    const checkDevice = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileWidth = window.innerWidth < 768;
      setIsMobile(isMobileWidth || isTouchDevice);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as Element;
      if (target.closest('.mobile-drawer-content')) {
        return;
      }
    };

    if (isMobile) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      return () => document.removeEventListener('touchmove', handleTouchMove);
    }
  }, [isMobile]);

  const generateBreadcrumbs = useCallback((): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0) {
      return [{ href: "/", label: "Home", icon: Home }];
    }

    const breadcrumbs: BreadcrumbItem[] = [
      { href: "/", label: "Home", icon: Home }
    ];

    const pathMap: Record<string, { 
      label: string; 
      icon: React.ComponentType<{ className?: string }>;
      badge?: string;
    }> = {
      "about": { label: "About", icon: User },
      "projects": { label: "Projects", icon: Briefcase, badge: "12" },
      "experience": { label: "Experience", icon: Clock },
      "data-stories": { label: "Data Stories", icon: BarChart3, badge: "New" },
      "blog": { label: "Blog", icon: BookOpen },
      "playground": { label: "Playground", icon: Code, badge: "Live" },
      "contact": { label: "Contact", icon: MessageSquare },
      "now": { label: "Now", icon: Calendar },
      "achievements": { label: "Achievements", icon: Trophy },
      "resume": { label: "Resume", icon: FileText, badge: "PDF" },
      "404": { label: "Not Found", icon: AlertTriangle }
    };

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const pathInfo = pathMap[segment];
      
      if (pathInfo) {
        breadcrumbs.push({
          href: currentPath,
          label: pathInfo.label,
          icon: pathInfo.icon,
          badge: pathInfo.badge
        });
      } else {
        const capitalizedSegment = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        breadcrumbs.push({
          href: currentPath,
          label: capitalizedSegment,
          icon: FileText,
          disabled: index === pathSegments.length - 1 && !!segment.match(/^[a-f0-9-]{36}$|^\d+$/)
        });
      }
    });

    return breadcrumbs;
  }, [location.pathname]);

  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        window.location.href = '/';
      }
      if (e.altKey && e.key === 'b') {
        e.preventDefault();
        handleBack();
      }
      if (e.key === 'Escape' && isMobile) {
        const closeEvent = new CustomEvent('closeMobileDrawer');
        window.dispatchEvent(closeEvent);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack, isMobile]);

  const breadcrumbItems = useMemo(() => generateBreadcrumbs(), [generateBreadcrumbs]);
  const currentPath = location.pathname;

  return (
    <div className={`relative ${className}`} ref={navigationRef}>
      <AnimatePresence>
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }}
            exit={{ 
              opacity: 0, 
              y: -20,
              transition: { duration: 0.2 }
            }}
            className="relative z-50"
          >
            <FloatingNav 
              currentPath={currentPath}
              className={`
                transition-all duration-300 ease-out
                ${isScrolled ? 'shadow-lg backdrop-blur-xl' : ''}
                ${isScrollingDown ? 'transform -translate-y-2 opacity-90' : ''}
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden relative z-50"
          >
            <MobileDrawer 
              navigationItems={navigationItems}
              currentPath={currentPath}
              className={`
                ${isScrollingDown ? 'transform -translate-y-full' : 'transform translate-y-0'}
                transition-transform duration-300 ease-out
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {currentPath !== "/" && breadcrumbItems.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.3, delay: 0.1 }
            }}
            exit={{ 
              opacity: 0, 
              y: -10,
              transition: { duration: 0.2 }
            }}
            className={`
              container mx-auto px-4 pt-4 relative z-40
              ${isMobile ? 'pt-20' : 'pt-4'}
            `}
          >
            <BreadcrumbNav 
              items={breadcrumbItems}
              currentPath={currentPath}
              maxItems={isMobile ? 2 : 4}
              showBackButton={true}
              showHomeButton={!isMobile}
              onBack={handleBack}
              className={`
                transition-all duration-300 ease-out rounded-lg
                ${isScrolled ? 'bg-background/95 backdrop-blur-xl shadow-sm border border-border/50' : ''}
                ${isMobile ? 'mx-2 px-3 py-2' : 'px-4 py-3'}
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="fixed top-4 right-4 z-50"
        >
          <ThemeToggle />
        </motion.div>
      )}

      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className={`
              fixed bottom-6 right-6 z-40
              w-12 h-12 rounded-full
              bg-primary text-primary-foreground
              shadow-lg hover:shadow-xl
              flex items-center justify-center
              transition-all duration-200
              hover:scale-110 active:scale-95
              ${isMobile ? 'bottom-20 right-4 w-14 h-14' : ''}
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {isMobile && (
        <div className="h-safe-area-inset-bottom bg-background/95 backdrop-blur-xl border-t border-border/50" />
      )}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
    </div>
  );
};

export default Navigation;