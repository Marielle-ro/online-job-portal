export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  companyEmail: string;
  description: string;
  website: string;
  address: string;
  industry: string;
  logoUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  location: string;
  deadline: string;
  status: 'active' | 'closed';
  postedDate: string;
  category: string;
  employmentType: string;
  experience: string;
  benefits: string[];
  responsibilities: string[];
}

export interface Application {
  id: string;
  jobId: string;
  job: {
    title: string;
    company: string;
    location: string;
    employmentType: string;
  };
  candidateName: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
  education: {
    degree: string;
    institution: string;
    graduationYear: string;
  };
  coverLetter?: string;
  resumeUrl: string;
  status: 'pending' | 'under_review' | 'interview_scheduled' | 'offer_made' | 'rejected';
  appliedDate: string;
  portfolio?: string;
  references?: {
    name: string;
    position: string;
    company: string;
    phone: string;
    email: string;
  }[];
}

export interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
}