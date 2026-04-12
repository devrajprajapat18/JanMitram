import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { BriefcaseIcon, Users, Calendar, CheckCircle, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createJob, getJobs, getRecruiterApplications } from "@/lib/api";
import type { Job, RecruiterApplication } from "@/types/api";

const RecruiterDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<RecruiterApplication[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [jobsResult, appsResult] = await Promise.all([getJobs(), getRecruiterApplications()]);
        setJobs(jobsResult);
        setApplications(appsResult);
      } catch (error) {
        toast({
          title: "Failed to load recruiter dashboard",
          description: error instanceof Error ? error.message : "Please refresh and try again.",
          variant: "destructive",
        });
      }
    }

    loadData();
  }, [toast]);

  const shortlistedCount = useMemo(
    () => applications.filter((application) => ["Interview Scheduled", "Selected"].includes(application.status)).length,
    [applications]
  );

  async function handlePostJob(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const title = String(form.get("title") || "").trim();
    const company = String(form.get("company") || "").trim();
    const location = String(form.get("location") || "").trim();
    const salary = String(form.get("salary") || "").trim();
    const type = String(form.get("type") || "").trim();
    const skills = String(form.get("skills") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const description = String(form.get("description") || "").trim();

    setIsSaving(true);
    try {
      await createJob({ title, company, location, salary, type, skills, description });
      const jobsResult = await getJobs();
      setJobs(jobsResult);
      toast({
        title: "Job posted",
        description: "The job is now visible to students.",
      });
      e.currentTarget.reset();
      setActiveTab("overview");
    } catch (error) {
      toast({
        title: "Failed to post job",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">Manage jobs and review applicants with real backend data.</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="post-job">Post Job</TabsTrigger>
              <TabsTrigger value="applicants">Applicants</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-accent/10">
                      <BriefcaseIcon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{jobs.length}</p>
                      <p className="text-sm text-muted-foreground">Active Jobs</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-secondary/10">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{applications.length}</p>
                      <p className="text-sm text-muted-foreground">Total Applicants</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{shortlistedCount}</p>
                      <p className="text-sm text-muted-foreground">Shortlisted</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-accent/10">
                      <Calendar className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{applications.length}</p>
                      <p className="text-sm text-muted-foreground">Pipeline</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="post-job">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <PlusCircle className="h-6 w-6 text-accent" />
                  Post a New Job
                </h3>
                <form onSubmit={handlePostJob} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input id="title" name="title" placeholder="e.g. Frontend Developer" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" placeholder="e.g. JanMitram Labs" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" placeholder="Remote" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary Range</Label>
                      <Input id="salary" name="salary" placeholder="$800-1200/month" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Input id="type" name="type" placeholder="Internship" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills</Label>
                    <Input id="skills" name="skills" placeholder="React, TypeScript, Tailwind" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the role, responsibilities, and requirements..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="gradient-primary" disabled={isSaving}>
                    {isSaving ? "Posting..." : "Post Job"}
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="applicants">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">All Applicants</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.student?.name || "N/A"}</TableCell>
                        <TableCell>{application.student?.email || "N/A"}</TableCell>
                        <TableCell>{application.job?.title || "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{application.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="shortlisted">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Shortlisted Candidates</h3>
                <p className="text-muted-foreground">Candidates with interview or selected status will appear here.</p>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Interview Schedule</h3>
                <p className="text-muted-foreground">Schedule module can now be added using backend appointment APIs.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
