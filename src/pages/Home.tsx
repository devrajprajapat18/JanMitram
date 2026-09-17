import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { Link } from "react-router-dom";
import {
  Users,
  Zap,
  LineChart,
  BrainCircuit,
  Bell,
  Compass,
  Briefcase,
  MessageSquare,
  ArrowRight,
  MapPin,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "AI Matchmaking",
    description: "Get personalized opportunities\nbased on your skills and goals.",
    iconBg: "bg-[#ECFDF5]",
    iconColor: "text-emerald-600",
  },
  {
    icon: Zap,
    title: "One-Click Applications",
    description: "Apply to multiple internships\nand placements instantly.",
    iconBg: "bg-[#F5F3FF]",
    iconColor: "text-violet-600",
  },
  {
    icon: LineChart,
    title: "Analytics Dashboard",
    description: "Track your progress and get\ninsights in real-time.",
    iconBg: "bg-[#FFFBEB]",
    iconColor: "text-amber-600",
  },
];

const mockJobs = [
  {
    company: "Google",
    initials: "G",
    color: "bg-blue-50 text-blue-600",
    role: "Software Engineering Intern",
    location: "Remote",
  },
  {
    company: "Microsoft",
    initials: "M",
    color: "bg-indigo-50 text-indigo-600",
    role: "Product Intern",
    location: "Hybrid",
  },
  {
    company: "Amazon",
    initials: "A",
    color: "bg-amber-50 text-amber-600",
    role: "Data Science Intern",
    location: "Remote",
  },
];

const avatars = [
  { initials: "AS", className: "bg-emerald-500" },
  { initials: "RK", className: "bg-sky-500" },
  { initials: "PT", className: "bg-violet-500" },
  { initials: "MJ", className: "bg-rose-500" },
  { initials: "DN", className: "bg-amber-500" },
];

const HeroDashboard = () => (
  <div className="relative">
    <div className="rounded-3xl border border-border bg-white shadow-xl shadow-slate-900/5 overflow-hidden animate-float">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center h-7 w-7 rounded-lg bg-accent text-white">
            <BrainCircuit className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-foreground tracking-tight">JanMitram</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="relative flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-white text-xs font-semibold">
            AS
          </span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col gap-1 w-40 px-4 py-5 border-r border-border">
          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#ECFDF5] text-emerald-700 text-[13px] font-medium">
            <Compass className="h-4 w-4" /> Discover
          </span>
          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground text-[13px] font-medium">
            <Briefcase className="h-4 w-4" /> Applications
          </span>
          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground text-[13px] font-medium">
            <MessageSquare className="h-4 w-4" /> Messages
          </span>
          <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground text-[13px] font-medium">
            <LineChart className="h-4 w-4" /> Analytics
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <h4 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug">
              Your next
              <br />
              opportunity is here
            </h4>
            <svg width="72" height="32" viewBox="0 0 72 32" fill="none" aria-hidden="true">
              <path
                d="M2 28 C 12 26, 16 14, 26 16 S 42 22, 48 12 S 60 4, 70 6"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="70" cy="6" r="3" fill="#10B981" />
            </svg>
          </div>

          <div className="mt-4 space-y-2.5">
            {mockJobs.map((job) => (
              <div
                key={job.company}
                className="flex items-center gap-3 rounded-xl border border-border bg-white p-3 shadow-sm"
              >
                <span
                  className={`flex items-center justify-center h-9 w-9 rounded-lg text-sm font-bold ${job.color}`}
                >
                  {job.initials}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-foreground truncate">{job.role}</p>
                  <p className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                    {job.company}
                    <span className="text-border">•</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="h-2.5 w-2.5" /> {job.location}
                    </span>
                  </p>
                </div>
                <span className="shrink-0 inline-flex items-center rounded-full border border-emerald-600 text-emerald-700 px-3 py-1.5 text-[11px] font-semibold">
                  Apply
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Decorative annotation */}
    <div className="relative mt-6 mb-2 flex items-center justify-center">
      <div className="absolute -top-14 -right-2 sm:-right-6 rotate-[8deg]" aria-hidden="true">
        <svg width="90" height="80" viewBox="0 0 90 80" fill="none">
          <path
            d="M8 70 C 22 46, 40 40, 66 22"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 7"
          />
          <path
            d="M66 22 L 58 20 M66 22 L 66 14 M66 22 L 74 21"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="text-center text-sm font-medium text-foreground/70 leading-relaxed">
        Smarter Opportunities
        <br />
        Brighter Futures
      </p>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-[#ECFDF5]/70 animate-pulse-soft" />
          <div className="absolute top-40 -left-40 h-[380px] w-[380px] rounded-full bg-[#ECFDF5]/50 animate-pulse-soft" />
          <div className="absolute bottom-0 right-1/3 h-[260px] w-[260px] rounded-full bg-[#F0FDF4]/60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-600" aria-hidden="true" />
                <span className="text-sm font-semibold tracking-wide text-emerald-600">
                  Connect &nbsp;&bull;&nbsp; Learn &nbsp;&bull;&nbsp; Grow
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl xl:text-[64px]">
                Empowering
                <br />
                Students and
                <br />
                Recruiters with{" "}
                <span className="text-emerald-500">AI</span>
              </h1>

              <p className="mt-7 text-lg leading-relaxed text-muted-foreground max-w-md">
                JanMitram connects learners, mentors, and organizations through
                intelligent, automated internship and placement workflows.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button className="group h-12 rounded-full bg-accent hover:bg-emerald-600 text-white px-8 text-[15px] font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    className="h-12 rounded-full border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 px-8 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-2.5">
                  {avatars.map((avatar) => (
                    <span
                      key={avatar.initials}
                      className={`flex items-center justify-center h-9 w-9 rounded-full ${avatar.className} text-white text-[10px] font-semibold ring-2 ring-white`}
                    >
                      {avatar.initials}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground leading-snug">
                  Join thousands of students
                  <br />
                  and recruiters already using JanMitram.
                </div>
              </div>
            </motion.div>

            {/* Right column - Dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="lg:max-w-[520px] lg:ml-auto w-full"
            >
              <HeroDashboard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold tracking-[0.15em] text-emerald-700">
                FEATURES
              </span>
              <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Everything you need
                <br />
                in <span className="text-emerald-500">one place</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base text-muted-foreground lg:text-right lg:max-w-[260px]"
            >
              Simple tools. Real opportunities.
              <br />
              Built for your growth.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
                iconBg={feature.iconBg}
                iconColor={feature.iconColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-[#ECFDF5] px-8 py-14 md:px-16 md:py-16"
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-emerald-100/60" />
              <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-emerald-100/50" />
            </div>

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-emerald-700">
                  BE A PART OF SOMETHING BIGGER
                </p>
                <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  Ready to shape
                  <br />
                  <span className="text-emerald-500">your future?</span>
                </h2>
                <p className="mt-5 text-base text-muted-foreground">
                  Create your account and get started today.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 shrink-0">
                <Link to="/login">
                  <Button className="group h-12 rounded-full bg-accent hover:bg-emerald-600 text-white px-8 text-[15px] font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    Create Account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <div className="flex gap-2" aria-hidden="true">
                  <span className="h-1 w-10 rounded-full bg-emerald-300/70" />
                  <span className="h-1 w-6 rounded-full bg-emerald-300/50" />
                  <span className="h-1 w-3 rounded-full bg-emerald-300/40" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;