import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CTASection: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ctaRef}
      className="min-h-screen flex items-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={isCtaInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
          className="relative p-16 md:p-24 rounded-[4rem] bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-xl border border-gradient-to-r from-blue-500/20 to-purple-500/20"
        >
          <div className="absolute inset-0 rounded-[4rem] bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-50" />
          <div className="relative z-10 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge
                variant="outline"
                className="px-6 py-3 text-sm font-medium border-blue-500/30 text-blue-600 dark:text-blue-400 mb-8"
              >
                Ready to Get Started?
              </Badge>
            </motion.div>
            
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Let's Create Something
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </motion.h2>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Whether you're a startup with a bold vision or an established business looking to innovate,
              I'm here to transform your ideas into digital reality. Let's collaborate and create something amazing together.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 rounded-full"
                  onClick={() => window.location.href = 'mailto:hello@shreyansh.dev'}
                >
                  Start Your Project
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-12 py-6 text-xl font-semibold border-2 border-primary/30 hover:bg-primary/10 rounded-full"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/portfolio.pdf';
                    link.download = 'Shreyansh_Portfolio.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  View Portfolio
                  <ArrowUpRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-8"
            >
              <p className="text-sm text-muted-foreground">
                Available for freelance projects • Response within 24 hours
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
export default CTASection;