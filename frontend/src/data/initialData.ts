import { Creator, Project } from '../types';

export const INITIAL_CREATORS: Creator[] = [
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
    verificationStatus: "Verified Master",
    experienceLevel: "Master",
    availability: "Available",
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
        id: "port-1",
        creatorId: "creator-1",
        title: "Aetheria - Luxury Perfume Film",
        category: "video",
        thumbnailUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Runway Gen-3", "Midjourney v6", "Topaz"],
        promptSnippet: "cinematic micro macro shot of iridescent fragrance bottle emerging from bioluminescent smoke, anamorphic 35mm lens, atmospheric haze --v 6.0",
        description: "A 30-second conceptual commercial for an eco-luxury fragrance brand featuring fluid simulation and lighting effects.",
        workflowDescription: "Midjourney storyboard -> Runway Gen-3 camera control -> Topaz 4K interpolation.",
        creatorContribution: "Creative Director, Prompt Engineer & Colorist",
        licensingInformation: "100% Perpetual Worldwide Commercial Buyout"
      },
      {
        id: "port-2",
        creatorId: "creator-1",
        title: "Neo-Kyoto 2099 Trailer",
        category: "video",
        thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Kling AI", "ComfyUI", "DaVinci"],
        promptSnippet: "rain-drenched cyberpunk megalopolis, high contrast neon magenta reflections, drone sweeping downward between floating monolithic towers",
        description: "Teaser video clip for a sci-fi streaming series, demonstrating consistent architecture and camera dynamics.",
        workflowDescription: "ComfyUI camera paths -> Kling AI high-motion generation -> DaVinci ACES grade.",
        creatorContribution: "VFX Supervisor & Motion Director",
        licensingInformation: "Commercial Streaming & Broadcast Cleared"
      },
      {
        id: "port-3",
        creatorId: "creator-1",
        title: "Quantum Electric Hypercar",
        category: "video",
        thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Runway Gen-3", "ControlNet", "Topaz"],
        promptSnippet: "aerodynamic matte titanium supercar drifting across salt flats at twilight, dust clouds catching sunset glint, slow-motion 120fps",
        description: "Automotive social campaign demonstrating reflection consistency and realistic velocity physics.",
        workflowDescription: "ControlNet line constraints -> Runway motion vectors -> 60fps RIFE smoothing.",
        creatorContribution: "Automotive Visualizer & AI Cinematographer",
        licensingInformation: "Worldwide Digital Ad Rights"
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
    verificationStatus: "Verified Master",
    experienceLevel: "Master",
    availability: "Available",
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
        id: "port-4",
        creatorId: "creator-2",
        title: "Kaiya - AI Virtual Ambassador",
        category: "virtual-influencer",
        thumbnailUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Flux.1 Dev", "ComfyUI", "Blender"],
        promptSnippet: "portrait of synthetic digital human Kaiya, wearing minimalist streetwear, Tokyo cafe background, natural skin pores, rim lighting",
        description: "Created a persistent AI brand ambassador with over 45k Instagram followers for a streetwear label.",
        workflowDescription: "Trained rank-64 LoRA on Flux.1 with 40 curated synthetic captures -> Blender pose rig -> InstantID facial lock.",
        creatorContribution: "Lead Digital Human Sculptor & LoRA Trainer",
        licensingInformation: "Complete IP & Safetensors Model Transfer"
      },
      {
        id: "port-5",
        creatorId: "creator-2",
        title: "Spatial Gaussian Interior Walkthrough",
        category: "virtual-influencer",
        thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Gaussian Splatting", "Blender"],
        promptSnippet: "photogrammetric radiance field of modern architectural penthouse, sunlight streaming through floor to ceiling glass windows",
        description: "Interactive real-time 3D walkthrough generated for an architectural design studio.",
        workflowDescription: "Multi-view generative frames synthesized into 3D Gaussian Splatting point clouds.",
        creatorContribution: "3D Spatial Computing Lead",
        licensingInformation: "Commercial Interactive Deployment License"
      },
      {
        id: "port-6",
        creatorId: "creator-2",
        title: "Cybernetic Cyber-Fashion Series",
        category: "virtual-influencer",
        thumbnailUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Flux.1", "LoRA", "Photoshop"],
        promptSnippet: "haute couture holographic jacket with liquid metallic fiber optics, studio fashion editorial, editorial pose",
        description: "Generative apparel lookbook featured in international digital design publications.",
        workflowDescription: "Flux.1 material passes combined with custom garment LoRA.",
        creatorContribution: "Virtual Stylist & Technical Artist",
        licensingInformation: "Worldwide Digital & Print Usage Rights"
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
    verificationStatus: "Verified Master",
    experienceLevel: "Master",
    availability: "Available",
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
        id: "port-7",
        creatorId: "creator-3",
        title: "Solstice - Haute Couture Lookbook",
        category: "imagery",
        thumbnailUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Midjourney v6", "Magnific AI"],
        promptSnippet: "high fashion editorial photo, woman in structured golden silk gown, stark desert dunes, golden hour dramatic shadows, Vogue cover composition",
        description: "16-look generative fashion campaign for a London boutique label, printed in physical lookbooks.",
        workflowDescription: "Midjourney v6 prompt matrix -> Magnific AI 8K pass -> CMYK print calibration.",
        creatorContribution: "Editorial Photographer & Prompt Director",
        licensingInformation: "Commercial Print & Lookbook Clearance"
      },
      {
        id: "port-8",
        creatorId: "creator-3",
        title: "Obsidian Jewelry Campaign",
        category: "imagery",
        thumbnailUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Midjourney v6", "Photoshop"],
        promptSnippet: "macro studio shot of diamond necklace draped over black volcanic obsidian stone, water droplets glistening, razor sharp focus",
        description: "E-commerce and social campaign imagery for an ethical diamond jeweler.",
        workflowDescription: "Macro diffusion with simulated caustic reflections and focus stacking.",
        creatorContribution: "High Jewelry Art Director",
        licensingInformation: "Global Digital Advertising & E-Commerce"
      },
      {
        id: "port-9",
        creatorId: "creator-3",
        title: "Elysian Silk Cosmetics",
        category: "imagery",
        thumbnailUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Midjourney v6", "Krea AI"],
        promptSnippet: "dewy glowing skin beauty portrait, soft diffused ring light, minimal makeup, pastel lilac tones, raw photography aesthetic",
        description: "Skincare product visuals with ultra-authentic micro-textures and luminous skin tones.",
        workflowDescription: "Real-time Krea AI iteration -> Midjourney v6 high-fidelity upscale.",
        creatorContribution: "Beauty Campaign Specialist",
        licensingInformation: "Perpetual Commercial Billboard Cleared"
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
    verificationStatus: "Reviewed",
    experienceLevel: "Senior",
    availability: "Limited",
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
        id: "port-10",
        creatorId: "creator-4",
        title: "Orbital Citadel - Space Station",
        category: "concept-art",
        thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        aiTools: ["ComfyUI", "SD3", "Photoshop"],
        promptSnippet: "colossal ring-shaped orbital station orbiting a gas giant with rings, cinematic lighting, hard sci-fi aesthetics, solar array detail",
        description: "Official promotional key art for a PC space simulator launched on Steam.",
        workflowDescription: "ComfyUI depth-map conditioning -> hand paint-over for greeble details.",
        creatorContribution: "Lead Keyframe Artist",
        licensingInformation: "Full Game Distribution & Publishing IP"
      },
      {
        id: "port-11",
        creatorId: "creator-4",
        title: "Chrono-Mech 04 Industrial Walker",
        category: "concept-art",
        thumbnailUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
        aiTools: ["ComfyUI", "ControlNet"],
        promptSnippet: "heavy bipedal construction mech in volcanic quarry, rusted yellow paint, hydraulic piston details, concept art, Syd Mead inspired",
        description: "Mechanical concept art package including orthographic views and weathering variations.",
        workflowDescription: "ControlNet line-art pass combined with custom industrial machinery LoRAs.",
        creatorContribution: "Mechanical Concept Designer",
        licensingInformation: "Entertainment Franchise Rights Cleared"
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
    verificationStatus: "Reviewed",
    experienceLevel: "Intermediate",
    availability: "Available",
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
        id: "port-12",
        creatorId: "creator-5",
        title: "CleanGlow Skincare - Viral UGC Ad",
        category: "video",
        thumbnailUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
        aiTools: ["HeyGen", "ElevenLabs", "CapCut"],
        promptSnippet: "natural 20s woman in bathroom mirror talking enthusiastically about peptide serum, handheld camera wobble, realistic lighting",
        description: "Generated 3.2x ROAS in Meta paid traffic for a direct-to-consumer cosmetics startup.",
        workflowDescription: "Hook ideation -> HeyGen avatar rendering -> kinetic CapCut edit.",
        creatorContribution: "Short-Form Video Director & Hook Strategist",
        licensingInformation: "Paid Ads & Social Media Distribution Rights"
      },
      {
        id: "port-13",
        creatorId: "creator-5",
        title: "HydraBoost Smart Bottle Promo",
        category: "video",
        thumbnailUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Pika 1.5", "Runway Gen-2"],
        promptSnippet: "active lifestyle runner taking sleek insulated water bottle from gym bag, glowing hydration LED ring, cinematic morning sunlight",
        description: "High-energy 15s commercial highlighting hardware features with simulated motion.",
        workflowDescription: "Pika motion dynamics paired with sound effect triggers.",
        creatorContribution: "Creative Editor",
        licensingInformation: "Digital Ad Cleared"
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
    verificationStatus: "Verified Master",
    experienceLevel: "Master",
    availability: "Available",
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
        id: "port-14",
        creatorId: "creator-6",
        title: "Chronicles of Kepler - Audio Drama",
        category: "audio",
        thumbnailUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
        aiTools: ["ElevenLabs", "Udio", "Reaper"],
        promptSnippet: "deep resonant captain monologue, subtle spacesuit comms filter, ambient deep space hum with pulsing reactor rhythm",
        description: "Produced full voice cast and generative ambient score for a 6-part episodic audio drama.",
        workflowDescription: "Synthetic voice performance -> generative space score in Udio -> Reaper master.",
        creatorContribution: "Lead Audio Director & Voice Designer",
        licensingInformation: "100% Commercial Audio Buyout"
      },
      {
        id: "port-15",
        creatorId: "creator-6",
        title: "Global SaaS Brand Narration (5 Languages)",
        category: "audio",
        thumbnailUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
        aiTools: ["ElevenLabs Dubbing", "iZotope"],
        promptSnippet: "warm confident executive tone, perfectly synchronized English to German, French, Spanish, Japanese localized dub",
        description: "Localized product launch video across 5 international markets maintaining vocal timbre.",
        workflowDescription: "Voice profile extraction -> multilingual neural translation -> mouth-flap timing match.",
        creatorContribution: "Localization Audio Engineer",
        licensingInformation: "Commercial Localization Rights"
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
    verificationStatus: "Reviewed",
    experienceLevel: "Senior",
    availability: "Available",
    bio: "Pioneering zero-shot product staging. I place physical CPG, cosmetics, beverage, and tech products into breathtaking photorealistic environments without ever photographing them in a studio. Guaranteed pixel-perfect brand logo preservation.",
    primaryCategory: "product",
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
        id: "port-16",
        creatorId: "creator-7",
        title: "Botanica Serum - Amazon Hero Visuals",
        category: "product",
        thumbnailUrl: "https://images.unsplash.com/photo-1608248597359-50937a00f28e?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Flux.1", "ControlNet", "Photoshop"],
        promptSnippet: "frosted glass serum dropper bottle resting on moss covered river stone, morning mist, water droplets, dappled sunlight through canopy",
        description: "Hero listing images that boosted client Amazon conversion rate by 27%.",
        workflowDescription: "Packaging label vector preservation -> organic river stone diffusion.",
        creatorContribution: "Packshot Director & Retoucher",
        licensingInformation: "Amazon & E-Commerce Cleared"
      },
      {
        id: "port-17",
        creatorId: "creator-7",
        title: "Kold Craft Beer - Arctic Refreshment",
        category: "product",
        thumbnailUrl: "https://images.unsplash.com/photo-1608270116246-86d34e9e0486?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Stable Diffusion", "Octane"],
        promptSnippet: "aluminum beer can half-submerged in crystal clear glacial ice cubes, dynamic water splash frozen in time, condensation beads, dramatic backlighting",
        description: "Summer beverage promotional campaign visuals produced in under 48 hours.",
        workflowDescription: "Liquid splash particle simulation with exact can artwork fidelity.",
        creatorContribution: "Beverage Advertising Specialist",
        licensingInformation: "Full Commercial Brand License"
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
    verificationStatus: "Reviewed",
    experienceLevel: "Senior",
    availability: "Available",
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
        id: "port-18",
        creatorId: "creator-8",
        title: "Synapse AI - Animated Identity & Ident",
        category: "video",
        thumbnailUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
        aiTools: ["Deforum SD", "After Effects"],
        promptSnippet: "abstract neural network pathways transforming into geometric letterform S, bioluminescent cyan and violet currents, 60fps seamless loop",
        description: "Official 8-second animated logo reveal and stage background for a global tech summit.",
        workflowDescription: "Deforum motion math -> RIFE 60fps frame rate boost -> After Effects vector composite.",
        creatorContribution: "Motion Director & Identity Animator",
        licensingInformation: "Broadcast & Trademark Cleared"
      },
      {
        id: "port-19",
        creatorId: "creator-8",
        title: "Sonar Music Festival - Stage Visuals",
        category: "video",
        thumbnailUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
        aiTools: ["TouchDesigner", "Runway"],
        promptSnippet: "psychedelic kaleidoscopic fluid dynamics responding to low-frequency sub-bass, neon purple and gold vortex",
        description: "Hour-long generative visual pack rendered for massive festival LED stage screens.",
        workflowDescription: "Real-time FFT audio reactivity driving generative latent coordinates.",
        creatorContribution: "Visual Synthesist",
        licensingInformation: "Live Performance Rights Cleared"
      }
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-101",
    brandId: "brand-1",
    brandName: "Apex Volt Beverage Co.",
    brandAvatar: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=200&q=80",
    title: "Cinematic 15s AI Brand Film for Apex Volt Energy Drink",
    description: "Looking for an experienced AI video director to produce a dynamic, high-octane 15-second vertical commercial. The concept features a neon-lit futuristic metropolis where characters gain electric energy after drinking Apex Volt. Need realistic motion, fluid simulations, and custom sound sync. Raw 4K master deliverables required.",
    businessObjective: "Drive 200k+ impressions on TikTok and establish cyberpunk brand identity for summer product drop.",
    contentType: "AI Video",
    targetAudience: "Gen-Z gamers, athletes, and creative professionals aged 18-28.",
    creativeDirection: "Fast camera zooms, neon electric blue and magenta accents, anamorphic motion blur, bass-heavy transitions.",
    requiredSkills: ["Prompt Engineering", "Camera Control", "ControlNet", "4K Upscaling", "Color Grading"],
    preferredAiTools: ["Runway Gen-3", "Kling AI", "Topaz Video AI", "DaVinci Resolve"],
    deliverables: [
      "1x 15s Hero Master (4K ProRes 422 HQ)",
      "3x 9:16 Vertical Social Cutdowns",
      "Full Generation Seed Manifest & Workflow Guide"
    ],
    dimensionsOrDuration: "15 seconds (9:16 Vertical 1080x1920)",
    deadline: "14 days remaining",
    budgetMin: 1800,
    budgetMax: 2500,
    budgetDisplay: "$1,800 - $2,500",
    usagePlatforms: ["TikTok", "Instagram Reels", "YouTube Shorts"],
    commercialUseRequirements: [
      "Full Commercial Buyout",
      "Perpetual IP Transfer",
      "Paid Advertising Clearance",
      "Raw 4K ProRes Masters"
    ],
    referenceLinks: ["https://example.com/moodboard-cyberpunk"],
    status: "Open",
    postedDate: "2 days ago",
    applications: [
      {
        id: "app-1",
        projectId: "proj-101",
        projectTitle: "Cinematic 15s AI Brand Film for Apex Volt Energy Drink",
        creatorId: "creator-1",
        creatorName: "Elena Rostova",
        creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        creatorTitle: "Cinematic AI Video Director & Hyperrealistic Worldbuilder",
        proposal: "Hi Apex Volt team! I've directed over 40 AI video commercials using Runway Gen-3 and Kling AI. The energy drink concept fits right into my cyberpunk aesthetic. I can deliver 3 camera cut variations, custom sound design, and 4K ProRes masters within 8 days.",
        proposedRate: "$2,100",
        estimatedDeliveryDays: 8,
        relevantPortfolioItem: "Aetheria - Luxury Perfume Film",
        status: "Submitted",
        submittedAt: "Yesterday"
      },
      {
        id: "app-2",
        projectId: "proj-101",
        projectTitle: "Cinematic 15s AI Brand Film for Apex Volt Energy Drink",
        creatorId: "creator-5",
        creatorName: "Sophia Martinez",
        creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        creatorTitle: "AI UGC & Short-Form Video Producer",
        proposal: "We specialize in viral 9:16 vertical ads specifically optimized for TikTok retention curves. I'd love to generate UGC style action shots paired with dynamic captions and sound.",
        proposedRate: "$1,850",
        estimatedDeliveryDays: 6,
        relevantPortfolioItem: "HydraBoost Smart Bottle Promo",
        status: "Under Review",
        submittedAt: "1 day ago"
      },
      {
        id: "app-3",
        projectId: "proj-101",
        projectTitle: "Cinematic 15s AI Brand Film for Apex Volt Energy Drink",
        creatorId: "creator-8",
        creatorName: "Liam O'Connor",
        creatorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
        creatorTitle: "AI Motion Graphics & Generative Brand Identity",
        proposal: "Can bring high-energy audio-reactive transitions and futuristic logo reveals to make the drink can feel like a supernatural power source.",
        proposedRate: "$1,950",
        estimatedDeliveryDays: 7,
        relevantPortfolioItem: "Synapse AI - Animated Identity & Ident",
        status: "Submitted",
        submittedAt: "4 hours ago"
      }
    ]
  },
  {
    id: "proj-102",
    brandId: "brand-2",
    brandName: "Atelier Vesper London",
    brandAvatar: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=200&q=80",
    title: "AI Fashion Editorial Lookbook for Winter Minimalist Collection",
    description: "Atelier Vesper is launching our Autumn/Winter 2026 knitwear line. We need 12 high-fashion editorial images featuring diverse models wearing structured oversized cashmere overcoats against Nordic fjord landscapes. Flawless fabric textures and natural human skin pores required for 300 DPI lookbook printing.",
    businessObjective: "Establish luxury tier brand positioning and release physical European boutique lookbook.",
    contentType: "Generative Imagery",
    targetAudience: "Discerning luxury apparel collectors and European fashion retailers.",
    creativeDirection: "Scandinavian minimalist, natural overcast daylight, rich cashmere weave details, muted earth tones.",
    requiredSkills: ["Fabric Rendering", "Skin Texture Realism", "Editorial Lighting", "High-Res Upscaling"],
    preferredAiTools: ["Midjourney v6", "Magnific AI", "Photoshop"],
    deliverables: [
      "12x 300 DPI High-Resolution Print Masters (CMYK TIFF)",
      "12x 4:5 Instagram Feed Crops (sRGB)",
      "Prompt Matrix and LoRA Style Logs"
    ],
    dimensionsOrDuration: "300 DPI High-Resolution Print & 4:5 Social",
    deadline: "10 days remaining",
    budgetMin: 1200,
    budgetMax: 1600,
    budgetDisplay: "$1,200 - $1,600",
    usagePlatforms: ["Print Lookbook", "E-Commerce", "Instagram"],
    commercialUseRequirements: [
      "Full Commercial Print Rights",
      "Model Release Guarantee",
      "Perpetual IP Transfer"
    ],
    status: "Open",
    postedDate: "3 days ago",
    applications: [
      {
        id: "app-4",
        projectId: "proj-102",
        projectTitle: "AI Fashion Editorial Lookbook for Winter Minimalist Collection",
        creatorId: "creator-3",
        creatorName: "Aria Vance",
        creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        creatorTitle: "AI Fashion & Luxury Editorial Photography Lead",
        proposal: "This brief aligns seamlessly with my work for European fashion ateliers. I use Midjourney v6 + Magnific AI to ensure textile weaves and cashmere fibers look indistinguishable from real photography at 300 DPI.",
        proposedRate: "$1,450",
        estimatedDeliveryDays: 5,
        relevantPortfolioItem: "Solstice - Haute Couture Lookbook",
        status: "Accepted",
        submittedAt: "2 days ago"
      }
    ]
  },
  {
    id: "proj-103",
    brandId: "brand-3",
    brandName: "Stellar Horizon Audio Labs",
    brandAvatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80",
    title: "Synthetic Voiceover & Ambient Foley for Sci-Fi Audio Drama",
    description: "We are producing a 5-episode audio drama exploring deep-space exploration. We need 3 distinct synthetic character voices (Ship AI, Commander, Android Engineer) plus custom ambient spaceship foley, engine hums, and spatial audio mastering.",
    businessObjective: "Produce captivating audio entertainment with zero guild actor licensing bottlenecks.",
    contentType: "Voice & Audio",
    targetAudience: "Sci-fi fans, narrative podcast listeners, audio enthusiasts.",
    creativeDirection: "Immersive cinematic audio bed, realistic cockpit intercom acoustics, binaural spatial depth.",
    requiredSkills: ["Voice Modulation", "Emotion Prompting", "Audio Mastering", "Foley AI Synthesis"],
    preferredAiTools: ["ElevenLabs Pro", "Suno v3.5", "Reaper DAW"],
    deliverables: [
      "5x 20-minute Audio Episodes (24-bit 48kHz WAV)",
      "Isolated Voice & Music Stems",
      "Broadcast LUFS Compliance Certificate"
    ],
    dimensionsOrDuration: "5 Episodes x 20 minutes",
    deadline: "21 days remaining",
    budgetMin: 2200,
    budgetMax: 3000,
    budgetDisplay: "$2,200 - $3,000",
    usagePlatforms: ["Spotify", "Apple Podcasts", "YouTube Audio"],
    commercialUseRequirements: [
      "Perpetual Worldwide Commercial Buyout",
      "Royalty-Free in Perpetuity"
    ],
    status: "Open",
    postedDate: "5 days ago",
    applications: [
      {
        id: "app-5",
        projectId: "proj-103",
        projectTitle: "Synthetic Voiceover & Ambient Foley for Sci-Fi Audio Drama",
        creatorId: "creator-6",
        creatorName: "Devon Brooks",
        creatorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
        creatorTitle: "Synthetic Voice Actor & Generative Soundscape Designer",
        proposal: "I specialize in episodic sci-fi audio dramas using ElevenLabs Professional and custom spatial sound engines. I've produced over 50 hours of broadcast-cleared audio with custom vocal profiles and broadcast mastering.",
        proposedRate: "$2,600",
        estimatedDeliveryDays: 14,
        relevantPortfolioItem: "Chronicles of Kepler - Audio Drama",
        status: "Submitted",
        submittedAt: "3 days ago"
      }
    ]
  },
  {
    id: "proj-104",
    brandId: "brand-4",
    brandName: "Zenith Herbal Botanicals",
    brandAvatar: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80",
    title: "Photorealistic Zero-Shot Product Packshots for Organic Botanical Teas",
    description: "Need 8 premium staged product images for our new organic loose-leaf tea tins. Must preserve our exact logo typography and packaging label while placing the tin on handcrafted ceramic saucers with dried chamomile flowers, honey drippers, and soft morning steam.",
    businessObjective: "Launch Amazon Brand Store and achieve 25%+ listing conversion rate.",
    contentType: "Product Staging",
    targetAudience: "Health-conscious wellness tea drinkers, gift shoppers.",
    creativeDirection: "Warm morning sunlight, organic textures, steam swirl simulation, zero label distortion.",
    requiredSkills: ["Logo Preservation", "ControlNet Tile", "Reflection Mapping", "Packshot Staging"],
    preferredAiTools: ["Flux.1", "ControlNet", "Photoshop CC"],
    deliverables: [
      "8x E-Commerce Hero Images (2000x2000 px 300 DPI)",
      "Layered PSD Files with Vector Smart Objects"
    ],
    dimensionsOrDuration: "2000x2000 E-Commerce & Web Resolution",
    deadline: "7 days remaining",
    budgetMin: 800,
    budgetMax: 1100,
    budgetDisplay: "$800 - $1,100",
    usagePlatforms: ["Shopify Store", "Amazon Store", "Instagram Feed"],
    commercialUseRequirements: [
      "Full Commercial E-Commerce Rights",
      "Logo Preservation Warranty"
    ],
    status: "Open",
    postedDate: "Just now",
    applications: []
  },
  {
    id: "proj-105",
    brandId: "brand-5",
    brandName: "Veloce Streetwear NYC",
    brandAvatar: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=200&q=80",
    title: "Persistent Virtual Influencer Ambassador for Streetwear Label",
    description: "Develop a synthetic brand ambassador with consistent facial features across 20 seasonal campaign looks. Train custom LoRA models and supply generation seeds for continuous brand usage.",
    businessObjective: "Build an iconic owned virtual IP to anchor long-term influencer campaigns without recurring talent fees.",
    contentType: "Virtual Influencer",
    targetAudience: "Streetwear & sneakerheads aged 16-30.",
    creativeDirection: "Edgy Tokyo street fashion, natural skin micro-texture, authentic candid smartphone poses.",
    requiredSkills: ["LoRA Fine-Tuning", "Flux.1 Control", "Blender 4.2", "Identity Lock"],
    preferredAiTools: ["Flux.1 Dev", "InstantID", "ComfyUI"],
    deliverables: [
      "Trained LoRA Weights (.safetensors)",
      "20x High-Res Editorial Looks",
      "Workflow Guide and HDRI Presets"
    ],
    dimensionsOrDuration: "High-Res Multi-Angle Renders",
    deadline: "25 days remaining",
    budgetMin: 2500,
    budgetMax: 3500,
    budgetDisplay: "$2,500 - $3,500",
    usagePlatforms: ["Instagram", "TikTok", "Digital Billboard"],
    commercialUseRequirements: [
      "Exclusive Virtual IP Transfer",
      "Source LoRA Weights Delivery"
    ],
    status: "Open",
    postedDate: "4 days ago",
    applications: []
  }
];

