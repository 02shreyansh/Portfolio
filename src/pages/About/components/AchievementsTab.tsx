import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Sparkles } from "lucide-react";
import type { Achievement } from "@/utils/About/About.types";

interface AchievementsTabProps {
  achievements: Achievement[];
}

export const AchievementsTab: React.FC<AchievementsTabProps> = ({ achievements }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Achievements & Recognition
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5, rotateY: 5 }}
              style={{ perspective: 1000 }}
            >
              <Card className={`group p-6 h-full bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 ${achievement.highlight
                ? 'ring-2 ring-primary/30 bg-gradient-to-br from-primary/10 to-primary/5'
                : 'hover:border-primary/30'
                }`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className={`relative p-4 rounded-2xl ${achievement.highlight
                        ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600'
                        } shadow-xl group-hover:shadow-2xl transition-shadow`}
                      whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                      {achievement.highlight && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 blur-lg opacity-50"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                    <div className="text-right">
                      <Badge
                        variant={achievement.highlight ? "default" : "secondary"}
                        className="px-3 py-1 text-sm mb-2"
                      >
                        {achievement.date}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {achievement.category}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all">
                    {achievement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                  {achievement.metrics && (
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                          {achievement.metrics}
                        </span>
                      </div>
                    </div>
                  )}
                  {achievement.highlight && (
                    <motion.div
                      className="flex items-center gap-2 text-xs text-primary/80"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-3 h-3" />
                      Featured Achievement
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};