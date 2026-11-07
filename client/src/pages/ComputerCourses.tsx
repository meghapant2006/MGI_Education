import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Clock,
  Award,
  CheckCircle,
  MessageCircle,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';
import { api } from '../services/api';
import { Course } from '../types';

interface ComputerCoursesProps {
  onOpenEnquiry: (courseName?: string, category?: string) => void;
}

export const ComputerCourses: React.FC<ComputerCoursesProps> = ({ onOpenEnquiry }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  useEffect(() => {
    async function loadComputerCourses() {
      try {
        const res = await api.getCourses({ category: 'computer' });
        setCourses(res.courses);
      } catch (err) {
        console.error('Failed to load computer courses:', err);
      } finally {
        setLoading(false);
      }
    }
    loadComputerCourses();
  }, []);

  const filtered = courses.filter((c) => {
    return (
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const toggleExpand = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  return (
    <div className="space-y-14 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-navy-950 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>MGI Computer Training Institute (Mayur Vihar-3, Delhi)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Job-Ready Computer & Vocational Courses
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Gain high-demand digital and computational skills through 100% hands-on laboratory practice. From comprehensive 1-year diplomas (ADCA) to advanced corporate accounting (Tally Prime + GST) and graphic design, we prepare you for immediate placement.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>1:1 Dedicated Computer System for Every Student</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Govt. Registered Certificate with Online Roll Verification</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Daily Flexible Batches (7:00 AM - 8:00 PM)</span>
            </span>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenEnquiry('Computer Courses Inquiry', 'computer')}
              className="bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-black px-6 py-3 rounded-xl text-sm shadow-lg transition"
            >
              Book Free Demo Lab Session
            </button>
            <a
              href="https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20details%20about%20computer%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl text-sm shadow transition flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Admission Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* Search Bar & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="text-sm font-bold text-slate-800">
            Available Computer Programs ({filtered.length})
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search e.g. Tally, ADCA, Graphic, Excel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            Loading computer courses...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-600 text-sm">No courses matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((course) => {
              const isExpanded = expandedCourseId === course._id;
              return (
                <div
                  key={course._id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800">
                        {course.shortName}
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.duration}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                      <span className="font-bold text-slate-900 block mb-0.5">Eligibility:</span>
                      {course.eligibility}
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {course.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Syllabus Preview Accordion */}
                    {isExpanded && course.syllabus && (
                      <div className="pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                        <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                          <BookOpen className="w-4 h-4 text-emerald-600" />
                          <span>Course Curriculum & Modules:</span>
                        </div>
                        <div className="space-y-2">
                          {course.syllabus.map((mod, idx) => (
                            <div key={idx} className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                              <div className="font-bold text-xs text-emerald-900">{mod.title}</div>
                              <div className="text-[11px] text-slate-600 mt-1 flex flex-wrap gap-1">
                                {mod.topics.map((t, tidx) => (
                                  <span key={tidx} className="bg-white px-2 py-0.5 rounded border border-slate-200">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => toggleExpand(course._id)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Syllabus & Modules'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex gap-2">
                      <a
                        href={`https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20details%20for%20${encodeURIComponent(course.title)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border border-slate-200 text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg text-xs font-bold transition flex items-center justify-center"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => onOpenEnquiry(course.title, 'computer')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition"
                      >
                        Enquire / Demo
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Lab Infrastructure Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold text-accent uppercase tracking-wider">
              Computer Lab Infrastructure
            </div>
            <h2 className="text-3xl font-black">Modern Air-Conditioned Training Lab</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Located in Mayur Vihar Phase-3, Delhi. Equipped with the latest workstations, software suites, and high-speed fiber internet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
              <div className="text-3xl font-black text-accent">1 : 1</div>
              <div className="font-bold text-sm text-white">Student to PC Ratio</div>
              <p className="text-xs text-slate-400">Never share a screen. You practice on your own dedicated computer throughout every batch.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
              <div className="text-3xl font-black text-accent">Latest</div>
              <div className="font-bold text-sm text-white">Software Licenses</div>
              <p className="text-xs text-slate-400">Tally Prime, Adobe Creative Suite, CorelDraw, MS Office 365, and coding tools pre-installed.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
              <div className="text-3xl font-black text-accent">Free</div>
              <div className="font-bold text-sm text-white">Extra Practice Hours</div>
              <p className="text-xs text-slate-400">Need extra lab practice? Students can practice extra hours at no additional fees.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
