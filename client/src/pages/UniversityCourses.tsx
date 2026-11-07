import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Clock,
  Award,
  BookOpen,
  Search,
  CheckCircle,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { api } from '../services/api';
import { Course } from '../types';

interface UniversityCoursesProps {
  onOpenEnquiry: (courseName?: string, category?: string) => void;
}

export const UniversityCourses: React.FC<UniversityCoursesProps> = ({ onOpenEnquiry }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ALL' | 'UG' | 'PG'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await api.getCourses({ category: 'university' });
        setCourses(res.courses);
      } catch (err) {
        console.error('Failed to load university courses:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const filtered = courses.filter((c) => {
    const matchesTab = activeTab === 'ALL' || c.level === activeTab;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-navy-950 via-navy-900 to-brand-950 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>UGC-DEB Recognized University Degree Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Undergraduate & Postgraduate University Degrees
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Fast-track your career with flexible distance and online degree admissions. Valid across India and internationally for private corporate jobs, UPSC/SSC government exams, and higher studies abroad.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Govt & Private Job Valid</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Flexible Examination Slots</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Complete Study Notes & Assignment Guidance</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Content & Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['ALL', 'UG', 'PG'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition ${
                  activeTab === tab
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'ALL' ? 'All Degrees' : tab === 'UG' ? 'Undergraduate (UG)' : 'Postgraduate (PG)'}
              </button>
            ))}
          </div>

          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search e.g. BCA, MBA, LLB..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        {loading ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            Loading university courses from database...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-600 text-sm font-medium">No courses found matching your query.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((course) => {
              const isExpanded = expandedCourseId === course._id;
              return (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Left: Info */}
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-brand-50 text-brand-700 text-xs font-black uppercase px-2.5 py-0.5 rounded">
                            {course.level} Degree
                          </span>
                          <span className="text-xs text-slate-500 flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{course.duration}</span>
                          </span>
                          <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded font-medium">
                            {course.mode}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                          {course.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                          {course.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 uppercase block mb-0.5">
                              Eligibility Criteria
                            </span>
                            <span className="text-xs font-semibold text-slate-800">
                              {course.eligibility}
                            </span>
                          </div>

                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 uppercase block mb-0.5">
                              Fee & Scholarship
                            </span>
                            <span className="text-xs font-semibold text-slate-800">
                              {course.feeRange}
                            </span>
                          </div>
                        </div>

                        {/* Highlights Pills */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {course.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center space-x-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                            >
                              <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                              <span>{h}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-48 justify-center">
                        <button
                          onClick={() => onOpenEnquiry(course.title, 'university')}
                          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition"
                        >
                          Apply / Enquire Now
                        </button>

                        <a
                          href={`https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20details%20about%20${encodeURIComponent(course.title)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow transition flex items-center justify-center space-x-1.5"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp Details</span>
                        </a>

                        {course.syllabus && course.syllabus.length > 0 && (
                          <button
                            onClick={() => toggleExpand(course._id)}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center space-x-1"
                          >
                            <span>{isExpanded ? 'Hide Syllabus' : 'View Syllabus'}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expandable Syllabus Drawer */}
                    {isExpanded && course.syllabus && (
                      <div className="mt-6 pt-6 border-t border-slate-100 bg-slate-50/70 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 animate-in slide-in-from-top-2 duration-150">
                        <div className="flex items-center space-x-2 mb-4">
                          <BookOpen className="w-4 h-4 text-brand-600" />
                          <h4 className="font-bold text-slate-900 text-sm">
                            Curriculum & Syllabus Highlights
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {course.syllabus.map((mod, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200">
                              <div className="font-bold text-xs text-brand-700 mb-2">{mod.title}</div>
                              <ul className="space-y-1">
                                {mod.topics.map((t, tidx) => (
                                  <li key={tidx} className="text-xs text-slate-600 flex items-start space-x-1.5">
                                    <span className="text-brand-400 font-bold">•</span>
                                    <span>{t}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Counseling Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-50 border border-brand-200 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-brand-950">
            Unsure Which Degree Suits Your Career Aspirations?
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Our career advisors examine your past qualification marks, career goals, and recommend the ideal UGC-approved university program with flexible payment plans.
          </p>
          <button
            onClick={() => onOpenEnquiry('Degree Counseling Session', 'university')}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition"
          >
            Speak to a Senior Degree Counselor
          </button>
        </div>
      </section>
    </div>
  );
};
