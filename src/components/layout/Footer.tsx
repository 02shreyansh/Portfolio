import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Heart,
  ExternalLink
} from "lucide-react";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from "../ui/tooltip";

const QUICK_LINK_SECTIONS = [
  {
    title: "Portfolio",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/experience", label: "Experience" },
      { href: "/achievements", label: "Achievements" }
    ]
  },
  {
    title: "Content",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/data-stories", label: "Data Stories" },
      { href: "/playground", label: "Playground" }
    ]
  },
  {
    title: "Connect",
    links: [
      { href: "/about", label: "About" },
      { href: "/now", label: "Now" },
      { href: "/resume", label: "Resume" },
      { href: "/contact", label: "Contact" }
    ]
  }
];

const SOCIAL_LINKS = [
  { href: "https://github.com/yourusername", label: "GitHub", icon: Github, external: true },
  { href: "https://linkedin.com/in/yourusername", label: "LinkedIn", icon: Linkedin, external: true },
  { href: "https://twitter.com/yourusername", label: "Twitter", icon: Twitter, external: true },
  { href: "mailto:hello@example.com", label: "Email", icon: Mail, external: false }
];

const Footer: React.FC = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openLink = (href: string, external: boolean) => {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <footer className="relative mt-auto border-t border-border bg-background/80 backdrop-blur-sm">
        <motion.div
          className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                staggerChildren: 0.15
              }
            }
          }}
        >
          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            {/* Brand & Description */}
            <motion.div
              className="space-y-4"
              variants={{ 
                hidden: { opacity: 0, x: -20 }, 
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } 
              }}
            >
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Portfolio
                </h3>
                <Badge variant="default" className="text-xs animate-pulse">
                  {currentYear}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[18rem]">
                Building beautiful, performant, and modern web experiences with passion and precision.
              </p>
            </motion.div>

            {/* Quick Links Sections */}
            {QUICK_LINK_SECTIONS.map(({ title, links }, sectionIndex) => (
              <motion.div
                key={title}
                className="space-y-4"
                variants={{ 
                  hidden: { opacity: 0, y: 20 }, 
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.4,
                      delay: sectionIndex * 0.1
                    } 
                  } 
                }}
              >
                <h4 className="text-lg font-semibold text-foreground">{title}</h4>
                <ul className="flex flex-col gap-2">
                  {links.map(({ href, label }, linkIndex) => (
                    <motion.li 
                      key={href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: (sectionIndex * 0.1) + (linkIndex * 0.05),
                        duration: 0.3
                      }}
                    >
                      <motion.button
                        className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-all duration-200"
                        onClick={() => openLink(href, false)}
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {label}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <Separator className="my-8" />

          {/* Bottom Bar */}
          <motion.div
            className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between"
            variants={{ 
              hidden: { opacity: 0 }, 
              visible: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } } 
            }}
          >
            {/* Copyright */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>© {currentYear} • Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-600 fill-current mx-1" />
              </motion.div>
              <span>React &amp; TypeScript</span>
            </div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-3"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {SOCIAL_LINKS.map(({ href, label, icon: Icon, external }) => (
                <motion.div
                  key={href}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                        onClick={() => openLink(href, external)}
                        aria-label={label}
                      >
                        <Icon className="h-5 w-5" />
                        {external && (
                          <ExternalLink className="h-3 w-3 absolute top-1 right-1 opacity-50" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={6}>
                      {label}
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </motion.div>

            {/* Back to Top Button */}
            <AnimatePresence>
              {showTopBtn && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        aria-label="Back to top"
                      >
                        <motion.div
                          animate={{ y: [-2, 0, -2] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowUp className="h-5 w-5" />
                        </motion.div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Back to top</TooltipContent>
                  </Tooltip>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Subtle background animation */}
        <motion.div
          className="absolute inset-0 -z-10 opacity-5"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, var(--primary) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, var(--primary) 0%, transparent 50%)",  
              "radial-gradient(circle at 40% 40%, var(--primary) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, var(--primary) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </footer>
    </TooltipProvider>
  );
};

export default Footer;