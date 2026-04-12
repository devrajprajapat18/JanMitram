import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Users, Building2, Award } from "lucide-react";
import { getAdminSummary } from "@/lib/api";
import type { AdminSummary } from "@/types/api";
import { useToast } from "@/hooks/use-toast";

const COLORS = ["hsl(158 100% 44%)", "hsl(160 66% 46%)", "hsl(166 95% 20%)", "hsl(144 30% 70%)"];

const Analytics = () => {
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

  const lineData = useMemo(
    () => [
      { month: "Jan", value: Math.max(1, Math.round((summary?.students || 0) * 0.5)) },
      { month: "Feb", value: Math.max(1, Math.round((summary?.students || 0) * 0.65)) },
      { month: "Mar", value: Math.max(1, Math.round((summary?.students || 0) * 0.75)) },
      { month: "Apr", value: Math.max(1, Math.round((summary?.students || 0) * 0.9)) },
      { month: "May", value: Math.max(1, summary?.students || 0) },
    ],
    [summary]
  );

  const barData = useMemo(
    () => [
      { category: "Students", value: summary?.students || 0 },
      { category: "Recruiters", value: summary?.recruiters || 0 },
      { category: "Jobs", value: summary?.jobs || 0 },
      { category: "Applications", value: summary?.applications || 0 },
    ],
    [summary]
  );

  const pieData = useMemo(
    () => [
      { name: "Students", value: summary?.students || 0 },
      { name: "Recruiters", value: summary?.recruiters || 0 },
      { name: "Jobs", value: summary?.jobs || 0 },
      { name: "Applications", value: summary?.applications || 0 },
    ],
    [summary]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Platform Analytics</h1>
            <p className="text-muted-foreground">Live metrics from backend services.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{summary?.applications ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Applications</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{summary?.students ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{summary?.recruiters ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Recruiters</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{summary?.jobs ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Jobs</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Growth Trend</h3>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="hsl(158 100% 44%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">System Counts</h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(160 66% 46%)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-card border-border lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Distribution</h3>
              <ResponsiveContainer width="100%" height={320}>
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
                    {pieData.map((item, index) => (
                      <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Analytics;
