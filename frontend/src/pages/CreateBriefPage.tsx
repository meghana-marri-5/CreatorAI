import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProjectCard } from '../components/ProjectCard';
import { Project } from '../types';
import { 
  Sparkles, 
  Send, 
  Save, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  Clock, 
  Layers, 
  ShieldCheck,
  FileText
} from 'lucide-react';

export const CreateBriefPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isBrand } = useAuth();
  const { addProject, draftBrief, saveDraftBrief, clearDraftBrief } = useMarketplace();

  // Initial state check: if passed from AI Brief Assistant or from draft
  const stateFromLocation = (location.state as any)?.brief || draftBrief;

  // Form State
  const [title, setTitle] = useState(stateFromLocation?.title || '');
  const [brandName, setBrandName] = useState(user?.company_name || 'Apex Volt Beverage Co.');
  const [description, setDescription] = useState(stateFromLocation?.overview || '');
  const [businessObjective, setBusinessObjective] = useState(stateFromLocation?.businessObjective || '');
  const [contentType, setContentType] = useState(stateFromLocation?.contentType || 'AI Video');
  const [targetAudience, setTargetAudience] = useState(stateFromLocation?.targetAudience || 'Digital-native consumers aged 18-35');
  const [creativeDirection, setCreativeDirection] = useState(stateFromLocation?.creativeDirection || '');
  const [requiredSkillsText, setRequiredSkillsText] = useState(
    stateFromLocation?.requiredSkills ? stateFromLocation.requiredSkills.join(', ') : 'Prompt Engineering, Camera Control, 4K Upscaling'
  );
  const [preferredAiToolsText, setPreferredAiToolsText] = useState(
    stateFromLocation?.suggestedAiTools ? stateFromLocation.suggestedAiTools.join(', ') : 'Runway Gen-3, Kling AI, Topaz Video AI'
  );
  const [deliverablesText, setDeliverablesText] = useState(
    stateFromLocation?.suggestedDeliverables ? stateFromLocation.suggestedDeliverables.join('\n') : '1x 15s Hero Master (4K ProRes 422)\n3x 9:16 Social Cutdowns\nGeneration Seeds and Workflow Documentation'
  );
  const [dimensionsOrDuration, setDimensionsOrDuration] = useState(stateFromLocation?.formatDimensions || '15s (9:16 Vertical)');
  const [deadline, setDeadline] = useState(`${stateFromLocation?.estimatedTimelineDays || 14} days remaining`);
  const [budgetDisplay, setBudgetDisplay] = useState(stateFromLocation?.budgetEstimate || '$1,500 - $2,200');
  const [usagePlatformsText, setUsagePlatformsText] = useState(
    stateFromLocation?.distributionPlatform || 'TikTok, Instagram Reels, YouTube Shorts'
  );
  const [commercialRights, setCommercialRights] = useState<string[]>([
    'Full Commercial Buyout',
    'Perpetual IP Transfer',
    'Paid Advertising Clearance'
  ]);

  const [error, setError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  // Live Preview Object
  const previewProject: Project = {
    id: 'preview-proj',
    brandId: user?.id || 'brand-1',
    brandName: brandName || 'Brand Sponsor',
    brandAvatar: user?.avatar_url || 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=100&q=80',
    title: title || 'Untitled Project Brief',
    description: description || 'Describe your vision, visual style, key characters, and technical deliverables...',
    businessObjective,
    contentType,
    targetAudience,
    creativeDirection,
    requiredSkills: requiredSkillsText.split(',').map((s: string) => s.trim()).filter(Boolean),
    preferredAiTools: preferredAiToolsText.split(',').map((s: string) => s.trim()).filter(Boolean),
    deliverables: deliverablesText.split('\n').map((d: string) => d.trim()).filter(Boolean),
    dimensionsOrDuration,
    deadline,
    budgetDisplay: budgetDisplay || '$1,000 - $2,000',
    usagePlatforms: usagePlatformsText.split(',').map((p: string) => p.trim()).filter(Boolean),
    commercialUseRequirements: commercialRights,
    status: 'Open',
    postedDate: 'Preview Mode',
    applications: []
  };

  const handleSaveDraft = () => {
    saveDraftBrief({
      title,
      overview: description,
      businessObjective,
      contentType,
      targetAudience,
      creativeDirection,
      requiredSkills: requiredSkillsText.split(',').map((s: string) => s.trim()).filter(Boolean),
      suggestedAiTools: preferredAiToolsText.split(',').map((s: string) => s.trim()).filter(Boolean),
      suggestedDeliverables: deliverablesText.split('\n').map((d: string) => d.trim()).filter(Boolean),
      formatDimensions: dimensionsOrDuration,
      budgetEstimate: budgetDisplay,
      distributionPlatform: usagePlatformsText
    });
    alert('Draft saved! You can resume editing anytime.');
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || title.length < 5) {
      setError('Please provide a clear project title (at least 5 characters).');
      return;
    }
    if (!description.trim() || description.length < 20) {
      setError('Please provide an overview of at least 20 characters describing the project.');
      return;
    }
    if (!budgetDisplay.trim()) {
      setError('Please specify an estimated budget range (e.g. $1,500 - $2,500).');
      return;
    }

    setIsPublishing(true);

    const created = addProject({
      brandId: user?.id || 'brand-1',
      brandName: brandName || 'Apex Volt Beverage Co.',
      brandAvatar: user?.avatar_url || 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=100&q=80',
      title,
      description,
      businessObjective,
      contentType,
      targetAudience,
      creativeDirection,
      requiredSkills: requiredSkillsText.split(',').map((s: string) => s.trim()).filter(Boolean),
      preferredAiTools: preferredAiToolsText.split(',').map((s: string) => s.trim()).filter(Boolean),
      deliverables: deliverablesText.split('\n').map((d: string) => d.trim()).filter(Boolean),
      dimensionsOrDuration,
      deadline,
      budgetDisplay,
      usagePlatforms: usagePlatformsText.split(',').map((p: string) => p.trim()).filter(Boolean),
      commercialUseRequirements: commercialRights,
      status: 'Open'
    });

    clearDraftBrief();

    setTimeout(() => {
      setIsPublishing(false);
      navigate(`/ai-matching/${created.id}`);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header with AI Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Brand Portal</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Publish a Creative Project Brief</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Specify technical deliverables, target aspect ratios, AI toolchains, and commercial rights.
          </p>
        </div>

        {/* AI Brief Assistant Callout */}
        <Link
          to="/ai-brief-builder"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-bold text-white shadow-glow-sm flex items-center gap-2 transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch AI Brief Assistant</span>
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-500/15 border border-red-500/30 rounded-2xl text-xs sm:text-sm text-red-300 flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid: Form (7 cols) + Sticky Preview (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-[#0d111c] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <form onSubmit={handlePublish} className="space-y-6">
            {/* 1. Core Identification */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-brand-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>1. Project Overview & Scope</span>
              </h2>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cinematic 15s AI Brand Film for Apex Volt Energy Drink"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Brand or Company Name *</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Content Type *</label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="AI Video">AI Video Diffusion (Cinematic / Commercial)</option>
                    <option value="Generative Imagery">Generative Imagery (Editorial / Fashion)</option>
                    <option value="Virtual Influencer">Virtual Influencer & 3D Gaussian Splats</option>
                    <option value="Product Staging">Photorealistic Product Staging & CPG</option>
                    <option value="Concept Art">Concept Art & Keyframe Worldbuilding</option>
                    <option value="Voice & Audio">Synthetic Voiceover, Foley & Generative Audio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Description & Scope *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe the scenes, narrative, characters, visual pacing, and core requirements..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-brand-500 leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Business Objective</label>
                  <input
                    type="text"
                    value={businessObjective}
                    onChange={(e) => setBusinessObjective(e.target.value)}
                    placeholder="e.g. Drive 200k impressions on TikTok"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Audience</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. Gen-Z gamers & creative professionals"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Technical & Creative Specs */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-brand-400 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>2. Creative Direction & Tooling</span>
              </h2>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Visual Style & Creative Direction</label>
                <input
                  type="text"
                  value={creativeDirection}
                  onChange={(e) => setCreativeDirection(e.target.value)}
                  placeholder="e.g. Cyberpunk / Neon Futurist, anamorphic lens blur, high-energy cuts"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Required Skills (Comma-separated)</label>
                  <input
                    type="text"
                    value={requiredSkillsText}
                    onChange={(e) => setRequiredSkillsText(e.target.value)}
                    placeholder="e.g. Camera Control, ControlNet, 4K Upscaling"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Preferred AI Tools</label>
                  <input
                    type="text"
                    value={preferredAiToolsText}
                    onChange={(e) => setPreferredAiToolsText(e.target.value)}
                    placeholder="e.g. Runway Gen-3, Kling AI, Topaz Video AI"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Deliverables List (One per line)
                </label>
                <textarea
                  value={deliverablesText}
                  onChange={(e) => setDeliverablesText(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Aspect Ratio / Duration</label>
                  <input
                    type="text"
                    value={dimensionsOrDuration}
                    onChange={(e) => setDimensionsOrDuration(e.target.value)}
                    placeholder="e.g. 15s (9:16 Vertical 1080x1920)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Usage Platforms</label>
                  <input
                    type="text"
                    value={usagePlatformsText}
                    onChange={(e) => setUsagePlatformsText(e.target.value)}
                    placeholder="e.g. TikTok, Instagram Reels, YouTube Shorts"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* 3. Budget, Timeline & Commercial Clearance */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-brand-400 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>3. Budget, Timeline & Rights</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Budget Range ($USD) *</label>
                  <input
                    type="text"
                    value={budgetDisplay}
                    onChange={(e) => setBudgetDisplay(e.target.value)}
                    placeholder="e.g. $1,800 - $2,500"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Turnaround Deadline</label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="e.g. 14 days remaining"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Commercial-Use Requirements</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {[
                    'Full Commercial Buyout',
                    'Perpetual IP Transfer',
                    'Paid Advertising Clearance',
                    'Source Seeds & LoRA Weights',
                    'Mutual NDA Required',
                    'Raw 4K ProRes Masters'
                  ].map((right) => (
                    <label key={right} className="flex items-center gap-2 cursor-pointer bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                      <input
                        type="checkbox"
                        checked={commercialRights.includes(right)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCommercialRights([...commercialRights, right]);
                          } else {
                            setCommercialRights(commercialRights.filter(r => r !== right));
                          }
                        }}
                        className="rounded border-slate-700 bg-slate-900 text-brand-600 focus:ring-0"
                      />
                      <span>{right}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700 flex items-center gap-2 transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </button>

              <button
                type="submit"
                disabled={isPublishing}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-bold text-white shadow-glow-sm flex items-center gap-2 transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isPublishing ? 'Publishing...' : 'Publish Brief & Match Creators'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Sticky Column */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
              <Eye className="w-3.5 h-3.5 text-brand-400" />
              <span>Marketplace Card Preview</span>
            </span>
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
              Ready to Publish
            </span>
          </div>

          <ProjectCard project={previewProject} />

          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed space-y-1">
            <strong className="text-white block">Next Step After Publishing:</strong>
            <p>
              Once published, CreatorAI automatically runs your brief through our <strong>AI Creator Matching Engine</strong> to recommend top candidates ranked by compatibility score!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
