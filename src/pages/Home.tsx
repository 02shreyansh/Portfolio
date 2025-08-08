import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, useScroll, useTransform, useInView, type Variants, useMotionValue, useSpring } from "framer-motion";
import { 
  ArrowRight,
  Code2, 
  Palette, 
  Zap, 
  Globe,
  ChevronDown,
  Mouse,
  Sparkles,
  Star,
  Quote,
  CheckCircle,
  ArrowUpRight,
  Briefcase,
  Users,
  Target,
  Rocket,
  Award,
  TrendingUp,
  Shield,
  Clock,
  Heart,
  Lightbulb,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

interface Process {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

interface Value {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const Home: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.8]);
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  
  const isHeroInView = useInView(heroRef, { once: true });
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  // Typing animation words
  const words = useMemo(() => [
    "Developer",
    "Designer", 
    "Creator",
    "Innovator",
    "Problem Solver",
    "Digital Artist"
  ], []);

  // Enhanced Services data
  const services: Service[] = useMemo(() => [
    {
      title: "Frontend Development",
      description: "Creating modern, responsive web applications with cutting-edge technologies and frameworks",
      features: ["React & Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Performance Optimization"],
      icon: Code2,
      gradient: "from-blue-400 via-blue-500 to-blue-600"
    },
    {
      title: "UI/UX Design",
      description: "Crafting beautiful, intuitive interfaces that provide exceptional user experiences",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Accessibility"],
      icon: Palette,
      gradient: "from-purple-400 via-purple-500 to-purple-600"
    },
    {
      title: "Performance Optimization",
      description: "Building lightning-fast applications optimized for speed, SEO, and user engagement",
      features: ["Core Web Vitals", "SEO Optimization", "Bundle Analysis", "Caching Strategies", "CDN Integration"],
      icon: Zap,
      gradient: "from-yellow-400 via-orange-500 to-red-500"
    },
    {
      title: "Full-Stack Solutions",
      description: "End-to-end development solutions from concept to deployment and maintenance",
      features: ["API Development", "Database Design", "Cloud Deployment", "DevOps", "Monitoring"],
      icon: Globe,
      gradient: "from-green-400 via-emerald-500 to-teal-600"
    }
  ], []);

  // Work Process
  const workProcess: Process[] = useMemo(() => [
    {
      step: 1,
      title: "Discovery & Strategy",
      description: "Understanding your vision, goals, and requirements to create a comprehensive project roadmap",
      icon: Lightbulb
    },
    {
      step: 2,
      title: "Design & Planning",
      description: "Creating wireframes, mockups, and detailed project specifications with your feedback",
      icon: Layers
    },
    {
      step: 3,
      title: "Development & Testing",
      description: "Building your solution with clean code, regular updates, and thorough testing",
      icon: Code2
    },
    {
      step: 4,
      title: "Launch & Support",
      description: "Deploying your project and providing ongoing support, maintenance, and improvements",
      icon: Rocket
    }
  ], []);

  // Core Values
  const coreValues: Value[] = useMemo(() => [
    {
      title: "Quality First",
      description: "Every line of code is crafted with precision and attention to detail",
      icon: Award,
      color: "text-blue-500"
    },
    {
      title: "Innovation",
      description: "Staying ahead with the latest technologies and creative solutions",
      icon: TrendingUp,
      color: "text-purple-500"
    },
    {
      title: "Reliability",
      description: "Delivering projects on time with consistent communication and support",
      icon: Shield,
      color: "text-green-500"
    },
    {
      title: "Efficiency",
      description: "Optimized workflows and performance-focused development practices",
      icon: Clock,
      color: "text-orange-500"
    }
  ], []);

  // Enhanced Testimonials
  const testimonials: Testimonial[] = useMemo(() => [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechFlow Inc",
      content: "Shreyansh transformed our outdated platform into a modern, high-performing application. His expertise in React and attention to user experience resulted in a 40% increase in user engagement.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Michael Chen",
      role: "CEO & Founder",
      company: "InnovateLab",
      content: "Working with Shreyansh was exceptional. He delivered a complex e-commerce solution ahead of schedule and within budget. The performance optimizations alone saved us thousands in server costs.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Emily Rodriguez",
      role: "Design Director",
      company: "Creative Studios",
      content: "The UI/UX work exceeded our expectations. Shreyansh has an incredible eye for design and the technical skills to bring even the most complex animations to life seamlessly.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "David Park",
      role: "CTO",
      company: "StartupXYZ",
      content: "From concept to deployment, Shreyansh handled everything professionally. The full-stack solution he built scales beautifully and has been running flawlessly for months.",
      rating: 5,
      image: "/api/placeholder/60/60"
    }
  ], []);

  // Optimized typing animation
  useEffect(() => {
    if (!isTyping) return;

    const currentWord = words[currentWordIndex];
    const timeoutId = setTimeout(() => {
      setTypedText(prev => {
        if (prev.length < currentWord.length) {
          return currentWord.slice(0, prev.length + 1);
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setTypedText("");
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
            setIsTyping(true);
          }, 1500);
          return prev;
        }
      });
    }, 80);

    return () => clearTimeout(timeoutId);
  }, [typedText, currentWordIndex, isTyping, words]);

  // Enhanced mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX - 16);
      mouseY.set(clientY - 16);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Optimized animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  const floatVariants: Variants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Main gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 100%)",
            y: parallaxY
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(251, 146, 60, 0.3) 50%, transparent 100%)",
            y: parallaxY
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Additional floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30"
            style={{
              left: `${20 + (i * 10) % 80}%`,
              top: `${20 + (i * 15) % 60}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Interactive cursor follower */}
        <motion.div
          className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 pointer-events-none z-50 blur-sm"
          style={{
            x: mouseXSpring,
            y: mouseYSpring,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section - Enhanced */}
        <motion.section 
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-6"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            className="text-center max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
            >
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Crafting Digital Excellence Since 2021
              </span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Shreyansh
              </span>
            </motion.h1>

            <motion.div 
              className="text-3xl md:text-5xl lg:text-6xl font-light mb-10 h-20 flex items-center justify-center"
              variants={itemVariants}
            >
              <span className="text-muted-foreground mr-4">Creative</span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium min-w-[280px] text-left">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-blue-500"
                >
                  _
                </motion.span>
              </span>
            </motion.div>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
              variants={itemVariants}
            >
              Transforming ambitious ideas into exceptional digital experiences through innovative web development, 
              stunning design, and cutting-edge technology solutions that drive real business results.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  className="px-10 py-5 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 rounded-full"
                  onClick={() => {
                    document.getElementById('services')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  Explore My Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline"
                  size="lg"
                  className="px-10 py-5 text-lg font-semibold border-2 border-primary/30 hover:bg-primary/10 rounded-full"
                  onClick={() => window.location.href = 'mailto:hello@shreyansh.dev'}
                >
                  Let's Talk
                  <ArrowUpRight className="w-5 h-5 ml-2" /> 
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Stats Preview */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-16"
            >
              {[
                { number: "50+", label: "Projects Delivered" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "3+", label: "Years Experience" },
                { number: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              variants={floatVariants}
              animate="animate"
            >
              <Mouse className="w-6 h-6 text-muted-foreground" />
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Scroll to Explore</span>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Enhanced Services Section */}
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

        {/* Work Process Section */}
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

        {/* Core Values Section */}
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

        {/* Enhanced Testimonials Section */}
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

        {/* Stats Section */}
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
              {[
                { number: "50+", label: "Projects Completed", icon: Briefcase },
                { number: "30+", label: "Happy Clients", icon: Users },
                { number: "99%", label: "Success Rate", icon: Target },
                { number: "24/7", label: "Support", icon: Heart }
              ].map((stat, index) => {
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

        {/* Enhanced CTA Section */}
        <motion.section 
          ref={ctaRef}
          className="min-h-screen flex items-center px-6 py-20"
          initial={{ opacity: 0 }}
          animate={isCtaInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
              className="relative p-16 md:p-24 rounded-[4rem] bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-xl border border-gradient-to-r from-blue-500/20 to-purple-500/20"
            >
              <div className="absolute inset-0 rounded-[4rem] bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-50" />
              
              <div className="relative z-10 space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Badge 
                    variant="outline" 
                    className="px-6 py-3 text-sm font-medium border-blue-500/30 text-blue-600 dark:text-blue-400 mb-8"
                  >
                    Ready to Get Started?
                  </Badge>
                </motion.div>

                <motion.h2 
                  className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Let's Create Something
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Extraordinary
                  </span>
                </motion.h2>

                <motion.p 
                  className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Whether you're a startup with a bold vision or an established business looking to innovate, 
                  I'm here to transform your ideas into digital reality. Let's collaborate and create something amazing together.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg"
                      className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 rounded-full"
                      onClick={() => window.location.href = 'mailto:hello@shreyansh.dev'}
                    >
                      Start Your Project
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline"
                      size="lg"
                      className="px-12 py-6 text-xl font-semibold border-2 border-primary/30 hover:bg-primary/10 rounded-full"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/portfolio.pdf';
                        link.download = 'Shreyansh_Portfolio.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      View Portfolio
                      <ArrowUpRight className="w-6 h-6 ml-3" />
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="pt-8"
                >
                  <p className="text-sm text-muted-foreground">
                    Available for freelance projects • Response within 24 hours
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;