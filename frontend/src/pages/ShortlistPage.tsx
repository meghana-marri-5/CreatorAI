import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { CreatorCard } from '../components/CreatorCard';
import { Bookmark, Search, ArrowRight } from 'lucide-react';

export const ShortlistPage: React.FC = () => {
  const { creators, savedCreatorIds } = useMarketplace();

  const savedCreators = creators.filter(c => savedCreatorIds.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Brand Portfolio</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Saved Creators Shortlist</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Quickly access and invite your shortlisted AI creators for upcoming campaigns.
        </p>
      </div>

      {savedCreators.length === 0 ? (
        <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Creators Shortlisted Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the bookmark icon on any creator card in the discovery directory to save them to your shortlist.
          </p>
          <Link
            to="/discover-creators"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-xs text-white inline-block transition"
          >
            Explore Creators Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
};
