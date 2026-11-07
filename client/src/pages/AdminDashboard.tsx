import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  ShieldCheck,
  Bell,
  Search,
  Filter,
  Download,
  Phone,
  MessageCircle,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  LogOut,
  ExternalLink,
  ChevronRight,
  Edit,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Inquiry, Course, Certificate, Notice } from '../types';

export const AdminDashboard: React.FC = () => {
  const { user, token, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'leads' | 'courses' | 'certificates' | 'notices'>('leads');

  // Stats
  const [stats, setStats] = useState<any>(null);

  // Leads
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [leadStatusFilter, setLeadStatusFilter] = useState('ALL');
  const [leadCategoryFilter, setLeadCategoryFilter] = useState('ALL');
  const [leadSearch, setLeadSearch] = useState('');
  const [leadsLoading, setLeadsLoading] = useState(false);

  // Notes editing state
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Courses
  const [courses, setCourses] = useState<Course[]>([]);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    shortName: '',
    slug: '',
    category: 'university' as const,
    level: 'UG' as const,
    duration: '',
    eligibility: '',
    description: '',
    feeRange: 'Consult Desk',
    mode: 'Distance / Online'
  });

  // Certificates
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showAddCert, setShowAddCert] = useState(false);
  const [newCert, setNewCert] = useState({
    studentName: '',
    fatherName: '',
    rollNumber: '',
    certificateNumber: '',
    courseName: '',
    courseCategory: 'computer' as const,
    grade: 'A+ (Distinction)',
    completionYear: `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`,
    center: 'MGI Education, Mayur Vihar-3, Delhi'
  });

  // Notices
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'admission' as const,
    content: '',
    urgent: false
  });

  // Check auth
  useEffect(() => {
    if (!authLoading && !token) {
      navigate('/admin/login');
    }
  }, [authLoading, token, navigate]);

  // Load stats and active tab data
  useEffect(() => {
    if (token) {
      loadStats();
      if (activeTab === 'leads') loadLeads();
      if (activeTab === 'courses') loadCourses();
      if (activeTab === 'certificates') loadCertificates();
      if (activeTab === 'notices') loadNotices();
    }
  }, [token, activeTab, leadStatusFilter, leadCategoryFilter]);

  const loadStats = async () => {
    try {
      const res = await api.getDashboardStats();
      setStats(res.stats);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const loadLeads = async () => {
    try {
      setLeadsLoading(true);
      const res = await api.getAdminInquiries({
        status: leadStatusFilter,
        category: leadCategoryFilter,
        search: leadSearch
      });
      setInquiries(res.inquiries);
      setTotalLeads(res.total);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const res = await api.getCourses();
      setCourses(res.courses);
    } catch (err) {
      console.error('Failed to load courses:', err);
    }
  };

  const loadCertificates = async () => {
    try {
      const res = await api.getAdminCertificates();
      setCertificates(res.certificates);
    } catch (err) {
      console.error('Failed to load certificates:', err);
    }
  };

  const loadNotices = async () => {
    try {
      const res = await api.getNotices();
      setNotices(res.notices);
    } catch (err) {
      console.error('Failed to load notices:', err);
    }
  };

  // Lead Actions
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.updateInquiryStatus(id, { status: newStatus });
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus as any } : inq))
      );
      loadStats();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      await api.updateInquiryStatus(id, { counselorNotes: tempNotes });
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, counselorNotes: tempNotes } : inq))
      );
      setEditingNotesId(null);
    } catch (err) {
      alert('Failed to save notes');
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await api.deleteInquiry(id);
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      loadStats();
    } catch (err) {
      alert('Failed to delete inquiry');
    }
  };

  // Add Course
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createCourse({
        ...newCourse,
        highlights: ['UGC Recognized Guidance', 'Flexible Exam Support', 'Study Material Provided'],
        syllabus: []
      });
      setShowAddCourse(false);
      loadCourses();
      loadStats();
    } catch (err: any) {
      alert(err.message || 'Failed to create course');
    }
  };

  // Add Certificate
  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createCertificate(newCert);
      setShowAddCert(false);
      loadCertificates();
      loadStats();
    } catch (err: any) {
      alert(err.message || 'Failed to issue certificate');
    }
  };

  // Add Notice
  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createNotice(newNotice);
      setShowAddNotice(false);
      loadNotices();
      loadStats();
    } catch (err: any) {
      alert(err.message || 'Failed to post notice');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      {/* Top Header */}
      <header className="bg-navy-950 text-white py-4 px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="MGI Logo" className="h-10 w-auto object-contain" />
            <div>
              <h1 className="text-lg font-black tracking-tight leading-tight">
                MGI EDUCATION <span className="text-accent text-xs font-semibold ml-2">ADMIN PORTAL</span>
              </h1>
              <p className="text-xs text-slate-400">
                Logged in as: <strong className="text-white">{user?.fullName || user?.username}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-xl transition"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="inline-flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Total Leads</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">
                {stats?.totalInquiries ?? '...'}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
                +{stats?.newInquiriesToday ?? 0} today
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Active Courses</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">
                {stats?.totalCourses ?? '...'}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Degrees & Computer</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Valid Certificates</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">
                {stats?.totalCertificates ?? '...'}
              </span>
              <span className="text-[11px] text-emerald-600 block mt-0.5">Publicly verifiable</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Active Notices</span>
              <span className="text-3xl font-black text-slate-900 mt-1 block">
                {stats?.totalNotices ?? '...'}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Live on Homepage</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mt-8 space-x-2">
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3 px-5 font-bold text-sm border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'leads'
                ? 'border-brand-600 text-brand-600 bg-white rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Admission Inquiries CRM ({totalLeads})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3 px-5 font-bold text-sm border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'courses'
                ? 'border-brand-600 text-brand-600 bg-white rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Courses Catalog ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`py-3 px-5 font-bold text-sm border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'certificates'
                ? 'border-brand-600 text-brand-600 bg-white rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Student Certificates ({certificates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notices')}
            className={`py-3 px-5 font-bold text-sm border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'notices'
                ? 'border-brand-600 text-brand-600 bg-white rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Announcements & Ticker ({notices.length})</span>
          </button>
        </div>

        {/* TAB 1: LEADS CRM */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-b-2xl rounded-tr-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            {/* Filters & Export */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs font-bold text-slate-600">Status:</span>
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="text-xs bg-transparent outline-none font-semibold text-slate-800"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="COUNSELING">COUNSELING</option>
                    <option value="ENROLLED">ENROLLED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>

                <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                  <span className="text-xs font-bold text-slate-600">Category:</span>
                  <select
                    value={leadCategoryFilter}
                    onChange={(e) => setLeadCategoryFilter(e.target.value)}
                    className="text-xs bg-transparent outline-none font-semibold text-slate-800"
                  >
                    <option value="ALL">All Categories</option>
                    <option value="university">University</option>
                    <option value="nios">NIOS</option>
                    <option value="computer">Computer</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && loadLeads()}
                    className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href="/api/v1/inquiries/export/csv"
                  download="mgi_leads.csv"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV</span>
                </a>
              </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Ref No / Date</th>
                    <th className="py-3 px-4">Student Details</th>
                    <th className="py-3 px-4">Course Interest</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Counselor Notes</th>
                    <th className="py-3 px-4 text-right">Quick Contact / Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {leadsLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500">
                        Loading inquiries...
                      </td>
                    </tr>
                  ) : inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500">
                        No inquiries found matching the selected filters.
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((inq) => {
                      const isEditing = editingNotesId === inq._id;
                      return (
                        <tr key={inq._id} className="hover:bg-slate-50/70 transition">
                          {/* Ref No */}
                          <td className="py-3 px-4">
                            <span className="font-mono font-bold text-brand-700 block">{inq.referenceNumber}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </td>

                          {/* Student */}
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900 text-sm">{inq.fullName}</div>
                            <div className="text-slate-600 font-mono">{inq.phone}</div>
                            {inq.email && <div className="text-[10px] text-slate-400">{inq.email}</div>}
                          </td>

                          {/* Course */}
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-800 block">{inq.courseInterest}</span>
                            <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 inline-block mt-0.5">
                              {inq.category}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                              className={`text-[11px] font-black uppercase rounded-lg px-2.5 py-1 border outline-none cursor-pointer ${
                                inq.status === 'NEW'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : inq.status === 'CONTACTED'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : inq.status === 'COUNSELING'
                                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                                  : inq.status === 'ENROLLED'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border-rose-200'
                              }`}
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="COUNSELING">COUNSELING</option>
                              <option value="ENROLLED">ENROLLED</option>
                              <option value="REJECTED">REJECTED</option>
                            </select>
                          </td>

                          {/* Notes */}
                          <td className="py-3 px-4 max-w-xs">
                            {isEditing ? (
                              <div className="flex items-center space-x-1">
                                <input
                                  type="text"
                                  value={tempNotes}
                                  onChange={(e) => setTempNotes(e.target.value)}
                                  className="border border-brand-400 rounded px-2 py-1 text-xs w-full outline-none"
                                />
                                <button
                                  onClick={() => handleSaveNotes(inq._id)}
                                  className="bg-emerald-600 text-white p-1 rounded"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setEditingNotesId(null)}
                                  className="bg-slate-200 text-slate-600 p-1 rounded"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  setEditingNotesId(inq._id);
                                  setTempNotes(inq.counselorNotes || '');
                                }}
                                className="cursor-pointer text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-1 rounded group flex items-center justify-between"
                                title="Click to edit notes"
                              >
                                <span className="truncate max-w-[180px]">
                                  {inq.counselorNotes || <span className="text-slate-400 italic">Add notes...</span>}
                                </span>
                                <Edit className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 ml-1 shrink-0" />
                              </div>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <a
                                href={`https://wa.me/91${inq.phone}?text=Hello%20${encodeURIComponent(
                                  inq.fullName
                                )}%2C%20this%20is%20from%20MGI%20Education%20regarding%20your%20inquiry%20for%20${encodeURIComponent(
                                  inq.courseInterest
                                )}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-2 rounded-lg transition"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`tel:${inq.phone}`}
                                className="bg-brand-50 hover:bg-brand-100 text-brand-700 p-2 rounded-lg transition"
                                title="Call student"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => handleDeleteLead(inq._id)}
                                className="text-slate-400 hover:text-rose-600 p-2 rounded-lg transition"
                                title="Delete lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: COURSES CMS */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-b-2xl rounded-tr-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Manage Courses</h3>
                <p className="text-xs text-slate-500">Add or remove courses displayed on the public website.</p>
              </div>
              <button
                onClick={() => setShowAddCourse(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>

            {/* Courses Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Course Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Eligibility</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{course.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">slug: {course.slug}</span>
                      </td>
                      <td className="py-3 px-4 uppercase font-bold text-brand-700">{course.category}</td>
                      <td className="py-3 px-4 text-slate-600">{course.duration}</td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{course.eligibility}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={async () => {
                            if (confirm(`Delete course ${course.title}?`)) {
                              await api.deleteCourse(course._id);
                              loadCourses();
                            }
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Course Modal */}
            {showAddCourse && (
              <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900">Add New Course</h4>
                    <button onClick={() => setShowAddCourse(false)}><X className="w-5 h-5 text-slate-400" /></button>
                  </div>
                  <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold block mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        className="w-full border p-2 rounded"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold block mb-1">Short Name</label>
                        <input
                          type="text"
                          required
                          value={newCourse.shortName}
                          onChange={(e) => setNewCourse({ ...newCourse, shortName: e.target.value })}
                          className="w-full border p-2 rounded"
                        />
                      </div>
                      <div>
                        <label className="font-bold block mb-1">Slug</label>
                        <input
                          type="text"
                          required
                          value={newCourse.slug}
                          onChange={(e) => setNewCourse({ ...newCourse, slug: e.target.value })}
                          className="w-full border p-2 rounded"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold block mb-1">Category</label>
                        <select
                          value={newCourse.category}
                          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value as any })}
                          className="w-full border p-2 rounded bg-white"
                        >
                          <option value="university">University</option>
                          <option value="nios">NIOS</option>
                          <option value="computer">Computer</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-bold block mb-1">Duration</label>
                        <input
                          type="text"
                          required
                          value={newCourse.duration}
                          onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                          className="w-full border p-2 rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Eligibility</label>
                      <input
                        type="text"
                        required
                        value={newCourse.eligibility}
                        onChange={(e) => setNewCourse({ ...newCourse, eligibility: e.target.value })}
                        className="w-full border p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Description</label>
                      <textarea
                        rows={2}
                        required
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        className="w-full border p-2 rounded"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-lg"
                    >
                      Save Course
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="bg-white rounded-b-2xl rounded-tr-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Student Certificates & Roll Numbers</h3>
                <p className="text-xs text-slate-500">
                  Every issued certificate added here is instantly verifiable on the public `/verify-certificate` page.
                </p>
              </div>
              <button
                onClick={() => setShowAddCert(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Issue New Certificate</span>
              </button>
            </div>

            {/* Certificates Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Roll Number</th>
                    <th className="py-3 px-4">Certificate ID</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {certificates.map((cert) => (
                    <tr key={cert.rollNumber} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">{cert.studentName}</td>
                      <td className="py-3 px-4 font-mono font-bold text-brand-700">{cert.rollNumber}</td>
                      <td className="py-3 px-4 font-mono text-slate-600">{cert.certificateNumber}</td>
                      <td className="py-3 px-4 text-slate-800">{cert.courseName}</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">{cert.grade}</td>
                      <td className="py-3 px-4 text-slate-600">{cert.completionYear}</td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`/verify-certificate?roll=${encodeURIComponent(cert.rollNumber)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-600 hover:underline mr-2"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Certificate Modal */}
            {showAddCert && (
              <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900">Issue Student Certificate</h4>
                    <button onClick={() => setShowAddCert(false)}><X className="w-5 h-5 text-slate-400" /></button>
                  </div>
                  <form onSubmit={handleCreateCertificate} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold block mb-1">Student Full Name</label>
                      <input
                        type="text"
                        required
                        value={newCert.studentName}
                        onChange={(e) => setNewCert({ ...newCert, studentName: e.target.value })}
                        className="w-full border p-2 rounded"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold block mb-1">Roll Number</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. MGI-2026-001"
                          value={newCert.rollNumber}
                          onChange={(e) => setNewCert({ ...newCert, rollNumber: e.target.value })}
                          className="w-full border p-2 rounded font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-bold block mb-1">Certificate Number</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. CERT-9081"
                          value={newCert.certificateNumber}
                          onChange={(e) => setNewCert({ ...newCert, certificateNumber: e.target.value })}
                          className="w-full border p-2 rounded font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Course Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ADCA / Tally Prime"
                        value={newCert.courseName}
                        onChange={(e) => setNewCert({ ...newCert, courseName: e.target.value })}
                        className="w-full border p-2 rounded"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold block mb-1">Grade</label>
                        <input
                          type="text"
                          required
                          value={newCert.grade}
                          onChange={(e) => setNewCert({ ...newCert, grade: e.target.value })}
                          className="w-full border p-2 rounded"
                        />
                      </div>
                      <div>
                        <label className="font-bold block mb-1">Completion Year</label>
                        <input
                          type="text"
                          required
                          value={newCert.completionYear}
                          onChange={(e) => setNewCert({ ...newCert, completionYear: e.target.value })}
                          className="w-full border p-2 rounded"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg"
                    >
                      Issue & Register Online
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: NOTICES */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-b-2xl rounded-tr-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Manage Notices & Announcements</h3>
                <p className="text-xs text-slate-500">Notices appear on the top ticker and notices board.</p>
              </div>
              <button
                onClick={() => setShowAddNotice(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Post Notice</span>
              </button>
            </div>

            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n._id} className="p-4 rounded-xl border border-slate-200 flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                        {n.category}
                      </span>
                      {n.urgent && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700">
                          Urgent
                        </span>
                      )}
                      <span className="font-bold text-slate-900 text-sm">{n.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{n.content}</p>
                  </div>
                  <button
                    onClick={async () => {
                      if (confirm('Delete this notice?')) {
                        await api.deleteNotice(n._id);
                        loadNotices();
                      }
                    }}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Notice Modal */}
            {showAddNotice && (
              <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900">Post Announcement</h4>
                    <button onClick={() => setShowAddNotice(false)}><X className="w-5 h-5 text-slate-400" /></button>
                  </div>
                  <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold block mb-1">Headline / Title</label>
                      <input
                        type="text"
                        required
                        value={newNotice.title}
                        onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                        className="w-full border p-2 rounded"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold block mb-1">Category</label>
                        <select
                          value={newNotice.category}
                          onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                          className="w-full border p-2 rounded bg-white"
                        >
                          <option value="admission">Admission</option>
                          <option value="exam">Exam</option>
                          <option value="result">Result</option>
                          <option value="general">General</option>
                        </select>
                      </div>
                      <div className="flex items-center pt-5">
                        <label className="flex items-center space-x-2 cursor-pointer font-bold">
                          <input
                            type="checkbox"
                            checked={newNotice.urgent}
                            onChange={(e) => setNewNotice({ ...newNotice, urgent: e.target.checked })}
                          />
                          <span>Mark Urgent</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Notice Content</label>
                      <textarea
                        rows={3}
                        required
                        value={newNotice.content}
                        onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                        className="w-full border p-2 rounded"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-lg"
                    >
                      Post Notice
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
