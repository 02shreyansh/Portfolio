import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Skill, Achievement, Experience, Testimonial } from "@/utils/About/About.types";
import { Information, Skills, Achievements, Experiences, Testimonials, StatsInfo } from "@/utils/About/Description";
import  BackgroundElements  from "./components/BackgroundElements";
import { HeroSection } from "./components/HeroSection";
import { OverviewTab } from "./components/OverviewTab";
import { SkillsTab } from "./components/SkillsTab";
import { ExperienceTab } from "./components/ExperienceTab";
import { AchievementsTab } from "./components/AchievementsTab";
import { CTASection } from "./components/CTASection";
import { Eye, Code2, Briefcase, Award } from "lucide-react";

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTyping, _] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -150]);
  const skillsRotation = useTransform(scrollY, [0, 1000], [0, 10]);

  const personalInfo = useMemo(() => ({
    name: Information.name,
    title: Information.title,
    subtitle: Information.subtitle,
    location: Information.location,
    email: Information.email,
    experience: Information.experience,
    projects: Information.projects,
    clients: Information.clients,
    bio: Information.bio
  }), []);

  const skills: Skill[] = useMemo(() =>
    Skills.map(skill => ({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      icon: skill.icon,
      color: skill.color,
      description: skill.description,
      yearsExp: skill.yearsExp
    }))
    , []);

  const achievements: Achievement[] = useMemo(() =>
    Achievements.map(achievement => ({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
      icon: achievement.icon,
      highlight: achievement.highlight,
      category: achievement.category,
      metrics: achievement.metrics
    }))
    , []
  )

  const experiences: Experience[] = useMemo(() =>
    Experiences.map(exp => ({
      company: exp.company,
      position: exp.position,
      duration: exp.duration,
      description: exp.description,
      technologies: exp.technologies,
      current: exp.current,
      achievements: exp.achievements,
      companyType: exp.companyType
    }))
    , []);

  const testimonials: Testimonial[] = useMemo(() =>
    Testimonials.map(testimonial => ({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating
    }))
    , []);

  const stats = useMemo(() =>
    StatsInfo.map(stat => ({
      number: stat.number,
      label: stat.label,
      icon: stat.icon,
      color: stat.color
    }))
    , []);

  useEffect(() => {
    const timer = setTimeout(() => setSkillsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount(prev => prev < 1847 ? prev + 47 : 1847);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Shreyansh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleContactClick = useCallback((method: string) => {
    if (method === 'email') {
      window.location.href = `mailto:${personalInfo.email}`;
    } else if (method === 'github') {
      window.open('https://github.com/02shreyansh', '_blank');
    } else if (method === 'linkedin') {
      window.open('https://www.linkedin.com/in/shreyansh-techenthusiastic/', '_blank');
    }
  }, [personalInfo.email]);

  const getSkillsByCategory = useCallback((category: string) => {
    return skills.filter(skill => skill.category === category);
  }, [skills]);

  const categories = useMemo(() =>
    [...new Set(skills.map(skill => skill.category))],
    [skills]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
        <BackgroundElements 
          backgroundY={backgroundY} 
          skills={skills}
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <HeroSection
            heroRef={heroRef}
            heroY={heroY}
            personalInfo={personalInfo}
            stats={stats}
            statsRef={statsRef}
            downloadCount={downloadCount}
            handleDownloadResume={handleDownloadResume}
            handleContactClick={handleContactClick}
            animationsEnabled={animationsEnabled}
            setAnimationsEnabled={setAnimationsEnabled}
            isTyping={isTyping}
            itemVariants={itemVariants}
          />

          <div className="max-w-6xl mx-auto px-6 pb-16">
            <motion.div variants={itemVariants}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 p-2 bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg h-auto">
                  {[
                    { value: "overview", label: "Overview", icon: Eye },
                    { value: "skills", label: "Skills", icon: Code2 },
                    { value: "experience", label: "Experience", icon: Briefcase },
                    { value: "achievements", label: "Achievements", icon: Award }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="py-4 px-6 font-semibold text-base rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <OverviewTab 
                    personalInfo={personalInfo}
                    testimonials={testimonials}
                    currentTestimonial={currentTestimonial}
                    setCurrentTestimonial={setCurrentTestimonial}
                  />
                </TabsContent>

                <TabsContent value="skills" className="space-y-8">
                  <SkillsTab
                    skillsRef={skillsRef}
                    categories={categories}
                    getSkillsByCategory={getSkillsByCategory}
                    hoveredSkill={hoveredSkill}
                    setHoveredSkill={setHoveredSkill}
                    animationsEnabled={animationsEnabled}
                    skillsRotation={skillsRotation}
                  />
                </TabsContent>

                <TabsContent value="experience" className="space-y-8">
                  <ExperienceTab experiences={experiences} />
                </TabsContent>

                <TabsContent value="achievements" className="space-y-8">
                  <AchievementsTab achievements={achievements} />
                </TabsContent>
              </Tabs>
            </motion.div>

            <CTASection
              personalInfo={personalInfo}
              handleContactClick={handleContactClick}
              itemVariants={itemVariants}
            />
          </div>
        </motion.div>
      </div>
    </TooltipProvider>
  );
};

export default About;