import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetDescription 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "./ThemeToggle";

interface NavigationItem {
  href: string;
  label: string;
  description?: string;
  badge?: string;
  external?: boolean;
}

interface MobileDrawerProps {
  navigationItems: NavigationItem[];
  currentPath?: string;
  className?: string;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ 
  navigationItems, 
  currentPath = "",
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  const handleLinkClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = href;
    }
    setIsOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return currentPath === href;
    }
    return currentPath.startsWith(href);
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className={className}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative z-50 md:hidden h-10 w-10
                       hover:bg-accent/50 
                       focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle navigation menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-80 max-w-[85vw] p-0 flex flex-col"
        >
          <SheetHeader className="p-6 border-b border-border text-left">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <SheetTitle className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Navigation
                </SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground mt-1">
                  Explore my portfolio sections
                </SheetDescription>
              </div>
              
              <div className="ml-4">
                <ThemeToggle />
              </div>
            </div>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            <nav className="p-6">
              <motion.div 
                className="space-y-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => handleLinkClick(item.href, item.external)}
                      className={`
                        group relative w-full flex items-center justify-between
                        px-4 py-3 rounded-lg text-left
                        transition-all duration-200 ease-in-out
                        hover:bg-accent/50 hover:shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-primary/50
                        ${isActive(item.href) 
                          ? 'bg-primary/10 text-primary border border-primary/20' 
                          : 'text-foreground/80 hover:text-foreground'
                        }
                      `}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-base">
                            {item.label}
                          </span>
                          
                          {item.badge && (
                            <Badge 
                              variant="secondary" 
                              className="text-xs px-2 py-0.5"
                            >
                              {item.badge}
                            </Badge>
                          )}
                          
                          {item.external && (
                            <ExternalLink className="h-3 w-3 opacity-50" />
                          )}
                        </div>
                        
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {isActive(item.href) && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"
                          layoutId="activeIndicator"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </nav>
          </div>

          <motion.div
            className="p-6 border-t border-border bg-muted/30 mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Built with passion & precision
              </p>
              <div className="flex justify-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-primary/40 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileDrawer;