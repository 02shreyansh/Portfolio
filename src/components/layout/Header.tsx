// components/layout/Header.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Navigation from "./Navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="relative z-40 w-full">
      {/* Subtle gradient backdrop */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b
                   from-background/90 to-transparent backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between
                      px-4 py-4 sm:px-6 lg:px-8">
        
        {/* Left section with sidebar trigger and logo */}
        <div className="flex items-center gap-3">
          {/* Sidebar trigger - visible on mobile and when sidebar is available */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-bold tracking-tight text-foreground
                       hover:text-primary transition-colors"
          >
            MyPortfolio
          </Link>
        </div>

        {/* Global Navigation (handles desktop, mobile, breadcrumbs, etc.) */}
        <Navigation />
      </div>
    </header>
  );
};

export default Header;