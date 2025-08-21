import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Search, MapPin, Clock, Building, Filter } from "lucide-react";
import { User, Job } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface JobsProps {
  user: User | null;
}

// Mock job data
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    description: "We are looking for a senior frontend developer to join our growing team...",
    requirements: ["React", "TypeScript", "5+ years experience"],
    salary: "$120k - $150k",
    type: "full-time",
    postedDate: "2024-01-15",
    employerId: "emp1"
  },
  {
    id: "2", 
    title: "Product Manager",
    company: "Startup Labs",
    location: "New York, NY",
    description: "Join us as a Product Manager to drive product strategy and growth...",
    requirements: ["Product Management", "Agile", "3+ years experience"],
    salary: "$100k - $130k",
    type: "full-time",
    postedDate: "2024-01-14",
    employerId: "emp2"
  },
  {
    id: "3",
    title: "UX Designer",
    company: "Design Studio",
    location: "Remote",
    description: "Creative UX designer needed for innovative projects...",
    requirements: ["Figma", "User Research", "2+ years experience"],
    salary: "$80k - $100k",
    type: "contract",
    postedDate: "2024-01-13",
    employerId: "emp3"
  }
];

const Jobs = ({ user }: JobsProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [jobs] = useState<Job[]>(mockJobs);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  const handleApply = (jobId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login as a job seeker to apply for jobs",
        variant: "destructive"
      });
      return;
    }

    if (user.role !== "job_seeker") {
      toast({
        title: "Access Denied",
        description: "Only job seekers can apply for jobs",
        variant: "destructive"
      });
      return;
    }

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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Find Your Next Job</h1>
            <p className="text-xl text-muted-foreground">
              Discover amazing opportunities from top companies
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8 shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search jobs or companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="san francisco">San Francisco</SelectItem>
                    <SelectItem value="new york">New York</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Job Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="job-card">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <Building className="h-4 w-4 mr-2" />
                          <span className="mr-4">{job.company}</span>
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="mr-4">{job.location}</span>
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{job.type}</Badge>
                          {job.salary && <Badge variant="outline">{job.salary}</Badge>}
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleApply(job.id)}
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
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-foreground mb-2">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;