export const INITIAL_BRANDS = [
  {
    id: "brand-1",
    name: "Apex Volt Beverage Co.",
    tagline: "High-Performance Energy Beverages for Next-Gen Creatives & Esports",
    description: "Apex Volt crafts clean, zero-sugar, nootropic-fueled organic energy drinks designed for digital natives, streamers, and high-performance creatives. We push boundaries in advertising by commissioning cutting-edge generative video diffusion and 3D motion systems.",
    industry: "Food & Beverage / CPG",
    logo: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=300&q=80",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    website: "https://apexvolt.example.com",
    location: "New York, USA",
    companySize: "51-200 employees",
    foundedYear: "2023",
    verified: true,
    brandGuidelines: "Bold cyberpunk neon palette (#6366f1, #06b6d4, electric magenta). High kinetic motion, dynamic sound design, anamorphic 35mm lens blur, and fast-paced editing optimized for TikTok & Reels retention curves.",
    preferredStyles: ["Cyberpunk & High-Energy", "Cinematic 4K Diffusion", "Fast-Paced Kinetic Cuts", "Macro Fluid Simulation"],
    totalProjectsCount: 4,
    creatorsHiredCount: 3,
    socialLinks: {
      twitter: "https://twitter.com/apexvolt",
      linkedin: "https://linkedin.com/company/apex-volt",
      instagram: "https://instagram.com/apexvoltenergy"
    }
  },
  {
    id: "brand-2",
    name: "Atelier Vesper London",
    tagline: "Sustainable Haute Couture & Contemporary Knitwear House",
    description: "Independent luxury fashion atelier based in Mayfair, London. Atelier Vesper explores modern minimalism, architectural drapery, and sustainable cashmere. We utilize AI-generated editorial lookbooks to minimize physical carbon footprints and explore rapid seasonal concepting.",
    industry: "Fashion & Luxury Goods",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80",
    coverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    website: "https://ateliervesper.example.com",
    location: "London, UK",
    companySize: "11-50 employees",
    foundedYear: "2021",
    verified: true,
    brandGuidelines: "Scandinavian minimalist aesthetic with natural overcast daylight, warm stone neutrals, and tactile fabric textures. Demands flawless skin micro-textures and 300 DPI high-resolution CMYK print fidelity.",
    preferredStyles: ["Scandinavian Minimalist", "Vogue Editorial Lighting", "Textile Micro-Realism", "300 DPI Print Masters"],
    totalProjectsCount: 3,
    creatorsHiredCount: 2,
    socialLinks: {
      instagram: "https://instagram.com/ateliervesper"
    }
  },
  {
    id: "brand-3",
    name: "Stellar Horizon Audio Labs",
    tagline: "Immersive Episodic Audio Dramas & Spatial Sound Experiences",
    description: "Digital audio production studio engineering high-concept sci-fi and speculative narrative podcasts. We champion synthetic voice acting, generative ambient beds, and binaural sound engineering to build cinematic audio worlds without traditional union casting delays.",
    industry: "Entertainment & Media",
    logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
    website: "https://stellarhorizon.example.com",
    location: "Austin, USA",
    companySize: "1-10 employees",
    foundedYear: "2024",
    verified: true,
    brandGuidelines: "Broadcast LUFS-compliant audio with rich spatial depth, authentic vocal timbre variance, micro-inflections, and zero metallic quantization artifacts.",
    preferredStyles: ["Sci-Fi Foley Synthesis", "Spatial Audio Beds", "Multilingual Voice Cloning", "Broadcast Mastering"],
    totalProjectsCount: 2,
    creatorsHiredCount: 1,
    socialLinks: {
      twitter: "https://twitter.com/stellarhorizon"
    }
  },
  {
    id: "brand-4",
    name: "Zenith Herbal Botanicals",
    tagline: "Organic Loose-Leaf Teas & Adaptogenic Herbal Elixirs",
    description: "Direct-to-consumer organic tea brand sourcing rare wild botanicals. We leverage zero-shot product staging to place our packaging in serene natural environments without studio photography waste, requiring pixel-perfect typography and barcode preservation.",
    industry: "Health, Wellness & Beauty",
    logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
    coverImage: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=80",
    website: "https://zenithbotanicals.example.com",
    location: "Portland, USA",
    companySize: "11-50 employees",
    foundedYear: "2022",
    verified: true,
    brandGuidelines: "Warm morning sunlight, organic natural materials (river stones, cedar wood, morning dew, steam swirls), tranquil composition with strict packshot logo fidelity.",
    preferredStyles: ["Zero-Shot Product Staging", "Organic Warm Sunlight", "ControlNet Logo Protection"],
    totalProjectsCount: 2,
    creatorsHiredCount: 1
  },
  {
    id: "brand-5",
    name: "Veloce Streetwear NYC",
    tagline: "Experimental Cyber-Wear & Virtual Ambassador Brand",
    description: "NYC streetwear collective merging physical limited-edition hoodies with digital fashion skins and owned virtual influencers. We deploy custom LoRA models to maintain persistent virtual model identities across multiple seasonal releases.",
    industry: "Apparel & Streetwear",
    logo: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=80",
    coverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    website: "https://velocestreetwear.example.com",
    location: "New York, USA",
    companySize: "1-10 employees",
    foundedYear: "2024",
    verified: true,
    brandGuidelines: "Harsh neon lighting, gritty urban environments, realistic candid smartphone photography angles with authentic skin pores and fabric creases.",
    preferredStyles: ["Virtual Influencer Ambassadors", "Custom LoRA Rigging", "Edgy Urban Streetwear", "Smartphone Candid Aesthetic"],
    totalProjectsCount: 1,
    creatorsHiredCount: 1
  }
];

