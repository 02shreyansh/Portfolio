import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Download, Mail, ArrowRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  heroY: any;
  personalInfo: any;
  stats: any[];
  statsRef: React.RefObject<HTMLDivElement | null>;
  downloadCount: number;
  handleDownloadResume: () => void;
  handleContactClick: (method: string) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  isTyping: boolean;
  itemVariants: any;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroRef,
  heroY,
  personalInfo,
  stats,
  statsRef,
  downloadCount,
  handleDownloadResume,
  handleContactClick,
  animationsEnabled,
  setAnimationsEnabled,
  isTyping,
  itemVariants
}) => {
  const isHeroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={heroRef}
      className="relative py-20 px-6"
      style={{ y: heroY }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            className="relative w-40 h-40 mx-auto mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={isHeroInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 shadow-2xl"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(255,255,255,0.4)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.span
                  className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  animate={isTyping ? { opacity: [1, 0.5, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isTyping ? Infinity : 0 }}
                >
                  {personalInfo.name.split('').slice(0, 2).join('')}
                </motion.span>
              </div>
            </motion.div>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20 + i * 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  style={{
                    top: `${15 + i * 10}%`,
                    right: `${10 + i * 5}%`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground via-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {personalInfo.name}
            </motion.h1>
            <motion.p
              className="text-2xl text-muted-foreground mb-3 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {personalInfo.title}
            </motion.p>
            <motion.p
              className="text-lg text-muted-foreground/80 mb-12 font-light max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {personalInfo.subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="group relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="p-6 bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:border-primary/30">
                    <CardContent className="p-0 text-center">
                      <motion.div
                        className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} p-3 text-white shadow-lg group-hover:shadow-xl transition-shadow`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-full h-full" />
                      </motion.div>
                      <motion.div
                        className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-2"
                        animate={isStatsInView ? {
                          scale: [1, 1.05, 1]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      >
                        {stat.number}
                      </motion.div>
                      <p className="text-muted-foreground font-medium text-sm">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleDownloadResume}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-blue-500/25 text-lg font-semibold rounded-xl border-0"
                size="lg"
              >
                <Download className="w-5 h-5 mr-3" />
                Download Resume
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Badge variant="secondary" className="ml-3 bg-white/20 text-white border-0 px-2">
                    {downloadCount}+
                  </Badge>
                </motion.div>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => handleContactClick('email')}
                className="px-10 py-4 border-2 border-primary/50 hover:bg-primary/10 hover:border-primary text-lg font-semibold rounded-xl backdrop-blur-sm bg-background/60"
                size="lg"
              >
                <Mail className="w-5 h-5 mr-3" />
                Let's Connect
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center gap-3 text-sm text-muted-foreground"
            variants={itemVariants}
          >
            <Sparkles className="w-4 h-4" />
            <span>Animations</span>
            <Switch
              checked={animationsEnabled}
              onCheckedChange={setAnimationsEnabled}
              className="data-[state=checked]:bg-primary"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};