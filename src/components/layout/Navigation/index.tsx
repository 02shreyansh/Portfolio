import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  AlertTriangle
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

  // Navigation items based on your pages folder
  const navigationItems: NavigationItem[] = useMemo(() => [
    { 
      href: "/", 
      label: "Home", 
      description: "Welcome & Introduction",
      icon: Home
    },
    { 
      href: "/about", 
      label: "About", 
      description: "My story & skills",
      icon: User
    },
    { 
      href: "/projects", 
      label: "Projects", 
      description: "My recent work", 
      badge: "12",
      icon: Briefcase
    },
    { 
      href: "/experience", 
      label: "Experience", 
      description: "Work history & timeline",
      icon: Clock
    },
    { 
      href: "/data-stories", 
      label: "Data Stories", 
      description: "Analytics & insights",
      badge: "New",
      icon: BarChart3
    },
    { 
      href: "/blog", 
      label: "Blog", 
      description: "Thoughts & tutorials",
      icon: BookOpen
    },
    { 
      href: "/playground", 
      label: "Playground", 
      description: "Interactive demos",
      badge: "Live",
      icon: Code
    },
    { 
      href: "/contact", 
      label: "Contact", 
      description: "Get in touch",
      icon: MessageSquare
    },
    { 
      href: "/now", 
      label: "Now", 
      description: "What I'm up to",
      icon: Calendar
    },
    { 
      href: "/achievements", 
      label: "Achievements", 
      description: "Awards & recognition",
      icon: Trophy
    },
    { 
      href: "/resume", 
      label: "Resume", 
      description: "Download CV",
      badge: "PDF",
      icon: FileText
    }
  ], []);

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = useCallback((): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0) {
      return [{ href: "/", label: "Home", icon: Home }];
    }

    const breadcrumbs: BreadcrumbItem[] = [
      { href: "/", label: "Home", icon: Home }
    ];

    // Map path segments to readable labels
    const pathMap: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
      "about": { label: "About", icon: User },
      "projects": { label: "Projects", icon: Briefcase },
      "experience": { label: "Experience", icon: Clock },
      "data-stories": { label: "Data Stories", icon: BarChart3 },
      "blog": { label: "Blog", icon: BookOpen },
      "playground": { label: "Playground", icon: Code },
      "contact": { label: "Contact", icon: MessageSquare },
      "now": { label: "Now", icon: Calendar },
      "achievements": { label: "Achievements", icon: Trophy },
      "resume": { label: "Resume", icon: FileText },
      "404": { label: "Not Found", icon: AlertTriangle }
    };

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const pathInfo = pathMap[segment];
      
      if (pathInfo) {
        breadcrumbs.push({
          href: currentPath,
          label: pathInfo.label,
          icon: pathInfo.icon,
          // Add badge for specific pages
          badge: segment === "data-stories" ? "New" : 
                segment === "playground" ? "Live" : 
                segment === "projects" ? "12" : undefined
        });
      } else {
        // Handle dynamic routes (like blog posts)
        const capitalizedSegment = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        breadcrumbs.push({
          href: currentPath,
          label: capitalizedSegment,
          icon: FileText
        });
      }
    });

    return breadcrumbs;
  }, [location.pathname]);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Back button handler
  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }, []);

  const breadcrumbItems = useMemo(() => generateBreadcrumbs(), [generateBreadcrumbs]);
  const currentPath = location.pathname;

  return (
    <div className={className}>
      {/* Desktop Navigation - FloatingNav */}
      <AnimatePresence>
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <FloatingNav 
              currentPath={currentPath}
              className={isScrolled ? "shadow-lg" : ""}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation - MobileDrawer */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <MobileDrawer 
              navigationItems={navigationItems}
              currentPath={currentPath}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb Navigation - Show when not on homepage */}
      <AnimatePresence>
        {currentPath !== "/" && breadcrumbItems.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="container mx-auto px-4 pt-4"
          >
            <BreadcrumbNav 
              items={breadcrumbItems}
              currentPath={currentPath}
              maxItems={4}
              showBackButton={true}
              showHomeButton={true}
              onBack={handleBack}
              className={`
                transition-all duration-200
                ${isScrolled ? 'bg-background/95 backdrop-blur-xl shadow-sm' : ''}
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standalone Theme Toggle for Desktop (if needed) */}
      {!isMobile && (
        <div className="fixed top-4 right-4 z-40 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Navigation;