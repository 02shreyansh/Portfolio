// components/layout/Header.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "./Navigation";

const Header: React.FC = () => {
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
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-foreground
                     hover:text-primary transition-colors"
        >
          MyPortfolio
        </Link>

        {/* Global Navigation (handles desktop, mobile, breadcrumbs, etc.) */}
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
