import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Code2, Server, Code, Palette, Layers, Smartphone, Zap } from "lucide-react";
import type { Skill } from "@/utils/About/About.types";

interface SkillsTabProps {
  skillsRef: React.RefObject<HTMLDivElement | null>;
  categories: string[];
  getSkillsByCategory: (category: string) => Skill[];
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
  animationsEnabled: boolean;
  skillsRotation: any;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({
  skillsRef,
  categories,
  getSkillsByCategory,
  hoveredSkill,
  setHoveredSkill,
  animationsEnabled,
  skillsRotation
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return Code2;
      case 'Backend': return Server;
      case 'Language': return Code;
      case 'Design': return Palette;
      case 'Framework': return Layers;
      case 'Mobile': return Smartphone;
      case 'Cloud': return Zap;
      default: return Code2;
    }
  };

  const getCategoryIconColor = (category: string) => {
    switch (category) {
      case 'Frontend': return 'text-blue-500';
      case 'Backend': return 'text-green-500';
      case 'Language': return 'text-yellow-500';
      case 'Design': return 'text-purple-500';
      case 'Framework': return 'text-gray-500';
      case 'Mobile': return 'text-cyan-500';
      case 'Cloud': return 'text-orange-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <motion.div
      ref={skillsRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {categories.map((category, categoryIndex) => {
        const CategoryIcon = getCategoryIcon(category);
        const iconColor = getCategoryIconColor(category);
        
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            style={animationsEnabled ? { rotate: skillsRotation } : {}}
          >
            <Card className="p-8 bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                  <CategoryIcon className={`w-6 h-6 ${iconColor}`} />
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  {getSkillsByCategory(category).map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    return (
                      <Tooltip key={skill.name}>
                        <TooltipTrigger asChild>
                          <motion.div
                            className="group cursor-pointer"
                            onHoverStart={() => setHoveredSkill(skill.name)}
                            onHoverEnd={() => setHoveredSkill(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: categoryIndex * 0.05 + skillIndex * 0.05,
                              duration: 0.4
                            }}
                            whileHover={{ scale: 1.02, x: 8 }}
                          >
                            <div className="p-6 rounded-2xl bg-muted/20 hover:bg-muted/40 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                  <motion.div
                                    className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} shadow-lg group-hover:shadow-xl transition-shadow`}
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                  >
                                    <Icon className="w-5 h-5 text-white" />
                                  </motion.div>
                                  <div>
                                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                      {skill.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {skill.yearsExp} years experience
                                    </p>
                                  </div>
                                </div>
                                <motion.div
                                  className="text-right"
                                  animate={hoveredSkill === skill.name ? { scale: 1.1 } : { scale: 1 }}
                                >
                                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                    {skill.level}%
                                  </div>
                                  <div className="text-xs text-muted-foreground">Proficiency</div>
                                </motion.div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
                              <div className="relative h-3 bg-muted/50 rounded-full overflow-hidden">
                                <motion.div
                                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  transition={{
                                    duration: 1.5,
                                    delay: categoryIndex * 0.1 + skillIndex * 0.05,
                                    ease: "easeOut"
                                  }}
                                />
                                <motion.div
                                  className="absolute inset-y-0 left-0 bg-white/20 rounded-full"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  transition={{
                                    duration: 1.5,
                                    delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5,
                                    ease: "easeOut"
                                  }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-background/90 backdrop-blur-xl border border-border/50 rounded-xl p-4">
                          <div className="text-center">
                            <p className="font-semibold mb-1">{skill.name}</p>
                            <p className="text-sm text-muted-foreground mb-2">{skill.description}</p>
                            <div className="flex items-center gap-2 justify-center">
                              <Progress value={skill.level} className="w-16 h-2" />
                              <span className="text-xs font-medium">{skill.level}%</span>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};