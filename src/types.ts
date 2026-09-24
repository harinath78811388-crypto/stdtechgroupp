/**
 * STDTech Group Pvt Ltd — Global TypeScript Types & Interfaces
 * Domain: https://stdtechgroup.com
 * Tagline: Technology | Innovation | Impact
 */

export type UserRole = 'admin' | 'staff' | 'student' | 'customer';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  icon: string;
  features: string[];
  techStack: string[];
  process: { step: number; title: string; desc: string }[];
  benefits: string[];
  displayOrder: number;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technology: string[];
  status: 'COMING SOON' | 'Active Prototype' | 'In Development' | 'Internal Alpha';
  demoUrl?: string;
  githubUrl?: string;
  isFeatured?: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  technology: string[];
  details: string;
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  status: string;
}

export interface CourseItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  overview: string;
  curriculum: { module: string; topics: string[] }[];
  duration: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  learningOutcomes: string[];
  projects: string[];
  certificateIncluded: boolean;
  isActive: boolean;
}

export interface CertificateItem {
  id: string;
  certificateId: string; // e.g. STDT-2026-00001
  studentName: string;
  courseTitle: string;
  courseDuration: string;
  completionDate: string;
  issuingOrganization: string;
  status: 'valid' | 'revoked';
  qrCodePayload: string;
  verificationHash: string;
  createdAt: string;
}

export interface JobItem {
  id: string;
  title: string;
  department: string;
  jobType: 'Full-time' | 'Internship' | 'Part-time' | 'Contract';
  experienceLevel: 'Fresher' | 'Intern' | 'Experienced';
  workplaceType: 'Remote' | 'On-site' | 'Hybrid';
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  isActive: boolean;
  createdAt: string;
}

export interface ApplicationItem {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experienceYears: string;
  education: string;
  resumeFileName?: string;
  portfolioUrl?: string;
  coverMessage: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  createdAt: string;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  authorName: string;
  readingTime: string;
  publishedAt: string;
  tags: string[];
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  service?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface SupportTicketItem {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved';
  adminReply?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AuditLogItem {
  id: string;
  userEmail: string;
  action: string;
  entity: string;
  details: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'alert';
  isRead: boolean;
  createdAt: string;
}

export interface StudentEnrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  enrolledAt: string;
  progressPercentage: number;
  status: 'In Progress' | 'Completed';
  certificateId?: string;
}
