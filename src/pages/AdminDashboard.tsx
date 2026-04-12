import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Users, Building2, BriefcaseIcon, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { getAdminSummary } from "@/lib/api";
import type { AdminSummary } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

const COLORS = ["hsl(158 100% 44%)", "hsl(160 66% 46%)", "hsl(166 95% 20%)"];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [summary, setSummary] = useState<AdminSummary | null>(null);

  useEffect(() => {
    async function loadSummary() {
      try {
        const result = await getAdminSummary();
        setSummary(result);
      } catch (error) {
        toast({
          title: "Failed to load analytics",
          description: error instanceof Error ? error.message : "Please try again.",
          variant: "destructive",
        });
      }
    }

    loadSummary();
  }, [toast]);

  const stats = useMemo(
    () => [
      { icon: Users, title: "Total Students", value: summary?.students ?? 0, trend: "Live data" },
      { icon: Building2, title: "Active Recruiters", value: summary?.recruiters ?? 0, trend: "Live data" },
      { icon: BriefcaseIcon, title: "Open Jobs", value: summary?.jobs ?? 0, trend: "Live data" },
      { icon: TrendingUp, title: "Applications", value: summary?.applications ?? 0, trend: "Live data" },
    ],
    [summary]
  );

  const pieData = useMemo(
    () => [
      { name: "Students", value: summary?.students ?? 0 },
      { name: "Recruiters", value: summary?.recruiters ?? 0 },
      { name: "Jobs", value: summary?.jobs ?? 0 },
    ],
    [summary]
  );

  const barData = useMemo(
    () => [
      { metric: "Students", value: summary?.students ?? 0 },
      { metric: "Recruiters", value: summary?.recruiters ?? 0 },
      { metric: "Jobs", value: summary?.jobs ?? 0 },
      { metric: "Applications", value: summary?.applications ?? 0 },
    ],
    [summary]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage platform operations with live system metrics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.title}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                trend={stat.trend}
                index={index}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Entity Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Platform Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(158 100% 44%)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
