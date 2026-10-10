import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProjectStatus } from '../types';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  User, 
  Sparkles, 
  Filter, 
  Edit,
  DollarSign
} from 'lucide-react';

export const ProjectManagementPage: React.FC = () => {
  const { user, isBrand, isCreator } = useAuth();
  const { projects, creators, updateProjectStatus } = useMarketplace();

  const [statusFilter, setStatusFilter] = useState<string>('all');

  const allStatuses: ProjectStatus[] = [
    'Draft',
    'Open',
    'Reviewing Applications',
    'Creator Selected',
    'In Progress',
    'Completed',
    'Cancelled'
  ];

  const filteredProjects = projects.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    // If logged in as creator, show projects where they applied or are selected
    if (isCreator) {
      const hasApplied = p.applications.some(a => a.creatorId === user?.id);
      const isSelected = p.selectedCreatorId === user?.id;
      return hasApplied || isSelected;
    }
    return true;
  });

  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    updateProjectStatus(projectId, newStatus);
  };

  const getStatusBadgeClass = (status: ProjectStatus) => {
    switch (status) {
      case 'Open':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Reviewing Applications':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Creator Selected':
      case 'In Progress':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'Completed':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      case 'Cancelled':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Production Lifecycle</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Project Milestone Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track published creative briefs across all stages from Open through Completion.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Status Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Stages ({projects.length})</option>
            {allStatuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Projects Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No briefs match this status filter.
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-[#0d111c] border border-slate-800/80 hover:border-slate-700 rounded-3xl p-6 space-y-5 shadow-lg transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadgeClass(project.status)}`}>
                      {project.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Posted: {project.postedDate}</span>
                    <span className="text-xs text-brand-300">• {project.contentType}</span>
                  </div>

                  <Link 
                    to={`/projects/${project.id}`}
                    className="text-lg font-bold text-white hover:text-brand-300 transition block"
                  >
                    {project.title}
                  </Link>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>Client: <strong className="text-slate-200">{project.brandName}</strong></span>
                    <span>Budget: <strong className="text-emerald-400">{project.budgetDisplay}</strong></span>
                    <span>Deadline: <strong className="text-amber-400">{project.deadline}</strong></span>
                  </div>
                </div>

                {/* Status Switcher for Authorized Brand User */}
                <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Milestone Status:</span>
                    <select
                      value={project.status}
                      onChange={(e) => handleStatusChange(project.id, e.target.value as ProjectStatus)}
                      className="px-2.5 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs font-semibold text-brand-300 focus:outline-none"
                    >
                      {allStatuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <Link
                    to={`/projects/${project.id}`}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"
                    title="View Full Brief Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Commissioned Creator info if selected */}
              {project.selectedCreatorName && (
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-200">
                    <User className="w-4 h-4 text-brand-400" />
                    <span>Selected Creator: <strong className="text-white">{project.selectedCreatorName}</strong></span>
                  </div>
                  <span className="text-emerald-400 font-semibold">Production Contract Active</span>
                </div>
              )}

              {/* Applications Snapshot */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div>
                  Proposals Received: <strong className="text-white">{project.applications?.length || 0}</strong>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/ai-matching/${project.id}`}
                    className="text-brand-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Creator Recommendations</span>
                  </Link>
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-slate-300 hover:text-white hover:underline"
                  >
                    Review All Proposals →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
