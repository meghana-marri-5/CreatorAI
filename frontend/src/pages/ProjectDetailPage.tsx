import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { ApplyProjectModal } from '../components/ApplyProjectModal';
import { ApplicationStatus } from '../types';
import { 
  DollarSign, 
  Clock, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  User, 
  Send, 
  Sparkles,
  ExternalLink,
  Users
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, creators, updateApplicationStatus } = useMarketplace();
  const { user, isCreator, isBrand } = useAuth();

  const project = projects.find(p => p.id === id) || projects[0];

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'brief' | 'applications'>('brief');

  // Check if current logged in creator already applied
  const hasAlreadyApplied = isCreator && project.applications.some(a => a.creatorId === user?.id);

  const handleUpdateStatus = (appId: string, status: ApplicationStatus) => {
    updateApplicationStatus(project.id, appId, status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <Link 
        to="/explore-projects" 
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Project Listings</span>
      </Link>

      {/* Main Project Header Card */}
      <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-semibold text-brand-300 bg-brand-500/15 border border-brand-500/30 px-3 py-1 rounded-full">
                {project.contentType}
              </span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                project.status === 'Open'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
              }`}>
                {project.status}
              </span>
              <span className="text-xs text-slate-400 font-mono">Posted {project.postedDate}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {project.title}
            </h1>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <img
                src={project.brandAvatar || 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=100&q=80'}
                alt={project.brandName}
                className="w-6 h-6 rounded-md object-cover border border-slate-700"
              />
              <span>Published by <strong>{project.brandName}</strong></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Find matching AI Creators */}
            <Link
              to={`/ai-matching/${project.id}`}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 font-bold text-xs text-white shadow-glow-sm flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Creator Matching</span>
            </Link>

            {/* Creator Apply Button */}
            {isCreator && project.status === 'Open' && (
              <button
                onClick={() => setIsApplyModalOpen(true)}
                disabled={hasAlreadyApplied}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs text-white transition flex items-center justify-center gap-2 ${
                  hasAlreadyApplied
                    ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 shadow-sm'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{hasAlreadyApplied ? 'Proposal Already Submitted' : 'Submit Proposal'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Estimated Budget</span>
            <span className="text-base font-extrabold text-emerald-400">{project.budgetDisplay}</span>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Delivery Deadline</span>
            <span className="text-base font-medium text-slate-200">{project.deadline}</span>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Format / Aspect</span>
            <span className="text-sm font-semibold text-brand-300 truncate block">{project.dimensionsOrDuration || 'Custom Delivery'}</span>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Proposals Received</span>
            <span className="text-base font-extrabold text-cyan-400">{project.applications.length} Applicants</span>
          </div>
        </div>
      </div>

      {/* Tabs: Brief Details vs Applications Received */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab('brief')}
          className={`py-3 px-6 text-xs font-bold transition border-b-2 ${
            activeTab === 'brief'
              ? 'border-brand-500 text-white'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Full Project Brief & Deliverables
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`py-3 px-6 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'border-brand-500 text-white'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Received Applications ({project.applications.length})</span>
        </button>
      </div>

      {/* Tab 1: Brief Details */}
      {activeTab === 'brief' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
                Scope & Requirements
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed font-normal whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Creative Direction & Objective */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {project.creativeDirection && (
                <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 space-y-2">
                  <h3 className="text-xs font-bold text-brand-300 uppercase tracking-wider">Creative Direction</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{project.creativeDirection}</p>
                </div>
              )}

              {project.businessObjective && (
                <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 space-y-2">
                  <h3 className="text-xs font-bold text-brand-300 uppercase tracking-wider">Business Objective</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{project.businessObjective}</p>
                </div>
              )}
            </div>

            {/* Deliverables List */}
            <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
                Deliverables & Format Specifications
              </h3>
              <div className="space-y-2">
                {project.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Meta */}
          <div className="space-y-6 sticky top-28">
            {/* Preferred Tools & Skills */}
            <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400">Preferred AI Toolchain</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.preferredAiTools.map((tool, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono">
                    {tool}
                  </span>
                ))}
              </div>

              <h3 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400 pt-2">Required Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.requiredSkills.map((skill, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Commercial Rights */}
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-3xl p-6 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Commercial Terms</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {project.commercialUseRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Applications Received (Brand Review Flow) */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Submitted Proposals ({project.applications.length})</h2>
              <p className="text-xs text-slate-400">Review creator pitches, rates, and sample case studies.</p>
            </div>
          </div>

          {project.applications.length === 0 ? (
            <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <Users className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Applications Received Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Invite top AI creators directly or browse the talent marketplace.
              </p>
              <Link
                to={`/ai-matching/${project.id}`}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-xs text-white inline-block transition"
              >
                Match Top AI Creators Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {project.applications.map((app) => (
                <div 
                  key={app.id} 
                  className="bg-[#0d111c] border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-lg hover:border-slate-700 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img 
                        src={app.creatorAvatar} 
                        alt={app.creatorName} 
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-700" 
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Link 
                            to={`/creators/${app.creatorId}`} 
                            className="text-base font-bold text-white hover:text-brand-300 transition"
                          >
                            {app.creatorName}
                          </Link>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            app.status === 'Accepted'
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                              : app.status === 'Rejected'
                              ? 'bg-red-500/15 text-red-400 border-red-500/30'
                              : 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-brand-300 font-medium">{app.creatorTitle || 'Verified AI Creator'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <div className="text-emerald-400">Proposed Rate: {app.proposedRate}</div>
                      <div className="text-slate-300">Timeline: {app.estimatedDeliveryDays} days</div>
                    </div>
                  </div>

                  {/* Proposal Text */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                    <strong className="text-white block mb-1">Proposal Pitch & Technical Workflow:</strong>
                    {app.proposal}
                  </div>

                  {/* Attached Reel */}
                  {app.relevantPortfolioItem && (
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="font-semibold text-slate-300">Attached Showcase:</span>
                      <span className="text-brand-400">{app.relevantPortfolioItem}</span>
                    </div>
                  )}

                  {/* Brand Action Buttons for Status Update */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <Link
                      to={`/creators/${app.creatorId}`}
                      className="text-xs font-semibold text-brand-400 hover:underline flex items-center gap-1"
                    >
                      <span>View Full Creator Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    {/* Manage Application Status Buttons */}
                    <div className="flex items-center gap-2">
                      {app.status !== 'Accepted' && (
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Accepted')}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white transition flex items-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept & Select Creator</span>
                        </button>
                      )}

                      {app.status !== 'Rejected' && (
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-xs text-slate-400 hover:text-red-400 border border-slate-700 transition flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Apply Proposal Modal */}
      <ApplyProjectModal
        project={isApplyModalOpen ? project : null}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
};
