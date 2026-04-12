import type { AdminSummary, Job, RecruiterApplication, StudentApplication } from "@/types/api";
import type { AuthResponse, UserRole } from "@/types/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("janmitram_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.message || "Request failed";
    throw new Error(message);
  }

  return data as T;
}

export async function signup(payload: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  return request<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function login(payload: { email: string; password: string }) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getJobs() {
  return request<Job[]>("/jobs");
}

export async function createJob(payload: {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  skills: string[];
  description: string;
}) {
  return request<Job>("/jobs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function applyToJob(jobId: string) {
  return request<{ _id: string; status: string }>("/applications", {
    method: "POST",
    body: JSON.stringify({ jobId }),
  });
}

export async function getMyApplications() {
  return request<StudentApplication[]>("/applications/mine");
}

export async function getRecruiterApplications() {
  return request<RecruiterApplication[]>("/applications/recruiter");
}

export async function getAdminSummary() {
  return request<AdminSummary>("/analytics/summary");
}
