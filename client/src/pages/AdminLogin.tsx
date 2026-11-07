import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('admin');
  const [password, setPassword] = useState('Admin@MGI2026!');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      await login(usernameOrEmail, password);
      navigate('/admin');
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-navy-900 rounded-2xl flex items-center justify-center mx-auto text-accent shadow-md">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">MGI Staff & Admin Portal</h2>
          <p className="text-xs text-slate-500">
            Sign in to access lead CRM, admissions queue, and student certificate management.
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-[11px] text-brand-900 space-y-1">
            <div className="font-bold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Default Administrator Credentials:</span>
            </div>
            <div>Username: <span className="font-mono font-bold">admin</span></div>
            <div>Password: <span className="font-mono font-bold">Admin@MGI2026!</span></div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{submitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
