import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: (courseName?: string, category?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [univDropdownOpen, setUnivDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white">
      {/* Top Utility Bar */}
      <div className="bg-navy-900 text-slate-200 text-xs py-2 px-4 border-b border-navy-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>A-1240, 2nd Floor, Mayur Vihar Phase-3, Delhi - 110096</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-accent" />
              <a href="mailto:mgi12345@gmail.com" className="hover:text-white transition">mgi12345@gmail.com</a>
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href="tel:+918929909708"
              className="flex items-center space-x-1 text-slate-200 hover:text-white font-medium transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 8929909708</span>
            </a>
            <a
              href="https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20admission%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link to="/admin/login" className="text-slate-400 hover:text-white transition text-xs font-medium">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Institute Logo */}
            <Link to="/" className="flex items-center py-1 group">
              <img
                src="/logo.png"
                alt="MGI Education"
                className="h-16 w-auto object-contain transition duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            {/* Desktop Navigation Links - Bold Text Only (No Icons) */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-bold text-[15px] transition tracking-normal ${
                  isActive('/') ? 'text-brand-600 border-b-2 border-brand-600 pb-1' : 'text-slate-800 hover:text-brand-600'
                }`}
              >
                Home
              </Link>

              {/* University Courses with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setUnivDropdownOpen(true)}
                onMouseLeave={() => setUnivDropdownOpen(false)}
              >
                <Link
                  to="/university-courses"
                  className={`flex items-center space-x-1 font-bold text-[15px] transition py-2 tracking-normal ${
                    isActive('/university-courses') ? 'text-brand-600 border-b-2 border-brand-600 pb-1' : 'text-slate-800 hover:text-brand-600'
                  }`}
                >
                  <span>University Degrees</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </Link>

                {univDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Undergraduate (UG)
                    </div>
                    <Link
                      to="/university-courses"
                      className="block px-3 py-1.5 text-sm text-slate-800 hover:bg-brand-50 hover:text-brand-700 rounded-md font-bold"
                    >
                      BBA • BCA • B.Com • BA • LLB
                    </Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <div className="px-3 py-1 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Postgraduate (PG)
                    </div>
                    <Link
                      to="/university-courses"
                      className="block px-3 py-1.5 text-sm text-slate-800 hover:bg-brand-50 hover:text-brand-700 rounded-md font-bold"
                    >
                      MBA • MCA • MA • M.Com • M.Sc
                    </Link>
                    <div className="mt-2 p-2 bg-slate-50 rounded-lg text-xs text-slate-600 font-medium">
                      UGC-DEB approved university admissions guidance.
                    </div>
                  </div>
                )}
              </div>

              {/* NIOS Admission */}
              <Link
                to="/nios-admission"
                className={`font-bold text-[15px] transition tracking-normal ${
                  isActive('/nios-admission') ? 'text-brand-600 border-b-2 border-brand-600 pb-1' : 'text-slate-800 hover:text-brand-600'
                }`}
              >
                NIOS (10th & 12th)
              </Link>

              {/* Computer Courses */}
              <Link
                to="/computer-courses"
                className={`font-bold text-[15px] transition tracking-normal ${
                  isActive('/computer-courses') ? 'text-brand-600 border-b-2 border-brand-600 pb-1' : 'text-slate-800 hover:text-brand-600'
                }`}
              >
                Computer Courses
              </Link>

              {/* Verification */}
              <Link
                to="/verify-certificate"
                className={`font-bold text-[15px] transition tracking-normal ${
                  isActive('/verify-certificate') ? 'text-brand-600 border-b-2 border-brand-600 pb-1' : 'text-slate-800 hover:text-brand-600'
                }`}
              >
                Verify Certificate
              </Link>

              {/* Contact Us */}
              <Link
                to="/contact"
                className={`font-bold text-[15px] transition tracking-normal ${
                  isActive('/contact') ? 'text-brand-600 border-b-2 border-brand-600 pb-1' : 'text-slate-800 hover:text-brand-600'
                }`}
              >
                Contact Us
              </Link>
            </div>

            {/* Action CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => onOpenEnquiry()}
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-xl text-sm font-extrabold shadow-md hover:shadow-lg transition transform active:scale-95"
              >
                Enquire Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden space-x-2">
              <button
                onClick={() => onOpenEnquiry()}
                className="bg-brand-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold"
              >
                Enquire
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Navigation - Text Only, No Emojis */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-bold text-slate-800 hover:bg-slate-100 text-sm"
            >
              Home
            </Link>
            <Link
              to="/university-courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-bold text-slate-800 hover:bg-slate-100 text-sm"
            >
              University Degrees (BBA, BCA, MBA, MCA, BA, B.Com)
            </Link>
            <Link
              to="/nios-admission"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-bold text-slate-800 hover:bg-slate-100 text-sm"
            >
              NIOS Admissions (10th & 12th)
            </Link>
            <Link
              to="/computer-courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-bold text-slate-800 hover:bg-slate-100 text-sm"
            >
              Computer Courses (ADCA, Tally Prime, Web Design)
            </Link>
            <Link
              to="/verify-certificate"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-bold text-slate-800 hover:bg-slate-100 text-sm"
            >
              Verify Student Certificate
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg font-bold text-slate-800 hover:bg-slate-100 text-sm"
            >
              Contact & Center Location
            </Link>

            <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
              <a
                href="tel:+918929909708"
                className="flex items-center justify-center space-x-2 bg-slate-100 text-slate-800 py-2.5 rounded-lg font-bold text-sm"
              >
                <Phone className="w-4 h-4 text-brand-600" />
                <span>Call +91 8929909708</span>
              </a>
              <a
                href="https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20admission%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-emerald-600 text-white py-2.5 rounded-lg font-bold text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Counselor</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
