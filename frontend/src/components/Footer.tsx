import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Lock, CheckCircle, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070c] border-t border-slate-800/80 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-accent-cyan p-0.5">
                <div className="w-full h-full bg-[#080a10] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Creator<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-cyan">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The premier AI creator marketplace connecting brands and agencies with verified generative video directors, fashion artists, virtual influencers, and synthetic audio producers.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Commercial Indemnity
              </span>
              <span className="flex items-center gap-1.5 text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                <Lock className="w-3.5 h-3.5" /> Zero Client API Keys Exposed
              </span>
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/discover-creators" className="hover:text-white transition">Explore Creators</Link></li>
              <li><Link to="/explore-projects" className="hover:text-white transition">Browse Project Briefs</Link></li>
              <li><Link to="/ai-brief-builder" className="hover:text-white transition">✨ AI Brief Builder</Link></li>
              <li><Link to="/create-brief" className="hover:text-white transition">Post a Project Brief</Link></li>
              <li><Link to="/shortlist" className="hover:text-white transition">Saved Creators</Link></li>
            </ul>
          </div>

          {/* Col 3: AI Disciplines */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">AI Disciplines</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/discover-creators?category=video" className="hover:text-white transition">Runway Video Diffusion</Link></li>
              <li><Link to="/discover-creators?category=imagery" className="hover:text-white transition">Midjourney v6 & Flux.1</Link></li>
              <li><Link to="/discover-creators?category=virtual-influencer" className="hover:text-white transition">Virtual Influencer Sculpting</Link></li>
              <li><Link to="/discover-creators?category=product" className="hover:text-white transition">Zero-Shot Product Staging</Link></li>
              <li><Link to="/discover-creators?category=audio" className="hover:text-white transition">ElevenLabs Synthetic Voice</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform & Hackathon */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Hackathon Architecture</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>React 19 + Vite + TypeScript</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Tailwind CSS Glassmorphism</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Supabase PostgreSQL + RLS</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Transparent AI Matching (40/25/20/15)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Offline Deterministic Fallback</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 CreatorAI Platform. Built for 24-Hour Student Hackathon.</p>
          <div className="flex items-center gap-6">
            <span>Enterprise Commercial Rights</span>
            <span>•</span>
            <span>GDPR & IP Cleared</span>
            <span>•</span>
            <span className="text-indigo-400 font-mono">v1.0.0-hackathon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
