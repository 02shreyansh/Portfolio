import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Values } from "@/utils/Home/Description";
import type { Value } from "@/utils/Home/Interface";

const ValuesSection: React.FC = () => {
  const valuesRef = useRef<HTMLDivElement>(null);
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  const coreValues: Value[] = useMemo(() =>
    Values.map(value => ({
      title: value.title,
      description: value.description,
      icon: value.icon,
      color: value.color
    })),
    []
  );

  return (
    <motion.section
      ref={valuesRef}
      className="min-h-screen flex items-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={isValuesInView ? { opacity: 1 } : {}}
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
            Core Values
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              What Drives Me
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The principles that guide every project and client relationship
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.25, 0, 1]
                }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  <Icon className={`w-12 h-12 mx-auto mb-6 ${value.color} group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
export default ValuesSection;