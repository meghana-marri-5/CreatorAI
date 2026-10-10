import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { rankCreatorsForProject } from '../services/matchingAlgorithm';
import { CreatorCard } from '../components/CreatorCard';
import { PortfolioItemModal } from '../components/PortfolioItemModal';
import { InviteCreatorModal } from '../components/InviteCreatorModal';
import { Creator, PortfolioItem } from '../types';
import { 
  Sparkles, 
  ArrowLeft, 
  Zap, 
  Layers, 
  CheckCircle2, 
  SlidersHorizontal, 
  HelpCircle,
  ExternalLink,
  Send,
  Star
} from 'lucide-react';

export const AiCreatorMatchingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, creators } = useMarketplace();

  // Find target project
  const project = projects.find(p => p.id === id) || projects[0];

  // Rank creators using the transparent 40/25/20/15 algorithm
  const rankedResults = rankCreatorsForProject(project, creators);

  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [selectedCreatorForInvite, setSelectedCreatorForInvite] = useState<Creator | null>(null);
  const [minScoreFilter, setMinScoreFilter] = useState<number>(0);

  const filteredResults = rankedResults.filter(r => r.matchScore >= minScoreFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <Link 
        to={`/projects/${project.id}`} 
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Project Brief</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-xs font-semibold text-brand-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Creator Compatibility Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Recommended Creators for "{project.title}"
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Target Content: <strong className="text-white">{project.contentType}</strong> • Budget: <strong className="text-emerald-400">{project.budgetDisplay}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Min Match:</span>
            <select
              value={minScoreFilter}
              onChange={(e) => setMinScoreFilter(Number(e.target.value))}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value={0}>All Match Tiers (0%+)</option>
              <option value={70}>Strong Match (70%+)</option>
              <option value={85}>Top Compatibility (85%+)</option>
            </select>
          </div>
        </div>

        {/* Algorithm Transparency Breakdown Callout */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Weight 1: Skills</span>
            <span className="font-bold text-brand-300">40% Similarity</span>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Weight 2: Specialization</span>
            <span className="font-bold text-indigo-300">25% Overlap</span>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Weight 3: Content Type</span>
            <span className="font-bold text-cyan-300">20% Direct Alignment</span>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Weight 4: AI Tools</span>
            <span className="font-bold text-emerald-300">15% Toolchain Match</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 italic">
          <HelpCircle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <span>Note: Scores represent estimated requirement compatibility based on active brief criteria, not an arbitrary quality rating.</span>
        </div>
      </div>

      {/* Ranked Creator Results List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Compatibility Rankings ({filteredResults.length} Creators)</span>
          </h2>
        </div>

        <div className="space-y-6">
          {filteredResults.map((result, index) => {
            const creator = result.creator;
            return (
              <div 
                key={creator.id}
                className="bg-[#0d111c] border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl transition"
              >
                {/* Top Header Row with Match Score & Rank */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-brand-300 font-mono font-extrabold flex items-center justify-center text-sm">
                      #{index + 1}
                    </div>

                    <img 
                      src={creator.avatar} 
                      alt={creator.name} 
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-700" 
                    />

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link 
                          to={`/creators/${creator.id}`} 
                          className="text-lg font-bold text-white hover:text-brand-300 transition"
                        >
                          {creator.name}
                        </Link>
                        <span className="text-xs text-slate-400 font-mono">• ${creator.hourlyRate}/hr</span>
                      </div>
                      <p className="text-xs text-brand-300 font-medium">{creator.title}</p>
                    </div>
                  </div>

                  {/* Compatibility Score Gauge */}
                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                      <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-cyan">
                        {result.matchScore}%
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                        Estimated Match
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCreatorForInvite(creator)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 text-xs font-bold text-white shadow-glow-sm flex items-center gap-1.5 transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Invite to Project</span>
                    </button>
                  </div>
                </div>

                {/* Explainable Rationale Callout */}
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed space-y-1.5">
                  <strong className="text-white flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                    <span>Algorithmic Rationale & Compatibility Breakdown:</span>
                  </strong>
                  <p>{result.explanation}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      Skills: <strong>{result.breakdown.skillsScore}/40 pts</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      Specialization: <strong>{result.breakdown.specializationScore}/25 pts</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      Content Type: <strong>{result.breakdown.contentTypeScore}/20 pts</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      AI Tooling: <strong>{result.breakdown.aiToolsScore}/15 pts</strong>
                    </div>
                  </div>
                </div>

                {/* Matched Skills & Tools Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1 font-semibold">Matched Skills:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.matchedSkills.length > 0 ? (
                        result.matchedSkills.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{s}</span>
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500 italic">Broader transferable skill foundation</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1 font-semibold">Matched AI Tools & Engines:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.matchedTools.length > 0 ? (
                        result.matchedTools.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-mono flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{t}</span>
                          </span>
                        ))
                      ) : (
                        creator.aiTools.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                            {t}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Portfolio Showcase Snippets */}
                <div className="pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold text-slate-300">Relevant Portfolio Evidence:</span>
                    <Link to={`/creators/${creator.id}`} className="text-brand-400 hover:underline">
                      View all {creator.portfolio.length} works →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {creator.portfolio.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedPortfolioItem(item)}
                        className="group/item bg-slate-900/60 rounded-xl border border-slate-800 hover:border-brand-500/50 p-2.5 cursor-pointer transition flex items-center gap-3"
                      >
                        <img 
                          src={item.thumbnailUrl} 
                          alt={item.title} 
                          className="w-14 h-10 rounded-lg object-cover flex-shrink-0" 
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-semibold text-white group-hover/item:text-brand-300 truncate">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
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
