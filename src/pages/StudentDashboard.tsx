import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { JobCard } from "@/components/JobCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
import {
  BriefcaseIcon,
  FileText,
  Award,
  TrendingUp,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const recommendedJobs = [
  {
    title: "Frontend Developer Intern",
    company: "Tech Solutions Inc",
    location: "Remote",
    type: "Internship",
    salary: "$800/month",
    skills: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Data Analyst Intern",
    company: "Data Insights Co",
    location: "Hybrid",
    type: "Internship",
    salary: "$1000/month",
    skills: ["Python", "SQL", "Excel"],
  },
  {
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "On-site",
    type: "Full-time",
    salary: "$2500/month",
    skills: ["Figma", "Adobe XD", "Prototyping"],
  },
];

const applications = [
  { id: 1, job: "Frontend Developer Intern", company: "Tech Solutions", status: "Under Review", date: "2024-01-15" },
  { id: 2, job: "Backend Developer", company: "Cloud Systems", status: "Interview Scheduled", date: "2024-01-10" },
  { id: 3, job: "Full Stack Developer", company: "StartUp Hub", status: "Applied", date: "2024-01-08" },
];

const analyticsData = [
  { name: "Applied", value: 12 },
  { name: "Under Review", value: 5 },
  { name: "Interview", value: 3 },
  { name: "Rejected", value: 2 },
];

const StudentDashboard = () => {
  const { toast } = useToast();
  const [profileCompletion] = useState(75);

  const handleApply = (jobTitle: string) => {
    toast({
      title: "Application Submitted!",
      description: `Your application for ${jobTitle} has been submitted successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Student!
            </h1>
            <p className="text-muted-foreground">
              Track your applications and discover new opportunities
            </p>
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
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-sm text-muted-foreground">Active Applications</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-secondary/10">
                      <FileText className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">3</p>
                      <p className="text-sm text-muted-foreground">Interview Scheduled</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">8</p>
                      <p className="text-sm text-muted-foreground">Skills Matched</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedJobs.map((job) => (
                  <JobCard
                    key={job.title}
                    {...job}
                    onApply={() => handleApply(job.title)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Your Applications
                </h3>
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
                        <TableCell className="font-medium">{app.job}</TableCell>
                        <TableCell>{app.company}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{app.status}</Badge>
                        </TableCell>
                        <TableCell>{app.date}</TableCell>
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
                    <h3 className="text-xl font-semibold text-foreground">
                      John Doe
                    </h3>
                    <p className="text-muted-foreground">student@example.com</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Profile Completion</span>
                      <span className="text-sm text-muted-foreground">{profileCompletion}%</span>
                    </div>
                    <Progress value={profileCompletion} className="h-2" />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Node.js", "Python", "SQL"].map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Resume</h4>
                    <Button variant="outline">Upload Resume</Button>
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
