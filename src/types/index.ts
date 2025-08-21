export interface User {
  id: string;
  email: string;
  role: "employer" | "job_seeker";
  profile?: UserProfile;
}

export interface UserProfile {
  name: string;
  phone?: string;
  qualifications?: string;
  skills?: string[];
  resume?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  postedDate: string;
  employerId: string;
  applications?: Application[];
}

export interface Application {
  id: string;
  jobId: string;
  jobSeekerEmail: string;
  appliedDate: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}