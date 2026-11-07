import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block bg-white px-3.5 py-2 rounded-2xl shadow-md">
              <img
                src="/logo.png"
                alt="MGI Education Logo"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              MGI Education (MGi Computer & Academic Education) is Delhi's premier counseling and training institute.
              Guiding students since 2014 in UGC-DEB approved university degrees, NIOS open schooling, and job-oriented IT certifications.
            </p>

            <div className="space-y-2 text-sm text-slate-300 pt-2">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>2nd Floor, A-1240, Opp. Bank of Baroda, GD Colony, Mayur Vihar Phase-3, Delhi - 110096</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 8929909708 / +91 9315522378</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:mgi12345@gmail.com" className="hover:text-white transition">mgi12345@gmail.com</a>
              </div>
            </div>

            <div className="pt-2 flex flex-row items-center space-x-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/mgiclasses?igsh=cjU0b2l4a2c3ZHI3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-yellow-400 bg-navy-900 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/mgieducation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-yellow-400 bg-navy-900 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                title="Follow on Facebook"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20to%20know%20more%20about%20admissions."
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-yellow-400 bg-navy-900 hover:bg-[#25D366] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com/mgieducation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-yellow-400 bg-navy-900 hover:bg-[#1DA1F2] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                title="Follow on Twitter / X"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Col 3: University Courses */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-navy-800 pb-2">
              University Degrees
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/university-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
                  <span>BCA (Computer Apps)</span>
                </Link>
              </li>
              <li>
                <Link to="/university-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
                  <span>BBA (Business Admin)</span>
                </Link>
              </li>
              <li>
                <Link to="/university-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
                  <span>MBA (Dual Specialization)</span>
                </Link>
              </li>
              <li>
                <Link to="/university-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
                  <span>MCA (Master Computer Apps)</span>
                </Link>
              </li>
              <li>
                <Link to="/university-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
                  <span>B.Com & M.Com</span>
                </Link>
              </li>
              <li>
                <Link to="/university-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
                  <span>BA & MA (Humanities)</span>
                </Link>
              </li>
              <li>
                <Link to="/university-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
                  <span>LLB (Law Admissions)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: NIOS Open Schooling */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-navy-800 pb-2">
              NIOS Admissions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/nios-admission" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  <span>NIOS 10th (Secondary)</span>
                </Link>
              </li>
              <li>
                <Link to="/nios-admission" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  <span>NIOS 12th (Senior Sec)</span>
                </Link>
              </li>
              <li>
                <Link to="/nios-admission" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  <span>Arts, Commerce & Science</span>
                </Link>
              </li>
              <li>
                <Link to="/nios-admission" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  <span>Transfer of Credit (TOC)</span>
                </Link>
              </li>
              <li>
                <Link to="/nios-admission" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  <span>On Demand Exams (ODE)</span>
                </Link>
              </li>
              <li>
                <Link to="/nios-admission" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  <span>TMA File Guidance</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Computer Training */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-navy-800 pb-2">
              Computer Courses
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/computer-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ADCA (1 Year Diploma)</span>
                </Link>
              </li>
              <li>
                <Link to="/computer-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tally Prime with GST</span>
                </Link>
              </li>
              <li>
                <Link to="/computer-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Graphic Designing</span>
                </Link>
              </li>
              <li>
                <Link to="/computer-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Web Designing Course</span>
                </Link>
              </li>
              <li>
                <Link to="/computer-courses" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Advanced Excel & MIS</span>
                </Link>
              </li>
              <li>
                <Link to="/verify-certificate" className="text-emerald-400 font-semibold hover:underline flex items-center space-x-1.5 pt-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Student Certificate</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-navy-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} MGI Education. All Rights Reserved. Delhi, India.</p>
          <div className="flex items-center space-x-6">
            <span>Center Timings: Mon - Sat: 9:00 AM - 7:00 PM</span>
            <Link to="/admin/login" className="text-slate-400 hover:text-slate-200 transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
