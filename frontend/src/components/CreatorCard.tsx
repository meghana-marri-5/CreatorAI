import React from 'react';
import { Link } from 'react-router-dom';
import { Creator } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';
import { VerificationBadge } from './VerificationBadge';
import { Star, MapPin, Bookmark, ExternalLink, Zap, CheckCircle2 } from 'lucide-react';

interface CreatorCardProps {
  creator: Creator;
  matchScore?: number;
  matchExplanation?: string;
  onOpenPortfolioItem?: (item: any) => void;
  onInvite?: () => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  matchScore, 
  matchExplanation,
  onOpenPortfolioItem,
  onInvite
}) => {
  const { toggleSaveCreator, isCreatorSaved } = useMarketplace();
  const isSaved = isCreatorSaved(creator.id);

  return (
    <div className="group relative bg-[#0d111c] hover:bg-[#121727] rounded-2xl border border-slate-800/80 hover:border-indigo-500/50 shadow-lg hover:shadow-glow-sm transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Banner & Bookmark */}
      <div className="relative h-28 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
        {creator.coverImage && (
          <img 
            src={creator.coverImage} 
            alt={creator.name}
            className="w-full h-full object-cover opacity-35 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d111c] via-transparent to-transparent"></div>

        {/* Match score badge if provided */}
        {matchScore !== undefined && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border border-white/20 animate-in fade-in">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{matchScore}% Match Score</span>
          </div>
        )}

        {/* Shortlist bookmark button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveCreator(creator.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
            isSaved 
              ? 'bg-brand-600 text-white shadow-glow-sm' 
              : 'bg-slate-900/70 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title={isSaved ? "Remove from Shortlist" : "Save Creator to Shortlist"}
          aria-label="Bookmark Creator"
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Profile info section */}
      <div className="px-5 pt-0 pb-5 flex-1 flex flex-col -mt-12">
        <div className="flex items-end justify-between mb-3">
          <div className="relative">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#0d111c] shadow-md ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition"
            />
            {creator.availability === 'Available' && (
              <span 
                className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0d111c]"
                title="Available for new client projects"
              ></span>
            )}
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-amber-400 font-semibold text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>{creator.rating.toFixed(2)}</span>
              <span className="text-slate-400 text-xs font-normal">({creator.reviewCount})</span>
            </div>
            <div className="text-xs font-medium text-slate-300 mt-0.5">
              ${creator.hourlyRate}/hr
            </div>
          </div>
        </div>

        {/* Creator Name & Headline */}
        <div className="mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Link 
              to={`/creators/${creator.id}`}
              className="text-lg font-bold text-white hover:text-brand-300 transition"
            >
              {creator.name}
            </Link>
            <VerificationBadge status={creator.verificationStatus} size="sm" />
          </div>
          <p className="text-xs text-brand-300 font-medium line-clamp-1 mt-0.5">
            {creator.title}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{creator.location}</span>
            <span>•</span>
            <span className="text-emerald-400">{creator.completedProjects} Projects Done</span>
          </div>
        </div>

        {/* Match Explanation if present */}
        {matchExplanation && (
          <div className="my-2.5 p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-200 leading-relaxed">
            <strong className="text-white block mb-0.5">Why Recommended:</strong>
            {matchExplanation}
          </div>
        )}

        {/* Bio snippet */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed my-2">
          {creator.bio}
        </p>

        {/* Skills & AI Tools tags */}
        <div className="space-y-2 my-2">
          <div className="flex flex-wrap gap-1.5">
            {creator.aiTools.slice(0, 3).map((tool, idx) => (
              <span 
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 font-mono"
              >
                {tool}
              </span>
            ))}
            {creator.aiTools.length > 3 && (
              <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono">
                +{creator.aiTools.length - 3}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {creator.skills.slice(0, 3).map((skill, idx) => (
              <span 
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio Thumbnails Preview */}
        {creator.portfolio && creator.portfolio.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-800/80">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center justify-between">
              <span>Verified Portfolio Works ({creator.portfolio.length})</span>
              <span className="text-brand-400 hover:underline cursor-pointer">Preview</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {creator.portfolio.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenPortfolioItem && onOpenPortfolioItem(item)}
                  className="group/thumb relative aspect-video rounded-lg overflow-hidden bg-slate-800 cursor-pointer border border-slate-700/60 hover:border-brand-500 transition"
                  title={item.title}
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover/thumb:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Card Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
          <Link
            to={`/creators/${creator.id}`}
            className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 hover:border-slate-600 transition"
          >
            View Full Profile
          </Link>

          {onInvite && (
            <button
              onClick={onInvite}
              className="py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white shadow-sm transition"
            >
              Invite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
