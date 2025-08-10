import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Users, Target, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StatsSection: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const stats = [
    { number: "50+", label: "Projects Completed", icon: Briefcase },
    { number: "30+", label: "Happy Clients", icon: Users },
    { number: "99%", label: "Success Rate", icon: Target },
    { number: "24/7", label: "Support", icon: Heart }
  ];

  return (
    <motion.section
      ref={statsRef}
      className="py-20 px-6"
      initial={{ opacity: 0 }}
      animate={isStatsInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium mb-6">
            By the Numbers
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Proven Results
            </span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  duration: 0.6
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <Icon className="w-8 h-8 mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
export default StatsSection;