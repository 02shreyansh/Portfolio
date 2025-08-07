interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  yearsExp: number;
}

interface Achievement {
  title: string;
  description: string;
  date: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight: boolean;
  category: string;
  metrics?: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  current: boolean;
  achievements: string[];
  companyType: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}
export type { Skill, Achievement, Experience, Testimonial };