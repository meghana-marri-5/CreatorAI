import React, { useState } from 'react';
import { Project } from '../types';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { X, Send, AlertCircle, CheckCircle2, DollarSign, Clock, FileText } from 'lucide-react';

interface ApplyProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ApplyProjectModal: React.FC<ApplyProjectModalProps> = ({ project, onClose, onSuccess }) => {
  const { user } = useAuth();
  const { submitApplication, creators } = useMarketplace();

  // Find creator details
  const currentCreator = creators.find(c => c.id === user?.id) || creators[0];

  const [proposal, setProposal] = useState(
    `Hello! I've reviewed your brief for "${project?.title}". I have extensive experience in this exact pipeline, and I can deliver high-fidelity outputs adhering to your commercial requirements and schedule.`
  );
  const [proposedRate, setProposedRate] = useState(project?.budgetDisplay.split(' - ')[0] || '$1,500');
  const [estimatedDeliveryDays, setEstimatedDeliveryDays] = useState(7);
  const [relevantPortfolioItem, setRelevantPortfolioItem] = useState(
    currentCreator.portfolio[0]?.title || 'Featured Commercial Portfolio Showcase'
  );

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (proposal.trim().length < 20) {
      setError('Please provide a meaningful proposal description (at least 20 characters).');
      return;
    }

    const result = submitApplication(project.id, {
      proposal,
      proposedRate,
      estimatedDeliveryDays,
      relevantPortfolioItem
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onSuccess?.();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0d111c] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Application Submitted!</h3>
            <p className="text-sm text-slate-300">
              Your proposal has been submitted to <strong>{project.brandName}</strong>. You can track this application in your Creator Dashboard.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Apply to Project Brief</h2>
              <p className="text-xs text-brand-300 mt-1 line-clamp-1">{project.title}</p>
              <div className="text-xs text-slate-400 mt-0.5">Client: {project.brandName} • Budget: {project.budgetDisplay}</div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Applying as Creator:
                </label>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <img src={currentCreator.avatar} alt={currentCreator.name} className="w-9 h-9 rounded-lg object-cover" />
                  <div>
                    <div className="text-xs font-semibold text-white">{currentCreator.name}</div>
                    <div className="text-[11px] text-slate-400">{currentCreator.title}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Proposed Quote</span>
                  </label>
                  <input
                    type="text"
                    value={proposedRate}
                    onChange={(e) => setProposedRate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. $1,800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Turnaround Time (Days)</span>
                  </label>
                  <input
                    type="number"
                    value={estimatedDeliveryDays}
                    onChange={(e) => setEstimatedDeliveryDays(parseInt(e.target.value) || 1)}
                    min={1}
                    max={60}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-brand-400" />
                  <span>Highlight Relevant Portfolio Work</span>
                </label>
                <select
                  value={relevantPortfolioItem}
                  onChange={(e) => setRelevantPortfolioItem(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {currentCreator.portfolio.map((p) => (
                    <option key={p.id} value={p.title}>{p.title} ({p.category})</option>
                  ))}
                  <option value="General Commercial Portfolio Reel">General Commercial Portfolio Reel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Proposal Pitch & Technical Workflow *
                </label>
                <textarea
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  placeholder="Describe your creative approach, tooling, and timeline..."
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-semibold text-white flex items-center gap-2 shadow-glow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
