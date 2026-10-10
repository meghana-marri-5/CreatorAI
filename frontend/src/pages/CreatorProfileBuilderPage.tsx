import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { CreatorCard } from '../components/CreatorCard';
import { VerificationBadge } from '../components/VerificationBadge';
import { User, CheckCircle2, AlertCircle, Save, Eye, Wrench, Sparkles, DollarSign, MapPin } from 'lucide-react';

export const CreatorProfileBuilderPage: React.FC = () => {
  const { user, updateCurrentUserProfile } = useAuth();
  const { creators, updateCreatorProfile } = useMarketplace();

  const currentCreator = creators.find(c => c.id === user?.id) || creators[0];

  // Editable Form State
  const [name, setName] = useState(currentCreator.name);
  const [handle, setHandle] = useState(currentCreator.handle);
  const [headline, setHeadline] = useState(currentCreator.title);
  const [bio, setBio] = useState(currentCreator.bio);
  const [location, setLocation] = useState(currentCreator.location);
  const [avatar, setAvatar] = useState(currentCreator.avatar);
  const [coverImage, setCoverImage] = useState(currentCreator.coverImage || '');
  const [hourlyRate, setHourlyRate] = useState(currentCreator.hourlyRate);
  const [minProjectBudget, setMinProjectBudget] = useState(currentCreator.minProjectBudget || 500);
  const [availability, setAvailability] = useState<'Available' | 'Limited' | 'Booked'>(currentCreator.availability);
  const [primaryCategory, setPrimaryCategory] = useState<'video' | 'imagery' | 'virtual-influencer' | 'product' | 'concept-art' | 'audio'>(currentCreator.primaryCategory);
  const [specializationsText, setSpecializationsText] = useState(currentCreator.specializations.join(', '));
  const [skillsText, setSkillsText] = useState(currentCreator.skills.join(', '));
  const [toolsText, setToolsText] = useState(currentCreator.aiTools.join(', '));
  const [experienceLevel, setExperienceLevel] = useState<'Intermediate' | 'Senior' | 'Master'>(currentCreator.experienceLevel);
  const [commercialSummary, setCommercialSummary] = useState(currentCreator.commercialInfo.summary);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Live preview creator entity
  const previewCreator = {
    ...currentCreator,
    name,
    handle,
    title: headline,
    bio,
    location,
    avatar,
    coverImage,
    hourlyRate: Number(hourlyRate) || 100,
    minProjectBudget: Number(minProjectBudget) || 500,
    availability,
    primaryCategory,
    specializations: specializationsText.split(',').map(s => s.trim()).filter(Boolean),
    skills: skillsText.split(',').map(s => s.trim()).filter(Boolean),
    aiTools: toolsText.split(',').map(s => s.trim()).filter(Boolean),
    experienceLevel,
    commercialInfo: {
      ...currentCreator.commercialInfo,
      summary: commercialSummary
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your display name.');
      return;
    }
    if (!headline.trim()) {
      setError('Please provide a professional headline.');
      return;
    }
    if (!bio.trim() || bio.length < 30) {
      setError('Please provide a bio of at least 30 characters explaining your generative expertise.');
      return;
    }

    // Save to Marketplace Context
    updateCreatorProfile(currentCreator.id, previewCreator);

    // Sync to user profile in Auth context
    updateCurrentUserProfile({
      full_name: name,
      headline,
      bio,
      location,
      avatar_url: avatar
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Creator Studio</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Creator Profile Builder</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Craft your public profile, set your hourly rate, and showcase your generative AI toolchain to prospective brands.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-xs sm:text-sm text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Profile saved successfully! Your public profile and discoverability tags have been updated.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/15 border border-red-500/30 rounded-2xl text-xs sm:text-sm text-red-300 flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid: Form Left, Live Preview Sticky Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-[#0d111c] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Section 1: Basic Info */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-brand-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>1. Personal & Professional Identity</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Display Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Handle / Username</label>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Professional Headline *</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Cinematic AI Video Director & Hyperrealistic Worldbuilder"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Berlin, Germany"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Availability Status</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Available">Available (Accepting Projects)</option>
                    <option value="Limited">Limited Availability (Sprints Only)</option>
                    <option value="Booked">Booked (Waitlist Only)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Avatar Image URL</label>
                  <input
                    type="url"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Cover Banner URL</label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Biography *</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-brand-500 leading-relaxed"
                  placeholder="Detail your experience, creative background, toolchain, and quality standards..."
                  required
                />
              </div>
            </div>

            {/* Section 2: AI Toolchain & Skills */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-brand-400 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>2. AI Disciplines, Skills & Toolchain</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Primary Category</label>
                  <select
                    value={primaryCategory}
                    onChange={(e) => setPrimaryCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="video">AI Video Diffusion</option>
                    <option value="imagery">Generative Imagery & Editorial</option>
                    <option value="virtual-influencer">Virtual Influencers & 3D</option>
                    <option value="product">Zero-Shot Product Staging</option>
                    <option value="concept-art">Concept Art & Keyframes</option>
                    <option value="audio">Synthetic Audio & Voice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Master">Master (50+ Commercial Jobs)</option>
                    <option value="Senior">Senior (20+ Commercial Jobs)</option>
                    <option value="Intermediate">Intermediate (5+ Jobs)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  AI Tools & Model Engines (Comma-separated)
                </label>
                <input
                  type="text"
                  value={toolsText}
                  onChange={(e) => setToolsText(e.target.value)}
                  placeholder="e.g. Runway Gen-3, Kling AI, Midjourney v6.1, ComfyUI, Topaz"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Specialized Skills & Techniques (Comma-separated)
                </label>
                <input
                  type="text"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  placeholder="e.g. Prompt Engineering, Camera Control, ControlNet, Color Grading"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Section 3: Commercial Rates & Terms */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-brand-400 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>3. Rates & Commercial Clearance</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Hourly Rate ($USD)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    min={20}
                    max={1000}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Minimum Project Budget ($)</label>
                  <input
                    type="number"
                    value={minProjectBudget}
                    onChange={(e) => setMinProjectBudget(Number(e.target.value))}
                    min={100}
                    max={10000}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Commercial Rights Clearance Statement</label>
                <textarea
                  value={commercialSummary}
                  onChange={(e) => setCommercialSummary(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-glow-sm transition flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Sticky Live Profile Card Preview */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
              <Eye className="w-3.5 h-3.5 text-brand-400" />
              <span>Live Card Preview</span>
            </span>
            <span className="text-[11px] text-slate-400">Updates as you type</span>
          </div>

          <CreatorCard creator={previewCreator} />

          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
            <strong className="text-white block mb-1">💡 Optimization Tip:</strong>
            Adding explicit toolchains (e.g. <em>Runway Gen-3, Kling, Flux.1</em>) raises your compatibility score in the <strong>AI Creator Matching Engine</strong> by up to 25%.
          </div>
        </div>
      </div>
    </div>
  );
};
