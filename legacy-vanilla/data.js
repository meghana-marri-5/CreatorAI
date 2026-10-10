/**
 * CreatorAI - Sample Data
 * 8 fictional AI creators with rich portfolios, tools, workflows, and commercial clearance details.
 * Also includes realistic sample projects and initial application data.
 */

const SAMPLE_CREATORS = [
  {
    id: "creator-1",
    name: "Elena Rostova",
    handle: "@elena_diffusion",
    title: "Cinematic AI Video Director & Hyperrealistic Worldbuilder",
    location: "Berlin, Germany",
    rating: 4.98,
    reviewCount: 39,
    completedProjects: 48,
    hourlyRate: 120,
    minProjectBudget: 600,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    badge: "Top Rated Plus",
    verified: true,
    bio: "Pioneering cinematic AI direction since 2022. I merge Runway Gen-3 Alpha, Kling AI, and custom ComfyUI diffusion workflows with DaVinci Resolve color grading to produce broadcast-grade AI commercials, film trailers, and high-impact brand spots.",
    primaryCategory: "video",
    specializations: [
      "AI Video Diffusion",
      "Cinematic VFX & Color Grading",
      "Camera Motion Control",
      "Hyperrealistic Worldbuilding",
      "Brand Narrative Films"
    ],
    skills: [
      "Prompt Engineering",
      "Camera Control",
      "ControlNet",
      "Color Grading",
      "Lip-Sync Diffusion",
      "4K Upscaling",
      "AnimateDiff"
    ],
    aiTools: [
      "Runway Gen-3",
      "Kling AI",
      "Midjourney v6.1",
      "ComfyUI",
      "Topaz Video AI",
      "DaVinci Resolve"
    ],
    commercialInfo: {
      clearanceLevel: "Full Commercial Buyout",
      summary: "Full copyright transfer on milestone completion. Zero copyrighted likeness or trademarked elements. Includes certified AI generation logs, commercial warranties, and 4K ProRes master deliveries.",
      perpetualUsage: true,
      modelReleaseGuarantee: true,
      sourceFilesIncluded: true,
      licenseTag: "Commercial Buyout + Warranty"
    },
    workflow: [
      { step: "Phase 1: Concept & Moodboards", desc: "Storyboard ideation, visual moodboards in Midjourney v6.1, and initial prompt matrix creation." },
      { step: "Phase 2: Video Diffusion Generation", desc: "Generating high-motion shots using Runway Gen-3 & Kling AI with strict camera trajectory guidance." },
      { step: "Phase 3: Interpolation & Upscaling", desc: "Frame interpolation and 4K upscaling using Topaz Video AI to remove artifacting." },
      { step: "Phase 4: Color Grading & Final Polish", desc: "Precision DaVinci Resolve color grade, sound sync, and final ProRes master delivery." }
    ],
    portfolio: [
      {
        title: "Aetheria - Luxury Perfume Film",
        type: "AI Commercial",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
        tools: ["Runway Gen-3", "Midjourney v6", "Topaz"],
        promptSnippet: "cinematic micro macro shot of iridescent fragrance bottle emerging from bioluminescent smoke, anamorphic 35mm lens, atmospheric haze --v 6.0",
        description: "A 30-second conceptual commercial for an eco-luxury fragrance brand featuring fluid simulation and lighting effects."
      },
      {
        title: "Neo-Kyoto 2099 Trailer",
        type: "Sci-Fi Film Concept",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
        tools: ["Kling AI", "ComfyUI", "DaVinci"],
        promptSnippet: "rain-drenched cyberpunk megalopolis, high contrast neon magenta reflections, drone sweeping downward between floating monolithic towers",
        description: "Teaser video clip for a sci-fi streaming series, demonstrating consistent architecture and camera dynamics."
      },
      {
        title: "Quantum Electric Hypercar",
        type: "Automotive Reveal",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        tools: ["Runway Gen-3", "ControlNet", "Topaz"],
        promptSnippet: "aerodynamic matte titanium supercar drifting across salt flats at twilight, dust clouds catching sunset glint, slow-motion 120fps",
        description: "Automotive social campaign demonstrating reflection consistency and realistic velocity physics."
      }
    ]
  },
  {
    id: "creator-2",
    name: "Marcus Chen",
    handle: "@marcus_splats",
    title: "Generative 3D & Virtual Influencer Architect",
    location: "San Francisco, USA",
    rating: 4.95,
    reviewCount: 28,
    completedProjects: 35,
    hourlyRate: 140,
    minProjectBudget: 800,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    badge: "Virtual IP Expert",
    verified: true,
    bio: "Specializing in persistent virtual influencers and 3D Gaussian Splats. I train bespoke LoRA models and integrate Flux.1 with Blender rigs to deliver photorealistic digital brand ambassadors that maintain exact facial identity across thousands of renders.",
    primaryCategory: "virtual-influencer",
    specializations: [
      "Virtual Influencer Creation",
      "3D Gaussian Splatting",
      "Custom LoRA Training",
      "Character Consistency Rigging",
      "Metahuman Face Synthesis"
    ],
    skills: [
      "LoRA Fine-Tuning",
      "Gaussian Splatting",
      "Flux.1 Control",
      "Blender 4.2",
      "Identity Lock",
      "Texture Synthesis",
      "Face Swap AI"
    ],
    aiTools: [
      "Flux.1 Dev",
      "Stable Diffusion XL",
      "ComfyUI",
      "Blender 4.2",
      "InstantID",
      "Character Creator"
    ],
    commercialInfo: {
      clearanceLevel: "Full IP Transfer & Dataset Delivery",
      summary: "Complete transfer of digital human intellectual property. Includes trained LoRA weights (.safetensors), base 3D Blender mesh rigs, and commercial exclusivity guarantees.",
      perpetualUsage: true,
      modelReleaseGuarantee: true,
      sourceFilesIncluded: true,
      licenseTag: "Exclusive Virtual IP Transfer"
    },
    workflow: [
      { step: "Phase 1: Persona & Identity Modeling", desc: "Sculpting facial geometry and curating synthetic training datasets for identity convergence." },
      { step: "Phase 2: Custom LoRA Model Training", desc: "Training rank-64 LoRAs on Flux.1 for consistent bone structure and natural expressions." },
      { step: "Phase 3: 3D Staging & Lighting", desc: "Setting up Blender scenes with exact HDRI lighting matching physical brand environments." },
      { step: "Phase 4: Multi-Angle Generation", desc: "Rendering campaign imagery with InstantID & ControlNet depth passes for seamless realism." }
    ],
    portfolio: [
      {
        title: "Kaiya - AI Virtual Ambassador",
        type: "Virtual Influencer",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
        tools: ["Flux.1 Dev", "ComfyUI", "Blender"],
        promptSnippet: "portrait of synthetic digital human Kaiya, wearing minimalist streetwear, Tokyo cafe background, natural skin pores, rim lighting",
        description: "Created a persistent AI brand ambassador with over 45k Instagram followers for a streetwear label."
      },
      {
        title: "Spatial Gaussian Interior",
        type: "3D Splatting",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        tools: ["Gaussian Splatting", "Blender"],
        promptSnippet: "photogrammetric radiance field of modern architectural penthouse, sunlight streaming through floor to ceiling glass windows",
        description: "Interactive real-time 3D walkthrough generated for an architectural design studio."
      },
      {
        title: "Cybernetic Cyber-Fashion Series",
        type: "Wearable Concept",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        tools: ["Flux.1", "LoRA", "Photoshop"],
        promptSnippet: "haute couture holographic jacket with liquid metallic fiber optics, studio fashion editorial, editorial pose",
        description: "Generative apparel lookbook featured in international digital design publications."
      }
    ]
  },
  {
    id: "creator-3",
    name: "Aria Vance",
    handle: "@aria_vance_studio",
    title: "AI Fashion & Luxury Editorial Photography Lead",
    location: "London, UK",
    rating: 5.0,
    reviewCount: 54,
    completedProjects: 62,
    hourlyRate: 95,
    minProjectBudget: 450,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    badge: "Editorial Master",
    verified: true,
    bio: "Bridging the aesthetics of Vogue and Harper's Bazaar with high-fidelity generative imagery. I help luxury fashion, cosmetics, and jewelry houses produce international lookbooks and high-resolution print campaigns at a fraction of traditional shoot costs.",
    primaryCategory: "imagery",
    specializations: [
      "High-End Fashion Editorial",
      "Luxury Product Staging",
      "Fabric & Material Simulation",
      "Skin Micro-Texture Realism",
      "Print-Ready 300 DPI Asset Prep"
    ],
    skills: [
      "Fabric Rendering",
      "Skin Texture Realism",
      "Editorial Lighting",
      "High-Res Upscaling",
      "Krea AI Live",
      "Magnific AI Enhancer"
    ],
    aiTools: [
      "Midjourney v6",
      "Magnific AI",
      "Photoshop Generative Fill",
      "Krea AI",
      "Lightroom Pro"
    ],
    commercialInfo: {
      clearanceLevel: "Worldwide Commercial License",
      summary: "Commercial clearance for print, digital billboards, e-commerce, and point-of-sale displays. Strict guarantee of zero celebrity likeness, unencumbered intellectual property, and high-DPI master TIFFs.",
      perpetualUsage: true,
      modelReleaseGuarantee: true,
      sourceFilesIncluded: true,
      licenseTag: "Commercial Print & Billboard Cleared"
    },
    workflow: [
      { step: "Phase 1: Creative Direction & Swatches", desc: "Analyzing brand collection color palettes, textile specifications, and seasonal moodboards." },
      { step: "Phase 2: Generative Editorial Passes", desc: "Prompt generation in Midjourney v6 using precise aperture, lighting (Profoto style), and material tokens." },
      { step: "Phase 3: Micro-Texture Upscaling", desc: "Enhancement through Magnific AI for authentic textile weave and natural skin pores." },
      { step: "Phase 4: Color Balancing & Retouching", desc: "Final color calibration in Photoshop and Lightroom for CMYK/sRGB print readiness." }
    ],
    portfolio: [
      {
        title: "Solstice - Haute Couture Lookbook",
        type: "Fashion Editorial",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        tools: ["Midjourney v6", "Magnific AI"],
        promptSnippet: "high fashion editorial photo, woman in structured golden silk gown, stark desert dunes, golden hour dramatic shadows, Vogue cover composition",
        description: "16-look generative fashion campaign for a London boutique label, printed in physical lookbooks."
      },
      {
        title: "Obsidian Jewelry Campaign",
        type: "Luxury Goods",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
        tools: ["Midjourney v6", "Photoshop"],
        promptSnippet: "macro studio shot of diamond necklace draped over black volcanic obsidian stone, water droplets glistening, razor sharp focus",
        description: "E-commerce and social campaign imagery for an ethical diamond jeweler."
      },
      {
        title: "Elysian Silk Cosmetics",
        type: "Beauty Campaign",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        tools: ["Midjourney v6", "Krea AI"],
        promptSnippet: "dewy glowing skin beauty portrait, soft diffused ring light, minimal makeup, pastel lilac tones, raw photography aesthetic",
        description: "Skincare product visuals with ultra-authentic micro-textures and luminous skin tones."
      }
    ]
  },
  {
    id: "creator-4",
    name: "Kaelen Thorne",
    handle: "@kaelen_concept",
    title: "Sci-Fi Concept Artist & Keyframe Worldbuilder",
    location: "Toronto, Canada",
    rating: 4.92,
    reviewCount: 31,
    completedProjects: 41,
    hourlyRate: 85,
    minProjectBudget: 400,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    badge: "Concept Pro",
    verified: true,
    bio: "Senior concept artist combining ComfyUI pipelines with 2D paint-over mastery. I create key art, vehicle designs, and sprawling environment matte paintings for indie game studios, tabletop publishers, and film pitch decks.",
    primaryCategory: "concept-art",
    specializations: [
      "Sci-Fi & Fantasy Concept Art",
      "Video Game Keyframe Design",
      "Matte Painting & Set Extension",
      "Vehicle & Mech Industrial Design",
      "Multi-Pass Inpainting"
    ],
    skills: [
      "Multi-Pass Rendering",
      "Inpainting / Outpainting",
      "ComfyUI Nodes",
      "Depth-Map Conditioning",
      "Photoshop Matte Painting",
      "Seed Curation"
    ],
    aiTools: [
      "Stable Diffusion 3",
      "ComfyUI",
      "DALL-E 3",
      "Photoshop",
      "Nuke"
    ],
    commercialInfo: {
      clearanceLevel: "Full Entertainment IP Assignment",
      summary: "Full IP assignment for video games, cinema, and publishing. Delivered with layered PSDs, transparent foreground PNGs, and generation seed manifests for reproducibility.",
      perpetualUsage: true,
      modelReleaseGuarantee: true,
      sourceFilesIncluded: true,
      licenseTag: "Full Entertainment IP Transfer"
    },
    workflow: [
      { step: "Phase 1: Composition Thumbnails", desc: "Rapid generation of 20+ black-and-white tonal thumbnails to explore focal points." },
      { step: "Phase 2: ComfyUI Node Generation", desc: "Constructing multi-pass generation nodes using SD3 with ControlNet line-art constraints." },
      { step: "Phase 3: Overpainting & Seaming", desc: "Hands-on Photoshop paint-over to fix anatomical quirks, add lighting accents, and refine details." },
      { step: "Phase 4: Asset Splitting", desc: "Dividing into layered parallax planes for UI, game engines, or 2.5D animation." }
    ],
    portfolio: [
      {
        title: "Orbital Citadel - Space Station",
        type: "Game Key Art",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        tools: ["ComfyUI", "SD3", "Photoshop"],
        promptSnippet: "colossal ring-shaped orbital station orbiting a gas giant with rings, cinematic lighting, hard sci-fi aesthetics, solar array detail",
        description: "Official promotional key art for a PC space simulator launched on Steam."
      },
      {
        title: "Chrono-Mech 04 Industrial Walker",
        type: "Mech Design",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
        tools: ["ComfyUI", "ControlNet"],
        promptSnippet: "heavy bipedal construction mech in volcanic quarry, rusted yellow paint, hydraulic piston details, concept art, Syd Mead inspired",
        description: "Mechanical concept art package including orthographic views and weathering variations."
      },
      {
        title: "Abyssal Biome Ecology",
        type: "Environment Art",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        tools: ["DALL-E 3", "Photoshop"],
        promptSnippet: "underwater bioluminescent alien trench, crystalline flora emitting cyan light, giant deep-sea Leviathan silhouette in background",
        description: "Worldbuilding illustration set for an upcoming sci-fi tabletop RPG module."
      }
    ]
  },
  {
    id: "creator-5",
    name: "Sophia Martinez",
    handle: "@sophia_aivideos",
    title: "AI UGC & Short-Form Video Producer",
    location: "Miami, USA",
    rating: 4.97,
    reviewCount: 72,
    completedProjects: 84,
    hourlyRate: 75,
    minProjectBudget: 350,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    badge: "UGC Viral Specialist",
    verified: true,
    bio: "Producing high-converting AI UGC (User Generated Content) and dynamic vertical ads for TikTok, Instagram Reels, and YouTube Shorts. I build synthetic video testimonials, unboxing simulations, and trend-focused hooks for DTC brands.",
    primaryCategory: "video",
    specializations: [
      "AI UGC Video Production",
      "TikTok & Reels Hook Engineering",
      "Synthetic Avatar Testimonials",
      "DTC E-Commerce Video Ads",
      "Script-to-Video Pipelines"
    ],
    skills: [
      "Synthetic Avatars",
      "Script-to-Video",
      "Voice Cloning",
      "Viral Hook Pacing",
      "Trend Synthesis",
      "Pika Animation",
      "CapCut AI Motion"
    ],
    aiTools: [
      "HeyGen",
      "Pika 1.5",
      "Runway Gen-2",
      "ElevenLabs",
      "CapCut AI",
      "Submagic"
    ],
    commercialInfo: {
      clearanceLevel: "Full Commercial Paid Ad Clearance",
      summary: "Commercial rights compliant with Meta, TikTok, and Google Ads advertising policies. Includes synthetic actor releases and proper AI transparency tags.",
      perpetualUsage: true,
      modelReleaseGuarantee: true,
      sourceFilesIncluded: true,
      licenseTag: "Paid Ads & Social Cleared"
    },
    workflow: [
      { step: "Phase 1: Viral Angle & Scripting", desc: "Formulating 3 hook variations tested against current high-performing TikTok creative trends." },
      { step: "Phase 2: Avatar & Voice Synthesis", desc: "Generating natural-cadence speech and realistic lip-sync using HeyGen and custom ElevenLabs voice profiles." },
      { step: "Phase 3: B-Roll & Visual Cutaways", desc: "Diffusing macro product b-roll with Pika 1.5 and Runway for seamless cutaways." },
      { step: "Phase 4: Dynamic Captions & Sound", desc: "Applying kinetic typography, sound effects, and sound design optimized for mobile retention." }
    ],
    portfolio: [
      {
        title: "CleanGlow Skincare - Viral UGC Ad",
        type: "TikTok Video Ad",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
        tools: ["HeyGen", "ElevenLabs", "CapCut"],
        promptSnippet: "natural 20s woman in bathroom mirror talking enthusiastically about peptide serum, handheld camera wobble, realistic lighting",
        description: "Generated 3.2x ROAS in Meta paid traffic for a direct-to-consumer cosmetics startup."
      },
      {
        title: "HydraBoost Smart Bottle Promo",
        type: "Instagram Reel",
        image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
        tools: ["Pika 1.5", "Runway Gen-2"],
        promptSnippet: "active lifestyle runner taking sleek insulated water bottle from gym bag, glowing hydration LED ring, cinematic morning sunlight",
        description: "High-energy 15s commercial highlighting hardware features with simulated motion."
      },
      {
        title: "FinTech App Launch Teaser",
        type: "Product Explainer",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        tools: ["HeyGen", "Submagic"],
        promptSnippet: "casual tech creator reviewing finance app interface on phone, seamless screen overlay, confident vocal delivery",
        description: "Conversion-optimized product explainer with 87% view-through rate."
      }
    ]
  },
  {
    id: "creator-6",
    name: "Devon Brooks",
    handle: "@devon_audio_ai",
    title: "Synthetic Voice Actor & Generative Soundscape Designer",
    location: "Austin, USA",
    rating: 4.96,
    reviewCount: 47,
    completedProjects: 53,
    hourlyRate: 90,
    minProjectBudget: 400,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    badge: "Audio Pioneer",
    verified: true,
    bio: "Creating synthetic sonic identities, multilingual voice cloning, and generative musical scores. I build corporate narration, podcast voices, immersive gaming foley, and brand soundscapes that avoid traditional voice licensing bottlenecks.",
    primaryCategory: "audio",
    specializations: [
      "Synthetic Voice Acting & Narration",
      "Multilingual Voice Cloning",
      "Generative Music Production",
      "Procedural Sound Effects & Foley",
      "Audio Drama & Podcast Mastering"
    ],
    skills: [
      "Voice Modulation",
      "Emotion Prompting",
      "Audio Mastering",
      "Multilingual Dubbing",
      "Foley AI Synthesis",
      "Spectral Editing",
      "Music Structure Prompting"
    ],
    aiTools: [
      "ElevenLabs Pro",
      "Suno v3.5",
      "Udio",
      "Reaper DAW",
      "AudioCraft",
      "iZotope RX"
    ],
    commercialInfo: {
      clearanceLevel: "Full Commercial Audio Buyout",
      summary: "100% royalty-free in perpetuity. Proprietary cloned voice profiles trained with signed creator consent. No SAG-AFTRA restrictions or recurring streaming residuals.",
      perpetualUsage: true,
      modelReleaseGuarantee: true,
      sourceFilesIncluded: true,
      licenseTag: "Royalty-Free Audio in Perpetuity"
    },
    workflow: [
      { step: "Phase 1: Script Acoustic Analysis", desc: "Marking scripts for breath pauses, emotional inflection curves, and emphasis tokens." },
      { step: "Phase 2: High-Bitrate Voice Synthesis", desc: "Generating vocal tracks using ElevenLabs Professional with customized pitch variance." },
      { step: "Phase 3: Generative Score & SFX", desc: "Composing custom background beds and foley via Suno and AudioCraft." },
      { step: "Phase 4: Mastering & Loudness Standards", desc: "Mastering in Reaper to broadcast LUFS standards for Spotify, Apple, and TV." }
    ],
    portfolio: [
      {
        title: "Chronicles of Kepler - Audio Drama",
        type: "Sci-Fi Podcast",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
        tools: ["ElevenLabs", "Udio", "Reaper"],
        promptSnippet: "deep resonant captain monologue, subtle spacesuit comms filter, ambient deep space hum with pulsing reactor rhythm",
        description: "Produced full voice cast and generative ambient score for a 6-part episodic audio drama."
      },
      {
        title: "Global SaaS Brand Narration (5 Languages)",
        type: "Corporate Voiceover",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
        tools: ["ElevenLabs Dubbing", "iZotope"],
        promptSnippet: "warm confident executive tone, perfectly synchronized English to German, French, Spanish, Japanese localized dub",
        description: "Localized product launch video across 5 international markets maintaining vocal timbre."
      },
      {
        title: "Zenith Meditation Soundscapes",
        type: "Wellness Audio",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
        tools: ["Suno v3.5", "AudioCraft"],
        promptSnippet: "binaural 432Hz ambient soundscape, gentle rain on cedar roof, soft harmonic singing bowl drone, zero percussion",
        description: "Over 60 minutes of generative relaxation audio licensed to a top wellness app."
      }
    ]
  },
  {
    id: "creator-7",
    name: "Nia Patel",
    handle: "@nia_ai_product",
    title: "Generative Product Advertising & E-Commerce Specialist",
    location: "Singapore",
    rating: 4.94,
    reviewCount: 24,
    completedProjects: 29,
    hourlyRate: 110,
    minProjectBudget: 500,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=80",
    badge: "Product Specialist",
    verified: true,
    bio: "Pioneering zero-shot product staging. I place physical CPG, cosmetics, beverage, and tech products into breathtaking photorealistic environments without ever photographing them in a studio. Guaranteed pixel-perfect brand logo preservation.",
    primaryCategory: "imagery",
    specializations: [
      "Zero-Shot Product Staging",
      "Cosmetic & Skincare Packshots",
      "Beverage & Liquid Splash Simulation",
      "E-Commerce Catalog Transformation",
      "Exact Logo & Typography Preservation"
    ],
    skills: [
      "Logo Preservation",
      "ControlNet Tile",
      "Reflection Mapping",
      "Liquid Dynamics",
      "Packshot Staging",
      "300 DPI Export",
      "Photoshop Compositing"
    ],
    aiTools: [
      "Flux.1 Schnell",
      "ControlNet",
      "Stable Diffusion WebUI",
      "Octane Render",
      "Photoshop CC"
    ],
    commercialInfo: {
      clearanceLevel: "Full Commercial Product License",
      summary: "Client maintains 100% rights to underlying product trademarks and logos. Zero generative distortion on packaging text or barcodes. Ready for Amazon, Shopify, and global ad spend.",
      perpetualUsage: true,
      modelReleaseGuarantee: true,
      sourceFilesIncluded: true,
      licenseTag: "E-Commerce & Amazon Cleared"
    },
    workflow: [
      { step: "Phase 1: Product Mask & Geometry Extraction", desc: "Isolating packaging silhouettes and extracting CAD/label vectors to prevent generative warping." },
      { step: "Phase 2: Environment Diffusion", desc: "Synthesizing contextual scenes (marble counters, rainforest foliage, splash dynamics) with matching lighting." },
      { step: "Phase 3: Reflection & Shadow Blending", desc: "Using ControlNet to cast accurate physical reflections onto the product surfaces." },
      { step: "Phase 4: Quality Assurance & DPI Check", desc: "Checking packaging legibility and sharpening fine text details to 300 DPI." }
    ],
    portfolio: [
      {
        title: "Botanica Serum - Amazon Hero Visuals",
        type: "Product Packshot",
        image: "https://images.unsplash.com/photo-1608248597359-50937a00f28e?auto=format&fit=crop&w=800&q=80",
        tools: ["Flux.1", "ControlNet", "Photoshop"],
        promptSnippet: "frosted glass serum dropper bottle resting on moss covered river stone, morning mist, water droplets, dappled sunlight through canopy",
        description: "Hero listing images that boosted client Amazon conversion rate by 27%."
      },
      {
        title: "Kold Craft Beer - Arctic Refreshment",
        type: "Beverage Campaign",
        image: "https://images.unsplash.com/photo-1608270116246-86d34e9e0486?auto=format&fit=crop&w=800&q=80",
        tools: ["Stable Diffusion", "Octane"],
        promptSnippet: "aluminum beer can half-submerged in crystal clear glacial ice cubes, dynamic water splash frozen in time, condensation beads, dramatic backlighting",
        description: "Summer beverage promotional campaign visuals produced in under 48 hours."
      },
      {
        title: "Lumix Smartwatch - Titanium Edition",
        type: "Tech Staging",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        tools: ["Flux.1", "Photoshop"],
        promptSnippet: "smartwatch resting on matte dark carbon fiber pedestal, neon blue accent streaks in background, clean sharp luxury watch photography",
        description: "Hardware launch visuals highlighting screen contrast and metallic bezel finishes."
      }
    ]
  },
  {
    id: "creator-8",
    name: "Liam O'Connor",
    handle: "@liam_generative_motion",
    title: "AI Motion Graphics & Generative Brand Identity",
    location: "Dublin, Ireland",
    rating: 4.91,
    reviewCount: 30,
    completedProjects: 37,
    hourlyRate: 105,
    minProjectBudget: 550,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    badge: "Motion Innovator",
    verified: true,
    bio: "Pioneering the intersection of generative AI loops, animated brand identities, and dynamic logo reveals. I combine Deforum Stable Diffusion with After Effects and TouchDesigner to create hypnotic audio-reactive visual systems.",
    primaryCategory: "video",
    specializations: [
      "Dynamic AI Logo Reveals",
      "Seamless Generative Video Loops",
      "Audio-Reactive Visual Systems",
      "Generative Brand Identity Kits",
      "Event LED Wall Visuals"
    ],
    skills: [
      "Frame Interpolation",
      "Audio-Reactive Nodes",
      "Loop Synthesis",
      "Deforum SD",
      "TouchDesigner",
      "After Effects Rigging",
      "Vector Integration"
    ],
    aiTools: [
      "Deforum SD",
      "Runway Gen-3",
      "After Effects",
      "TouchDesigner",
      "Midjourney",
      "RIFE Interpolator"
    ],
    commercialInfo: {
      clearanceLevel: "Full Commercial Brand Identity License",
      summary: "Includes all vector master files, 60fps ProRes exports, loopable WebM files, and trademark eligibility documentation. Completely cleared for television broadcast and stadium displays.",
      perpetualUsage: true,
      modelReleaseGuarantee: true,
      sourceFilesIncluded: true,
      licenseTag: "Broadcast & Trademark Cleared"
    },
    workflow: [
      { step: "Phase 1: Vector Brand Deconstruction", desc: "Deconstructing client vector assets into path maps and depth mattes." },
      { step: "Phase 2: Interpolated Motion Diffusion", desc: "Setting camera keyframe mathematics in Deforum for continuous seamless zoom and morph." },
      { step: "Phase 3: RIFE 60fps Smoothing", desc: "Applying neural frame interpolation to achieve buttery smooth 60fps motion without ghosting." },
      { step: "Phase 4: Compositing & Vector Lock", desc: "Re-compositing exact brand logomarks over generative backdrops in After Effects." }
    ],
    portfolio: [
      {
        title: "Synapse AI - Animated Identity & Ident",
        type: "Brand Identity Motion",
        image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
        tools: ["Deforum SD", "After Effects"],
        promptSnippet: "abstract neural network pathways transforming into geometric letterform S, bioluminescent cyan and violet currents, 60fps seamless loop",
        description: "Official 8-second animated logo reveal and stage background for a global tech summit."
      },
      {
        title: "Sonar Music Festival - Stage Visuals",
        type: "Concert Visuals",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
        tools: ["TouchDesigner", "Runway"],
        promptSnippet: "psychedelic kaleidoscopic fluid dynamics responding to low-frequency sub-bass, neon purple and gold vortex",
        description: "Hour-long generative visual pack rendered for massive festival LED stage screens."
      },
      {
        title: "Apex Fintech - App Onboarding Loops",
        type: "UI Motion Loops",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        tools: ["Runway Gen-3", "RIFE"],
        promptSnippet: "floating 3D glass credit card rotating gracefully through prismatic laser light beam, high tech luxury fintech vibe",
        description: "Lightweight Lottie and MP4 animations integrated into iOS mobile onboarding."
      }
    ]
  }
];

