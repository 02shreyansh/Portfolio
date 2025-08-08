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

export type {
    Service,
    Process,
    Testimonial,
    Value
}