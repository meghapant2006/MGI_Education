import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  Printer,
  Award,
  Building,
  User,
  Calendar,
  FileBadge
} from 'lucide-react';
import { api } from '../services/api';
import { Certificate } from '../types';

export const VerifyCertificate: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('roll') || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Certificate | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const initialRoll = searchParams.get('roll');
    if (initialRoll) {
      setQuery(initialRoll);
      performSearch(initialRoll);
    }
  }, [searchParams]);

  const performSearch = async (searchStr: string) => {
    if (!searchStr.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setResult(null);
    setHasSearched(true);

    try {
      const res = await api.verifyCertificate(searchStr.trim());
      if (res.success && res.certificate) {
        setResult(res.certificate);
      } else {
        setErrorMsg('No record found matching this credential.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'No matching student record found. Please verify the roll or certificate number.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const setSampleAndSearch = (sample: string) => {
    setQuery(sample);
    performSearch(sample);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-navy-950 via-slate-900 to-brand-950 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Credential Registry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Student Certificate & Roll Verification
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Verify academic credentials, course completion certificates, and diplomas issued by MGI Education. Instant authentication for students, colleges, and corporate employers.
          </p>
        </div>
      </section>

      {/* Search Input Box */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
          <form onSubmit={handleSearch} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Enter Student Roll Number or Certificate ID:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. MGI-2025-ADCA01 or CERT-MGI-9011"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-sm font-mono border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-md transition disabled:opacity-50 shrink-0"
              >
                {loading ? 'Verifying...' : 'Verify Now'}
              </button>
            </div>
          </form>

          {/* Quick Click Samples */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Quick Test Records:</span>
            <button
              onClick={() => setSampleAndSearch('MGI-2025-ADCA01')}
              className="bg-slate-100 hover:bg-brand-50 text-brand-700 px-2.5 py-1 rounded-md font-mono transition"
            >
              MGI-2025-ADCA01 (ADCA)
            </button>
            <button
              onClick={() => setSampleAndSearch('MGI-2025-TALLY02')}
              className="bg-slate-100 hover:bg-brand-50 text-brand-700 px-2.5 py-1 rounded-md font-mono transition"
            >
              MGI-2025-TALLY02 (Tally Prime)
            </button>
            <button
              onClick={() => setSampleAndSearch('MGI-2025-BCA03')}
              className="bg-slate-100 hover:bg-brand-50 text-brand-700 px-2.5 py-1 rounded-md font-mono transition"
            >
              MGI-2025-BCA03 (BCA)
            </button>
          </div>
        </div>
      </section>

      {/* Verification Result Display */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-3 animate-in fade-in">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-rose-900">No Record Found</h3>
            <p className="text-xs text-rose-700 max-w-md mx-auto">
              {errorMsg}
            </p>
            <p className="text-xs text-slate-500">
              Need assistance? Call our registration desk at <strong className="text-slate-800">+91 8929909708</strong>.
            </p>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-3xl border-2 border-emerald-500 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Top Verified Seal Ribbon */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-8 h-8 text-white" />
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-emerald-100">
                    STATUS: AUTHENTIC & VERIFIED
                  </div>
                  <div className="text-lg font-black">Official Certificate Verified</div>
                </div>
              </div>
              <button
                onClick={() => window.print()}
                className="hidden sm:flex items-center space-x-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Record</span>
              </button>
            </div>

            {/* Certificate Details Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3">
                  <img src="/logo.png" alt="MGI Logo" className="h-12 w-auto object-contain" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Authorized Study & Training Center</div>
                    <div className="text-xs text-slate-600 font-medium">Mayur Vihar Phase-3, Delhi</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Batch Year</div>
                  <div className="text-xs font-bold text-slate-800">{result.completionYear}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-brand-600" />
                    <span>Candidate Name</span>
                  </span>
                  <div className="text-base font-bold text-slate-900">{result.studentName}</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center space-x-1">
                    <Award className="w-3.5 h-3.5 text-accent" />
                    <span>Grade / Division</span>
                  </span>
                  <div className="text-base font-bold text-emerald-700">{result.grade}</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center space-x-1">
                    <FileBadge className="w-3.5 h-3.5 text-brand-600" />
                    <span>Roll Number</span>
                  </span>
                  <div className="text-sm font-mono font-bold text-slate-900">{result.rollNumber}</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center space-x-1">
                    <FileBadge className="w-3.5 h-3.5 text-brand-600" />
                    <span>Certificate Number</span>
                  </span>
                  <div className="text-sm font-mono font-bold text-slate-900">{result.certificateNumber}</div>
                </div>
              </div>

              <div className="bg-brand-50/60 p-4 rounded-xl border border-brand-100 space-y-1">
                <span className="text-[11px] font-bold text-brand-700 uppercase">
                  Program / Course Completed:
                </span>
                <div className="text-base font-black text-brand-950">{result.courseName}</div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-500 gap-2">
                <div className="flex items-center space-x-1.5">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span>{result.center}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Verified on {new Date().toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
