import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { CreatorCard } from '../components/CreatorCard';
import { PortfolioItemModal } from '../components/PortfolioItemModal';
import { InviteCreatorModal } from '../components/InviteCreatorModal';
import { Creator, PortfolioItem } from '../types';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw, 
  SlidersHorizontal, 
  Star, 
  Sparkles,
  Layers,
  Wrench,
  DollarSign
} from 'lucide-react';

export const DiscoverCreatorsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const { creators } = useMarketplace();

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTool, setSelectedTool] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(200);
  const [sortBy, setSortBy] = useState<'rating' | 'projects' | 'rate-asc' | 'rate-desc' | 'name'>('rating');

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Modals
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [selectedCreatorForInvite, setSelectedCreatorForInvite] = useState<Creator | null>(null);

  // Available Tools extracted dynamically
  const availableTools = useMemo(() => {
    const set = new Set<string>();
    creators.forEach(c => c.aiTools.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [creators]);

  // Combined Filtering Logic
  const filteredCreators = useMemo(() => {
    return creators.filter((creator) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = creator.name.toLowerCase().includes(q);
        const matchTitle = creator.title.toLowerCase().includes(q);
        const matchBio = creator.bio.toLowerCase().includes(q);
        const matchSkills = creator.skills.some(s => s.toLowerCase().includes(q));
        const matchTools = creator.aiTools.some(t => t.toLowerCase().includes(q));
        const matchSpecs = creator.specializations.some(sp => sp.toLowerCase().includes(q));
        if (!matchName && !matchTitle && !matchBio && !matchSkills && !matchTools && !matchSpecs) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'all') {
        if (creator.primaryCategory !== selectedCategory) {
          // Check if creator has portfolio items in that category
          const hasCategory = creator.portfolio.some(p => p.category === selectedCategory);
          if (!hasCategory) return false;
        }
      }

      // 3. AI Tool
      if (selectedTool !== 'all') {
        const hasTool = creator.aiTools.some(t => t.toLowerCase().includes(selectedTool.toLowerCase()));
        if (!hasTool) return false;
      }

      // 4. Experience Level
      if (selectedExperience !== 'all') {
        if (creator.experienceLevel !== selectedExperience) return false;
      }

      // 5. Availability
      if (selectedAvailability !== 'all') {
        if (creator.availability !== selectedAvailability) return false;
      }

      // 6. Max Hourly Rate
      if (creator.hourlyRate > maxHourlyRate) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'projects':
          return b.completedProjects - a.completedProjects;
        case 'rate-asc':
          return a.hourlyRate - b.hourlyRate;
        case 'rate-desc':
          return b.hourlyRate - a.hourlyRate;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [
    creators, 
    searchQuery, 
    selectedCategory, 
    selectedTool, 
    selectedExperience, 
    selectedAvailability, 
    maxHourlyRate, 
    sortBy
  ]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTool('all');
    setSelectedExperience('all');
    setSelectedAvailability('all');
    setMaxHourlyRate(200);
    setSortBy('rating');
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedCategory !== 'all' || 
    selectedTool !== 'all' || 
    selectedExperience !== 'all' || 
    selectedAvailability !== 'all' || 
    maxHourlyRate < 200;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Creator Marketplace</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Discover AI Content Creators</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse verified AI directors, prompt artists, virtual influencer sculptors, and synthetic audio producers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-white flex items-center gap-2"
          >
            <Filter className="w-4 h-4 text-brand-400" />
            <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="rating">Top Rated (Highest)</option>
              <option value="projects">Most Completed Jobs</option>
              <option value="rate-asc">Hourly Rate: Low to High</option>
              <option value="rate-desc">Hourly Rate: High to Low</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by creator name, specific skill, AI tool (Runway, Kling, Flux.1), or keywords..."
          className="w-full pl-12 pr-10 py-3 bg-[#0d111c] border border-slate-800 focus:border-brand-500 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none shadow-md"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-3 p-1 rounded-lg text-slate-400 hover:text-white"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Layout: Desktop Sidebar Filters + Creator Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block bg-[#0d111c] border border-slate-800/80 rounded-3xl p-6 space-y-6 shadow-lg sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-brand-400" />
              <span>Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-brand-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Discipline Category */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">Content Category</label>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Specializations' },
                { id: 'video', label: 'AI Video Diffusion' },
                { id: 'imagery', label: 'Generative Imagery' },
                { id: 'virtual-influencer', label: 'Virtual Influencers & 3D' },
                { id: 'product', label: 'Product Staging' },
                { id: 'concept-art', label: 'Concept Art' },
                { id: 'audio', label: 'Voice & Audio' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                    selectedCategory === c.id
                      ? 'bg-brand-600/20 text-brand-300 font-semibold border border-brand-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Tool */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">AI Tool & Model Engine</label>
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="all">All AI Tools</option>
              {availableTools.map((tool) => (
                <option key={tool} value={tool}>{tool}</option>
              ))}
            </select>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">Experience Level</label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="all">All Experience Levels</option>
              <option value="Master">Master (50+ Jobs)</option>
              <option value="Senior">Senior (20+ Jobs)</option>
              <option value="Intermediate">Intermediate (5+ Jobs)</option>
            </select>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">Availability</label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="all">All Availability</option>
              <option value="Available">Available Immediately</option>
              <option value="Limited">Limited Availability</option>
            </select>
          </div>

          {/* Hourly Rate Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold">Max Rate:</span>
              <span className="font-bold text-emerald-400">${maxHourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min={50}
              max={200}
              step={10}
              value={maxHourlyRate}
              onChange={(e) => setMaxHourlyRate(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-4">
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Showing <strong className="text-white">{filteredCreators.length}</strong> of {creators.length} creators
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-brand-400 hover:underline font-medium"
              >
                Clear all active filters
              </button>
            )}
          </div>

          {/* Creator Grid or Empty State */}
          {filteredCreators.length === 0 ? (
            <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <Search className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Creators Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We couldn't find any creators matching your exact filter criteria. Try adjusting your search keyword or resetting filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white transition inline-block"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredCreators.map((creator) => (
                <CreatorCard 
                  key={creator.id} 
                  creator={creator}
                  onOpenPortfolioItem={(item) => setSelectedPortfolioItem(item)}
                  onInvite={() => setSelectedCreatorForInvite(creator)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Item Full Inspection Modal */}
      <PortfolioItemModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
      />

      {/* Invite Creator Modal */}
      <InviteCreatorModal
        creator={selectedCreatorForInvite}
        onClose={() => setSelectedCreatorForInvite(null)}
      />
    </div>
  );
};
