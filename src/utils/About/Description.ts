import {
  Code2,
  Palette,
  Zap,
  Globe,
  Smartphone,
  Award,
  MapPin,
  Mail,
  Calendar,
  Download,
  ExternalLink,
  CheckCircle,
  Star,
  Rocket,
  Heart,
  Coffee,
  Github,
  Linkedin,
  Eye,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Code,
  Server,
  Layers,
  Cpu
} from "lucide-react";

export const Information = {
  name: "Shreyansh",
  title: "Senior Full-Stack Developer & UI/UX Architect",
  subtitle: "Crafting Digital Experiences That Matter",
  location: "India",
  email: "hello@shreyansh.dev",
  experience: "3+ Years",
  projects: "50+ Projects",
  clients: "25+ Happy Clients",
  bio: "Passionate full-stack developer with expertise in modern web technologies, specializing in scalable applications and exceptional user experiences."
}

export const Skills = [
  {
    name: "React",
    level: 95,
    category: "Frontend",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    description: "Advanced React patterns, hooks, and performance optimization",
    yearsExp: 3
  },
  {
    name: "TypeScript",
    level: 90,
    category: "Language",
    icon: Code,
    color: "from-blue-600 to-blue-400",
    description: "Type-safe development with advanced TS features",
    yearsExp: 2.5
  },
  {
    name: "Node.js",
    level: 88,
    category: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    description: "Server-side development and API architecture",
    yearsExp: 3
  },
  {
    name: "Python",
    level: 85,
    category: "Language",
    icon: Cpu,
    color: "from-yellow-500 to-orange-500",
    description: "Backend development, data analysis, and automation",
    yearsExp: 2
  },
  {
    name: "UI/UX Design",
    level: 82,
    category: "Design",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    description: "User-centered design and interface optimization",
    yearsExp: 2.5
  },
  {
    name: "Next.js",
    level: 92,
    category: "Framework",
    icon: Layers,
    color: "from-gray-800 to-gray-600",
    description: "Full-stack React framework with SSR/SSG",
    yearsExp: 2
  },
  {
    name: "React Native",
    level: 78,
    category: "Mobile",
    icon: Smartphone,
    color: "from-cyan-500 to-blue-500",
    description: "Cross-platform mobile app development",
    yearsExp: 1.5
  },
  {
    name: "AWS",
    level: 80,
    category: "Cloud",
    icon: Zap,
    color: "from-orange-500 to-red-500",
    description: "Cloud infrastructure and serverless architecture",
    yearsExp: 2
  }
];

export const Achievements = [
  {
    title: "Top Developer 2024",
    description: "Recognized as top contributor in the development community with exceptional code quality",
    date: "2024",
    icon: Award,
    highlight: true,
    category: "Recognition",
    metrics: "Top 5% globally"
  },
  {
    title: "Open Source Impact",
    description: "Contributed to 30+ open source projects with significant community impact",
    date: "2023-24",
    icon: Heart,
    highlight: false,
    category: "Community",
    metrics: "5K+ GitHub stars"
  },
  {
    title: "Perfect Client Rating",
    description: "Maintained 99% client satisfaction rate across all projects",
    date: "2024",
    icon: Star,
    highlight: true,
    category: "Performance",
    metrics: "99% satisfaction"
  },
  {
    title: "Tech Leadership",
    description: "Mentored 50+ developers and conducted technical workshops",
    date: "2023-24",
    icon: Coffee,
    highlight: false,
    category: "Leadership",
    metrics: "50+ mentees"
  },
  {
    title: "Innovation Excellence",
    description: "Won best innovation award for creative technical solutions",
    date: "2024",
    icon: Rocket,
    highlight: true,
    category: "Innovation",
    metrics: "Industry award"
  },
  {
    title: "Full-Stack Mastery",
    description: "Certified in modern web development and cloud technologies",
    date: "2023",
    icon: CheckCircle,
    highlight: false,
    category: "Certification",
    metrics: "Multi-certified"
  }
]

export const Experiences = [
  {
    company: "Tech Solutions Inc.",
    position: "Senior Full-Stack Developer",
    duration: "2023 - Present",
    description: "Leading development of enterprise web applications, architecting scalable solutions, and mentoring junior developers. Built applications serving 100k+ users with 99.9% uptime.",
    technologies: ["React", "TypeScript", "Node.js", "AWS", "Docker", "PostgreSQL"],
    current: true,
    achievements: [
      "Reduced application load time by 60%",
      "Led a team of 5 developers",
      "Implemented CI/CD pipeline reducing deployment time by 80%"
    ],
    companyType: "Enterprise"
  },
  {
    company: "Digital Agency Co.",
    position: "Frontend Developer",
    duration: "2022 - 2023",
    description: "Developed responsive web applications with focus on performance and user experience. Collaborated with design teams to create pixel-perfect interfaces.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Figma"],
    current: false,
    achievements: [
      "Increased client satisfaction by 40%",
      "Built 15+ responsive websites",
      "Optimized performance achieving 95+ Lighthouse scores"
    ],
    companyType: "Agency"
  },
  {
    company: "Startup Inc.",
    position: "Junior Developer",
    duration: "2021 - 2022",
    description: "Built features for early-stage startup, learned modern development practices, and contributed to product growth from MVP to production.",
    technologies: ["JavaScript", "React", "Firebase", "Material-UI", "Git"],
    current: false,
    achievements: [
      "Shipped 20+ features from MVP to production",
      "Improved code quality with testing coverage to 85%",
      "Contributed to 200% user growth"
    ],
    companyType: "Startup"
  }
]

export const Testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "Tech Solutions Inc.",
    content: "Shreyansh is an exceptional developer who consistently delivers high-quality solutions. His attention to detail and technical expertise are outstanding.",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "CTO",
    company: "Digital Agency Co.",
    content: "Working with Shreyansh was a game-changer for our projects. His ability to translate complex requirements into elegant solutions is remarkable.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Design Lead",
    company: "Creative Studios",
    content: "Shreyansh bridges the gap between design and development perfectly. His understanding of UX principles makes collaboration seamless.",
    rating: 5
  }
];

export const StatsInfo = [
  { number: "50+", label: "Projects Delivered", icon: Target, color: "from-blue-500 to-cyan-500" },
  { number: "99%", label: "Client Satisfaction", icon: Star, color: "from-yellow-500 to-orange-500" },
  { number: "100K+", label: "Users Impacted", icon: Users, color: "from-green-500 to-emerald-500" },
  { number: "24/7", label: "Support Available", icon: Eye, color: "from-purple-500 to-pink-500" }
]