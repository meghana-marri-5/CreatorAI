import React from 'react';
import { PortfolioItem } from '../types';
import { X, ExternalLink, ShieldCheck, Wrench, Sparkles, Terminal } from 'lucide-react';

interface PortfolioItemModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const PortfolioItemModal: React.FC<PortfolioItemModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d111c] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-6 group">
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-brand-300 border border-slate-700 uppercase tracking-wider">
            {item.category}
          </div>
        </div>

        {/* Header Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
          <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
        </div>

        {/* Technical AI Toolchain */}
        <div className="mb-6 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
            <Wrench className="w-4 h-4" />
            <span>AI Tools & Model Pipeline</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {item.aiTools.map((tool, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Workflow & Creative Process */}
        {item.workflowDescription && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              Creative & Technical Workflow
            </h3>
            <p className="text-xs text-slate-300 bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed font-mono">
              {item.workflowDescription}
            </p>
          </div>
        )}

        {/* Prompt Snippet if present */}
        {item.promptSnippet && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Diffusion Prompt Matrix Snippet
            </h3>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono leading-relaxed select-all">
              "{item.promptSnippet}"
            </div>
          </div>
        )}

        {/* Contribution & Commercial Rights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
          {item.creatorContribution && (
            <div>
              <span className="text-slate-400 block mb-1">Creator Contribution:</span>
              <span className="text-white font-medium">{item.creatorContribution}</span>
            </div>
          )}

          {item.licensingInformation && (
            <div className="flex items-start gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block mb-1">Commercial Clearance:</span>
                <span className="font-medium text-emerald-300">{item.licensingInformation}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
