import { Course, Inquiry, Certificate, Notice, AdminUser } from '../types';

const API_BASE = '/api/v1';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('mgi_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // Public Courses
  async getCourses(params?: { category?: string; level?: string; search?: string; featured?: boolean }): Promise<{ count: number; courses: Course[] }> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.level) query.append('level', params.level);
    if (params?.search) query.append('search', params.search);
    if (params?.featured) query.append('featured', 'true');

    const res = await fetch(`${API_BASE}/courses?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch courses');
    return res.json();
  },

  async getCourseBySlug(slug: string): Promise<{ course: Course }> {
    const res = await fetch(`${API_BASE}/courses/${slug}`);
    if (!res.ok) throw new Error('Course not found');
    return res.json();
  },

  // Public Notices
  async getNotices(): Promise<{ count: number; notices: Notice[] }> {
    const res = await fetch(`${API_BASE}/notices`);
    if (!res.ok) throw new Error('Failed to fetch notices');
    return res.json();
  },

  // Public Inquiries
  async submitInquiry(data: {
    fullName: string;
    phone: string;
    email?: string;
    category?: string;
    courseInterest: string;
    highestQualification?: string;
    city?: string;
    message?: string;
    source?: string;
  }): Promise<{ success: boolean; message: string; referenceNumber: string; inquiry: Inquiry }> {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to submit inquiry');
    return json;
  },

  // Public Certificate Verification
  async verifyCertificate(query: string): Promise<{ success: boolean; verified: boolean; certificate: Certificate; message?: string }> {
    const res = await fetch(`${API_BASE}/certificates/verify/${encodeURIComponent(query)}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Verification lookup failed');
    return json;
  },

  // Admin Auth
  async login(usernameOrEmail: string, password: string): Promise<{ token: string; admin: AdminUser }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail, password })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Invalid credentials');
    return json;
  },

  async getProfile(): Promise<{ admin: AdminUser }> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },

  // Admin Dashboard Stats
  async getDashboardStats(): Promise<any> {
    const res = await fetch(`${API_BASE}/stats/dashboard`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    return res.json();
  },

  // Admin Inquiries
  async getAdminInquiries(params?: { status?: string; category?: string; search?: string; page?: number }): Promise<{
    total: number;
    page: number;
    totalPages: number;
    inquiries: Inquiry[];
  }> {
    const query = new URLSearchParams();
    if (params?.status) query.append('status', params.status);
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.page) query.append('page', params.page.toString());

    const res = await fetch(`${API_BASE}/inquiries?${query.toString()}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    return res.json();
  },

  async updateInquiryStatus(id: string, data: { status?: string; counselorNotes?: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteInquiry(id: string): Promise<any> {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Admin Courses Management
  async createCourse(course: Partial<Course>): Promise<any> {
    const res = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(course)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create course');
    return json;
  },

  async updateCourse(id: string, course: Partial<Course>): Promise<any> {
    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(course)
    });
    return res.json();
  },

  async deleteCourse(id: string): Promise<any> {
    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Admin Certificates Management
  async getAdminCertificates(search?: string): Promise<{ certificates: Certificate[] }> {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    const res = await fetch(`${API_BASE}/certificates${query}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async createCertificate(data: any): Promise<any> {
    const res = await fetch(`${API_BASE}/certificates`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to issue certificate');
    return json;
  },

  // Admin Notices Management
  async createNotice(data: any): Promise<any> {
    const res = await fetch(`${API_BASE}/notices`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteNotice(id: string): Promise<any> {
    const res = await fetch(`${API_BASE}/notices/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  }
};
