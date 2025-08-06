import { useState, useMemo, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
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
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Optimized navigation items - memoized to prevent re-renders
  const navItems: NavItem[] = useMemo(() => [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/projects", label: "Projects", icon: Briefcase, badge: "12" },
    { href: "/experience", label: "Experience", icon: Clock },
    { href: "/data-stories", label: "Data Stories", icon: BarChart3 },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/playground", label: "Playground", icon: Code },
    { href: "/contact", label: "Contact", icon: MessageSquare },
    { href: "/now", label: "Now", icon: Calendar },
    { href: "/achievements", label: "Achievements", icon: Trophy },
    { href: "/resume", label: "Resume", icon: FileText }
  ], []);

  // Optimized toggle function
  const toggleCollapsed = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  // Check active state efficiently
  const isActive = useCallback((href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  }, [location.pathname]);

  // Simple motion variants
  const sidebarVariants: Variants = {
    expanded: { width: 240 },
    collapsed: { width: 64 }
  };

  return (
    <TooltipProvider delayDuration={500}>
      <motion.aside
        variants={sidebarVariants}
        animate={collapsed ? "collapsed" : "expanded"}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden lg:flex h-screen flex-col border-r border-border bg-background"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center gap-2">
            {!collapsed && (
              <span className="text-sm font-semibold text-foreground">Portfolio</span>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="h-8 w-8"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <nav className="p-2 space-y-1">
            {navItems.map(({ href, label, icon: Icon, badge }) => {
              const active = isActive(href);
              
              const navItem = (
                <NavLink
                  key={href}
                  to={href}
                  className={`
                    flex items-center gap-3 rounded-md px-3 py-2
                    text-sm font-medium transition-colors
                    ${active 
                      ? "bg-accent text-accent-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }
                  `}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  
                  {!collapsed && (
                    <>
                      <span className="truncate">{label}</span>
                      {badge && (
                        <Badge variant="secondary" className="h-4 px-1 text-xs ml-auto">
                          {badge}
                        </Badge>
                      )}
                    </>
                  )}
                </NavLink>
              );

              // Show tooltip only when collapsed
              return collapsed ? (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>{navItem}</TooltipTrigger>
                  <TooltipContent side="right">
                    <div className="flex items-center gap-2">
                      {label}
                      {badge && (
                        <Badge variant="secondary" className="h-4 px-1 text-xs">
                          {badge}
                        </Badge>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              ) : (
                navItem
              );
            })}
          </nav>
        </ScrollArea>

        <Separator />

        <div className="p-3">
          {!collapsed ? (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Built By Shreyansh
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
          )}
        </div>
      </motion.aside>
    </TooltipProvider>
  );
};

export default Sidebar;