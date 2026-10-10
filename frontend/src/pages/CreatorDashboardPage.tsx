import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProjectCard } from '../components/ProjectCard';
import { VerificationBadge } from '../components/VerificationBadge';
import { 
  Sparkles, 
  Layers, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Compass, 
  ArrowRight, 
  Plus, 
  User, 
  DollarSign,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const CreatorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { creators, projects } = useMarketplace();

  // Active creator profile
  const creator = creators.find(c => c.id === user?.id) || creators[0];

  // Calculate applications by this creator across projects
  const myApplications = projects.flatMap(p => 
    p.applications.filter(a => a.creatorId === creator.id).map(a => ({
      ...a,
      projectTitle: p.title,
      projectDeadline: p.deadline,
      projectBudget: p.budgetDisplay
    }))
  );

  const pendingApps = myApplications.filter(a => a.status === 'Submitted' || a.status === 'Under Review');
  const acceptedApps = myApplications.filter(a => a.status === 'Accepted');

  // Relevant open projects matching skills
  const creatorSkillsLower = creator.skills.map(s => s.toLowerCase());
  const relevantProjects = projects.filter(p => {
    if (p.status !== 'Open') return false;
    const hasSkill = p.requiredSkills.some(rs => creatorSkillsLower.some(cs => cs.includes(rs.toLowerCase()) || rs.toLowerCase().includes(cs)));
    const hasCategory = p.contentType.toLowerCase().includes(creator.primaryCategory.slice(0, 4));
    return hasSkill || hasCategory;
  }).slice(0, 3);

  // Profile completion calculation
  let completionScore = 60;
  if (creator.bio && creator.bio.length > 50) completionScore += 10;
  if (creator.portfolio.length >= 3) completionScore += 15;
  if (creator.skills.length >= 5) completionScore += 10;
  if (creator.commercialInfo) completionScore += 5;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Creator Studio</span>
            <VerificationBadge status={creator.verificationStatus} size="sm" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {creator.name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {creator.title} • Hourly Rate: <strong className="text-emerald-400">${creator.hourlyRate}/hr</strong>
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link
            to="/creator-portfolio"
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white shadow-glow-sm flex items-center justify-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Portfolio Work</span>
          </Link>
          <Link
            to="/creator-profile-builder"
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            <User className="w-4 h-4" />
            <span>Edit Profile</span>
          </Link>
          <Link
            to="/portfolio-assistant"
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 text-xs font-semibold text-indigo-300 border border-indigo-700/60 flex items-center justify-center gap-1.5 transition"
            title="Enhance Portfolio with AI Assistant"
          >
            <Cpu className="w-4 h-4" />
            <span>AI Assistant</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Profile Completion */}
        <div className="bg-[#0d111c] border border-slate-800/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Profile Completion</span>
            <span className="font-bold text-brand-400">{completionScore}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div 
              className="bg-gradient-to-r from-brand-500 to-accent-cyan h-full rounded-full transition-all duration-500" 
              style={{ width: `${completionScore}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-400">
            {completionScore === 100 ? 'Master profile complete!' : 'Add 1 more portfolio piece for 100%'}
          </p>
        </div>

        {/* Portfolio Count */}
        <div className="bg-[#0d111c] border border-slate-800/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">Portfolio Works</div>
            <div className="text-2xl font-extrabold text-white">{creator.portfolio.length}</div>
            <div className="text-[11px] text-emerald-400 mt-1">Verified commercial masters</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Proposals */}
        <div className="bg-[#0d111c] border border-slate-800/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">Pending Proposals</div>
            <div className="text-2xl font-extrabold text-amber-400">{pendingApps.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">Awaiting client decision</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Accepted Projects */}
        <div className="bg-[#0d111c] border border-slate-800/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">Accepted / Awarded</div>
            <div className="text-2xl font-extrabold text-emerald-400">{acceptedApps.length}</div>
            <div className="text-[11px] text-emerald-400 mt-1">Contracts secured</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content Split: My Applications vs Relevant Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: My Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-400" />
              <span>My Active Brief Proposals ({myApplications.length})</span>
            </h2>
            <Link to="/explore-projects" className="text-xs font-semibold text-brand-400 hover:underline">
              Find More Briefs →
            </Link>
          </div>

          {myApplications.length === 0 ? (
            <div className="bg-[#0d111c] border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Clock className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-sm font-bold text-white">No Submitted Applications Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore open project briefs from brands looking for your generative AI skills.
              </p>
              <Link
                to="/explore-projects"
                className="inline-block px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white transition"
              >
                Browse Open Projects
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myApplications.map((app) => (
                <div 
                  key={app.id}
                  className="bg-[#0d111c] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4.5 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        app.status === 'Accepted'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : app.status === 'Under Review'
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                      }`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Submitted: {app.submittedAt}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white hover:text-brand-300 transition">
                      <Link to={`/projects/${app.projectId}`}>{app.projectTitle}</Link>
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 italic">
                      "{app.proposal}"
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800 text-right">
                    <div className="text-xs font-semibold text-emerald-400">Quote: {app.proposedRate}</div>
                    <div className="text-[11px] text-slate-400">{app.estimatedDeliveryDays} days delivery</div>
                    <Link
                      to={`/projects/${app.projectId}`}
                      className="text-xs font-medium text-brand-400 hover:underline mt-1"
                    >
                      View Brief
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Portfolio Preview Section */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>My Portfolio Gallery ({creator.portfolio.length})</span>
              </h2>
              <Link to="/creator-portfolio" className="text-xs font-semibold text-brand-400 hover:underline">
                Manage Portfolio →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {creator.portfolio.map((item) => (
                <div key={item.id} className="bg-[#0d111c] border border-slate-800 rounded-xl overflow-hidden group">
                  <div className="aspect-video relative bg-slate-900">
                    <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <span className="absolute top-2 left-2 text-[10px] uppercase font-semibold bg-black/70 px-2 py-0.5 rounded text-brand-300 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.aiTools.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recommended Projects for this creator */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Recommended For You</span>
            </h2>
            <Link to="/explore-projects" className="text-xs text-brand-400 hover:underline">All</Link>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Briefs matching your specializations in <strong>{creator.specializations[0]}</strong>:
          </p>

          <div className="space-y-4">
            {relevantProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
