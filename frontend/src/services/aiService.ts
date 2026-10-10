export interface GeneratedBriefData {
  title: string;
  overview: string;
  businessObjective: string;
  contentType: string;
  targetAudience: string;
  creativeDirection: string;
  suggestedDeliverables: string[];
  formatDimensions: string;
  requiredSkills: string[];
  suggestedAiTools: string[];
  distributionPlatform: string;
  estimatedTimelineDays: number;
  budgetEstimate: string;
  commercialClarifications: string[];
}

export interface BriefGenerationResponse {
  success: boolean;
  isLiveAi: boolean;
  mode: string;
  brief: GeneratedBriefData;
}

export interface EnhancedPortfolioData {
  title: string;
  description: string;
  suggestedSkills: string[];
  suggestedCategory: string;
  workflowSummary: string;
}

export async function generateAiCreativeBrief(prompt: string, tone?: string, industry?: string): Promise<BriefGenerationResponse> {
  const enhancedPrompt = `${prompt} ${tone ? `| Desired Tone: ${tone}` : ''} ${industry ? `| Sector: ${industry}` : ''}`;
  
  try {
    const res = await fetch('/api/ai/generate-brief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: enhancedPrompt })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.brief) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Server AI endpoint call failed, engaging client-side deterministic engine:', err);
  }

  // Client-side fallback engine (100% deterministic & transparent)
  return {
    success: true,
    isLiveAi: false,
    mode: 'Deterministic Offline Engine (Zero External API Required)',
    brief: getClientDeterministicBrief(prompt)
  };
}

export async function enhancePortfolioWithAi(title: string, description: string, tools: string[]): Promise<EnhancedPortfolioData> {
  try {
    const res = await fetch('/api/ai/enhance-portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, tools })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.enhanced) {
        return data.enhanced;
      }
    }
  } catch (err) {
    console.warn('Enhance portfolio endpoint failed, using fallback:', err);
  }

  return {
    title: title || 'Commercial Generative Showcase',
    description: `A commercial-grade creative production created using ${tools.join(', ')}. Engineered with custom seed curation, multi-pass diffusion, and color-managed master deliveries with 100% IP clearance. ${description}`,
    suggestedSkills: ['Prompt Crafting', 'Seed Control', 'Latent Upscaling', 'Color Grading'],
    suggestedCategory: description.toLowerCase().includes('video') ? 'video' : 'imagery',
    workflowSummary: 'Phase 1: Seed & Prompt Matrix -> Phase 2: High-Resolution Generation -> Phase 3: Post-Upscaling & Color Retouching'
  };
}

