import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { User, FileText, Briefcase, Search } from "lucide-react";
import { User as UserType, Job, UserProfile } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface JobSeekerDashboardProps {
  user: UserType | null;
}

// Mock recommended jobs
const recommendedJobs: Job[] = [
  {
    id: "rec1",
    title: "Frontend Developer",
    company: "TechStart",
    location: "Remote",
    description: "Join our team as a Frontend Developer working on cutting-edge React applications...",
    requirements: ["React", "JavaScript", "CSS"],
    salary: "$70k - $90k",
    type: "full-time",
    postedDate: "2024-01-15",
    employerId: "emp1"
  },
  {
    id: "rec2",
    title: "Junior UX Designer",
    company: "Creative Agency",
    location: "Austin, TX",
    description: "We're looking for a creative UX Designer to help shape user experiences...",
    requirements: ["Figma", "User Research", "Prototyping"],
    salary: "$60k - $75k",
    type: "full-time",
    postedDate: "2024-01-14",
    employerId: "emp2"
  }
];

const JobSeekerDashboard = ({ user }: JobSeekerDashboardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    phone: "",
    qualifications: "",
    skills: [],
    resume: ""
  });
  const [skillInput, setSkillInput] = useState("");

  // Redirect if not job seeker
  if (!user || user.role !== "job_seeker") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header user={user} />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                This page is only accessible to job seekers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/login")} className="w-full">
                Login as Job Seeker
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile.name) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Profile Updated!",
      description: "Your profile has been saved successfully"
    });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !profile.skills?.includes(skillInput.trim())) {
      setProfile({
        ...profile,
        skills: [...(profile.skills || []), skillInput.trim()]
      });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills?.filter(skill => skill !== skillToRemove) || []
    });
  };

  const handleApplyToJob = (jobId: string) => {
    toast({
      title: "Application Submitted!",
      description: "Your application has been sent to the employer"
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
              Welcome, {profile.name || user.email}
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your profile and discover your next opportunity
            </p>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">My Profile</TabsTrigger>
              <TabsTrigger value="recommended">Recommended Jobs</TabsTrigger>
              <TabsTrigger value="applications">My Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Keep your profile up to date to get better job recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="qualifications">Qualifications</Label>
                      <Textarea
                        id="qualifications"
                        value={profile.qualifications}
                        onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
                        placeholder="Your education, certifications, etc."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="skills">Skills</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          placeholder="Add a skill"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                        />
                        <Button type="button" onClick={handleAddSkill} variant="outline">
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills?.map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="cursor-pointer"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            {skill} ×
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="resume">Resume/Portfolio Link</Label>
                      <Input
                        id="resume"
                        value={profile.resume}
                        onChange={(e) => setProfile({ ...profile, resume: e.target.value })}
                        placeholder="Link to your resume or portfolio"
                      />
                    </div>

                    <Button type="submit" className="btn-hero">
                      Update Profile
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommended" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Recommended for You</h2>
                <Button variant="outline" onClick={() => navigate('/jobs')}>
                  <Search className="h-4 w-4 mr-2" />
                  Browse All Jobs
                </Button>
              </div>

              <div className="grid gap-6">
                {recommendedJobs.map((job) => (
                  <Card key={job.id} className="job-card">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                          <p className="text-muted-foreground mb-2">
                            {job.company} • {job.location}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary">{job.type}</Badge>
                            {job.salary && <Badge variant="outline">{job.salary}</Badge>}
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleApplyToJob(job.id)}
                          className="btn-apply ml-4"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      <div>
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>My Applications</CardTitle>
                  <CardDescription>Track the status of your job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start applying to jobs to see your applications here
                    </p>
                    <Button onClick={() => navigate('/jobs')} className="btn-hero">
                      Browse Jobs
                    </Button>
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

export default JobSeekerDashboard;