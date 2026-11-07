import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Monitor,
  Award,
  CheckCircle,
  Users,
  ShieldCheck,
  Search,
  ArrowRight,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Star,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { Course } from '../types';
import { AnimatedCounter } from '../components/AnimatedCounter';

interface HomeProps {
  onOpenEnquiry: (courseName?: string, category?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenEnquiry }) => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [verifyInput, setVerifyInput] = useState('');

  // Course finder filter
  const [finderLevel, setFinderLevel] = useState<'all' | 'degree' | 'school' | 'computer'>('all');

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await api.getCourses({ featured: true });
        setFeaturedCourses(res.courses);
      } catch (err) {
        console.error('Error fetching featured courses:', err);
      } finally {
        setLoadingCourses(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-brand-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-500 blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-accent blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admissions & New Batches Open for 2026-2027</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                Your Education, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-amber-300 to-brand-300">
                  Our Expert Guidance.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Delhi's premier institute for <strong className="text-white font-semibold">UGC-DEB Approved University Degrees</strong>,{' '}
                <strong className="text-white font-semibold">NIOS 10th & 12th Board Admissions</strong>, and{' '}
                <strong className="text-white font-semibold">Job-Oriented Professional Computer Courses</strong> (ADCA, Tally Prime + GST, Graphic & Web Designing).
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="bg-accent hover:bg-accent-hover text-navy-950 font-black px-7 py-3.5 rounded-xl text-base shadow-xl hover:shadow-accent/20 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20to%20know%20about%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-base shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    <AnimatedCounter target={5000} duration={1500} suffix="+" />
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Students Guided</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                  <div className="text-xs text-slate-400 font-medium">Valid & Recognized</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">10+ Yrs</div>
                  <div className="text-xs text-slate-400 font-medium">Educational Legacy</div>
                </div>
              </div>
            </div>

            {/* Right Column: Instant Course Finder & Lead Card */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Course & Admission Finder</h3>
                    <p className="text-xs text-slate-500">Select what you want to study</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/university-courses"
                    className="block p-4 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                          UG/PG
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-brand-700 transition">
                            University Degrees
                          </div>
                          <div className="text-xs text-slate-500">
                            BCA, BBA, B.Com, BA, MBA, MCA, LLB
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition" />
                    </div>
                  </Link>

                  <Link
                    to="/nios-admission"
                    className="block p-4 rounded-xl border border-slate-200 hover:border-accent hover:bg-amber-50/50 transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                          10/12
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-amber-700 transition">
                            NIOS Board Admissions
                          </div>
                          <div className="text-xs text-slate-500">
                            10th & 12th (Arts, Commerce, Science)
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent transition" />
                    </div>
                  </Link>

                  <Link
                    to="/computer-courses"
                    className="block p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                          IT
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition">
                            Job-Ready Computer Courses
                          </div>
                          <div className="text-xs text-slate-500">
                            ADCA, Tally Prime + GST, Graphic & Web Design
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
                    </div>
                  </Link>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <button
                    onClick={() => onOpenEnquiry('General Admission Guidance', 'general')}
                    className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 rounded-xl text-sm transition flex items-center justify-center space-x-2"
                  >
                    <span>Request Free Callback from Counselor</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Main Institutional Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Our Core Specializations
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Three Pathways to Your Success
          </h2>
          <p className="text-slate-600 text-base">
            Whether you want a recognized university degree, need to pass school board exams through open schooling, or want job-ready computer skills, MGI Education provides complete end-to-end support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition">
                University Degrees (UG & PG)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Counseling and admissions for UGC-DEB approved universities. Complete guidance on exam dates, assignment submissions, syllabus, and valid degree certificates.
              </p>
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Popular Programs:</div>
                <div className="flex flex-wrap gap-1.5">
                  {['BBA', 'BCA', 'B.Com', 'BA', 'MBA', 'MCA', 'LLB'].map((item) => (
                    <span key={item} className="bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/university-courses"
                className="w-full inline-flex items-center justify-center space-x-2 text-brand-600 font-bold hover:text-brand-700 group-hover:underline text-sm"
              >
                <span>Explore University Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-accent flex items-center justify-center">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-accent transition">
                NIOS Admissions (10th & 12th)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Govt. of India recognized Open Board schooling. Save a lost year with Transfer of Credit (TOC) and On-Demand Exams. We assist with registration, books, TMA files, and practical exams.
              </p>
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Benefits:</div>
                <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Equivalent to CBSE & State Boards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Eligible for NEET, JEE & Govt Jobs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Arts, Commerce & Science Streams</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/nios-admission"
                className="w-full inline-flex items-center justify-center space-x-2 text-amber-600 font-bold hover:text-amber-700 group-hover:underline text-sm"
              >
                <span>Learn About NIOS Admissions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Monitor className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition">
                Job-Oriented Computer Lab
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Practical, hands-on training with 1:1 computer access. From basic office skills to corporate accounting in Tally Prime and graphic designing, build skills that get you hired.
              </p>
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Vocational Courses:</div>
                <div className="flex flex-wrap gap-1.5">
                  {['ADCA', 'Tally Prime + GST', 'Graphic Design', 'Web Design', 'Adv. Excel'].map((item) => (
                    <span key={item} className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/computer-courses"
                className="w-full inline-flex items-center justify-center space-x-2 text-emerald-600 font-bold hover:text-emerald-700 group-hover:underline text-sm"
              >
                <span>View Computer Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Most In-Demand Programs
              </div>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                Featured Courses & Admissions
              </h2>
            </div>

            <div className="flex gap-2">
              <Link
                to="/university-courses"
                className="bg-white border border-slate-300 hover:border-brand-500 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold transition"
              >
                All Degrees
              </Link>
              <Link
                to="/computer-courses"
                className="bg-white border border-slate-300 hover:border-brand-500 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold transition"
              >
                All Computer Courses
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.slice(0, 6).map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-brand-50 text-brand-700">
                      {course.category === 'university' ? 'Degree' : course.category === 'nios' ? 'Schooling' : 'IT Course'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      ⏱ {course.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] text-slate-400 font-bold uppercase">Eligibility:</div>
                    <div className="text-xs text-slate-700 font-medium bg-slate-50 p-2 rounded-lg">
                      {course.eligibility}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenEnquiry(course.title, course.category)}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition"
                  >
                    Enquire Now
                  </button>
                  <a
                    href={`https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20details%20about%20${encodeURIComponent(course.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 text-xs font-bold flex items-center space-x-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Certificate Verification Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-900 to-brand-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Instant Online Credential Verification</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                Verify Student Enrollment & Certificates
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Students, employers, and verification agencies can instantly check the authenticity of completion certificates and roll numbers issued by MGI Education.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <label className="block text-xs font-bold text-slate-200 mb-2">
                Enter Roll No. or Certificate No:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. MGI-2025-ADCA01"
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-900 font-mono outline-none"
                />
                <Link
                  to={`/verify-certificate?roll=${encodeURIComponent(verifyInput)}`}
                  className="bg-accent hover:bg-accent-hover text-navy-950 font-bold px-5 py-2.5 rounded-xl text-sm shrink-0 transition flex items-center justify-center"
                >
                  Verify
                </Link>
              </div>
              <div className="mt-3 text-[11px] text-slate-300">
                Sample test: <span className="font-mono text-accent font-bold">MGI-2025-ADCA01</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose MGI Education */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Why Students Trust Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Dedicated Support At Every Step
          </h2>
          <p className="text-slate-600 text-base">
            We do not just hand over a prospectus; our full-time academic counselors guide you until you receive your marksheet and degree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Recognized Certifications</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              All degrees and certifications are backed by UGC-DEB recognized partner universities and govt registered credentials.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-accent flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Flexible Batches & Exams</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Morning, afternoon, evening, and weekend batches designed for working students and busy professionals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">1:1 Practical Mentorship</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Personalized computer lab practicals with individual PC stations, real project files, and step-by-step guidance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Affordable Installments</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent, low fee structure with interest-free installment options to ensure every aspiring student can study.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold text-accent uppercase tracking-wider">
              Student Success Stories
            </div>
            <h2 className="text-3xl font-black">Hear From Our Students</h2>
            <p className="text-sm text-slate-400">
              Thousands of students have transformed their career paths through MGI Education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 italic">
                "MGI Education completely transformed my skills. The faculty gave personal attention on every topic in Tally and Excel. Within 2 months of completing my ADCA, I got placed as an Office Assistant in Noida!"
              </p>
              <div className="pt-2 border-t border-white/10">
                <div className="font-bold text-white text-sm">Vikas Rawat</div>
                <div className="text-xs text-accent">ADCA Graduate • Office Executive</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 italic">
                "I had dropped out in 11th due to family circumstances. MGI Education guided me with NIOS 12th admission, helped with all TMA files and exam preparation. I scored 78% and am now enrolled in graduation!"
              </p>
              <div className="pt-2 border-t border-white/10">
                <div className="font-bold text-white text-sm">Neha Pandey</div>
                <div className="text-xs text-accent">NIOS 12th • College Student</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 italic">
                "Best educational guidance center in Mayur Vihar. All degree documentation, university portal access, and examination guidelines were smoothly handled by the team. Highly recommended!"
              </p>
              <div className="pt-2 border-t border-white/10">
                <div className="font-bold text-white text-sm">Deepak Joshi</div>
                <div className="text-xs text-accent">BCA Graduate • IT Associate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact & Visit Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Visit Our Center in Delhi
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                Have Questions? Talk to an Academic Counselor Today
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Visit our Mayur Vihar center for a free 1-on-1 counseling session. We will evaluate your prior qualifications, explain course scopes, and help you select the fastest route to your career goals.
              </p>

              <div className="space-y-2 text-sm text-slate-700 font-medium pt-2">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <span>2nd Floor, A-1240, Opp. Bank of Baroda, GD Colony, Mayur Vihar-3, Delhi - 110096</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>+91 8929909708 / +91 9315522378</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <button
                onClick={() => onOpenEnquiry('General Counseling', 'general')}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-7 py-4 rounded-xl text-sm shadow-md transition"
              >
                Book Free Counseling
              </button>
              <a
                href="https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20to%20visit%20your%20center."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-4 rounded-xl text-sm shadow-md transition flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Counselor</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