const INITIAL_PROJECTS = [
  {
    id: "proj-101",
    title: "Cinematic 15s AI Brand Film for Apex Volt Energy Drink",
    brandName: "Apex Volt Beverage Co.",
    postedDate: "2 days ago",
    deadline: "14 days remaining",
    budget: "$1,800 - $2,500",
    contentType: "AI Video",
    preferredStyle: "Cyberpunk / High-Energy",
    platform: "TikTok & Instagram Reels (9:16)",
    commercialNeed: "Full Commercial Buyout + Worldwide Digital Ad Rights",
    description: "Looking for an experienced AI video director to produce a dynamic, high-octane 15-second vertical commercial. The concept features a neon-lit futuristic metropolis where characters gain electric energy after drinking Apex Volt. Need realistic motion, fluid simulations, and custom sound sync. Raw 4K master deliverables required.",
    applicantsCount: 3,
    status: "Open",
    applications: [
      {
        id: "app-1",
        creatorId: "creator-1",
        creatorName: "Elena Rostova",
        creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        proposal: "Hi Apex Volt team! I've directed over 40 AI video commercials using Runway Gen-3 and Kling AI. The energy drink concept fits right into my cyberpunk aesthetic. I can deliver 3 camera cut variations, custom sound design, and 4K ProRes masters within 8 days.",
        proposedRate: "$2,100",
        deliveryDays: 8,
        portfolioLink: "Aetheria - Luxury Perfume Film",
        submittedAt: "Yesterday"
      },
      {
        id: "app-2",
        creatorId: "creator-5",
        creatorName: "Sophia Martinez",
        creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        proposal: "We specialize in viral 9:16 vertical ads specifically optimized for TikTok retention curves. I'd love to generate UGC style action shots paired with dynamic captions and sound.",
        proposedRate: "$1,850",
        deliveryDays: 6,
        portfolioLink: "HydraBoost Smart Bottle Promo",
        submittedAt: "1 day ago"
      },
      {
        id: "app-3",
        creatorId: "creator-8",
        creatorName: "Liam O'Connor",
        creatorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
        proposal: "Can bring high-energy audio-reactive transitions and futuristic logo reveals to make the drink can feel like a supernatural power source.",
        proposedRate: "$1,950",
        deliveryDays: 7,
        portfolioLink: "Synapse AI - Animated Identity",
        submittedAt: "4 hours ago"
      }
    ]
  },
  {
    id: "proj-102",
    title: "AI Fashion Editorial Lookbook for Winter Minimalist Collection",
    brandName: "Atelier Vesper London",
    postedDate: "3 days ago",
    deadline: "10 days remaining",
    budget: "$1,200 - $1,600",
    contentType: "Generative Imagery",
    preferredStyle: "High-Fashion Editorial / Scandinavian Minimalist",
    platform: "Multi-Platform (Lookbook Print + Web + Instagram 4:5)",
    commercialNeed: "Full Commercial Print & Digital Rights (Zero Likeness Encumbrances)",
    description: "Atelier Vesper is launching our Autumn/Winter 2026 knitwear line. We need 12 high-fashion editorial images featuring diverse models wearing structured oversized cashmere overcoats against Nordic fjord landscapes. Flawless fabric textures and natural human skin pores required for 300 DPI lookbook printing.",
    applicantsCount: 2,
    status: "Open",
    applications: [
      {
        id: "app-4",
        creatorId: "creator-3",
        creatorName: "Aria Vance",
        creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        proposal: "This brief aligns seamlessly with my work for European fashion ateliers. I use Midjourney v6 + Magnific AI to ensure textile weaves and cashmere fibers look indistinguishable from real photography at 300 DPI.",
        proposedRate: "$1,450",
        deliveryDays: 5,
        portfolioLink: "Solstice - Haute Couture Lookbook",
        submittedAt: "2 days ago"
      },
      {
        id: "app-5",
        creatorId: "creator-2",
        creatorName: "Marcus Chen",
        creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        proposal: "I can provide persistent virtual fashion models using custom Flux.1 LoRAs so your brand can reuse the same model identity across future seasonal lookbooks.",
        proposedRate: "$1,600",
        deliveryDays: 7,
        portfolioLink: "Cybernetic Cyber-Fashion Series",
        submittedAt: "1 day ago"
      }
    ]
  },
  {
    id: "proj-103",
    title: "Synthetic Voiceover & Ambient Foley for Sci-Fi Audio Drama",
    brandName: "Stellar Horizon Audio Labs",
    postedDate: "5 days ago",
    deadline: "21 days remaining",
    budget: "$2,200 - $3,000",
    contentType: "Voice & Audio",
    preferredStyle: "Cinematic Sci-Fi / Immersive Binaural",
    platform: "Spotify, Apple Podcasts & YouTube (Audio-First)",
    commercialNeed: "Perpetual Worldwide Commercial Buyout (No SAG/Union Constraints)",
    description: "We are producing a 5-episode audio drama exploring deep-space exploration. We need 3 distinct synthetic character voices (Ship AI, Commander, Android Engineer) plus custom ambient spaceship foley, engine hums, and spatial audio mastering.",
    applicantsCount: 1,
    status: "Open",
    applications: [
      {
        id: "app-6",
        creatorId: "creator-6",
        creatorName: "Devon Brooks",
        creatorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
        proposal: "I specialize in episodic sci-fi audio dramas using ElevenLabs Professional and custom spatial sound engines. I've produced over 50 hours of broadcast-cleared audio with custom vocal profiles and broadcast mastering.",
        proposedRate: "$2,600",
        deliveryDays: 14,
        portfolioLink: "Chronicles of Kepler - Audio Drama",
        submittedAt: "3 days ago"
      }
    ]
  },
  {
    id: "proj-104",
    title: "Photorealistic Zero-Shot Product Packshots for Organic Botanical Teas",
    brandName: "Zenith Herbal Botanicals",
    postedDate: "Just now",
    deadline: "7 days remaining",
    budget: "$800 - $1,100",
    contentType: "Product Staging",
    preferredStyle: "Natural Warm Sunlight / Organic Zen",
    platform: "Shopify Store & Amazon Brand Store",
    commercialNeed: "Full Commercial E-Commerce Rights (Exact Label Preservation)",
    description: "Need 8 premium staged product images for our new organic loose-leaf tea tins. Must preserve our exact logo typography and packaging label while placing the tin on handcrafted ceramic saucers with dried chamomile flowers, honey drippers, and soft morning steam.",
    applicantsCount: 0,
    status: "Open",
    applications: []
  }
];
