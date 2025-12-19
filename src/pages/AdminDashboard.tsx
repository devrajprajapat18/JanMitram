import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  BriefcaseIcon,
  Award,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useToast } from "@/hooks/use-toast";

const stats = [
  { icon: Users, title: "Total Students", value: "1,247", trend: "+12% this month" },
  { icon: Building2, title: "Active Recruiters", value: "156", trend: "+8% this month" },
  { icon: BriefcaseIcon, title: "Ongoing Drives", value: "42", trend: "5 ending soon" },
  { icon: Award, title: "Certificates Issued", value: "892", trend: "+24% this month" },
];

const pieData = [
  { name: "Tech", value: 45 },
  { name: "Finance", value: 25 },
  { name: "Marketing", value: 15 },
  { name: "Others", value: 15 },
];

const barData = [
  { month: "Jan", placements: 45 },
  { month: "Feb", placements: 52 },
  { month: "Mar", placements: 68 },
  { month: "Apr", placements: 72 },
  { month: "May", placements: 85 },
  { month: "Jun", placements: 95 },
];

const COLORS = ["hsl(158 100% 44%)", "hsl(160 66% 46%)", "hsl(166 95% 20%)", "hsl(144 30% 70%)"];

const pendingApprovals = [
  { id: 1, type: "Student", name: "John Doe", email: "john@example.com", status: "Pending" },
  { id: 2, type: "Recruiter", name: "Tech Corp", email: "hr@techcorp.com", status: "Pending" },
  { id: 3, type: "Job Posting", name: "Frontend Developer", company: "StartUp Inc", status: "Pending" },
];

const AdminDashboard = () => {
  const { toast } = useToast();

  const handleApprove = (name: string) => {
    toast({
      title: "Approved",
      description: `${name} has been approved successfully.`,
    });
  };

  const handleReject = (name: string) => {
    toast({
      title: "Rejected",
      description: `${name} has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage platform operations and monitor performance
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Recruiter Engagement by Industry
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

                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Placement Statistics
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="placements" fill="hsl(158 100% 44%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Student Management
                </h3>
                <p className="text-muted-foreground">
                  View and manage student eligibility and profiles
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="recruiters">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Recruiter Management
                </h3>
                <p className="text-muted-foreground">
                  View and verify recruiter accounts and job postings
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="approvals">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Pending Approvals
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Badge variant="outline">{item.type}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-sm">
                          {item.email || item.company || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{item.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApprove(item.name)}
                              className="text-accent border-accent hover:bg-accent hover:text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(item.name)}
                              className="text-destructive border-destructive hover:bg-destructive hover:text-white"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;