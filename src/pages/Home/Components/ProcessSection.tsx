import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { WorkProcesses } from "@/utils/Home/Description";
import type { Process } from "@/utils/Home/Interface";

const ProcessSection: React.FC = () => {
  const processRef = useRef<HTMLDivElement>(null);
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  const workProcess: Process[] = useMemo(() =>
    WorkProcesses.map(Progress => ({
      step: Progress.step,
      title: Progress.title,
      description: Progress.description,
      icon: Progress.icon
    })),
    []
  );

  return (
    <motion.section
      ref={processRef}
      className="min-h-screen flex items-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={isProcessInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium mb-6">
            My Process
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              How I Work
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A proven methodology that ensures exceptional results and seamless collaboration
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workProcess.map((process, index) => {
            const Icon = process.icon;
            return (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.25, 0, 1]
                }}
                className="relative"
              >
                <Card className="p-8 h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-blue-500/20 transition-all duration-300 rounded-3xl text-center group">
                  <CardContent className="p-0">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {process.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors">
                      {process.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {process.description}
                    </p>
                  </CardContent>
                </Card>
                {/* Connection line */}
                {index < workProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 transform -translate-y-1/2" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
export default ProcessSection;