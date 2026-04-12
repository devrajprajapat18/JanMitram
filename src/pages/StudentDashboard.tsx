import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { JobCard } from "@/components/JobCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BriefcaseIcon, FileText, Award, TrendingUp, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { applyToJob, getJobs, getMyApplications } from "@/lib/api";
import type { Job, StudentApplication } from "@/types/api";
import { useAuth } from "@/context/useAuth";

const StudentDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const analyticsData = useMemo(() => {
    const statusCount = new Map<string, number>();
    for (const item of applications) {
      statusCount.set(item.status, (statusCount.get(item.status) || 0) + 1);
    }

    return Array.from(statusCount.entries()).map(([name, value]) => ({ name, value }));
  }, [applications]);

  useEffect(() => {
    async function loadData() {
      try {
        const [jobsResult, appsResult] = await Promise.all([getJobs(), getMyApplications()]);
        setJobs(jobsResult);
        setApplications(appsResult);
      } catch (error) {
        toast({
          title: "Failed to load dashboard",
          description: error instanceof Error ? error.message : "Please refresh and try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [toast]);

  async function handleApply(jobId: string) {
    try {
      await applyToJob(jobId);
      const updatedApps = await getMyApplications();
      setApplications(updatedApps);
      toast({
        title: "Application submitted",
        description: "Your application has been recorded successfully.",
      });
    } catch (error) {
      toast({
        title: "Could not apply",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  }

  const appliedJobIds = new Set(applications.map((item) => item.job?._id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name || "Student"}!</h1>
            <p className="text-muted-foreground">Track your applications and discover opportunities.</p>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-accent/10">
                      <BriefcaseIcon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{applications.length}</p>
                      <p className="text-sm text-muted-foreground">Applications</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-secondary/10">
                      <FileText className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{jobs.length}</p>
                      <p className="text-sm text-muted-foreground">Open Jobs</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{analyticsData.length}</p>
                      <p className="text-sm text-muted-foreground">Status Buckets</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Application Analytics
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(158 100% 44%)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities">
              {isLoading ? (
                <Card className="p-6">Loading jobs...</Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <JobCard
                      key={job._id}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      type={job.type}
                      salary={job.salary}
                      skills={job.skills}
                      isApplied={appliedJobIds.has(job._id)}
                      onApply={appliedJobIds.has(job._id) ? undefined : () => handleApply(job._id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="applications">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Your Applications</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Applied</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.job?.title || "N/A"}</TableCell>
                        <TableCell>{app.job?.company || "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{app.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-full bg-accent/10">
                    <User className="h-12 w-12 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{user?.name || "Student"}</h3>
                    <p className="text-muted-foreground">{user?.email || "student@example.com"}</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
