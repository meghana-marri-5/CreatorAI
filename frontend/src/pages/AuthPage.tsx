import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ShieldCheck, User, Building, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, loginAsDemoCreator, loginAsDemoBrand, isAuthenticated, isCreator, isBrand } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'creator' | 'brand'>('creator');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyOrSpec, setCompanyOrSpec] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const initialMode = searchParams.get('mode');
    if (initialMode === 'register') {
      setMode('register');
    } else {
      setMode('login');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'register') {
        if (!fullName.trim()) {
          throw new Error('Please enter your full name.');
        }
        if (!email.trim() || !email.includes('@')) {
          throw new Error('Please enter a valid email address.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match.');
        }
        if (!agreeTerms) {
          throw new Error('You must agree to the Terms of Service and Commercial Clearance Policy.');
        }

        await register(fullName, email, role, companyOrSpec);
        setSuccess('Account created successfully! Redirecting to your workspace...');
        setTimeout(() => {
          if (role === 'creator') navigate('/creator-dashboard');
          else navigate('/brand-dashboard');
        }, 1200);
      } else {
        if (!email.trim() || !email.includes('@')) {
          throw new Error('Please enter a valid email address.');
        }
        if (!password) {
          throw new Error('Please enter your password.');
        }

        await login(email, role);
        setSuccess('Welcome back! Loading your dashboard...');
        setTimeout(() => {
          if (role === 'creator') navigate('/creator-dashboard');
          else navigate('/brand-dashboard');
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-600/15 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Instant Demo Switcher for Judges */}
        <div className="mb-6 p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-center shadow-lg">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-300 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hackathon Quick-Demo Access</span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Instant 1-click test credentials for evaluators & judges:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => { loginAsDemoCreator(); navigate('/creator-dashboard'); }}
              className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 hover:border-brand-500 transition"
            >
              🎨 Elena (Creator)
            </button>
            <button
              type="button"
              onClick={() => { loginAsDemoBrand(); navigate('/brand-dashboard'); }}
              className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 hover:border-brand-500 transition"
            >
              🏢 Apex Volt (Brand)
            </button>
          </div>
        </div>

        {/* Main Auth Card */}
        <div className="bg-[#0d111c] border border-slate-800/80 rounded-3xl p-7 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-white">
              {mode === 'login' ? 'Sign In to CreatorAI' : 'Create Your Account'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {mode === 'login' ? 'Access your dashboard, briefs, and marketplace proposals' : 'Join the premier generative content creator network'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${
                mode === 'login' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(null); }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${
                mode === 'register' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Error / Success Alerts */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                I want to participate as:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('creator')}
                  className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                    role === 'creator'
                      ? 'bg-brand-600/15 border-brand-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <User className="w-4 h-4 text-brand-400" />
                  <div>
                    <div className="text-xs font-bold leading-tight">AI Creator</div>
                    <div className="text-[10px] text-slate-400">Showcase work</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('brand')}
                  className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                    role === 'brand'
                      ? 'bg-brand-600/15 border-brand-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Building className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="text-xs font-bold leading-tight">Brand / Agency</div>
                    <div className="text-[10px] text-slate-400">Post briefs & hire</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Name field for Register */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>
            </div>

            {/* Company or Specialization for Register */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {role === 'brand' ? 'Company or Agency Name' : 'Primary AI Specialization'}
                </label>
                <input
                  type="text"
                  value={companyOrSpec}
                  onChange={(e) => setCompanyOrSpec(e.target.value)}
                  placeholder={role === 'brand' ? 'e.g. Apex Volt Beverage Co.' : 'e.g. AI Video Diffusion & VFX'}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>
            </div>

            {/* Confirm Password for Register */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Confirm Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>
              </div>
            )}

            {/* Agree Terms Checkbox */}
            {mode === 'register' && (
              <label className="flex items-start gap-2 pt-1 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-brand-600 focus:ring-0"
                  required
                />
                <span>
                  I agree to the CreatorAI Terms of Service, Commercial Buyout Clearance warranty, and Privacy Policy.
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-glow-sm transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to Workspace' : 'Complete Registration'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
