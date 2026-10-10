import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { VerificationBadge } from '../components/VerificationBadge';
import { PortfolioItemModal } from '../components/PortfolioItemModal';
import { InviteCreatorModal } from '../components/InviteCreatorModal';
import { PortfolioItem } from '../types';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Bookmark, 
  Send, 
  Layers, 
  Wrench, 
  Eye, 
  Terminal, 
  DollarSign, 
  ArrowLeft 
} from 'lucide-react';

export const CreatorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { creators, isCreatorSaved, toggleSaveCreator } = useMarketplace();

  const creator = creators.find(c => c.id === id) || creators[0];
  const isSaved = isCreatorSaved(creator.id);

  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <Link 
        to="/discover-creators" 
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Creator Directory</span>
      </Link>

      {/* Hero Profile Banner */}
      <div className="bg-[#0d111c] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Cover Image */}
        <div className="h-48 sm:h-64 relative bg-slate-900 overflow-hidden">
          {creator.coverImage && (
            <img 
              src={creator.coverImage} 
              alt={creator.name} 
              className="w-full h-full object-cover opacity-50" 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d111c] via-transparent to-transparent"></div>

          {/* Action Bookmark */}
          <button
            onClick={() => toggleSaveCreator(creator.id)}
            className={`absolute top-4 right-4 p-2.5 rounded-2xl backdrop-blur-md transition ${
              isSaved 
                ? 'bg-brand-600 text-white shadow-glow-sm' 
                : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title={isSaved ? "Saved in Shortlist" : "Bookmark Creator"}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Profile Card Header Info */}
        <div className="px-6 sm:px-10 pb-8 pt-0 -mt-20 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-[#0d111c] shadow-2xl ring-2 ring-indigo-500/40"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{creator.name}</h1>
                <VerificationBadge status={creator.verificationStatus} size="md" />
              </div>
              <p className="text-sm font-semibold text-brand-300">{creator.title}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1 flex-wrap">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {creator.location}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" /> {creator.rating.toFixed(2)} ({creator.reviewCount} reviews)
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">{creator.completedProjects} Completed Projects</span>
              </div>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 font-bold text-xs text-white shadow-glow-sm flex items-center gap-2 transition"
            >
              <Send className="w-4 h-4" />
              <span>Invite to Project Brief</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Bio & Workflows vs Sidebar Meta */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Bio, Workflow, and Portfolio Gallery */}
        <div className="lg:col-span-2 space-y-8">
          {/* Biography */}
          <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-white">About the Creator</h2>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {creator.bio}
            </p>
          </div>

          {/* Verified Workflow Phases */}
          {creator.workflow && creator.workflow.length > 0 && (
            <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-brand-400" />
                  <span>Standard Production Workflow & Quality Controls</span>
                </h2>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                  Verified Pipeline
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {creator.workflow.map((phase, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{phase.step}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Gallery */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-400" />
                <span>Verified Commercial Portfolio Works ({creator.portfolio.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {creator.portfolio.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0d111c] border border-slate-800 rounded-2xl overflow-hidden group shadow-lg hover:border-slate-700 transition cursor-pointer flex flex-col justify-between"
                  onClick={() => setSelectedPortfolioItem(item)}
                >
                  <div>
                    <div className="aspect-video relative bg-slate-900 overflow-hidden">
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <span className="absolute top-2 left-2 text-[10px] uppercase font-semibold bg-black/75 px-2 py-0.5 rounded text-brand-300 backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.aiTools.map((t, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-slate-900/40 border-t border-slate-800 flex items-center justify-between text-xs text-brand-400 font-semibold">
                    <span>Inspect Pipeline & Prompts</span>
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Toolchain, Specializations, Rates & Clearance */}
        <div className="space-y-6 sticky top-28">
          {/* Rate & Availability Card */}
          <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">Collaboration & Rates</h3>
            
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-xs text-slate-400">Standard Hourly Rate:</span>
              <span className="text-base font-extrabold text-emerald-400">${creator.hourlyRate}/hr</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-xs text-slate-400">Min Project Budget:</span>
              <span className="text-xs font-semibold text-white">${creator.minProjectBudget || 500}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-xs text-slate-400">Availability:</span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {creator.availability}
              </span>
            </div>

            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white shadow-glow-sm transition"
            >
              Invite to Your Project Brief
            </button>
          </div>

          {/* AI Tools & Models */}
          <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400">AI Toolchain & Engine Stack</h3>
            <div className="flex flex-wrap gap-2">
              {creator.aiTools.map((tool, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 space-y-3 shadow-lg">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400">Techniques & Specialized Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {creator.skills.map((skill, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Commercial Clearance */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-3xl p-6 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Commercial Clearance Warranty</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {creator.commercialInfo.summary}
            </p>
            <div className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 inline-block">
              {creator.commercialInfo.licenseTag}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Item Full Inspection Modal */}
      <PortfolioItemModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
      />

      {/* Invite Creator to Project Modal */}
      <InviteCreatorModal
        creator={isInviteModalOpen ? creator : null}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
};
