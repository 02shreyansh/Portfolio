import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Calendar, TrendingUp, CheckCircle, Code2 } from "lucide-react";
import type { Experience } from "@/utils/About/About.types";

interface ExperienceTabProps {
  experiences: Experience[];
}

export const ExperienceTab: React.FC<ExperienceTabProps> = ({ experiences }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Timeline Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Professional Journey
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      </div>
      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative mb-12 last:mb-0"
          >
            {/* Timeline Dot */}
            <motion.div
              className={`absolute left-6 w-4 h-4 rounded-full border-4 border-background shadow-lg ${exp.current
                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                : 'bg-gradient-to-r from-gray-400 to-gray-600'
                }`}
              whileHover={{ scale: 1.5 }}
              style={{ top: '2rem' }}
            >
              {exp.current && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            {/* Content Card */}
            <motion.div
              className="ml-16"
              whileHover={{ scale: 1.01, y: -2 }}
            >
              <Card className={`p-8 bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 ${exp.current ? 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-primary/10' : ''
                }`}>
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <CardTitle className="text-2xl mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {exp.position}
                      </CardTitle>
                      <CardDescription className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        {exp.company}
                      </CardDescription>
                      <Badge variant="outline" className="mt-2 w-fit">
                        {exp.companyType}
                      </Badge>
                    </div>
                    <div className="flex flex-col items-start lg:items-end gap-3">
                      <Badge
                        variant={exp.current ? "default" : "secondary"}
                        className="px-4 py-2 text-sm font-medium"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.duration}
                      </Badge>
                      {exp.current && (
                        <motion.div
                          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Badge className="px-3 py-1 bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                            Current Role
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {exp.description}
                  </p>
                  {/* Key Achievements */}
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      Key Achievements
                    </h4>
                    <div className="grid gap-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-blue-500" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05, duration: 0.3 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <Badge
                            variant="outline"
                            className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-primary/20 hover:border-primary/40 transition-colors"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};