import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    base:'/CreatorAI/',
    {
      name: 'ai-api-mock-handler',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/ai/generate-brief' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const prompt = parsed.prompt || '';
                const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

                // If real API key is present in environment, we could call Gemini
                // Otherwise or on error, return a high-grade structured response with demo mode tag
                let isLive = false;
                let briefResult = null;

                if (apiKey) {
                  try {
                    // Gemini REST API call
                    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
                    const aiRes = await fetch(geminiUrl, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        contents: [{
                          parts: [{
                            text: `You are an expert creative director for AI-powered media production. Given this brand concept, generate a structured creative brief in strict JSON format.
Concept: "${prompt}"

Return ONLY valid JSON matching this exact structure:
{
  "title": "A punchy title (6-10 words)",
  "overview": "Comprehensive 2-3 sentence project overview",
  "businessObjective": "Specific conversion or branding goal",
  "contentType": "One of: AI Video, Generative Imagery, Virtual Influencer, Product Staging, Concept Art, Voice & Audio",
  "targetAudience": "Demographics and buyer persona",
  "creativeDirection": "Visual style, lighting, camera angles, color grading, mood",
  "suggestedDeliverables": ["Deliverable 1", "Deliverable 2", "Deliverable 3"],
  "formatDimensions": "e.g., 9:16 Vertical (1080x1920) or 16:9 Landscape (4K ProRes)",
  "requiredSkills": ["Skill 1", "Skill 2", "Skill 3"],
  "suggestedAiTools": ["Tool 1", "Tool 2", "Tool 3"],
  "distributionPlatform": "Target platform (TikTok, Instagram, YouTube, Web)",
  "estimatedTimelineDays": 14,
  "budgetEstimate": "$1,500 - $2,500",
  "commercialClarifications": ["Clarification or usage question 1", "Clarification 2"]
}`
                          }]
                        }],
                        generationConfig: {
                          responseMimeType: "application/json"
                        }
                      })
                    });

                    if (aiRes.ok) {
                      const data = await aiRes.json();
                      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                      if (text) {
                        briefResult = JSON.parse(text);
                        isLive = true;
                      }
                    }
                  } catch (err) {
                    console.warn('[Vite AI Server] Gemini API call failed, falling back to deterministic engine:', err);
                  }
                }

                if (!briefResult) {
                  // Deterministic fallback based on prompt keywords
                  briefResult = generateDeterministicBrief(prompt);
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  isLiveAi: isLive,
                  mode: isLive ? 'Live Gemini 1.5 Flash' : 'Deterministic Demo Mode (Zero API Key Needed)',
                  brief: briefResult
                }));
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ success: false, error: (err as Error).message }));
              }
            });
            return;
          }

          if (req.url === '/api/ai/enhance-portfolio' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const title = parsed.title || 'Creative Project';
                const rawDesc = parsed.description || '';
                const tools = parsed.tools || ['Runway Gen-3', 'Midjourney v6'];

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  mode: 'Deterministic Portfolio Assistant Engine',
                  enhanced: {
                    title: title.length > 5 ? title : 'Cinematic Generative Production Series',
                    description: `An industry-grade showcase highlighting advanced diffusion synthesis. Produced utilizing ${tools.join(', ')} with strict prompt curation, seed preservation, and high-DPI color grading for commercial campaign deployment. ${rawDesc}`,
                    suggestedSkills: ['Prompt Crafting', 'Seed Control', 'Latent Upscaling', 'Commercial Color Grading'],
                    suggestedCategory: rawDesc.toLowerCase().includes('video') ? 'video' : 'imagery',
                    workflowSummary: '1. Seed ideation & moodboarding -> 2. Multi-pass diffusion with ControlNet conditioning -> 3. Micro-texture upscaling & artifact suppression -> 4. Master export with full IP documentation.'
                  }
                }));
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ success: false, error: (err as Error).message }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ],
  server: {
    port: 5173,
    open: false
  }
});

function generateDeterministicBrief(prompt: string) {
  const p = (prompt || '').toLowerCase();
  
  if (p.includes('video') || p.includes('commercial') || p.includes('drink') || p.includes('car') || p.includes('ad')) {
    return {
      title: "High-Octane Commercial AI Video Spot & Social Campaign",
      overview: "A visually striking 15-30 second generative video campaign engineered for maximum scroll-stopping engagement and high conversion across modern digital platforms.",
      businessObjective: "Drive brand awareness and 3x engagement through photorealistic, high-motion generative video storytelling.",
      contentType: "AI Video",
      targetAudience: "Digital-native consumers aged 18-35 interested in premium aesthetics, innovation, and dynamic lifestyle content.",
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

  if (p.includes('fashion') || p.includes('lookbook') || p.includes('cloth') || p.includes('model') || p.includes('photo')) {
    return {
      title: "Haute Couture Editorial Lookbook & High-Res Campaign Imagery",
      overview: "A series of 12 luxury-tier generative fashion editorial frames combining hyperrealistic fabric micro-textures, authentic human skin pores, and striking atmospheric lighting.",
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

  if (p.includes('audio') || p.includes('voice') || p.includes('podcast') || p.includes('sound') || p.includes('music')) {
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

  // Generic fallback
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
