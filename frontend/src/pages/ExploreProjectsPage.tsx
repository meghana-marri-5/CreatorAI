import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { ProjectCard } from '../components/ProjectCard';
import { ApplyProjectModal } from '../components/ApplyProjectModal';
import { Project } from '../types';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  DollarSign, 
  Clock, 
  Briefcase 
} from 'lucide-react';

export const ExploreProjectsPage: React.FC = () => {
  const { projects } = useMarketplace();
  const { isBrand } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'budget-desc' | 'applicants'>('recent');

  // Modal for Applying to Project
  const [projectToApply, setProjectToApply] = useState<Project | null>(null);

  // Filter projects (showing open and reviewing briefs)
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = project.title.toLowerCase().includes(q);
        const matchBrand = project.brandName.toLowerCase().includes(q);
        const matchDesc = project.description.toLowerCase().includes(q);
        const matchSkills = project.requiredSkills.some(s => s.toLowerCase().includes(q));
        const matchTools = project.preferredAiTools.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchBrand && !matchDesc && !matchSkills && !matchTools) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'all') {
        if (!project.contentType.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'budget-desc':
          return (b.budgetMax || 2500) - (a.budgetMax || 2500);
        case 'applicants':
          return (b.applications?.length || 0) - (a.applications?.length || 0);
        case 'recent':
        default:
          return 0;
      }
    });
  }, [projects, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Creator Opportunities</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Explore Open Project Briefs</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Active commercial project briefs published by brands looking for verified AI creators.
          </p>
        </div>

        {isBrand && (
          <Link
            to="/create-brief"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-xs text-white shadow-glow-sm transition self-start md:self-auto"
          >
            Post a Project Brief
          </Link>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-[#0d111c] border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keywords, brand, tools, or skills..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Category & Sorting Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Content Types</option>
            <option value="Video">AI Video</option>
            <option value="Imagery">Generative Imagery</option>
            <option value="Virtual">Virtual Influencers & 3D</option>
            <option value="Product">Product Staging</option>
            <option value="Voice">Voice & Audio</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
          >
            <option value="recent">Recently Posted</option>
            <option value="budget-desc">Highest Budget</option>
            <option value="applicants">Most Applications</option>
          </select>

          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Projects Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            There are no briefs matching your active filter criteria. Try adjusting your query or post a new brief.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onApply={() => setProjectToApply(project)}
            />
          ))}
        </div>
      )}

      {/* Apply Proposal Modal */}
      <ApplyProjectModal
        project={projectToApply}
        onClose={() => setProjectToApply(null)}
      />
    </div>
  );
};
