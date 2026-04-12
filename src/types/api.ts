export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  skills: string[];
  description: string;
  recruiterId: string;
  createdAt: string;
}

export interface StudentApplication {
  id: string;
  status: string;
  appliedAt: string;
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
  };
}

export interface RecruiterApplication {
  id: string;
  status: string;
  appliedAt: string;
  job: {
    _id: string;
    title: string;
    company: string;
    recruiterId?: string;
  };
  student: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface AdminSummary {
  students: number;
  recruiters: number;
  jobs: number;
  applications: number;
}
