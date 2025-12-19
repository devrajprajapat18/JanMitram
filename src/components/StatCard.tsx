import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  trend?: string;
  index: number;
}

export const StatCard = ({ icon: Icon, title, value, trend, index }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 bg-card border-border hover:shadow-green-md transition-all">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className="text-sm text-accent">
                {trend}
              </p>
            )}
          </div>
          <div className="p-3 rounded-full bg-accent/10">
            <Icon className="h-6 w-6 text-accent" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};