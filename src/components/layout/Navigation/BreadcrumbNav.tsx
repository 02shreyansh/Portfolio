import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronRight, Home, ArrowLeft, MoreHorizontal, ExternalLink } from "lucide-react";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface BreadcrumbItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  external?: boolean;
  disabled?: boolean;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  currentPath?: string;
  maxItems?: number;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  className?: string;
  onNavigate?: (href: string) => void;
  onBack?: () => void;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  items,
  currentPath = "",
  maxItems = 4,
  showBackButton = true,
  showHomeButton = true,
  className,
  onNavigate,
  onBack
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsVisible(items.length > 1 || currentPath !== "/");
  }, [items.length, currentPath]);

  useEffect(() => {
    const checkCollapse = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    checkCollapse();
    window.addEventListener('resize', checkCollapse);
    return () => window.removeEventListener('resize', checkCollapse);
  }, []);

  const handleNavigate = useCallback((href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate?.(href);
      window.location.href = href;
    }
  }, [onNavigate]);

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  }, [onBack]);

  const processedItems = useMemo(() => {
    if (items.length <= maxItems) {
      return { visibleItems: items, collapsedItems: [] };
    }

    const keepEnd = Math.max(2, maxItems - 2);
    const visibleItems = [
      items[0], 
      ...items.slice(-keepEnd) 
    ];

    const collapsedItems = items.slice(1, items.length - keepEnd);

    return { visibleItems, collapsedItems };
  }, [items, maxItems]);

  // Motion variants
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.1 }
    }
  };

  const separatorVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  if (!isVisible || items.length === 0) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <motion.nav
        className={`
          flex items-center gap-2 p-2 mb-4
          bg-background/80 backdrop-blur-sm
          border border-border/50 rounded-lg
          transition-all duration-200
          ${className}
        `}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        {/* Back Button */}
        {showBackButton && (
          <motion.div variants={itemVariants}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="h-8 w-8 p-0 hover:bg-accent/50
                           transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={4}>
                Go Back
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}

        {/* Home Button */}
        {showHomeButton && (
          <motion.div variants={itemVariants}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={currentPath === "/" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigate("/")}
                  className="h-8 w-8 p-0 hover:bg-accent/50
                           transition-all duration-200"
                >
                  <Home className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={4}>
                Home
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}

        {/* Breadcrumb Component */}
        <Breadcrumb className="flex-1">
          <BreadcrumbList className="flex items-center gap-1">
            {processedItems.visibleItems.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === processedItems.visibleItems.length - 1;
              const isFirst = index === 0;

              return (
                <motion.div
                  key={`${item.href}-${index}`}
                  className="flex items-center gap-1"
                  variants={itemVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Show collapsed items dropdown after first item */}
                  {isFirst && processedItems.collapsedItems.length > 0 && (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          onClick={(e) => {
                            e.preventDefault();
                            if (!item.disabled) {
                              handleNavigate(item.href, item.external);
                            }
                          }}
                          className={`
                            flex items-center gap-1.5 cursor-pointer
                            transition-colors duration-200
                            ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-foreground'}
                            ${hoveredIndex === index ? 'text-foreground' : 'text-muted-foreground'}
                          `}
                        >
                          {Icon && <Icon className="h-3.5 w-3.5" />}
                          <span className={isCollapsed ? "sr-only" : ""}>
                            {item.label}
                          </span>
                          {item.badge && (
                            <Badge variant="secondary" className="h-4 px-1 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          {item.external && <ExternalLink className="h-3 w-3" />}
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      <motion.div variants={separatorVariants}>
                        <BreadcrumbSeparator>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </BreadcrumbSeparator>
                      </motion.div>

                      {/* Collapsed items dropdown */}
                      <BreadcrumbItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 hover:bg-accent/50"
                            >
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="min-w-[200px]">
                            {processedItems.collapsedItems.map((collapsedItem, collapsedIndex) => {
                              const CollapsedIcon = collapsedItem.icon;
                              return (
                                <DropdownMenuItem
                                  key={`collapsed-${collapsedItem.href}-${collapsedIndex}`}
                                  onClick={() => handleNavigate(collapsedItem.href, collapsedItem.external)}
                                  disabled={collapsedItem.disabled}
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  {CollapsedIcon && <CollapsedIcon className="h-4 w-4" />}
                                  <span className="flex-1">{collapsedItem.label}</span>
                                  {collapsedItem.badge && (
                                    <Badge variant="outline" className="h-4 px-1 text-xs">
                                      {collapsedItem.badge}
                                    </Badge>
                                  )}
                                  {collapsedItem.external && <ExternalLink className="h-3 w-3" />}
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </BreadcrumbItem>

                      <motion.div variants={separatorVariants}>
                        <BreadcrumbSeparator>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </BreadcrumbSeparator>
                      </motion.div>
                    </>
                  )}

                  {/* Regular breadcrumb item */}
                  {!(isFirst && processedItems.collapsedItems.length > 0) && (
                    <>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage className="flex items-center gap-1.5 font-medium text-foreground">
                            {Icon && <Icon className="h-3.5 w-3.5" />}
                            <span className={isCollapsed && !isLast ? "sr-only" : ""}>
                              {item.label}
                            </span>
                            {item.badge && (
                              <Badge variant="default" className="h-4 px-1 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            onClick={(e) => {
                              e.preventDefault();
                              if (!item.disabled) {
                                handleNavigate(item.href, item.external);
                              }
                            }}
                            className={`
                              flex items-center gap-1.5 cursor-pointer
                              transition-colors duration-200
                              ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-foreground'}
                              ${hoveredIndex === index ? 'text-foreground' : 'text-muted-foreground'}
                            `}
                          >
                            {Icon && <Icon className="h-3.5 w-3.5" />}
                            <span className={isCollapsed && !isLast ? "sr-only" : ""}>
                              {item.label}
                            </span>
                            {item.badge && (
                              <Badge variant="secondary" className="h-4 px-1 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                            {item.external && <ExternalLink className="h-3 w-3" />}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>

                      {!isLast && (
                        <motion.div variants={separatorVariants}>
                          <BreadcrumbSeparator>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </BreadcrumbSeparator>
                        </motion.div>
                      )}
                    </>
                  )}
                </motion.div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </motion.nav>

      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            className="fixed bottom-4 right-4 z-50 px-3 py-2
                     bg-popover text-popover-foreground
                     border border-border rounded-md shadow-lg
                     text-sm font-medium"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.15 }}
          >
            Click to navigate to: {processedItems.visibleItems[hoveredIndex]?.label}
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default BreadcrumbNav;