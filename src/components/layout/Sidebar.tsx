import { useState, useMemo } from "react";
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
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import ThemeToggle from "./Navigation/ThemeToggle";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Navigation items (adjust to taste)
  const navItems: NavItem[] = useMemo(
    () => [
      { href: "/", label: "Home", icon: Home },
      { href: "/about", label: "About", icon: User },
      { href: "/projects", label: "Projects", icon: Briefcase },
      { href: "/experience", label: "Experience", icon: Clock },
      { href: "/data-stories", label: "Data Stories", icon: BarChart3 },
      { href: "/blog", label: "Blog", icon: BookOpen },
      { href: "/playground", label: "Playground", icon: Code },
      { href: "/contact", label: "Contact", icon: MessageSquare },
      { href: "/now", label: "Now", icon: Calendar },
      { href: "/achievements", label: "Achievements", icon: Trophy },
      { href: "/resume", label: "Resume", icon: FileText }
    ],
    []
  );

  // Motion variants for width animation
  const asideVariants: Variants = {
    expanded: { width: 240 },
    collapsed: { width: 72 }
  };

  const toggleCollapsed = () => setCollapsed((c) => !c);

  return (
    <TooltipProvider delayDuration={300}>
      {/* Hidden on small screens → show MobileDrawer instead */}
      <motion.aside
        variants={asideVariants}
        animate={collapsed ? "collapsed" : "expanded"}
        className="
          relative z-40 hidden lg:flex
          h-screen flex-col overflow-hidden
          border-r border-border bg-background/90 backdrop-blur
          transition-colors
        "
      >
        {/* Collapse / expand button */}
        <div className="flex items-center justify-between px-3 py-2">
          <NavLink to="/" className="text-lg font-semibold">
            {!collapsed && <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Portfolio</span>}
          </NavLink>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            aria-label="Toggle sidebar"
            className="h-8 w-8"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <Separator />

        {/* Navigation list */}
        <ScrollArea className="flex-1">
          <nav className="px-1 py-3 space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = location.pathname === href || location.pathname.startsWith(`${href}/`);
              const item = (
                <NavLink
                  key={href}
                  to={href}
                  className={({ isActive }) =>
                    `
                      group flex items-center gap-3 rounded-md
                      px-3 py-2 text-sm font-medium
                      transition-colors
                      ${isActive || active ? "bg-primary/10 text-primary" : "hover:bg-accent/50 text-muted-foreground"}
                    `
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </NavLink>
              );

              // Tooltip only when collapsed
              return collapsed ? (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>{item}</TooltipTrigger>
                  <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>
              ) : (
                item
              );
            })}
          </nav>
        </ScrollArea>

        <Separator />

        {/* Bottom utilities */}
        <div className="p-3 flex items-center justify-center">
          <ThemeToggle />
        </div>
      </motion.aside>
    </TooltipProvider>
  );
};

export default Sidebar;