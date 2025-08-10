import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Services } from "@/utils/Home/Description";
import type { Service } from "@/utils/Home/Interface";

const ServicesSection: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  const services: Service[] = useMemo(() =>
    Services.map(Service => ({
      title: Service.title,
      description: Service.description,
      features: Service.features,
      icon: Service.icon,
      gradient: Service.gradient
    })),
    []
  );

  return (
    <motion.section
      id="services"
      ref={servicesRef}
      className="min-h-screen flex items-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={isServicesInView ? { opacity: 1 } : {}}
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
            Services & Expertise
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              What I Create
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to your unique needs and business objectives
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.25, 0, 1]
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <Card className="p-8 h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 rounded-3xl">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <CardContent className="relative z-10 p-0">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 shadow-lg`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
export default ServicesSection;