import React, { useState } from 'react';
import { enhancePortfolioWithAi, EnhancedPortfolioData } from '../services/aiService';
import { 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Layers, 
  Wrench, 
  HelpCircle 
} from 'lucide-react';

export const PortfolioAssistantPage: React.FC = () => {
  const [title, setTitle] = useState('Cyberpunk Hypercar Commercial Reveal');
  const [description, setDescription] = useState('I made a video ad for an electric hypercar driving in a futuristic city with reflections.');
  const [tools, setTools] = useState('Runway Gen-3, Kling AI, Topaz Video AI, DaVinci Resolve');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EnhancedPortfolioData | null>(null);

  const handleEnhance = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toolsList = tools.split(',').map(t => t.trim()).filter(Boolean);
    const enhanced = await enhancePortfolioWithAi(title, description, toolsList);
    setResult(enhanced);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Creator AI Bonus Tool</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">AI Portfolio Assistant</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Enhance your portfolio descriptions with clear diffusion pipeline terminology, suggested tags, and rigorous quality control explanations that appeal to enterprise brand clients.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
        <form onSubmit={handleEnhance} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">AI Tools Used (Comma-separated)</label>
            <input
              type="text"
              value={tools}
              onChange={(e) => setTools(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Draft or Rough Project Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 font-bold text-xs text-white shadow-sm flex items-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <span>Polishing Workflow Text...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Enhance Portfolio Description</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Output Card */}
      {result && (
        <div className="bg-[#0d111c] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Suggested Portfolio Presentation</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Ready to Copy into Portfolio Builder</span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs text-slate-400 block font-semibold mb-1">Recommended Title:</span>
              <div className="text-base font-bold text-white">{result.title}</div>
            </div>

            <div>
              <span className="text-xs text-slate-400 block font-semibold mb-1">Enhanced Commercial Description:</span>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                {result.description}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-400 block font-semibold mb-1">Structured Workflow Explanation:</span>
              <p className="text-xs text-indigo-300 font-mono bg-slate-950 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
                {result.workflowSummary}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-400 block font-semibold mb-1">Suggested Skill Tags:</span>
              <div className="flex flex-wrap gap-1.5">
                {result.suggestedSkills.map((s, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
