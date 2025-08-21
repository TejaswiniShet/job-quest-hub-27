import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Plus, Edit, Trash2, Users, Briefcase } from "lucide-react";
import { User, Job } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface EmployerDashboardProps {
  user: User | null;
}

const EmployerDashboard = ({ user }: EmployerDashboardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    salary: "",
    type: ""
  });

  // Redirect if not employer
  if (!user || user.role !== "employer") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header user={user} />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                This page is only accessible to employers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/login")} className="w-full">
                Login as Employer
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.company || !formData.description || !formData.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newJob: Job = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      company: formData.company,
      location: formData.location,
      description: formData.description,
      requirements: formData.requirements.split(',').map(req => req.trim()).filter(req => req),
      salary: formData.salary,
      type: formData.type as Job['type'],
      postedDate: new Date().toISOString().split('T')[0],
      employerId: user.id
    };

    setJobs([newJob, ...jobs]);
    setFormData({
      title: "",
      company: "",
      location: "",
      description: "",
      requirements: "",
      salary: "",
      type: ""
    });
    setShowJobForm(false);

    toast({
      title: "Job Posted!",
      description: "Your job listing has been published successfully"
    });
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast({
      title: "Job Deleted",
      description: "Job listing has been removed"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome back, {user.email}
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your job listings and find the perfect candidates
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobs.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jobs This Month</CardTitle>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobs.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="jobs" className="space-y-6">
            <TabsList>
              <TabsTrigger value="jobs">My Jobs</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-6">
              {/* Post Job Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Job Listings</h2>
                <Button 
                  onClick={() => setShowJobForm(!showJobForm)}
                  className="btn-hero"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </div>

              {/* Job Form */}
              {showJobForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>Post a New Job</CardTitle>
                    <CardDescription>Fill in the details for your job listing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitJob} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Job Title *</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Senior Frontend Developer"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Company Name *</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Your company name"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. San Francisco, CA or Remote"
                          />
                        </div>
                        <div>
                          <Label htmlFor="salary">Salary Range</Label>
                          <Input
                            id="salary"
                            value={formData.salary}
                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                            placeholder="e.g. $80k - $120k"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="type">Job Type *</Label>
                        <Select 
                          value={formData.type} 
                          onValueChange={(value) => setFormData({ ...formData, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="description">Job Description *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Describe the role, responsibilities, and what you're looking for..."
                          className="min-h-[100px]"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                        <Input
                          id="requirements"
                          value={formData.requirements}
                          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                          placeholder="React, TypeScript, 3+ years experience"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" className="btn-hero">
                          Post Job
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowJobForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Job Listings */}
              <div className="space-y-4">
                {jobs.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No job listings yet</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Start by posting your first job to attract talented candidates
                      </p>
                      <Button onClick={() => setShowJobForm(true)} className="btn-hero">
                        Post Your First Job
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  jobs.map((job) => (
                    <Card key={job.id} className="job-card">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                            <p className="text-muted-foreground">{job.company} • {job.location}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="secondary">{job.type}</Badge>
                              {job.salary && <Badge variant="outline">{job.salary}</Badge>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteJob(job.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{job.description}</p>
                        <div className="text-sm text-muted-foreground">
                          Posted: {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Applications</CardTitle>
                  <CardDescription>Review applications for your job postings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
                    <p className="text-muted-foreground">
                      Applications will appear here once job seekers start applying
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EmployerDashboard;