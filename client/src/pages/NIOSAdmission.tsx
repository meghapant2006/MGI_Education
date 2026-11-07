import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  FileCheck,
  ShieldCheck,
  Calendar,
  MessageCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface NIOSAdmissionProps {
  onOpenEnquiry: (courseName?: string, category?: string) => void;
}

export const NIOSAdmission: React.FC<NIOSAdmissionProps> = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState<'10th' | '12th'>('10th');

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-amber-950 via-slate-900 to-navy-950 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Govt. of India Recognized Autonomous Open Board</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            NIOS Admission for Class 10th & Class 12th
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            National Institute of Open Schooling (NIOS) offers flexible, legitimate education recognized on par with CBSE, ICSE, and State Boards. Whether you want to clear secondary school or pursue medical/engineering entrances with 12th, MGI Education provides complete admission and academic file support.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>100% Equivalent to CBSE & State Boards</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>Valid for NEET, JEE, NDA, CUET & All Central Jobs</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>Complete TMA File & Practical Project Guidance</span>
            </span>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenEnquiry('NIOS Admission 2026', 'nios')}
              className="bg-accent hover:bg-accent-hover text-navy-950 font-black px-6 py-3 rounded-xl text-sm shadow-lg transition"
            >
              Apply for NIOS Admission
            </button>
            <a
              href="https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20need%20details%20about%20NIOS%20Admission."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm shadow transition flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Class 10th vs 12th Selection Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-10">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex space-x-2 border border-slate-200">
            <button
              onClick={() => setActiveTab('10th')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition flex items-center space-x-2 ${
                activeTab === '10th'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>NIOS Class 10th (Secondary)</span>
            </button>
            <button
              onClick={() => setActiveTab('12th')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition flex items-center space-x-2 ${
                activeTab === '12th'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>NIOS Class 12th (Senior Secondary)</span>
            </button>
          </div>
        </div>

        {activeTab === '10th' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Secondary Examination</span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  NIOS Class 10th Admission Details
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Open schooling secondary education designed for students who could not complete their regular 10th standard schooling or want to study from home at their own pace.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-3">Core & Elective Subjects</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  {[
                    'Hindi (201)',
                    'English (202)',
                    'Mathematics (211)',
                    'Science & Tech (212)',
                    'Social Science (213)',
                    'Economics (214)',
                    'Business Studies (215)',
                    'Home Science (216)',
                    'Data Entry Operations (229)',
                    'Painting (225)',
                    'Psychology (222)',
                    'Indian Culture (223)'
                  ].map((sub) => (
                    <div key={sub} className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-medium text-slate-700">
                      {sub}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50/60 border border-amber-200 p-5 rounded-2xl space-y-2">
                <div className="font-bold text-amber-900 text-sm">Eligibility for 10th Standard:</div>
                <ul className="text-xs text-amber-800 space-y-1">
                  <li>• Minimum age: 14 years completed.</li>
                  <li>• Prior qualification: School leaving certificate or self-attested certificate of literacy.</li>
                  <li>• Medium of study: English, Hindi, and regional languages.</li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenEnquiry('NIOS Class 10th Admission', 'nios')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition"
                >
                  Enquire for Class 10th Admission
                </button>
              </div>
            </div>

            {/* Right: Quick Features */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Why Study 10th with MGI?</h3>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Complete TMA Assignment answers provided.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Practical file drafting & lab viva assistance.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Previous 5-year question papers & chapter summaries.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Exam center assistance in East Delhi & NCR.</span>
                  </div>
                </div>
              </div>

              <div className="bg-navy-900 text-white rounded-3xl p-6 space-y-3">
                <div className="text-xs text-accent font-bold uppercase">Need Instant Advice?</div>
                <div className="text-base font-bold">Talk to our NIOS Incharge</div>
                <p className="text-xs text-slate-300">
                  Call our center directly for urgent batch registrations and registration deadlines.
                </p>
                <a
                  href="tel:+918929909708"
                  className="inline-block bg-white text-navy-950 font-bold px-4 py-2 rounded-lg text-xs"
                >
                  Call +91 8929909708
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Senior Secondary (10+2)</span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  NIOS Class 12th Admission Details
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Eligible for all national competitive exams (NEET, JEE Mains, NDA, CUET) and admissions to Delhi University (DU), IP University, and central colleges.
                </p>
              </div>

              {/* Streams */}
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-2xl p-4">
                  <div className="font-bold text-slate-900 text-sm mb-2 text-blue-700">Science Stream (Non-Medical & Medical)</div>
                  <p className="text-xs text-slate-600 mb-2">Physics (312), Chemistry (313), Biology (314), Mathematics (311), Computer Science (330), English (302).</p>
                  <span className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded font-bold">Valid for NEET & JEE</span>
                </div>

                <div className="border border-slate-200 rounded-2xl p-4">
                  <div className="font-bold text-slate-900 text-sm mb-2 text-emerald-700">Commerce Stream</div>
                  <p className="text-xs text-slate-600 mb-2">Accountancy (320), Business Studies (319), Economics (318), Mathematics (311), Data Entry Operations (336), English (302).</p>
                  <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded font-bold">Ideal for B.Com, BBA & CA Foundation</span>
                </div>

                <div className="border border-slate-200 rounded-2xl p-4">
                  <div className="font-bold text-slate-900 text-sm mb-2 text-amber-700">Arts / Humanities Stream</div>
                  <p className="text-xs text-slate-600 mb-2">Political Science (317), History (315), Geography (316), Sociology (331), Psychology (328), Hindi (301), English (302).</p>
                  <span className="text-[11px] bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded font-bold">Great for Govt Exams & Law Admissions</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenEnquiry('NIOS Class 12th Admission', 'nios')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition"
                >
                  Enquire for Class 12th Admission
                </button>
              </div>
            </div>

            {/* Right: TOC Benefits */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Transfer of Credit (TOC)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Did you fail in CBSE, ICSE, or UP Board in 12th? You do NOT have to repeat the entire year!
                </p>
                <div className="space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Transfer marks of up to 2 passed subjects directly.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Appear only for the remaining 3 subjects.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Receive a fresh, fully valid 12th pass marksheet!</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 space-y-3">
                <div className="text-xs text-amber-800 font-bold uppercase">On-Demand Examination (ODE)</div>
                <div className="text-sm font-bold text-amber-950">Want fast results?</div>
                <p className="text-xs text-amber-800">
                  With NIOS ODE, you can appear for exams in almost any month of the year without waiting for the annual public exam cycle.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Document Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/80 rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <FileCheck className="w-10 h-10 text-brand-600 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Required Documents for NIOS Registration
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Bring original documents and photocopies to our Mayur Vihar office for verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-accent font-bold text-sm">1. Identity Proof</div>
              <p className="text-xs text-slate-600">Aadhaar Card (front & back) or Passport / Voter ID.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-accent font-bold text-sm">2. Age & Prior School Proof</div>
              <p className="text-xs text-slate-600">Birth Certificate, School Leaving Certificate, or 10th Marksheet (for 12th).</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-accent font-bold text-sm">3. Photographs & Signature</div>
              <p className="text-xs text-slate-600">4 recent passport size photographs with white background + specimen signature.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-accent font-bold text-sm">4. Address Proof</div>
              <p className="text-xs text-slate-600">Electricity bill, rent agreement, or Aadhaar address in Delhi NCR / Other states.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
