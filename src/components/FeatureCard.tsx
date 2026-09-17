import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  iconBg?: string;
  iconColor?: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index = 0,
  iconBg = "bg-[#ECFDF5]",
  iconColor = "text-accent",
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="h-full"
    >
      <div className="h-full rounded-[18px] border border-border bg-white p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
        <div className={`flex items-center justify-center h-12 w-12 rounded-xl ${iconBg}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-foreground tracking-tight">
          {title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground whitespace-pre-line">
          {description}
        </p>
      </div>
    </motion.div>
  );
};