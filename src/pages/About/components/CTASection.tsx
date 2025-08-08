import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Mail,
    Github,
    Linkedin,
    ArrowRight,
    ExternalLink,
    Heart,
    Rocket,
    Target,
    Sparkles,
    MapPin,
    Clock
} from "lucide-react";

interface CTASectionProps {
    personalInfo: any;
    handleContactClick: (method: string) => void;
    itemVariants: any;
}

export const CTASection: React.FC<CTASectionProps> = ({
    personalInfo,
    handleContactClick,
    itemVariants
}) => {
    return (
        <motion.section
            className="mt-20 text-center py-16 px-8 rounded-3xl bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-primary/20 backdrop-blur-xl relative overflow-hidden"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Let's Build Something Amazing Together
                    </h2>

                    <motion.div
                        className="w-32 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto rounded-full mb-8"
                        initial={{ width: 0 }}
                        whileInView={{ width: 128 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.div>

                <motion.p
                    className="text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Ready to turn your vision into reality? I'm passionate about creating exceptional digital experiences
                    that make a difference. Let's collaborate and bring your ideas to life with cutting-edge technology
                    and innovative solutions.
                </motion.p>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {[
                        { icon: Rocket, title: "Fast Delivery", desc: "Quick turnaround without compromising quality" },
                        { icon: Target, title: "Goal-Oriented", desc: "Focused on achieving your business objectives" },
                        { icon: Sparkles, title: "Innovation", desc: "Using latest technologies and best practices" }
                    ].map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={i}
                                className="flex flex-col items-center p-6 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/30 hover:border-primary/40 transition-all duration-300"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 * i, duration: 0.4 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 mb-3">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-semibold mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground text-center">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={() => handleContactClick('email')}
                            size="lg"
                            className="px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-blue-500/25 text-lg font-semibold rounded-2xl border-0 group"
                        >
                            <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            Start a Conversation
                            <motion.div
                                className="ml-3"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </motion.div>
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="outline"
                            onClick={() => handleContactClick('github')}
                            size="lg"
                            className="px-12 py-4 border-2 border-primary/50 hover:bg-primary/10 hover:border-primary text-lg font-semibold rounded-2xl backdrop-blur-sm bg-background/60 group"
                        >
                            <Github className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                            View My Work
                            <ExternalLink className="w-4 h-4 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="outline"
                            onClick={() => handleContactClick('linkedin')}
                            size="lg"
                            className="px-12 py-4 border-2 border-primary/50 hover:bg-primary/10 hover:border-primary text-lg font-semibold rounded-2xl backdrop-blur-sm bg-background/60 group"
                        >
                            <Linkedin className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            Connect with Me
                            <Heart className="w-4 h-4 ml-3 group-hover:scale-125 text-pink-500 transition-transform" />
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mt-12 pt-8 border-t border-border/30"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            <span>{personalInfo.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{personalInfo.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>Available for new projects</span>
                            <motion.div
                                className="w-2 h-2 bg-green-500 rounded-full"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}