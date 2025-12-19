import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  Zap,
  BarChart3,
  Target,
  Shield,
  Users,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Skill Matching",
    description:
      "Our intelligent algorithm matches students with opportunities based on their skills and career goals.",
  },
  {
    icon: Zap,
    title: "One-Click Applications",
    description:
      "Apply to multiple internships and placements instantly with your saved profile and resume.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track your application progress and get insights on recruiter engagement in real-time.",
  },
];

const benefits = [
  {
    icon: Target,
    title: "Personalized Opportunities",
    description: "AI-powered recommendations tailored to your profile",
  },
  {
    icon: Shield,
    title: "Verified Companies",
    description: "Connect with authentic recruiters and organizations",
  },
  {
    icon: Users,
    title: "Growing Community",
    description: "Join thousands of students and top recruiters",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        className="pt-24 pb-16 gradient-hero relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Empowering Students and Recruiters with{" "}
              <span className="text-accent">AI</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              JanMitram connects learners, mentors, and organizations through
              intelligent, automated internship and placement workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button
                  size="lg"
                  className="gradient-primary text-lg px-8 hover-scale"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 hover-scale"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to succeed in your career journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why JanMitram Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why JanMitram?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing how internships and placements work with
              cutting-edge technology and user-centric design
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center space-y-4"
              >
                <div className="inline-flex p-4 rounded-full bg-accent/10">
                  <benefit.icon className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl opacity-90">
              Join thousands of students and recruiters already using JanMitram
              to shape their future
            </p>
            <Link to="/login">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 hover-scale"
              >
                Create Your Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
