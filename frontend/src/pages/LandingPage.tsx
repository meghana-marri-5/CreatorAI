import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { CreatorCard } from '../components/CreatorCard';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  Layers, 
  Cpu, 
  Wrench, 
  Zap, 
  CheckCircle2, 
  Video, 
  Image as ImageIcon, 
  Box, 
  Mic, 
  Palette, 
  BarChart, 
  Film,
  Target
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { creators } = useMarketplace();
  const { loginAsDemoBrand, loginAsDemoCreator } = useAuth();

  const featuredCreators = creators.slice(0, 4);

  const categories = [
    { title: "AI Video Creation", icon: Video, desc: "Runway Gen-3, Kling, Sora-ready commercial video diffusion", cat: "video" },
    { title: "AI Image Generation", icon: ImageIcon, desc: "Midjourney v6.1 & Flux.1 high-fashion and editorial imagery", cat: "imagery" },
    { title: "Virtual Influencers & 3D", icon: Box, desc: "Persistent digital ambassadors, LoRA rigging & Gaussian Splats", cat: "virtual-influencer" },
    { title: "AI Product Staging", icon: Layers, desc: "Zero-shot photorealistic CPG packshots with exact logo preservation", cat: "product" },
    { title: "Concept Art & Worlds", icon: Palette, desc: "Video game key art, multi-pass ComfyUI matte paintings & mechs", cat: "concept-art" },
    { title: "AI Audio & Voice", icon: Mic, desc: "ElevenLabs voice acting, Suno scores, and spatial audio foley", cat: "audio" },
    { title: "AI Social & UGC Ads", icon: Film, desc: "High-retention 9:16 vertical ads, synthetic avatars & trend hooks", cat: "video" },
    { title: "Generative Motion Graphics", icon: Cpu, desc: "Deforum animated logos, 60fps loops & reactive LED visuals", cat: "video" }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* =========================================================================
          Hero Section
          ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-600/25 via-indigo-500/20 to-accent-cyan/15 blur-[120px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Tag Announcement */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/30 text-xs font-semibold text-brand-300 shadow-glow-sm mb-8 animate-in fade-in duration-300">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-ping"></span>
            <span>The Professional Standard for Commercial Generative AI Creation</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Find the Right AI Creator for Your <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-accent-cyan">
              Next Big Idea.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mt-6 leading-relaxed font-normal">
            CreatorAI connects brands and creative agencies with verified AI directors, digital stylists, and prompt artists. Transform raw ideas into structured briefs with AI and match the perfect talent in minutes.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/discover-creators"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-glow-md hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <Search className="w-4 h-4" />
              <span>Find Creators</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/ai-brief-builder"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Create a Project Brief</span>
            </Link>
          </div>

          {/* Trust and Scale Metrics */}
          <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">8+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">Specialized AI Talents</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">Commercial Buyout Cleared</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-400">40/25/20/15</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">Weighted AI Matching</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-accent-cyan">&lt; 10s</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">AI Brief Generation</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          How It Works Section
          ========================================================================= */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Streamlined Workflow</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">How CreatorAI Works</h2>
          <p className="text-sm text-slate-400 mt-3">
            From raw concept to verified deliverable masters with complete copyright clearance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#0d111c] border border-slate-800 rounded-2xl p-6 relative group hover:border-brand-500/50 transition">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 font-mono font-bold flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-white mb-2">Describe Your Idea</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Input your rough project concept. Our AI Brief Assistant structures it into technical prompts, format specs, and deliverables.
            </p>
          </div>

          <div className="bg-[#0d111c] border border-slate-800 rounded-2xl p-6 relative group hover:border-brand-500/50 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-white mb-2">AI Creator Matching</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our transparent weighted matching algorithm evaluates skill, toolchain, and past portfolio data to recommend top creators.
            </p>
          </div>

          <div className="bg-[#0d111c] border border-slate-800 rounded-2xl p-6 relative group hover:border-brand-500/50 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-bold flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-white mb-2">Review Portfolios</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect genuine diffusion workflows, seed manifests, model weights, and clear applicant proposals.
            </p>
          </div>

          <div className="bg-[#0d111c] border border-slate-800 rounded-2xl p-6 relative group hover:border-brand-500/50 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center mb-4">
              04
            </div>
            <h3 className="text-base font-bold text-white mb-2">Select & Track</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accept the best creator, track milestones from In Progress to Completion, and receive broadcast-ready assets.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Creator Categories Grid
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Expertise Specializations</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Creator Disciplines</h2>
            <p className="text-xs text-slate-400 mt-1">Explore creators across cutting-edge generative AI domains.</p>
          </div>
          <Link
            to="/discover-creators"
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1.5 transition"
          >
            <span>View All Creator Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={`/discover-creators?category=${cat.cat}`}
                className="bg-[#0d111c] hover:bg-[#121727] border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-5 transition-all group flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-brand-400 group-hover:scale-110 group-hover:text-white group-hover:bg-brand-600 transition mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition">{cat.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cat.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] font-semibold text-brand-400 flex items-center justify-between">
                  <span>Explore talent</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          Featured Creators
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Top Vetted Talent</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Featured AI Creators</h2>
            <p className="text-xs text-slate-400 mt-1">Verified commercial creators with proven track records and master workflows.</p>
          </div>
          <Link
            to="/discover-creators"
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1.5 transition"
          >
            <span>Browse All {creators.length} Creators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          Why CreatorAI
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#0e1322] to-[#0a0d16] border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-accent-cyan uppercase tracking-wider">Enterprise Standards</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Why Brands & Creators Choose CreatorAI
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Traditional freelance sites do not understand ComfyUI nodes, LoRA weights, seed manifests, or commercial copyright clearance. CreatorAI is custom-built for generative workflows.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Faster Creator Discovery</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Filter by exact AI toolchain: Runway Gen-3, Kling, Midjourney, Flux.1, ElevenLabs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Deep Workflow Visibility</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Inspect genuine prompt matrices, upscaling pipelines, and model releases.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AI Brief Structuring</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Turn 1 rough sentence into an exhaustive creative brief with deliverable specs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-accent-cyan/10 text-accent-cyan flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Transparent Compatibility</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Explainable 0-100% compatibility scores with clear rationale.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Dual Call to Action Section
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Brands */}
          <div className="bg-gradient-to-br from-slate-900 to-[#101424] border border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">For Brands & Agencies</span>
              <h3 className="text-2xl font-extrabold text-white">Need Commercial AI Media?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Post your brief manually or use our AI Assistant to generate specifications. Review creator portfolios and commission your project.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/ai-brief-builder"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white shadow-glow-sm transition"
                >
                  Create Brief with AI
                </Link>
                <Link
                  to="/discover-creators"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition"
                >
                  Find a Creator
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Creators */}
          <div className="bg-gradient-to-br from-slate-900 to-[#121929] border border-cyan-500/30 rounded-3xl p-8 relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-semibold text-accent-cyan uppercase tracking-wider">For AI Content Creators</span>
              <h3 className="text-2xl font-extrabold text-white">Showcase Your AI Artistry</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Publish your portfolio, specify your tooling and prompt craft, browse active brand briefs, and receive commercial commissions.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/auth?mode=register"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-xs font-bold text-white shadow-sm transition"
                >
                  Join as a Creator
                </Link>
                <Link
                  to="/explore-projects"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition"
                >
                  Browse Available Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
