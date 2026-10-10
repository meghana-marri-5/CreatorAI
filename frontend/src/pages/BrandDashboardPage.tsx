import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { CreatorCard } from '../components/CreatorCard';
import { 
  Building, 
  Briefcase, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  ArrowRight, 
  Search, 
  Layers, 
  Clock, 
  FileText 
} from 'lucide-react';

export const BrandDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { projects, creators } = useMarketplace();

  // Metrics
  const totalProjects = projects.length;
  const openProjects = projects.filter(p => p.status === 'Open').length;
  const totalApplications = projects.reduce((acc, p) => acc + (p.applications?.length || 0), 0);
  const creatorsSelected = projects.filter(p => p.status === 'Creator Selected' || p.status === 'In Progress' || p.status === 'Completed').length;

  const topRecommendedCreators = creators.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Brand Headquarters</span>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Verified Enterprise Brand
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {user?.company_name || 'Apex Volt Beverage Co.'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Manage your commercial generative briefs, review incoming proposals, and discover verified AI directors.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link
            to="/ai-brief-builder"
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 text-xs font-bold text-white shadow-glow-sm flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Brief Assistant</span>
          </Link>
          <Link
            to="/create-brief"
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Brief</span>
          </Link>
          <Link
            to="/discover-creators"
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            <Search className="w-4 h-4" />
            <span>Find Talent</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#0d111c] border border-slate-800/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">Total Published Briefs</div>
            <div className="text-2xl font-extrabold text-white">{totalProjects}</div>
            <div className="text-[11px] text-slate-400 mt-1">Across all categories</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#0d111c] border border-slate-800/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">Open for Proposals</div>
            <div className="text-2xl font-extrabold text-emerald-400">{openProjects}</div>
            <div className="text-[11px] text-emerald-400 mt-1">Actively receiving bids</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#0d111c] border border-slate-800/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">Applications Received</div>
            <div className="text-2xl font-extrabold text-brand-400">{totalApplications}</div>
            <div className="text-[11px] text-brand-300 mt-1">Total creator proposals</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#0d111c] border border-slate-800/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">Creators Commissioned</div>
            <div className="text-2xl font-extrabold text-cyan-400">{creatorsSelected}</div>
            <div className="text-[11px] text-cyan-300 mt-1">Contracts awarded</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Published Projects Management Table */}
      <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-400" />
              <span>Your Active Creative Briefs</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Track project milestones and review applicant pitches.</p>
          </div>

          <Link
            to="/project-management"
            className="text-xs font-semibold text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>Full Project Management</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Project Brief</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Applications</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <Link to={`/projects/${project.id}`} className="hover:text-brand-300 transition">
                      {project.title}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                      {project.contentType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-emerald-400">
                    {project.budgetDisplay}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-medium ${
                      project.status === 'Open'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : project.status === 'Creator Selected'
                        ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                        : 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Link 
                      to={`/projects/${project.id}`} 
                      className="text-cyan-400 hover:underline font-semibold"
                    >
                      {project.applications?.length || 0} proposals
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Link
                      to={`/ai-matching/${project.id}`}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 font-semibold transition inline-block"
                      title="Run AI Creator Matching"
                    >
                      Match AI
                    </Link>
                    <Link
                      to={`/projects/${project.id}`}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition inline-block"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top AI Creator Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" />
              <span>Recommended Creators for Your Brand</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">High-compatibility creators with verified commercial portfolios.</p>
          </div>

          <Link to="/discover-creators" className="text-xs font-semibold text-brand-400 hover:underline">
            Browse All Creators →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRecommendedCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </div>
  );
};
