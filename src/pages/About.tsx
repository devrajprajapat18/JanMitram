import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Target, Lightbulb, Users, Award } from "lucide-react";

const team = [
  { name: "Sarah Johnson", role: "CEO & Founder", image: "SJ" },
  { name: "Michael Chen", role: "CTO", image: "MC" },
  { name: "Emily Rodriguez", role: "Head of Product", image: "ER" },
  { name: "David Kumar", role: "Lead Developer", image: "DK" },
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to democratizing access to quality internships and placements",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "Leveraging AI and technology to create smarter connections",
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "Building a supportive ecosystem for students and recruiters",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Maintaining the highest standards in everything we do",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Vision
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              JanMitram redefines how internships and placements work by connecting
              institutions, students, and recruiters on a unified digital platform.
              Built with AI-driven insights, it promotes transparency, speed, and
              opportunity for all.
            </p>
          </motion.div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full bg-card border-border hover:shadow-green-md transition-all">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-4 rounded-full bg-accent/10">
                        <value.icon className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 bg-muted/30 rounded-lg p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                JanMitram was born from a simple observation: the disconnect between
                talented students and companies looking for fresh talent. Traditional
                placement processes were time-consuming, often biased, and didn't
                leverage the power of modern technology.
              </p>
              <p>
                We set out to change that by building an AI-powered platform that
                makes intelligent matches based on skills, interests, and career
                goals. Our platform automates the tedious parts of job hunting while
                keeping the human touch where it matters most.
              </p>
              <p>
                Today, JanMitram serves thousands of students and hundreds of
                recruiters, facilitating meaningful connections that lead to
                successful careers and fulfilled hiring needs.
              </p>
            </div>
          </motion.div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center bg-card border-border hover:shadow-green-md transition-all">
                    <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      {member.image}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">1,247</p>
                <p className="text-sm opacity-90">Active Students</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">156</p>
                <p className="text-sm opacity-90">Partner Companies</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">850</p>
                <p className="text-sm opacity-90">Successful Placements</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">95%</p>
                <p className="text-sm opacity-90">Satisfaction Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
