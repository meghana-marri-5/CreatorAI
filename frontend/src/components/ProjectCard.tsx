import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Clock, 
  DollarSign, 
  Layers, 
  Users, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onApply?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onApply }) => {
  const { isCreator, isBrand } = useAuth();

  const getStatusBadge = () => {
    switch (project.status) {
      case 'Open':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Reviewing Applications':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Creator Selected':
      case 'In Progress':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'Completed':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="bg-[#0d111c] hover:bg-[#121727] rounded-2xl border border-slate-800/80 hover:border-slate-700 p-5 shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Meta Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <img
              src={project.brandAvatar || 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=100&q=80'}
              alt={project.brandName}
              className="w-8 h-8 rounded-lg object-cover border border-slate-700"
            />
            <div>
              <span className="text-xs font-semibold text-slate-300 block leading-tight">{project.brandName}</span>
              <span className="text-[11px] text-slate-400">{project.postedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${getStatusBadge()}`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Project Title */}
        <Link 
          to={`/projects/${project.id}`}
          className="text-base font-bold text-white hover:text-brand-300 transition line-clamp-2 mb-2 block"
        >
          {project.title}
        </Link>

        {/* Project Overview */}
        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Key Specification Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <DollarSign className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Budget</div>
              <div className="font-semibold text-emerald-300">{project.budgetDisplay}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Deadline</div>
              <div className="font-medium text-slate-200">{project.deadline}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Layers className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Content Type</div>
              <div className="font-medium text-indigo-300 truncate">{project.contentType}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Users className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Applicants</div>
              <div className="font-medium text-cyan-300">{project.applications?.length || 0} proposals</div>
            </div>
          </div>
        </div>

        {/* Required skills & tools */}
        <div className="space-y-1.5 mb-4">
          <div className="text-[11px] text-slate-400">Required Skills & Tools:</div>
          <div className="flex flex-wrap gap-1.5">
            {project.requiredSkills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                {skill}
              </span>
            ))}
            {project.preferredAiTools.slice(0, 2).map((tool, idx) => (
              <span key={`t-${idx}`} className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-mono">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
        <Link
          to={`/projects/${project.id}`}
          className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition"
        >
          View Full Brief
        </Link>

        {/* Brand can match creators for this project */}
        <Link
          to={`/ai-matching/${project.id}`}
          className="py-2 px-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm transition"
          title="Find Top AI Creators Matched for this Brief"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Match AI</span>
        </Link>

        {/* Creator apply button if creator role */}
        {isCreator && project.status === 'Open' && onApply && (
          <button
            onClick={onApply}
            className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};
