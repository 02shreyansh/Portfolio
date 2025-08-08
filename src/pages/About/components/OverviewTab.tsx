import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Lightbulb, Heart, CheckCircle, Clock, Users, Zap, Star } from "lucide-react";
import type { Testimonial } from "@/utils/About/About.types";

interface OverviewTabProps {
  personalInfo: any;
  testimonials: Testimonial[];
  currentTestimonial: number;
  setCurrentTestimonial: (index: number) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  personalInfo,
  testimonials,
  currentTestimonial,
  setCurrentTestimonial
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl">
        <CardContent className="space-y-8">
          <div className="text-center">
            <motion.h2
              className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              About Me
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <motion.div
                className="space-y-4 text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="flex items-start gap-3">
                  <Rocket className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  I'm a passionate full-stack developer with {personalInfo.experience.split('+')[0]}+ years of experience
                  crafting exceptional digital experiences. I specialize in React, TypeScript, and Node.js, with a keen eye
                  for design and performance optimization.
                </p>
                <p className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                  My journey in tech has been driven by curiosity and a love for problem-solving. I've worked on diverse
                  projects ranging from simple websites to complex enterprise applications, always focusing on clean code
                  and user-centric design.
                </p>
                <p className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                  When I'm not coding, you'll find me contributing to open source projects, mentoring aspiring developers,
                  or exploring the latest in web technologies. I believe in continuous learning and sharing knowledge
                  with the community.
                </p>
              </motion.div>
              <motion.div
                className="grid grid-cols-2 gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {[
                  { label: "Code Quality", value: "99%", icon: CheckCircle },
                  { label: "On-Time Delivery", value: "100%", icon: Clock },
                  { label: "Client Retention", value: "95%", icon: Users },
                  { label: "Response Time", value: "<2h", icon: Zap }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 backdrop-blur-sm hover:bg-muted/50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-semibold text-foreground">{item.value}</div>
                        <div className="text-xs text-muted-foreground">{item.label}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Client Testimonials</h3>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <blockquote className="text-muted-foreground italic mb-4">
                        "{testimonials[currentTestimonial].content}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{testimonials[currentTestimonial].name}</div>
                          <div className="text-xs text-muted-foreground">
                            {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-center gap-2 mt-4">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentTestimonial(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                          }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};