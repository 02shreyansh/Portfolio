import { useState } from "react";
import { useMotionValue } from "framer-motion";
import AnimatedBackground from "@/pages/Home/Components/AnimatedBackground";
import HeroSection from "@/pages/Home/Components/HeroSection";
import ServicesSection from "@/pages/Home/Components/ServicesSection";
import ProcessSection from "@/pages/Home/Components/ProcessSection";
import ValuesSection from "@/pages/Home/Components/ValuesSection";
import TestimonialsSection from "@/pages/Home/Components/TestimonialsSection";
import StatsSection from "@/pages/Home/Components/StatsSection";
import CTASection from "@/pages/Home/Components/CTASection";

const Home: React.FC = () => {
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground
        mouseX={mouseX}
        mouseY={mouseY}
        setMousePosition={setMousePosition}
      />

      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <ValuesSection />
        <TestimonialsSection />
        <StatsSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Home;