function getClientDeterministicBrief(prompt: string): GeneratedBriefData {
  const p = (prompt || '').toLowerCase();

  if (p.includes('video') || p.includes('commercial') || p.includes('drink') || p.includes('energy') || p.includes('tiktok')) {
    return {
      title: "Commercial High-Motion AI Video Ad & Social Campaign",
      overview: "A visually striking 15-second generative video ad engineered for high retention and viral potential on TikTok, Reels, and digital channels.",
      businessObjective: "Establish bold brand salience and drive immediate viewer engagement with cinematic generative video storytelling.",
      contentType: "AI Video",
      targetAudience: "Digital-native consumers aged 18-35 who appreciate modern dynamic aesthetics.",
      creativeDirection: "Dynamic handheld kinetic camera motion, anamorphic 35mm lens blur, high-contrast neon/ambient lighting, hyperrealistic physics and fluid particles.",
      suggestedDeliverables: [
        "1x 15s Hero Master Commercial (4K ProRes 422 HQ)",
        "3x 9:16 Vertical Cutdowns for TikTok & Reels",
        "3x High-Resolution Keyframe Stills for Social Banners",
        "Complete Generation Seed Manifest & Workflow Documentation"
      ],
      formatDimensions: "9:16 Vertical (1080x1920) + 16:9 Master (3840x2160 4K)",
      requiredSkills: ["Runway Gen-3 / Kling Diffusion", "Camera Trajectory Control", "Topaz 4K Upscaling", "DaVinci Color Calibration"],
      suggestedAiTools: ["Runway Gen-3 Alpha", "Kling AI", "Midjourney v6.1", "Topaz Video AI", "DaVinci Resolve"],
      distributionPlatform: "TikTok, Instagram Reels, YouTube Shorts, Paid Meta Ads",
      estimatedTimelineDays: 10,
      budgetEstimate: "$1,800 - $2,600",
      commercialClarifications: [
        "Are brand logos and packshots to be inserted via post-composite or embedded via ControlNet?",
        "Do you require exclusive perpetual buyout or digital advertising buyout for 12 months?"
      ]
    };
  }

  if (p.includes('fashion') || p.includes('lookbook') || p.includes('editorial') || p.includes('wear') || p.includes('model')) {
    return {
      title: "Haute Couture Editorial Lookbook & High-Res Campaign Imagery",
      overview: "A curated series of 12 luxury-tier generative fashion editorial frames combining hyperrealistic fabric micro-textures, authentic human skin pores, and striking atmospheric lighting.",
      businessObjective: "Establish luxury brand positioning and replace costly on-location photoshoots with reproducible generative editorial visuals.",
      contentType: "Generative Imagery",
      targetAudience: "Affluent fashion enthusiasts, boutique buyers, and discerning editorial consumers.",
      creativeDirection: "Vogue-inspired editorial composition, soft diffused Profoto studio lighting, natural skin micro-textures, Nordic minimalist architecture backdrop.",
      suggestedDeliverables: [
        "12x 300 DPI Print-Ready Master TIFF Files (CMYK & sRGB)",
        "Social Carousel Format Crops (4:5 Ratio for Instagram)",
        "Full Prompt Matrix and LoRA Style Weights"
      ],
      formatDimensions: "4:5 Vertical (Instagram) & 300 DPI High-Resolution Print",
      requiredSkills: ["Editorial Lighting Design", "Textile Weave Simulation", "Skin Micro-Texture Realism", "Magnific AI 8K Upscaling"],
      suggestedAiTools: ["Midjourney v6.1", "Flux.1 Dev", "Magnific AI", "Photoshop Generative Fill"],
      distributionPlatform: "Printed Seasonal Lookbooks, E-Commerce Hero Banners, Instagram",
      estimatedTimelineDays: 7,
      budgetEstimate: "$1,200 - $1,800",
      commercialClarifications: [
        "Will you supply 3D or reference photos of the physical garments to train a custom LoRA?",
        "Is there a preferred physical printing dimension (e.g., A4, US Letter, Billboard)?"
      ]
    };
  }

  if (p.includes('audio') || p.includes('voice') || p.includes('podcast') || p.includes('foley') || p.includes('sound')) {
    return {
      title: "Immersive Synthetic Voice Cast & Spatial Soundscape Production",
      overview: "Full voiceover synthesis featuring expressive vocal performances, bespoke ambient foley, and broadcast-ready spatial audio mastering.",
      businessObjective: "Create an emotional, cinematic sonic identity with zero actor royalty bottlenecks or SAG-AFTRA licensing encumbrances.",
      contentType: "Voice & Audio",
      targetAudience: "Podcast listeners, gamers, and audiophiles seeking immersive narrative experiences.",
      creativeDirection: "Warm, resonant vocal timbre with micro-inflections and breath modeling, paired with binaural atmospheric sound beds.",
      suggestedDeliverables: [
        "Full Master Audio Files (WAV 24-bit / 48kHz, Broadcast LUFS compliant)",
        "Isolated Vocal Stems & Ambient Foley Beds",
        "Multilingual Localized Dubs (Spanish, French, German)"
      ],
      formatDimensions: "24-bit 48kHz WAV / MP3 320kbps Spatial Audio",
      requiredSkills: ["Emotion Prompting", "Synthetic Voice Modulation", "Spatial Foley Synthesis", "Broadcast Audio Mastering"],
      suggestedAiTools: ["ElevenLabs Professional", "Suno v3.5", "AudioCraft", "iZotope RX", "Reaper DAW"],
      distributionPlatform: "Spotify, Apple Podcasts, YouTube, Audible",
      estimatedTimelineDays: 8,
      budgetEstimate: "$1,400 - $2,200",
      commercialClarifications: [
        "Do you need character voices cloned from specific approved reference actors or generated de novo?",
        "Are there specific loudness target standards (e.g., -14 LUFS for Spotify, -16 LUFS for Apple Podcasts)?"
      ]
    };
  }

  return {
    title: "AI Creative Content Campaign & Multi-Asset Production",
    overview: "A comprehensive generative creative package translating the initial concept into production-ready assets tailored for modern multi-channel distribution.",
    businessObjective: "Accelerate content time-to-market by 10x while maintaining broadcast-level creative standards.",
    contentType: "AI Video",
    targetAudience: "Target demographics tailored to the specific product proposition.",
    creativeDirection: "Modern cinematic aesthetic, intentional color palette, crisp focal clarity, and balanced brand integration.",
    suggestedDeliverables: [
      "Master Creative Video / Image Deliverables",
      "Optimized Social Formats (9:16 and 1:1)",
      "Generation Seeds, Prompt Logs, and Source Files"
    ],
    formatDimensions: "Multi-Platform Deliverables (4K & High-DPI)",
    requiredSkills: ["Generative AI Pipelines", "Prompt Engineering", "Quality Control & Artifact Removal", "Post-Processing"],
    suggestedAiTools: ["Runway Gen-3", "Midjourney v6", "ComfyUI", "Topaz AI"],
    distributionPlatform: "Cross-Platform Social, Paid Advertising, Web Hero",
    estimatedTimelineDays: 10,
    budgetEstimate: "$1,500 - $2,000",
    commercialClarifications: [
      "Do you require custom LoRA training for your specific product identity?",
      "What are the primary target KPIs (click-through rate, brand recall, impressions)?"
    ]
  };
}
