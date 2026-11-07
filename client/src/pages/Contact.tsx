import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

export const Contact: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('general');
  const [courseInterest, setCourseInterest] = useState('Center Visit & Counseling');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!phone || phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setLoading(true);
      const res = await api.submitInquiry({
        fullName,
        phone,
        email: email || undefined,
        category,
        courseInterest,
        message,
        source: 'contact_page'
      });
      setSubmittedRef(res.referenceNumber);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending message. Please try again or WhatsApp us.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-14 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-navy-950 via-slate-900 to-brand-950 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Mayur Vihar Phase-3, Delhi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Contact MGI Education
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Have questions about admissions, fees, or course eligibility? Visit our center or send us a message. Our counseling desk is happy to help you.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Center Information
              </h2>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Address:</span>
                    <span>2nd Floor, A-1240, Opposite Bank of Baroda, GD Colony, Block A, Mayur Vihar Phase III, Gharoli, Delhi – 110096</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Phone / WhatsApp:</span>
                    <a href="tel:+918929909708" className="hover:text-brand-600 font-semibold block">+91 8929909708</a>
                    <a href="tel:+919315522378" className="hover:text-brand-600 font-semibold block">+91 9315522378</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Email Support:</span>
                    <a href="mailto:mgi12345@gmail.com" className="hover:underline text-brand-600 font-medium">mgi12345@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-accent flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Center Timings:</span>
                    <span>Monday - Saturday: 9:00 AM - 7:00 PM</span> <br />
                    <span className="text-xs text-slate-500">Sunday: Counseling by prior appointment</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/918929909708?text=Hello%20MGI%20Education%2C%20I%20want%20to%20visit%20your%20center%20in%20Mayur%20Vihar."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm overflow-hidden">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 px-2">
                Location Map (Mayur Vihar Phase-3)
              </div>
              <div className="h-64 w-full rounded-2xl overflow-hidden bg-slate-100">
                <iframe
                  title="MGI Education Location"
                  src="https://maps.google.com/maps?q=A-1240%20GD%20Colony%20Mayur%20Vihar%20Phase%203%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right: Message / Lead Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Online Admissions Desk</span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">Send Us a Direct Message</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details and our admission counselor will call you back with complete course fee structures.
                </p>
              </div>

              {submittedRef ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-950">Thank You!</h3>
                  <p className="text-sm text-slate-700">
                    Your inquiry has been logged with Reference ID:
                  </p>
                  <div className="text-xl font-mono font-black text-emerald-800 bg-white py-2 px-4 rounded-xl inline-block border border-emerald-300">
                    {submittedRef}
                  </div>
                  <p className="text-xs text-slate-500">
                    Our team will contact you shortly on <strong>{phone}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedRef(null);
                      setFullName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit number"
                        className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@email.com"
                        className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                      >
                        <option value="university">University Degrees (BCA, MBA, etc.)</option>
                        <option value="nios">NIOS Schooling (10th/12th)</option>
                        <option value="computer">Computer Lab Courses</option>
                        <option value="general">General Counseling</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Specific Course / Service
                      </label>
                      <input
                        type="text"
                        value={courseInterest}
                        onChange={(e) => setCourseInterest(e.target.value)}
                        placeholder="e.g. BCA, ADCA, NIOS 12th"
                        className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message / Questions
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your query regarding batch timing, admission deadlines, or fees..."
                      className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting...' : 'Send Message to Counselor'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
