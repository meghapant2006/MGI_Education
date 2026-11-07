export interface SyllabusModule {
  title: string;
  topics: string[];
}

export interface Course {
  _id: string;
  title: string;
  shortName: string;
  slug: string;
  category: 'university' | 'nios' | 'computer';
  level: 'UG' | 'PG' | '10th' | '12th' | 'diploma' | 'certificate' | 'vocational';
  duration: string;
  eligibility: string;
  description: string;
  highlights: string[];
  syllabus: SyllabusModule[];
  feeRange: string;
  mode: string;
  featured: boolean;
  active: boolean;
  order: number;
}

export interface Inquiry {
  _id: string;
  referenceNumber: string;
  fullName: string;
  phone: string;
  email?: string;
  category: 'university' | 'nios' | 'computer' | 'general';
  courseInterest: string;
  highestQualification?: string;
  city?: string;
  message?: string;
  status: 'NEW' | 'CONTACTED' | 'COUNSELING' | 'ENROLLED' | 'REJECTED';
  counselorNotes?: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  studentName: string;
  fatherName?: string;
  rollNumber: string;
  certificateNumber: string;
  courseName: string;
  courseCategory: string;
  grade: string;
  issueDate: string;
  completionYear: string;
  center: string;
  status: 'VALID' | 'REVOKED';
}

export interface Notice {
  _id: string;
  title: string;
  category: 'admission' | 'exam' | 'result' | 'general';
  content: string;
  urgent: boolean;
  active: boolean;
  link?: string;
  publishDate: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'superadmin' | 'counselor';
  lastLogin?: string;
}
