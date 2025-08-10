import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Testimonials } from "@/utils/Home/Description";
import type { Testimonial } from "@/utils/Home/Interface";

const TestimonialsSection: React.FC = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const [, setActiveTestimonial] = useState(0);

  const testimonials: Testimonial[] = useMemo(() =>
    Testimonials.map(testimonial => ({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.image
    })),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <motion.section
      ref={testimonialsRef}
      className="min-h-screen flex items-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={isTestimonialsInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium mb-6">
            Client Testimonials
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real feedback from clients who trusted me with their vision
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.25, 0, 1]
              }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 rounded-3xl">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-500/50 mb-4" />
                  <p className="text-muted-foreground leading-relaxed mb-6 text-lg italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
export default TestimonialsSection;