/**
 * CreatorAI - Secure Backend Server
 * 
 * Exposes server-side API endpoints for:
 * 1. POST /api/ai/generate-brief (AI Creative Brief Generation via Gemini API or Deterministic Engine)
 * 2. POST /api/ai/enhance-portfolio (AI Portfolio Assistant)
 * 
 * Security: Private API keys (GEMINI_API_KEY, AI_API_KEY) are kept strictly on the server
 * and NEVER sent to the client browser.
 */

import http from 'http';

const PORT = process.env.PORT || 3001;

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

  // Enable CORS for local Vite dev server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Route 1: Health Check
  if (parsedUrl.pathname === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
    return;
  }

  // Route 2: Generate Structured Creative Brief
  if (parsedUrl.pathname === '/api/ai/generate-brief' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const prompt = payload.prompt || '';
        const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

        let isLive = false;
        let briefResult = null;

        if (apiKey) {
          try {
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
            console.warn('[Server] Gemini API call failed, falling back to deterministic engine:', err);
          }
        }

        if (!briefResult) {
          briefResult = generateDeterministicBrief(prompt);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          isLiveAi: isLive,
          mode: isLive ? 'Live Gemini 1.5 Flash API' : 'Deterministic Demo Mode (Zero External API Key Needed)',
          brief: briefResult
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Route 3: Enhance Portfolio Assistant
  if (parsedUrl.pathname === '/api/ai/enhance-portfolio' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const title = payload.title || 'Generative Production';
        const description = payload.description || '';
        const tools = payload.tools || ['Runway Gen-3', 'Midjourney v6'];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          mode: 'Deterministic Portfolio Assistant Engine',
          enhanced: {
            title: title.length > 5 ? title : 'Cinematic Generative Production Series',
            description: `An industry-grade showcase highlighting advanced diffusion synthesis. Produced utilizing ${tools.join(', ')} with strict prompt curation, seed preservation, and high-DPI color grading for commercial campaign deployment. ${description}`,
            suggestedSkills: ['Prompt Crafting', 'Seed Control', 'Latent Upscaling', 'Commercial Color Grading'],
            suggestedCategory: description.toLowerCase().includes('video') ? 'video' : 'imagery',
            workflowSummary: '1. Seed ideation & moodboarding -> 2. Multi-pass diffusion with ControlNet conditioning -> 3. Micro-texture upscaling & artifact suppression -> 4. Master export with full IP documentation.'
          }
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

function generateDeterministicBrief(prompt) {
  const p = (prompt || '').toLowerCase();
  
  if (p.includes('video') || p.includes('commercial') || p.includes('drink') || p.includes('car') || p.includes('tiktok')) {
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

server.listen(PORT, () => {
  console.log(`CreatorAI Secure Server running on http://localhost:${PORT}`);
});
