import {
    Code2,
    Palette,
    Zap,
    Globe,
    Rocket,
    Award,
    TrendingUp,
    Shield,
    Clock,
    Lightbulb,
    Layers
} from "lucide-react";

export const Services = [
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
]

export const WorkProcesses = [
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
]

export const Values = [
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
]

export const Testimonials = [
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
]