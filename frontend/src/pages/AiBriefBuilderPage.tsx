import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateAiCreativeBrief, GeneratedBriefData } from '../services/aiService';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  Cpu, 
  HelpCircle, 
  Layers, 
  Wrench, 
  DollarSign, 
  Clock, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const AiBriefBuilderPage: React.FC = () => {
  const navigate = useNavigate();

  // Input states
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('Cinematic & High-End');
  const [industry, setIndustry] = useState('Food & Beverage');

  // Generator states
  const [loading, setLoading] = useState(false);
  const [engineMode, setEngineMode] = useState<string>('Local Deterministic Heuristics (Zero API Key Needed)');
  const [isLiveAi, setIsLiveAi] = useState<boolean>(false);
  const [generatedBrief, setGeneratedBrief] = useState<GeneratedBriefData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Preset sample concepts for 1-click test
  const presetPrompts = [
    {
      label: '⚡ Cyberpunk Energy Drink Commercial',
      prompt: 'High-octane neon cyberpunk video ad for Apex Volt energy drink with fast camera zooms and bass drops for TikTok and Reels (9:16 vertical)',
      tone: 'Cyberpunk & High-Energy',
      industry: 'Food & Beverage'
    },
    {
      label: '🧥 Minimalist Winter Lookbook',
      prompt: 'Minimalist winter cashmere fashion editorial lookbook with natural human skin pores and Nordic fjord landscapes for 300 DPI print',
      tone: 'Scandinavian Minimalist',
      industry: 'Fashion & Luxury Goods'
    },
    {
      label: '💧 Organic Skincare Product Staging',
      prompt: 'Photorealistic zero-shot cosmetic serum packshots on wet river stones with morning dew and soft light preserving packaging logo',
      tone: 'Organic & Zen',
      industry: 'Beauty & Cosmetics'
    },
    {
      label: '🎙️ Deep Space Audio Drama',
      prompt: 'Immersive deep-space audio drama with 3 distinct synthetic character voices, spaceship cockpit foley and spatial binaural hums',
      tone: 'Cinematic Sci-Fi',
      industry: 'Entertainment & Media'
    }
  ];

  const handleGenerate = async (targetPrompt?: string, targetTone?: string, targetIndustry?: string) => {
    const inputPrompt = targetPrompt || prompt;
    if (!inputPrompt.trim()) {
      setError('Please enter a rough creative idea or pick one of the sample concepts.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await generateAiCreativeBrief(
        inputPrompt, 
        targetTone || tone, 
        targetIndustry || industry
      );

      setGeneratedBrief(res.brief);
      setEngineMode(res.mode);
      setIsLiveAi(res.isLiveAi);
    } catch (err: any) {
      setError(err.message || 'Failed to generate creative brief.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseBrief = () => {
    if (!generatedBrief) return;
    // Navigate to CreateBriefPage with generated data
    navigate('/create-brief', { state: { brief: generatedBrief } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-300 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Priority AI Hackathon Feature</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">AI-Assisted Brief Builder</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Transform a rough sentence or idea into an exhaustive, production-grade creative brief with prompt syntax, technical deliverables, and commercial questions.
        </p>
      </div>

      {/* Engine Status Bar (Transparency Requirement) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isLiveAi ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`}></span>
          <span className="text-slate-400">Engine Mode:</span>
          <span className="font-semibold text-white bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
            {engineMode}
          </span>
        </div>

        <div className="text-slate-400 flex items-center gap-2">
          <span>AI Model:</span>
          <strong className="text-brand-300 font-mono">
            {isLiveAi ? 'Gemini 1.5 Flash API' : 'Deterministic Semantic Heuristics'}
          </strong>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-[#0d111c] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <label className="block text-sm font-bold text-white mb-2">
            Enter Your Rough Idea or Notes:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="e.g. I need a 20-second Instagram advertisement for a premium coffee brand featuring steaming cups, slow-motion pour, and cozy morning light..."
            className="w-full p-4 bg-slate-950 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 leading-relaxed shadow-inner"
          />
        </div>

        {/* 1-Click Concept Presets */}
        <div>
          <div className="text-xs font-semibold text-slate-400 mb-2">Or try an instant sample concept:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {presetPrompts.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(preset.prompt);
                  setTone(preset.tone);
                  setIndustry(preset.industry);
                  handleGenerate(preset.prompt, preset.tone, preset.industry);
                }}
                className="p-2.5 text-left rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-brand-500/50 text-xs text-slate-300 hover:text-white transition flex items-center justify-between group"
              >
                <span className="font-medium truncate">{preset.label}</span>
                <Sparkles className="w-3.5 h-3.5 text-brand-400 opacity-60 group-hover:opacity-100 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Tone & Sector Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Desired Tone & Aesthetic</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="Cinematic & High-End">Cinematic & High-End (35mm Anamorphic)</option>
              <option value="Cyberpunk & High-Energy">Cyberpunk & High-Energy</option>
              <option value="Scandinavian Minimalist">Scandinavian Minimalist & Organic</option>
              <option value="Viral UGC & Fast-Paced">Viral UGC & Fast-Paced Social</option>
              <option value="Moody Film Noir">Moody Film Noir & Atmospheric</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Industry Sector</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="Food & Beverage">Food & Beverage / CPG</option>
              <option value="Fashion & Luxury Goods">Fashion & Luxury Goods</option>
              <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
              <option value="Gaming & Technology">Gaming & Technology</option>
              <option value="Entertainment & Media">Entertainment & Media</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Generate Button */}
        <div>
          <button
            type="button"
            onClick={() => handleGenerate()}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-glow-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                <span>Generating Structured Brief...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Structured Creative Brief</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Structured Output Section */}
      {generatedBrief && (
        <div className="bg-[#0d111c] border border-brand-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Generated Creative Brief</span>
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">{generatedBrief.title}</h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleGenerate()}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700 flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>

              <button
                type="button"
                onClick={handleUseBrief}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white shadow-sm flex items-center gap-1.5 transition"
              >
                <span>Use This Brief in Project Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Overview & Objective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Project Overview
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">{generatedBrief.overview}</p>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Business Objective
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">{generatedBrief.businessObjective}</p>
            </div>
          </div>

          {/* Specs Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Content Type</span>
              <span className="font-semibold text-white">{generatedBrief.contentType}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Format / Dimensions</span>
              <span className="font-semibold text-brand-300">{generatedBrief.formatDimensions}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Estimated Turnaround</span>
              <span className="font-semibold text-amber-400">{generatedBrief.estimatedTimelineDays} Days</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Benchmark Budget</span>
              <span className="font-semibold text-emerald-400">{generatedBrief.budgetEstimate}</span>
            </div>
          </div>

          {/* Creative Direction */}
          <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Creative Direction & Lighting Specs
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{generatedBrief.creativeDirection}</p>
          </div>

          {/* Deliverables */}
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
              Suggested Deliverables
            </span>
            <div className="space-y-1.5">
              {generatedBrief.suggestedDeliverables.map((deliv, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Skills & AI Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                Required Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {generatedBrief.requiredSkills.map((skill, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                Suggested AI Tools & Engines
              </span>
              <div className="flex flex-wrap gap-1.5">
                {generatedBrief.suggestedAiTools.map((tool, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Commercial Questions for Clarification */}
          {generatedBrief.commercialClarifications && generatedBrief.commercialClarifications.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
              <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Commercial Questions That May Require Clarification:</span>
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {generatedBrief.commercialClarifications.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={handleUseBrief}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 font-bold text-xs text-white shadow-glow-sm flex items-center gap-2 transition"
            >
              <span>Apply Brief to Project Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
