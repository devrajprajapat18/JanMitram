import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const lineData = [
  { month: "Jan", students: 400, placements: 240 },
  { month: "Feb", students: 500, placements: 320 },
  { month: "Mar", students: 650, placements: 450 },
  { month: "Apr", students: 800, placements: 580 },
  { month: "May", students: 950, placements: 720 },
  { month: "Jun", students: 1100, placements: 850 },
];

const barData = [
  { category: "Tech", jobs: 145 },
  { category: "Finance", jobs: 89 },
  { category: "Marketing", jobs: 67 },
  { category: "Design", jobs: 54 },
  { category: "Sales", jobs: 42 },
];

const pieData = [
  { name: "Applied", value: 450 },
  { name: "Shortlisted", value: 180 },
  { name: "Interview", value: 95 },
  { name: "Placed", value: 75 },
];

const COLORS = ["hsl(158 100% 44%)", "hsl(160 66% 46%)", "hsl(166 95% 20%)", "hsl(144 30% 70%)"];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Platform Analytics
            </h1>
            <p className="text-muted-foreground">
              Comprehensive insights into platform performance and metrics
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 3 months</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Students</SelectItem>
                <SelectItem value="recruiter">Recruiters</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                <SelectItem value="tech">Tech Companies</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="startup">Startups</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">892</p>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">156</p>
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
                  <p className="text-2xl font-bold text-foreground">850</p>
                  <p className="text-sm text-muted-foreground">Placements</p>
                </div>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Student Progress</TabsTrigger>
              <TabsTrigger value="recruiters">Recruiter Engagement</TabsTrigger>
              <TabsTrigger value="jobs">Job Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Platform Growth Over Time
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="hsl(158 100% 44%)" strokeWidth={2} />
                    <Line type="monotone" dataKey="placements" stroke="hsl(160 66% 46%)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Jobs by Category
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="jobs" fill="hsl(158 100% 44%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Application Status Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Student Application Trends
                </h3>
                <p className="text-muted-foreground">
                  Detailed student progress and application statistics will be displayed here
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="recruiters">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Recruiter Activity Metrics
                </h3>
                <p className="text-muted-foreground">
                  Recruiter engagement and hiring statistics will be displayed here
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="jobs">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Job Posting Analytics
                </h3>
                <p className="text-muted-foreground">
                  Detailed job posting statistics and trends will be displayed here
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Analytics;
