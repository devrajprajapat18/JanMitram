import { useState } from "react";
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
import {
  BriefcaseIcon,
  Users,
  Calendar,
  CheckCircle,
  PlusCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const applicants = [
  { id: 1, name: "Alice Johnson", position: "Frontend Developer", status: "Pending", skills: "React, TypeScript", experience: "2 years" },
  { id: 2, name: "Bob Smith", position: "Backend Developer", status: "Shortlisted", skills: "Node.js, MongoDB", experience: "3 years" },
  { id: 3, name: "Carol Williams", position: "Full Stack Developer", status: "Interview", skills: "React, Node.js", experience: "4 years" },
  { id: 4, name: "David Brown", position: "UI/UX Designer", status: "Pending", skills: "Figma, Adobe XD", experience: "1.5 years" },
];

const RecruiterDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Job Posted Successfully!",
      description: "Your job listing is now live and visible to candidates.",
    });
  };

  const handleShortlist = (name: string) => {
    toast({
      title: "Candidate Shortlisted",
      description: `${name} has been added to your shortlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Recruiter Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your job postings and find the best talent
            </p>
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
                      <p className="text-2xl font-bold text-foreground">8</p>
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
                      <p className="text-2xl font-bold text-foreground">42</p>
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
                      <p className="text-2xl font-bold text-foreground">15</p>
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
                      <p className="text-2xl font-bold text-foreground">5</p>
                      <p className="text-sm text-muted-foreground">Interviews This Week</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="p-2 rounded-full bg-accent/10">
                      <Users className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New application received</p>
                      <p className="text-xs text-muted-foreground">Frontend Developer position</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <Calendar className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Interview scheduled</p>
                      <p className="text-xs text-muted-foreground">Bob Smith - Backend Developer</p>
                    </div>
                    <span className="text-xs text-muted-foreground">5 hours ago</span>
                  </div>
                </div>
              </Card>
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
                      <Input id="title" placeholder="e.g. Frontend Developer" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g. Remote, Hybrid" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary Range</Label>
                      <Input id="salary" placeholder="e.g. $800-1200/month" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input id="deadline" type="date" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills</Label>
                    <Input id="skills" placeholder="e.g. React, TypeScript, Tailwind CSS" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the role, responsibilities, and requirements..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="gradient-primary">
                    Post Job
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="applicants">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  All Applicants
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicants.map((applicant) => (
                      <TableRow key={applicant.id}>
                        <TableCell className="font-medium">{applicant.name}</TableCell>
                        <TableCell>{applicant.position}</TableCell>
                        <TableCell className="text-sm">{applicant.skills}</TableCell>
                        <TableCell>{applicant.experience}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{applicant.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleShortlist(applicant.name)}
                          >
                            Shortlist
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="shortlisted">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Shortlisted Candidates
                </h3>
                <p className="text-muted-foreground">
                  Your shortlisted candidates will appear here
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Interview Schedule
                </h3>
                <p className="text-muted-foreground">
                  Manage your interview calendar here
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
