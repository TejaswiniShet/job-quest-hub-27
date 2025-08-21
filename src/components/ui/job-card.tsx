import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Clock } from "lucide-react";
import { Job } from "@/types";

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  showApplyButton?: boolean;
}

export function JobCard({ job, onApply, showApplyButton = true }: JobCardProps) {
  return (
    <Card className="job-card">
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
          {showApplyButton && onApply && (
            <Button 
              onClick={() => onApply(job.id)}
              className="btn-apply ml-4"
            >
              Apply Now
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4">{job.description}</p>
        {job.requirements.length > 0 && (
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
        )}
      </CardContent>
    </Card>
  );
}