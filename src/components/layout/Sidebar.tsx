import {  useMemo, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const {  open, setOpen, } = useSidebar();

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

  const isActive = useCallback((href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between px-2">
          {open && <span className="text-sm font-semibold">Portfolio</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto h-8 w-8"
          >
            {open ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {open && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ href, label, icon: Icon, badge }) => {
                const active = isActive(href);
                
                const menuItem = (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={`${!open ? 'justify-center' : ''}`}
                    >
                      <NavLink to={href} className="flex items-center gap-2">
                        <Icon className="h-4 w-4 shrink-0" />
                        {open && (
                          <>
                            <span>{label}</span>
                            {badge && (
                              <Badge variant="secondary" className="h-4 px-1.5 text-xs ml-auto">
                                {badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );

                if (!open) {
                  return (
                    <TooltipProvider key={href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {menuItem}
                        </TooltipTrigger>
                        <TooltipContent side="right" className="flex items-center gap-2">
                          {label}
                          {badge && (
                            <Badge variant="secondary" className="h-4 px-1.5 text-xs">
                              {badge}
                            </Badge>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                }

                return menuItem;
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-2 py-1">
          {open ? (
            <p className="text-xs text-muted-foreground text-center">
              Built By Shreyansh
            </p>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;