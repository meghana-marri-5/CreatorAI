import React, { useState } from 'react';
import { Creator, Project } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';
import { X, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface InviteCreatorModalProps {
  creator: Creator | null;
  onClose: () => void;
}

export const InviteCreatorModal: React.FC<InviteCreatorModalProps> = ({ creator, onClose }) => {
  const { projects } = useMarketplace();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [message, setMessage] = useState(
    `Hi ${creator?.name}! We reviewed your impressive portfolio and believe your expertise is an exceptional fit for our project. We would love for you to submit a proposal!`
  );
  const [sent, setSent] = useState(false);

  if (!creator) return null;

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#0d111c] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Invitation Sent!</h3>
            <p className="text-xs text-slate-300">
              An invitation to collaborate on your project has been sent to <strong>{creator.name}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
              <div>
                <h3 className="text-base font-bold text-white">Invite {creator.name}</h3>
                <p className="text-xs text-slate-400">{creator.title}</p>
              </div>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Select Project Brief to Invite:
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.budgetDisplay})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Personalized Invitation Message:
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Project Invite</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
